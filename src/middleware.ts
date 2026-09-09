import { NextResponse, type NextRequest } from "next/server";
import { adalahPeranAdmin, bacaPeranPengguna } from "@/lib/peran";
import { situsHanyaAdmin } from "@/lib/situs-hanya-admin";
import { supabaseAuthMiddleware } from "@/lib/supabase-edge";

function ruteAdmin(pathname: string): boolean {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/studio-kreator" ||
    pathname.startsWith("/studio-kreator/")
  );
}

function ruteTerbukaSaatDitutup(pathname: string): boolean {
  return (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/situs-ditutup" ||
    pathname.startsWith("/api/auth/")
  );
}

async function sesiAdmin(request: NextRequest) {
  const awal = NextResponse.next({ request });
  const { supabase, response } = supabaseAuthMiddleware(request, awal);
  if (!supabase) {
    return { admin: false, response, user: false };
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { admin: false, response, user: false };
  }
  const peran = await bacaPeranPengguna(supabase, user);
  return { admin: adalahPeranAdmin(peran), response, user: true };
}

function tolakPublik(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { berhasil: false, pesan: "Situs sementara ditutup." },
      { status: 503 },
    );
  }
  return NextResponse.redirect(new URL("/situs-ditutup", request.url));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const kunciPublik = situsHanyaAdmin();

  if (kunciPublik) {
    if (ruteTerbukaSaatDitutup(pathname)) {
      return NextResponse.next();
    }
    const sesi = await sesiAdmin(request);
    if (sesi.admin) return sesi.response;
    return tolakPublik(request);
  }

  if (!ruteAdmin(pathname)) {
    return NextResponse.next();
  }

  const sesi = await sesiAdmin(request);
  if (!sesi.user) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }
  if (!sesi.admin) {
    return NextResponse.redirect(new URL("/403", request.url));
  }
  return sesi.response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
