import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";

function kredensialPublik(): { url: string; kunci: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const kunci = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !kunci) return null;
  return { url, kunci };
}

export function supabaseAuthMiddleware(
  request: NextRequest,
  response: NextResponse,
): { supabase: SupabaseClient | null; response: NextResponse } {
  const kredensial = kredensialPublik();
  if (!kredensial) return { supabase: null, response };

  let outgoing = response;
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
        outgoing = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          outgoing.cookies.set(name, value, options);
        });
      },
    },
  });
  return { supabase, response: outgoing };
}
