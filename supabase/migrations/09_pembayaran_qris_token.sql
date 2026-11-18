-- Pembayaran langganan QRIS (Midtrans Core API) dan token beasiswa apresiasi 18%.
-- Harga tetap Rp 50.000. Tidak ada kolom kuota dan tidak ada penolakan karena jumlah siswa.
-- QRIS membuka satu bulan kalender WIB: lunas tanggal 1–25 untuk bulan berjalan (langsung),
-- lunas tanggal 26–akhir bulan untuk bulan berikutnya (starts_at = tanggal 1 pukul 00:00 WIB).
-- Token beasiswa 18% tetap menambah 30 hari. Materi dan Simulasi tidak melewati tabel ini.
-- Berkas ini aman dijalankan ulang: kolom starts_at ditambahkan bila belum ada, fungsi diganti.
--
-- Setiap pelunasan QRIS Rp 50.000:
--   gross_amount            50000 (100%)
--   tier1_300k_cash_pool    36000 (72% — cadangan 12% pemenang tunai @ Rp 300.000)
--   tier2_50k_token_pool     9000 (18% — cadangan 18% pemenang token @ Rp 50.000)
--   operational_gross        5000 (10%)
--   mdr_fee_estimate          350 (0,7% QRIS, dipotong dari pos operasional)
--   operational_net          4650
-- Token beasiswa 18%: MDR 0, operational_net 5000.
-- Token menghabiskan Rp 50.000 dari sisa tier2 bulan sumber, lalu membukukan ulang
-- Rp 45.000 ke kolam beasiswa bulan berikutnya (36.000 + 9.000) dan Rp 5.000 ke operasional.
--
-- Klien browser hanya SELECT. Pelunasan dan penebusan token hanya lewat RPC SECURITY DEFINER
-- yang dieksekusi service_role (webhook / tugas akhir bulan), bukan peran authenticated.

create extension if not exists pgcrypto;

-- Sekolah komunitas. Siswa tanpa sekolah menempel pada baris igil-mandiri saat order dibuat.
create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now(),
  constraint nama_sekolah_tidak_kosong check (char_length(btrim(name)) > 0),
  constraint slug_sekolah check (slug ~ '^[a-z0-9-]{2,64}$')
);

insert into public.schools (id, slug, name)
values ('a0000000-0000-4000-8000-000000000018', 'igil-mandiri', 'IGIL Mandiri')
on conflict (id) do nothing;

alter table public.students
  add column if not exists school_id uuid references public.schools (id) on delete set null;

create index if not exists students_sekolah
  on public.students (school_id)
  where school_id is not null;

-- Satu baris per anak. Gembok Latihan, Ujian, Praktikum terbuka hanya bila
-- status = ACTIVE dan now() >= starts_at dan now() <= expires_at.
create table if not exists public.subscriptions (
  student_id uuid primary key references public.students (id) on delete cascade,
  status text not null default 'INACTIVE',
  started_at timestamptz not null default now(),
  starts_at timestamptz not null default now(),
  expires_at timestamptz not null default now(),
  last_payment_method text not null,
  updated_at timestamptz not null default now(),
  constraint status_langganan check (status in ('INACTIVE', 'ACTIVE', 'EXPIRED')),
  constraint metode_langganan check (last_payment_method in ('QRIS', 'SCHOLARSHIP_TOKEN_18PCT'))
);

alter table public.subscriptions
  add column if not exists starts_at timestamptz;

update public.subscriptions
set starts_at = started_at
where starts_at is null;

alter table public.subscriptions
  alter column starts_at set default now();

alter table public.subscriptions
  alter column starts_at set not null;

comment on column public.subscriptions.starts_at is
  'Awal jendela evaluasi WIB. Tab terbuka bila status ACTIVE dan now() berada di antara starts_at dan expires_at, inklusif.';

create table if not exists public.payment_orders (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  student_id uuid not null references public.students (id) on delete cascade,
  school_id uuid not null references public.schools (id) on delete restrict,
  household_id uuid not null references public.households (id) on delete cascade,
  gross_amount integer not null default 50000,
  payment_method text not null,
  status text not null default 'pending',
  transaction_status text,
  fraud_status text,
  consent_akad boolean not null default false,
  consent_pdp boolean not null default false,
  consent_timestamp timestamptz not null default now(),
  consent_sumber text not null default 'WALI_CHECKOUT',
  qr_string text,
  midtrans_transaction_id text,
  ledger_applied boolean not null default false,
  settled_at timestamptz,
  period_month date,
  source_period_month date,
  tier1_300k_cash_pool integer,
  tier2_50k_token_pool integer,
  operational_gross integer,
  mdr_fee_estimate integer,
  operational_net integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint nominal_tetap check (gross_amount = 50000),
  constraint metode_bayar check (payment_method in ('QRIS', 'SCHOLARSHIP_TOKEN_18PCT')),
  constraint status_bayar check (status in (
    'pending', 'settlement', 'expire', 'cancel', 'deny', 'failure', 'refund'
  )),
  constraint sumber_persetujuan check (consent_sumber in ('WALI_CHECKOUT', 'SISTEM_TOKEN_18')),
  constraint persetujuan_wali check (
    consent_sumber = 'SISTEM_TOKEN_18' or (consent_akad and consent_pdp)
  ),
  constraint pembagian_saat_lunas check (
    not ledger_applied or (
      tier1_300k_cash_pool = 36000
      and tier2_50k_token_pool = 9000
      and operational_gross = 5000
      and tier1_300k_cash_pool + tier2_50k_token_pool + operational_gross = gross_amount
      and operational_net = operational_gross - mdr_fee_estimate
      and (
        (payment_method = 'QRIS' and mdr_fee_estimate = 350 and operational_net = 4650)
        or (payment_method = 'SCHOLARSHIP_TOKEN_18PCT' and mdr_fee_estimate = 0 and operational_net = 5000)
      )
    )
  )
);

create index if not exists payment_orders_siswa
  on public.payment_orders (student_id, created_at desc);

comment on table public.payment_orders is
  'Order langganan Rp 50.000. consent_timestamp diisi saat order QRIS dibuat. Ledger hanya sekali (ledger_applied).';

-- Saldo kolam per sekolah per bulan. gross tidak pernah dikurangi.
-- tier2_50k_token_pool adalah SISA cadangan. Pengeluaran pindah ke tier2_token_redeemed
-- supaya identitas gross = tier1 + sisa tier2 + yang sudah ditebus + operasional tetap benar.
create table if not exists public.school_monthly_pools (
  school_id uuid not null references public.schools (id) on delete restrict,
  period_month date not null,
  gross_amount bigint not null default 0,
  qris_cash_gross bigint not null default 0,
  token_rebook_gross bigint not null default 0,
  tier1_300k_cash_pool bigint not null default 0,
  tier2_50k_token_pool bigint not null default 0,
  tier2_token_redeemed bigint not null default 0,
  operational_gross bigint not null default 0,
  mdr_fee_estimate bigint not null default 0,
  operational_net bigint not null default 0,
  qris_count integer not null default 0,
  token_count integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (school_id, period_month),
  constraint kolam_nonnegatif check (
    gross_amount >= 0 and qris_cash_gross >= 0 and token_rebook_gross >= 0
    and tier1_300k_cash_pool >= 0 and tier2_50k_token_pool >= 0 and tier2_token_redeemed >= 0
    and operational_gross >= 0 and mdr_fee_estimate >= 0 and operational_net >= 0
    and qris_count >= 0 and token_count >= 0
  ),
  constraint kolam_seimbang check (
    qris_cash_gross + token_rebook_gross = gross_amount
    and tier1_300k_cash_pool + tier2_50k_token_pool + tier2_token_redeemed + operational_gross = gross_amount
    and operational_net + mdr_fee_estimate = operational_gross
  )
);

create table if not exists public.scholarship_awards (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  school_id uuid not null references public.schools (id) on delete restrict,
  period_month date not null,
  target_period_month date,
  award_tier text not null,
  amount integer not null,
  status text not null,
  payment_order_id uuid references public.payment_orders (id) on delete restrict,
  notice_id uuid references public.account_notices (id) on delete set null,
  proof_code text not null unique,
  created_at timestamptz not null default now(),
  unique (student_id, period_month, award_tier),
  constraint jenis_hadiah check (
    (award_tier = 'TIER1_CASH_300K' and amount = 300000)
    or (award_tier = 'TIER2_TOKEN_50K' and amount = 50000)
  ),
  constraint status_hadiah check (status in ('pending', 'redeemed', 'paid'))
);

create table if not exists private.payment_events (
  id bigint generated always as identity primary key,
  order_id text not null,
  received_at timestamptz not null default now(),
  signature_ok boolean not null,
  payload jsonb not null
);

comment on table private.payment_events is
  'Jejak notifikasi yang tandatangannya sah. Tidak dibaca klien.';

create index if not exists account_notices_beasiswa_belum_dibaca
  on public.account_notices (household_id, created_at desc)
  where kind = 'beasiswa_apresiasi_18' and seen_at is null;

-- ---------------------------------------------------------------------------
-- Pembukuan kredit (bukan debit). Tiap pemanggilan menjaga pecahan 72/18/10.
-- ---------------------------------------------------------------------------

create or replace function private.tambah_kolam(
  p_school uuid,
  p_month date,
  p_gross bigint,
  p_cash bigint,
  p_rebook bigint,
  p_tier1 bigint,
  p_tier2 bigint,
  p_ops bigint,
  p_mdr bigint,
  p_net bigint,
  p_qris integer,
  p_token integer
) returns void
language plpgsql
security definer
set search_path = public
as $fungsi$
begin
  if p_gross < 0 or p_cash < 0 or p_rebook < 0 or p_tier1 < 0 or p_tier2 < 0
     or p_ops < 0 or p_mdr < 0 or p_net < 0 or p_qris < 0 or p_token < 0 then
    raise exception 'Pembagian tidak seimbang';
  end if;
  if p_tier1 + p_tier2 + p_ops <> p_gross
     or p_cash + p_rebook <> p_gross
     or p_net + p_mdr <> p_ops then
    raise exception 'Pembagian tidak seimbang';
  end if;

  insert into public.school_monthly_pools as p (
    school_id, period_month,
    gross_amount, qris_cash_gross, token_rebook_gross,
    tier1_300k_cash_pool, tier2_50k_token_pool,
    operational_gross, mdr_fee_estimate, operational_net,
    qris_count, token_count
  ) values (
    p_school, p_month,
    p_gross, p_cash, p_rebook,
    p_tier1, p_tier2,
    p_ops, p_mdr, p_net,
    p_qris, p_token
  )
  on conflict (school_id, period_month) do update set
    gross_amount = p.gross_amount + excluded.gross_amount,
    qris_cash_gross = p.qris_cash_gross + excluded.qris_cash_gross,
    token_rebook_gross = p.token_rebook_gross + excluded.token_rebook_gross,
    tier1_300k_cash_pool = p.tier1_300k_cash_pool + excluded.tier1_300k_cash_pool,
    tier2_50k_token_pool = p.tier2_50k_token_pool + excluded.tier2_50k_token_pool,
    operational_gross = p.operational_gross + excluded.operational_gross,
    mdr_fee_estimate = p.mdr_fee_estimate + excluded.mdr_fee_estimate,
    operational_net = p.operational_net + excluded.operational_net,
    qris_count = p.qris_count + excluded.qris_count,
    token_count = p.token_count + excluded.token_count,
    updated_at = now();
end;
$fungsi$;

create or replace function private.perpanjang_langganan(p_student uuid, p_metode text)
returns timestamptz
language plpgsql
security definer
set search_path = public
as $fungsi$
declare
  v_expires timestamptz;
begin
  if p_metode not in ('QRIS', 'SCHOLARSHIP_TOKEN_18PCT') then
    raise exception 'Metode pembayaran tidak dikenal';
  end if;
  insert into public.subscriptions as s (student_id, status, started_at, starts_at, expires_at, last_payment_method)
  values (p_student, 'ACTIVE', now(), now(), now() + interval '30 days', p_metode)
  on conflict (student_id) do update set
    status = 'ACTIVE',
    started_at = case when s.expires_at > now() then s.started_at else excluded.started_at end,
    starts_at = case when s.expires_at > now() then s.starts_at else excluded.starts_at end,
    expires_at = case
      when s.expires_at > now() then s.expires_at + interval '30 days'
      else excluded.expires_at
    end,
    last_payment_method = excluded.last_payment_method,
    updated_at = now()
  returning expires_at into v_expires;
  return v_expires;
end;
$fungsi$;

-- Tidak ada batas kuota siswa. Pendaftar baru dan perpanjangan selalu diterima.
create or replace function public.buat_order_qris(
  p_student uuid,
  p_consent_akad boolean,
  p_consent_pdp boolean
) returns jsonb
language plpgsql
security definer
set search_path = public
as $fungsi$
declare
  v_house uuid;
  v_school uuid;
  v_order_id text;
  v_ada text;
  v_qr text;
  v_saat timestamptz;
  v_mandiri uuid := 'a0000000-0000-4000-8000-000000000018';
begin
  if auth.uid() is null then
    raise exception 'Masuk diperlukan';
  end if;
  if not coalesce(p_consent_akad, false) or not coalesce(p_consent_pdp, false) then
    raise exception 'Persetujuan wali belum lengkap';
  end if;
  if not public.mengurus_anak(p_student) and not public.adalah_admin() then
    raise exception 'Anak tidak ada di rumah';
  end if;

  select s.household_id, coalesce(s.school_id, v_mandiri)
    into v_house, v_school
  from public.students s
  where s.id = p_student;
  if not found then
    raise exception 'Anak tidak ada di rumah';
  end if;

  select o.order_id, o.qr_string, o.consent_timestamp
    into v_ada, v_qr, v_saat
  from public.payment_orders o
  where o.student_id = p_student
    and o.payment_method = 'QRIS'
    and o.status = 'pending'
    and o.ledger_applied = false
    and o.created_at > now() - interval '24 hours'
  order by o.created_at desc
  limit 1;

  if v_ada is not null then
    return jsonb_build_object(
      'order_id', v_ada,
      'student_id', p_student,
      'school_id', v_school,
      'gross_amount', 50000,
      'status', 'pending',
      'qr_string', v_qr,
      'reused', true,
      'consent_timestamp', v_saat
    );
  end if;

  v_order_id := 'IGIL' || replace(gen_random_uuid()::text, '-', '');
  insert into public.payment_orders (
    order_id, student_id, school_id, household_id,
    gross_amount, payment_method, status,
    consent_akad, consent_pdp, consent_timestamp, consent_sumber
  ) values (
    v_order_id, p_student, v_school, v_house,
    50000, 'QRIS', 'pending',
    true, true, now(), 'WALI_CHECKOUT'
  )
  returning consent_timestamp into v_saat;

  return jsonb_build_object(
    'order_id', v_order_id,
    'student_id', p_student,
    'school_id', v_school,
    'gross_amount', 50000,
    'status', 'pending',
    'qr_string', null,
    'reused', false,
    'consent_timestamp', v_saat
  );
end;
$fungsi$;

create or replace function public.lengkapi_qris_pending(
  p_order_id text,
  p_qr_string text,
  p_transaction_id text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $fungsi$
declare
  v public.payment_orders%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Masuk diperlukan';
  end if;
  if p_qr_string is null or char_length(p_qr_string) < 8 or char_length(p_qr_string) > 2048 then
    raise exception 'Muatan QRIS tidak valid';
  end if;

  select * into v
  from public.payment_orders
  where order_id = p_order_id
  for update;
  if not found then
    raise exception 'Order tidak ditemukan';
  end if;
  if not public.mengurus_anak(v.student_id) and not public.adalah_admin() then
    raise exception 'Anak tidak ada di rumah';
  end if;
  if v.status <> 'pending' or v.ledger_applied then
    raise exception 'QRIS order ini sudah terbit';
  end if;
  if v.qr_string is not null and v.qr_string <> p_qr_string then
    raise exception 'QRIS order ini sudah terbit';
  end if;

  update public.payment_orders
  set qr_string = p_qr_string,
      midtrans_transaction_id = coalesce(p_transaction_id, midtrans_transaction_id),
      updated_at = now()
  where id = v.id;

  return jsonb_build_object('order_id', p_order_id, 'tersimpan', true);
end;
$fungsi$;

create or replace function public.status_langganan_anak(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $fungsi$
declare
  v_status text;
  v_starts timestamptz;
  v_expires timestamptz;
  v_metode text;
  v_aktif boolean;
  v_menunggu boolean;
begin
  if auth.uid() is null then
    raise exception 'Masuk diperlukan';
  end if;
  if not public.mengurus_anak(p_student) and not public.adalah_admin() then
    raise exception 'Anak tidak ada di rumah';
  end if;

  select s.status, s.starts_at, s.expires_at, s.last_payment_method
    into v_status, v_starts, v_expires, v_metode
  from public.subscriptions s
  where s.student_id = p_student;

  v_aktif := v_status = 'ACTIVE'
    and v_starts is not null
    and v_expires is not null
    and now() >= v_starts
    and now() <= v_expires;
  v_menunggu := v_status = 'ACTIVE'
    and v_starts is not null
    and now() < v_starts
    and v_expires >= v_starts;
  return jsonb_build_object(
    'aktif', coalesce(v_aktif, false),
    'menunggu', coalesce(v_menunggu, false),
    'status', coalesce(v_status, 'INACTIVE'),
    'starts_at', v_starts,
    'expires_at', v_expires,
    'metode', v_metode
  );
end;
$fungsi$;

-- Pelunasan atomik dan idempoten. Hanya order QRIS. Token tidak lewat fungsi ini.
-- p_saat kosong = now(). Mode mock mengisi p_saat agar tanggal 1–25 dan 26–31 bisa diuji.
-- Webhook produksi tidak mengirim p_saat. Fungsi ini hanya untuk service_role.
drop function if exists public.process_igil_qris_settlement(text, text, text, integer, text, jsonb);

create or replace function public.process_igil_qris_settlement(
  p_order_id text,
  p_transaction_status text,
  p_fraud_status text,
  p_gross_amount integer,
  p_midtrans_transaction_id text default null,
  p_payload jsonb default null,
  p_saat timestamptz default null
) returns jsonb
language plpgsql
security definer
set search_path = public
as $fungsi$
declare
  v public.payment_orders%rowtype;
  v_status text := lower(coalesce(p_transaction_status, ''));
  v_fraud text := lower(coalesce(p_fraud_status, ''));
  v_lunas boolean;
  v_expires timestamptz;
  v_mulai timestamptz;
  v_bulan date;
  v_saat timestamptz;
  v_wib timestamp;
  v_hari integer;
  v_status_baru text;
begin
  if p_payload is not null and pg_column_size(p_payload) < 16000 then
    insert into private.payment_events (order_id, signature_ok, payload)
    values (coalesce(p_order_id, ''), true, p_payload);
  end if;

  select * into v
  from public.payment_orders
  where order_id = p_order_id
  for update;

  if not found then
    return jsonb_build_object('applied', false, 'idempotent', false, 'alasan', 'order_tidak_dikenal');
  end if;

  if v.ledger_applied then
    select s.starts_at, s.expires_at into v_mulai, v_expires
    from public.subscriptions s
    where s.student_id = v.student_id;
    update public.payment_orders
    set transaction_status = v_status,
        fraud_status = nullif(v_fraud, ''),
        updated_at = now()
    where id = v.id;
    return jsonb_build_object(
      'applied', true,
      'idempotent', true,
      'order_id', v.order_id,
      'student_id', v.student_id,
      'starts_at', v_mulai,
      'expires_at', v_expires,
      'menunggu', v_mulai is not null and v_mulai > now()
    );
  end if;

  if v.payment_method <> 'QRIS' then
    return jsonb_build_object('applied', false, 'idempotent', false, 'alasan', 'bukan_qris');
  end if;

  v_lunas := v_status in ('settlement', 'capture') and v_fraud = 'accept';

  if v_lunas and (p_gross_amount <> 50000 or v.gross_amount <> 50000) then
    return jsonb_build_object('applied', false, 'idempotent', false, 'alasan', 'nominal');
  end if;

  if not v_lunas then
    v_status_baru := case
      when v_status in ('expire', 'cancel', 'deny', 'failure', 'refund') then v_status
      when v_status = 'partial_refund' then 'refund'
      else v.status
    end;
    update public.payment_orders
    set status = v_status_baru,
        transaction_status = v_status,
        fraud_status = nullif(v_fraud, ''),
        midtrans_transaction_id = coalesce(p_midtrans_transaction_id, midtrans_transaction_id),
        updated_at = now()
    where id = v.id;
    return jsonb_build_object('applied', false, 'idempotent', false, 'alasan', 'belum_lunas');
  end if;

  if 36000 + 9000 + 5000 <> 50000 or 5000 - 350 <> 4650 then
    raise exception 'Pembagian tidak seimbang';
  end if;

  -- Cut-off WIB. Tanggal 1–25: kolam bulan berjalan, akses langsung sampai akhir bulan 23:59:59.
  -- Tanggal 26–akhir: kolam bulan berikutnya, starts_at = tanggal 1 pukul 00:00:00 WIB.
  -- Seluruh Rp 50.000 (45.000 beasiswa + 5.000 operasional) masuk ke period_month yang sama.
  v_saat := coalesce(p_saat, now());
  v_wib := v_saat at time zone 'Asia/Jakarta';
  v_hari := extract(day from v_wib)::integer;
  if v_hari <= 25 then
    v_bulan := date_trunc('month', v_wib)::date;
    v_mulai := v_saat;
    v_expires := (date_trunc('month', v_wib) + interval '1 month' - interval '1 second') at time zone 'Asia/Jakarta';
  else
    v_bulan := (date_trunc('month', v_wib) + interval '1 month')::date;
    v_mulai := (date_trunc('month', v_wib) + interval '1 month') at time zone 'Asia/Jakarta';
    v_expires := (date_trunc('month', v_wib) + interval '2 month' - interval '1 second') at time zone 'Asia/Jakarta';
  end if;

  perform private.tambah_kolam(
    v.school_id, v_bulan,
    50000, 50000, 0,
    36000, 9000, 5000,
    350, 4650,
    1, 0
  );

  insert into public.subscriptions as s (student_id, status, started_at, starts_at, expires_at, last_payment_method)
  values (v.student_id, 'ACTIVE', v_mulai, v_mulai, v_expires, 'QRIS')
  on conflict (student_id) do update set
    status = 'ACTIVE',
    starts_at = excluded.starts_at,
    expires_at = excluded.expires_at,
    last_payment_method = 'QRIS',
    updated_at = now()
  returning starts_at, expires_at into v_mulai, v_expires;

  update public.payment_orders
  set status = 'settlement',
      transaction_status = v_status,
      fraud_status = 'accept',
      midtrans_transaction_id = coalesce(p_midtrans_transaction_id, midtrans_transaction_id),
      ledger_applied = true,
      settled_at = v_saat,
      period_month = v_bulan,
      tier1_300k_cash_pool = 36000,
      tier2_50k_token_pool = 9000,
      operational_gross = 5000,
      mdr_fee_estimate = 350,
      operational_net = 4650,
      updated_at = now()
  where id = v.id;

  return jsonb_build_object(
    'applied', true,
    'idempotent', false,
    'order_id', v.order_id,
    'student_id', v.student_id,
    'school_id', v.school_id,
    'starts_at', v_mulai,
    'expires_at', v_expires,
    'menunggu', v_mulai > now(),
    'period_month', v_bulan,
    'gross_amount', 50000,
    'tier1_300k_cash_pool', 36000,
    'tier2_50k_token_pool', 9000,
    'operational_gross', 5000,
    'mdr_fee_estimate', 350,
    'operational_net', 4650
  );
end;
$fungsi$;

-- Akhir bulan: daftar pemenang 18% menerima +30 hari dan pembukuan ulang token.
-- Satu panggilan = satu transaksi. Cadangan kurang membuat seluruh panggilan batal.
create or replace function public.redeem_tier2_scholarship_tokens(
  p_source_month date,
  p_winners uuid[]
) returns jsonb
language plpgsql
security definer
set search_path = public
as $fungsi$
declare
  v_month date;
  v_next date;
  v_student uuid;
  v_school uuid;
  v_house uuid;
  v_kerja jsonb := '[]'::jsonb;
  v_hasil jsonb := '[]'::jsonb;
  v_sudah integer := 0;
  v_baru integer := 0;
  v_distinct integer;
  v_ketemu integer;
  r record;
  v_award uuid;
  v_notice uuid;
  v_order uuid;
  v_order_id text;
  v_expires timestamptz;
  v_bukti text;
  v_mandiri uuid := 'a0000000-0000-4000-8000-000000000018';
  v_teks text := 'Selamat! Kamu meraih Beasiswa Apresiasi IGIL — Langganan Bulan Depan Gratis (Aktif Otomatis)';
begin
  if p_source_month is null then
    raise exception 'Bulan sumber kosong';
  end if;
  if p_winners is null then
    raise exception 'Daftar pemenang kosong';
  end if;

  v_month := date_trunc('month', p_source_month::timestamp)::date;
  v_next := (v_month + interval '1 month')::date;

  select count(*) into v_distinct
  from (select distinct x from unnest(p_winners) as x where x is not null) q;

  if v_distinct = 0 then
    return jsonb_build_object(
      'source_month', v_month,
      'target_month', v_next,
      'diproses', 0,
      'sudah_ada', 0,
      'pemenang', '[]'::jsonb
    );
  end if;

  for v_student in
    select s.id
    from public.students s
    where s.id = any (p_winners)
    order by s.id
    for update
  loop
    null;
  end loop;

  select count(*) into v_ketemu
  from public.students s
  where s.id = any (p_winners);
  if v_ketemu < v_distinct then
    raise exception 'Siswa tidak ditemukan';
  end if;

  for v_student in
    select x
    from (select distinct unnest(p_winners) as x) q
    where x is not null
    order by x
  loop
    if exists (
      select 1 from public.scholarship_awards a
      where a.student_id = v_student
        and a.period_month = v_month
        and a.award_tier = 'TIER2_TOKEN_50K'
    ) then
      v_sudah := v_sudah + 1;
      v_hasil := v_hasil || jsonb_build_array(jsonb_build_object(
        'student_id', v_student,
        'status', 'sudah_ada'
      ));
      continue;
    end if;

    select s.household_id, coalesce(s.school_id, v_mandiri)
      into v_house, v_school
    from public.students s
    where s.id = v_student;

    v_kerja := v_kerja || jsonb_build_array(jsonb_build_object(
      'student_id', v_student,
      'school_id', v_school,
      'household_id', v_house
    ));
  end loop;

  for r in
    select (elem->>'school_id')::uuid as school_id, count(*)::integer as n
    from jsonb_array_elements(v_kerja) elem
    group by 1
    order by 1
  loop
    insert into public.school_monthly_pools (school_id, period_month)
    values (r.school_id, v_month)
    on conflict (school_id, period_month) do nothing;
    insert into public.school_monthly_pools (school_id, period_month)
    values (r.school_id, v_next)
    on conflict (school_id, period_month) do nothing;
  end loop;

  for r in
    select school_id, period_month
    from (
      select distinct (elem->>'school_id')::uuid as school_id, v_month as period_month
      from jsonb_array_elements(v_kerja) elem
      union
      select distinct (elem->>'school_id')::uuid, v_next
      from jsonb_array_elements(v_kerja) elem
    ) urut
    order by school_id, period_month
  loop
    perform 1
    from public.school_monthly_pools
    where school_id = r.school_id and period_month = r.period_month
    for update;
  end loop;

  for r in
    select (elem->>'school_id')::uuid as school_id, count(*)::integer as n
    from jsonb_array_elements(v_kerja) elem
    group by 1
    order by 1
  loop
    if coalesce((
      select tier2_50k_token_pool
      from public.school_monthly_pools
      where school_id = r.school_id and period_month = v_month
    ), 0) < r.n::bigint * 50000 then
      raise exception 'Cadangan token 18%% tidak cukup untuk sekolah %', r.school_id;
    end if;
  end loop;

  for r in
    select
      (elem->>'student_id')::uuid as student_id,
      (elem->>'school_id')::uuid as school_id,
      (elem->>'household_id')::uuid as household_id
    from jsonb_array_elements(v_kerja) elem
    order by 1
  loop
    v_bukti := 'IGIL-BEA-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10));
    v_award := null;
    insert into public.scholarship_awards (
      student_id, school_id, period_month, target_period_month,
      award_tier, amount, status, proof_code
    ) values (
      r.student_id, r.school_id, v_month, v_next,
      'TIER2_TOKEN_50K', 50000, 'redeemed', v_bukti
    )
    on conflict (student_id, period_month, award_tier) do nothing
    returning id into v_award;

    if v_award is null then
      v_sudah := v_sudah + 1;
      v_hasil := v_hasil || jsonb_build_array(jsonb_build_object(
        'student_id', r.student_id,
        'status', 'sudah_ada'
      ));
      continue;
    end if;

    update public.school_monthly_pools
    set tier2_50k_token_pool = tier2_50k_token_pool - 50000,
        tier2_token_redeemed = tier2_token_redeemed + 50000,
        updated_at = now()
    where school_id = r.school_id
      and period_month = v_month
      and tier2_50k_token_pool >= 50000;
    if not found then
      raise exception 'Cadangan token 18%% tidak cukup untuk sekolah %', r.school_id;
    end if;

    v_order_id := 'IGILTKN' || replace(gen_random_uuid()::text, '-', '');
    insert into public.payment_orders (
      order_id, student_id, school_id, household_id,
      gross_amount, payment_method, status,
      transaction_status, fraud_status,
      consent_akad, consent_pdp, consent_timestamp, consent_sumber,
      ledger_applied, settled_at, period_month, source_period_month,
      tier1_300k_cash_pool, tier2_50k_token_pool, operational_gross,
      mdr_fee_estimate, operational_net
    ) values (
      v_order_id, r.student_id, r.school_id, r.household_id,
      50000, 'SCHOLARSHIP_TOKEN_18PCT', 'settlement',
      'settlement', 'accept',
      false, false, now(), 'SISTEM_TOKEN_18',
      true, now(), v_next, v_month,
      36000, 9000, 5000,
      0, 5000
    )
    returning id into v_order;

    perform private.tambah_kolam(
      r.school_id, v_next,
      50000, 0, 50000,
      36000, 9000, 5000,
      0, 5000,
      0, 1
    );
    v_expires := private.perpanjang_langganan(r.student_id, 'SCHOLARSHIP_TOKEN_18PCT');

    insert into public.account_notices (household_id, student_id, kind, body)
    values (r.household_id, r.student_id, 'beasiswa_apresiasi_18', v_teks)
    returning id into v_notice;

    update public.scholarship_awards
    set payment_order_id = v_order,
        notice_id = v_notice
    where id = v_award;

    v_baru := v_baru + 1;
    v_hasil := v_hasil || jsonb_build_array(jsonb_build_object(
      'student_id', r.student_id,
      'status', 'diberikan',
      'order_id', v_order_id,
      'expires_at', v_expires,
      'notice_id', v_notice,
      'proof_code', v_bukti
    ));
  end loop;

  return jsonb_build_object(
    'source_month', v_month,
    'target_month', v_next,
    'diproses', v_baru,
    'sudah_ada', v_sudah,
    'pemenang', v_hasil
  );
end;
$fungsi$;

revoke all on function private.tambah_kolam(uuid, date, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, integer, integer) from public, anon, authenticated;
revoke all on function private.perpanjang_langganan(uuid, text) from public, anon, authenticated;

revoke all on function public.buat_order_qris(uuid, boolean, boolean) from public, anon;
revoke all on function public.lengkapi_qris_pending(text, text, text) from public, anon;
revoke all on function public.status_langganan_anak(uuid) from public, anon;
grant execute on function public.buat_order_qris(uuid, boolean, boolean) to authenticated;
grant execute on function public.lengkapi_qris_pending(text, text, text) to authenticated;
grant execute on function public.status_langganan_anak(uuid) to authenticated;

revoke all on function public.process_igil_qris_settlement(text, text, text, integer, text, jsonb, timestamptz) from public, anon, authenticated;
revoke all on function public.redeem_tier2_scholarship_tokens(date, uuid[]) from public, anon, authenticated;

do $izin$
begin
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    execute 'grant execute on function public.process_igil_qris_settlement(text, text, text, integer, text, jsonb, timestamptz) to service_role';
    execute 'grant execute on function public.redeem_tier2_scholarship_tokens(date, uuid[]) to service_role';
    execute 'grant select, insert on private.payment_events to service_role';
  end if;
end
$izin$;

alter table public.schools enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payment_orders enable row level security;
alter table public.school_monthly_pools enable row level security;
alter table public.scholarship_awards enable row level security;
alter table private.payment_events enable row level security;

drop policy if exists "sekolah terbaca" on public.schools;
create policy "sekolah terbaca"
  on public.schools for select to authenticated
  using (true);

drop policy if exists "wali baca langganan" on public.subscriptions;
create policy "wali baca langganan"
  on public.subscriptions for select to authenticated
  using (public.adalah_admin() or public.mengurus_anak(student_id));

drop policy if exists "wali baca order" on public.payment_orders;
create policy "wali baca order"
  on public.payment_orders for select to authenticated
  using (public.adalah_admin() or public.mengurus_anak(student_id));

drop policy if exists "admin baca kolam" on public.school_monthly_pools;
create policy "admin baca kolam"
  on public.school_monthly_pools for select to authenticated
  using (public.adalah_admin());

drop policy if exists "wali baca hadiah" on public.scholarship_awards;
create policy "wali baca hadiah"
  on public.scholarship_awards for select to authenticated
  using (public.adalah_admin() or public.mengurus_anak(student_id));

grant select on
  public.schools,
  public.subscriptions,
  public.payment_orders,
  public.school_monthly_pools,
  public.scholarship_awards
to authenticated;

revoke insert, update, delete on
  public.schools,
  public.subscriptions,
  public.payment_orders,
  public.school_monthly_pools,
  public.scholarship_awards
from anon, authenticated;

revoke all on private.payment_events from public, anon, authenticated;
