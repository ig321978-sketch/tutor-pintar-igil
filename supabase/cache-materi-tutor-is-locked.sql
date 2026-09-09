-- Kunci naskah materi: cegah generate/edit tak sengaja.
-- Jalankan di SQL Editor Supabase jika kolom belum ada.

alter table cache_materi_tutor
  add column if not exists is_locked boolean not null default false;
