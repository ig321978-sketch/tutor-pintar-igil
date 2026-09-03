-- Jalankan di SQL Editor Supabase agar audio Chirp bisa di-cache
-- dan tidak menagih Google Cloud TTS berulang untuk naskah yang sama.
insert into storage.buckets (id, name, public)
values ('tts-cache', 'tts-cache', false)
on conflict (id) do nothing;
