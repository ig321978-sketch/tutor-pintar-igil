import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";

import { kredensialSupabasePublik } from "@/lib/kredensial-supabase";

function kredensialPublik(): { url: string; kunci: string } | null {
  return kredensialSupabasePublik();
}

export function supabaseAuthMiddleware(
  request: NextRequest,
  response: NextResponse,
): { supabase: SupabaseClient | null; response: NextResponse } {
  const kredensial = kredensialPublik();
  if (!kredensial) return { supabase: null, response };

  const hasil: { supabase: SupabaseClient | null; response: NextResponse } = {
    supabase: null,
    response,
  };
  const supabase = createServerClient(kredensial.url, kredensial.kunci, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options: CookieOptions }[],
      ) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        const sebelumnya = hasil.response;
        const outgoing = NextResponse.next({ request });
        sebelumnya.headers.forEach((nilai, kunci) => {
          if (kunci.toLowerCase() === "set-cookie") return;
          outgoing.headers.set(kunci, nilai);
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          outgoing.cookies.set(name, value, options);
        });
        hasil.response = outgoing;
      },
    },
  });
  hasil.supabase = supabase;
  return hasil;
}
