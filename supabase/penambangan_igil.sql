-- Jalankan di SQL Editor Supabase agar penambangan token $IGIL tersimpan.
create table if not exists penambangan_igil (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nama text not null,
  kelas text,
  mapel text,
  materi text,
  ide text,
  token numeric not null default 0,
  status text not null,
  umpan_balik text
);

alter table penambangan_igil enable row level security;

drop policy if exists "api_insert_penambangan" on penambangan_igil;
create policy "api_insert_penambangan"
  on penambangan_igil for insert
  with check (true);

drop policy if exists "api_select_penambangan" on penambangan_igil;
create policy "api_select_penambangan"
  on penambangan_igil for select
  using (true);
