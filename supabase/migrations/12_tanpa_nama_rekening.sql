-- Pendaftaran tidak lagi meminta nama pemilik rekening.
-- Nama itu baru dikumpulkan saat beasiswa akan dicairkan (lewat payment gateway).
-- Kolom tetap not null, tetapi boleh berisi teks kosong. payout_ready tetap false
-- selama nama kosong (lihat pengecekan char_length(btrim(...)) > 0 di fungsi penilaian sapaan).

alter table public.households drop constraint if exists payout_holder_tidak_kosong;

create or replace function public.buat_rumah(p_payout_holder_name text default '')
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  kode text;
  rumah uuid;
begin
  if auth.uid() is null then
    raise exception 'Masuk diperlukan';
  end if;
  if exists (select 1 from public.household_guardians where user_id = auth.uid()) then
    raise exception 'Akun ini sudah punya rumah';
  end if;
  kode := encode(gen_random_bytes(6), 'hex');
  insert into public.households (invite_code, payout_holder_name)
  values (kode, coalesce(btrim(p_payout_holder_name), ''))
  returning id into rumah;
  insert into public.household_guardians (household_id, user_id)
  values (rumah, auth.uid());
  return kode;
end;
$$;
