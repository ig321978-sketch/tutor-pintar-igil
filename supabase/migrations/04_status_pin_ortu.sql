-- Layar pendaftaran anak perlu tahu apakah rumah sudah punya PIN orang tua.
-- Tabel private.household_pins tidak bisa dibaca klien, jadi fungsi ini hanya menjawab ya atau tidak.
-- Terapkan setelah 02_parent_pin_in_app.sql.

begin;

create or replace function public.status_pin_ortu()
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
  select exists (
    select 1
    from public.household_guardians g
    join private.household_pins p on p.household_id = g.household_id
    where g.user_id = auth.uid()
  );
$$;

revoke all on function public.status_pin_ortu() from public, anon;
grant execute on function public.status_pin_ortu() to authenticated;

commit;
