import { NextResponse, type NextRequest } from "next/server";
import { adalahPeranAdmin, bacaPeranPengguna } from "@/lib/peran";
import {
  ruteApiPublikSaatTerkunci,
  ruteHalamanPublikSaatTerkunci,
  ruteWajibMasuk,
  situsHanyaAdmin,
} from "@/lib/situs-hanya-admin";
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
    pathname === "/" ||
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/daftar" ||
    pathname.startsWith("/daftar/") ||
    pathname.startsWith("/api/auth/")
  );
}

function ruteModulLama(pathname: string): boolean {
  return (
    pathname === "/tutor" ||
    pathname.startsWith("/tutor/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/laboratorium" ||
    pathname.startsWith("/laboratorium/") ||
    pathname === "/simulasi-praktikum" ||
    pathname.startsWith("/simulasi-praktikum/") ||
    pathname === "/simulasi-embed" ||
    pathname.startsWith("/simulasi-embed/")
  );
}

/**
 * Halaman modul lama yang punya Latihan/Ujian sendiri di sisi klien (tanpa penjaga akses dan tanpa penilaian server).
 * Pilot: hanya admin. Siswa memakai /ruang-belajar/mtk-<kelas>-bab<n>, yang dijaga aturan Latihan dan Ujian.
 */
function ruteLatihanLama(pathname: string): boolean {
  return /^\/ruang-belajar\/mtk-1-bab[1-5]-lama(\/|$)/.test(pathname) ||
    /^\/ruang-belajar\/mtk-1-bab2-(baru|ulangan|laporan|p\d+)(\/|$)/.test(pathname);
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
  try {
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
  } catch {
    return { admin: false, response: tanpaCache(sesiMw.response), user: false };
  }
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
  if (ruteModulLama(pathname)) {
    return tanpaCache(NextResponse.redirect(new URL("/ruang-belajar", request.url)));
  }
  const kunciPublik = situsHanyaAdmin();

  if (kunciPublik) {
    if (ruteMasuk(pathname) && pathname.startsWith("/api/auth/")) {
      return tanpaCache(NextResponse.next());
    }
    if (ruteMasuk(pathname) && !pathname.startsWith("/api/")) {
      const sesiGerbang = await sesiAdmin(request);
      if (sesiGerbang.user && (pathname === "/" || pathname === "/login")) {
        return tanpaCache(NextResponse.redirect(new URL("/ruang-belajar", request.url)));
      }
      return sesiGerbang.user ? sesiGerbang.response : tanpaCache(NextResponse.next());
    }
    const sesi = await sesiAdmin(request);
    if (sesi.admin) {
      if (ruteSitusDitutup(pathname)) {
        return tanpaCache(NextResponse.redirect(new URL("/ruang-belajar", request.url)));
      }
      return sesi.response;
    }
    if (ruteSitusDitutup(pathname)) {
      return tanpaCache(NextResponse.next());
    }
    if (ruteLatihanLama(pathname)) {
      return tanpaCache(NextResponse.redirect(new URL("/ruang-belajar", request.url)));
    }
    if (ruteWajibMasuk(pathname) && !sesi.user) {
      const masuk = new URL("/login", request.url);
      masuk.searchParams.set("next", pathname);
      return tanpaCache(NextResponse.redirect(masuk));
    }
    if (
      ruteHalamanPublikSaatTerkunci(pathname) ||
      ruteApiPublikSaatTerkunci(pathname)
    ) {
      return sesi.user ? sesi.response : tanpaCache(NextResponse.next());
    }
    return tolakPublik(request);
  }

  if (ruteSitusDitutup(pathname)) {
    return tanpaCache(NextResponse.redirect(new URL("/ruang-belajar", request.url)));
  }

  if (ruteMasuk(pathname) && !pathname.startsWith("/api/")) {
    const sesiGerbang = await sesiAdmin(request);
    if (sesiGerbang.user && (pathname === "/" || pathname === "/login")) {
      return tanpaCache(NextResponse.redirect(new URL("/ruang-belajar", request.url)));
    }
    return sesiGerbang.user ? sesiGerbang.response : tanpaCache(NextResponse.next());
  }

  if (ruteWajibMasuk(pathname)) {
    const sesiBelajar = await sesiAdmin(request);
    if (!sesiBelajar.user) {
      const masuk = new URL("/login", request.url);
      masuk.searchParams.set("next", pathname);
      return tanpaCache(NextResponse.redirect(masuk));
    }
    if (!ruteAdmin(pathname) && !ruteLatihanLama(pathname)) {
      return sesiBelajar.response;
    }
  }

  if (!ruteAdmin(pathname) && !ruteLatihanLama(pathname)) {
    return tanpaCache(NextResponse.next());
  }

  const sesi = await sesiAdmin(request);
  if (!sesi.user) {
    const masuk = new URL("/login", request.url);
    masuk.searchParams.set("next", pathname);
    return tanpaCache(NextResponse.redirect(masuk));
  }
  if (!sesi.admin) {
    return tanpaCache(NextResponse.redirect(new URL("/403", request.url)));
  }
  return sesi.response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|manifest.webmanifest|audio-guru/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
