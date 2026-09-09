-- RBAC: profil pengguna + kolom role.
-- Jalankan sekali di SQL Editor Supabase.
-- Setelah itu, ubah role akun tim menjadi 'admin' di Table Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('student', 'user', 'admin'))
);

alter table public.profiles
  add column if not exists role text not null default 'student';

alter table public.profiles enable row level security;

drop policy if exists "pengguna baca profil sendiri" on public.profiles;
create policy "pengguna baca profil sendiri"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create or replace function public.tangani_pengguna_baru()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'student')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.tangani_pengguna_baru();

insert into public.profiles (id, role)
select id, 'student'
from auth.users
on conflict (id) do nothing;

grant select on public.profiles to authenticated;
