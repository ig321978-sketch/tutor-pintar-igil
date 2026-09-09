import { NextResponse, type NextRequest } from "next/server";
import { adalahPeranAdmin, bacaPeranPengguna } from "@/lib/peran";
import { supabaseAuthMiddleware } from "@/lib/supabase-edge";

function ruteAdmin(pathname: string): boolean {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/studio-kreator" ||
    pathname.startsWith("/studio-kreator/")
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!ruteAdmin(pathname)) {
    return NextResponse.next();
  }

  const awal = NextResponse.next({ request });
  const { supabase, response } = supabaseAuthMiddleware(request, awal);
  if (!supabase) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  const peran = await bacaPeranPengguna(supabase, user);
  if (!adalahPeranAdmin(peran)) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/studio-kreator",
    "/studio-kreator/:path*",
  ],
};
