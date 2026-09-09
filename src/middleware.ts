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

function ruteMasuk(pathname: string): boolean {
  return (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname.startsWith("/api/auth/")
  );
}

function ruteSitusDitutup(pathname: string): boolean {
  return pathname === "/situs-ditutup" || pathname.startsWith("/situs-ditutup/");
}

function tanpaCache(response: NextResponse): NextResponse {
  response.headers.set(
    "Cache-Control",
    "private, no-store, max-age=0, must-revalidate",
  );
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Vercel-CDN-Cache-Control", "no-store");
  response.headers.set("x-middleware-cache", "no-cache");
  return response;
}

async function sesiAdmin(request: NextRequest) {
  const awal = tanpaCache(NextResponse.next({ request }));
  const sesiMw = supabaseAuthMiddleware(request, awal);
  if (!sesiMw.supabase) {
    return { admin: false, response: sesiMw.response, user: false };
  }
  const {
    data: { user },
  } = await sesiMw.supabase.auth.getUser();
  const response = tanpaCache(sesiMw.response);
  if (!user) {
    return { admin: false, response, user: false };
  }
  const peran = await bacaPeranPengguna(sesiMw.supabase, user);
  return {
    admin: adalahPeranAdmin(peran),
    response,
    user: true,
  };
}

function tolakPublik(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/api/")) {
    return tanpaCache(
      NextResponse.json(
        { berhasil: false, pesan: "Situs sementara ditutup." },
        { status: 503 },
      ),
    );
  }
  return tanpaCache(
    NextResponse.redirect(new URL("/situs-ditutup", request.url)),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const kunciPublik = situsHanyaAdmin();

  if (kunciPublik) {
    if (ruteMasuk(pathname)) {
      return tanpaCache(NextResponse.next());
    }
    const sesi = await sesiAdmin(request);
    if (sesi.admin) {
      if (ruteSitusDitutup(pathname)) {
        return tanpaCache(NextResponse.redirect(new URL("/tutor", request.url)));
      }
      return sesi.response;
    }
    if (ruteSitusDitutup(pathname)) {
      return tanpaCache(NextResponse.next());
    }
    return tolakPublik(request);
  }

  if (!ruteAdmin(pathname)) {
    return tanpaCache(NextResponse.next());
  }

  const sesi = await sesiAdmin(request);
  if (!sesi.user) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return tanpaCache(NextResponse.redirect(login));
  }
  if (!sesi.admin) {
    return tanpaCache(NextResponse.redirect(new URL("/403", request.url)));
  }
  return sesi.response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
