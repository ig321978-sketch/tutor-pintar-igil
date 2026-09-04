-- Jalankan di SQL Editor Supabase (disarankan).
-- Cache modul dua perspektif + kuota tanya harian + saldo token $IGIL.
-- Jika belum dijalankan, $IGIL memakai cadangan di tabel penambangan_igil.

create table if not exists cache_materi_tutor (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  kunci text not null unique,
  kelas text not null,
  mapel text not null,
  materi text not null,
  curriculum_view text not null,
  global_best_view text not null,
  sketsa_kartu text,
  svg_code text,
  pertanyaan text,
  kunci_jawaban text,
  motivasi text
);

create table if not exists saldo_token_igil (
  kunci_siswa text primary key,
  updated_at timestamptz not null default now(),
  nama text not null,
  kelas text,
  saldo numeric not null default 0
);

create table if not exists kuota_interaksi_harian (
  id uuid primary key default gen_random_uuid(),
  kunci_siswa text not null,
  tanggal date not null,
  nama text not null,
  kelas text,
  dipakai_gratis int not null default 0,
  dipakai_token int not null default 0,
  unique (kunci_siswa, tanggal)
);

create table if not exists penukaran_sesi_ai (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nama text not null,
  kelas text,
  token numeric not null,
  tanggal date not null
);

alter table cache_materi_tutor enable row level security;
alter table saldo_token_igil enable row level security;
alter table kuota_interaksi_harian enable row level security;
alter table penukaran_sesi_ai enable row level security;

drop policy if exists "api_all_cache_materi" on cache_materi_tutor;
create policy "api_all_cache_materi"
  on cache_materi_tutor for all
  using (true)
  with check (true);

drop policy if exists "api_all_saldo_token" on saldo_token_igil;
create policy "api_all_saldo_token"
  on saldo_token_igil for all
  using (true)
  with check (true);

drop policy if exists "api_all_kuota_harian" on kuota_interaksi_harian;
create policy "api_all_kuota_harian"
  on kuota_interaksi_harian for all
  using (true)
  with check (true);

drop policy if exists "api_all_penukaran_sesi" on penukaran_sesi_ai;
create policy "api_all_penukaran_sesi"
  on penukaran_sesi_ai for all
  using (true)
  with check (true);
