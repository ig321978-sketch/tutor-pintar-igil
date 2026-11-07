-- PIN orang tua 6 digit, hanya di dalam aplikasi.
-- Tidak ada OTP ponsel, email, atau WhatsApp.
-- parent_pin_hash memakai bcrypt dan tinggal di skema private.

create table if not exists private.household_pins (
  household_id uuid primary key references public.households (id) on delete cascade,
  parent_pin_hash text not null,
  failed_attempts int not null default 0 check (failed_attempts >= 0),
  locked_until timestamptz
);

alter table private.household_pins enable row level security;
revoke all on private.household_pins from public, anon, authenticated;

create or replace function private.pasang_hash_pin(p_pin text)
returns text
language plpgsql
security definer
set search_path = private, public, extensions
as $$
begin
  if p_pin is null or p_pin !~ '^[0-9]{6}$' then
    raise exception 'PIN harus 6 digit';
  end if;
  return crypt(p_pin, gen_salt('bf', 10));
end;
$$;

create or replace function private.cocokkan_pin(p_household uuid, p_pin text)
returns text
language plpgsql
security definer
set search_path = private, public, extensions
as $$
declare
  tersimpan text;
  gagal int;
  kunci timestamptz;
begin
  if p_pin is null or p_pin !~ '^[0-9]{6}$' then
    return 'format_salah';
  end if;

  select parent_pin_hash, failed_attempts, locked_until
    into tersimpan, gagal, kunci
  from private.household_pins
  where household_id = p_household
  for update;

  if tersimpan is null then
    return 'belum_dipasang';
  end if;
  if kunci is not null and kunci > now() then
    return 'terkunci';
  end if;

  if tersimpan = crypt(p_pin, tersimpan) then
    update private.household_pins
    set failed_attempts = 0, locked_until = null
    where household_id = p_household;
    return 'cocok';
  end if;

  gagal := gagal + 1;
  if gagal >= 5 then
    update private.household_pins
    set failed_attempts = 0, locked_until = now() + interval '15 minutes'
    where household_id = p_household;
    return 'terkunci';
  end if;

  update private.household_pins
  set failed_attempts = gagal
  where household_id = p_household;
  return 'tidak_cocok';
end;
$$;

create or replace function public.pasang_pin_ortu(p_pin text)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
declare
  rumah uuid;
begin
  if auth.uid() is null then
    raise exception 'Masuk diperlukan';
  end if;
  select household_id into rumah
  from public.household_guardians
  where user_id = auth.uid();
  if rumah is null then
    raise exception 'Rumah belum dibuat';
  end if;
  if exists (select 1 from private.household_pins where household_id = rumah) then
    raise exception 'PIN sudah dipasang';
  end if;
  insert into private.household_pins (household_id, parent_pin_hash)
  values (rumah, private.pasang_hash_pin(p_pin));
end;
$$;

create or replace function public.ganti_pin_ortu(p_pin_lama text, p_pin_baru text)
returns jsonb
language plpgsql
security definer
set search_path = public, private
as $$
declare
  rumah uuid;
  hasil text;
begin
  select household_id into rumah
  from public.household_guardians
  where user_id = auth.uid();
  if rumah is null then
    raise exception 'Rumah belum dibuat';
  end if;
  hasil := private.cocokkan_pin(rumah, p_pin_lama);
  if hasil <> 'cocok' then
    return jsonb_build_object('berhasil', false, 'alasan', hasil);
  end if;
  update private.household_pins
  set parent_pin_hash = private.pasang_hash_pin(p_pin_baru),
      failed_attempts = 0,
      locked_until = null
  where household_id = rumah;
  return jsonb_build_object('berhasil', true);
end;
$$;

create or replace function public.atur_rekening_ortu(
  p_pin text,
  p_holder_name text,
  p_gateway_payout_ref text
)
returns jsonb
language plpgsql
security definer
set search_path = public, private
as $$
declare
  rumah uuid;
  hasil text;
begin
  select household_id into rumah
  from public.household_guardians
  where user_id = auth.uid();
  if rumah is null then
    raise exception 'Rumah belum dibuat';
  end if;
  if (p_holder_name is null or char_length(btrim(p_holder_name)) = 0)
     and (p_gateway_payout_ref is null or char_length(btrim(p_gateway_payout_ref)) = 0) then
    raise exception 'Tidak ada perubahan rekening';
  end if;
  hasil := private.cocokkan_pin(rumah, p_pin);
  if hasil <> 'cocok' then
    return jsonb_build_object('berhasil', false, 'alasan', hasil);
  end if;
  update public.households
  set payout_holder_name = coalesce(nullif(btrim(p_holder_name), ''), payout_holder_name),
      gateway_payout_ref = coalesce(nullif(btrim(p_gateway_payout_ref), ''), gateway_payout_ref)
  where id = rumah;
  return jsonb_build_object('berhasil', true);
end;
$$;

create or replace function public.catat_rujukan_gateway(p_gateway_payout_ref text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  raise exception 'Pengaturan rekening memakai PIN di dalam aplikasi';
end;
$$;

revoke all on function private.pasang_hash_pin(text) from public, anon, authenticated;
revoke all on function private.cocokkan_pin(uuid, text) from public, anon, authenticated;

revoke all on function public.pasang_pin_ortu(text) from public, anon;
revoke all on function public.ganti_pin_ortu(text, text) from public, anon;
revoke all on function public.atur_rekening_ortu(text, text, text) from public, anon;
grant execute on function public.pasang_pin_ortu(text) to authenticated;
grant execute on function public.ganti_pin_ortu(text, text) to authenticated;
grant execute on function public.atur_rekening_ortu(text, text, text) to authenticated;
