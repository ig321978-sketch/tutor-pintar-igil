# Gemini: Enter tidak mengirim

Ekstensi Chrome ini hanya berjalan di `https://gemini.google.com/*`. Situs sekolah igiligil.xyz tidak diubah dan tidak menerima skrip ini.

- Enter menambah baris baru. Shift tidak diperlukan.
- Shift+Enter juga menambah baris baru, tidak mengirim.
- Ctrl+Enter dan Cmd+Enter tidak mengirim.
- Tombol **Kirim** bawaan Gemini tetap satu-satunya cara mengirim pesan. Posisi dan tampilannya tidak diubah.

## Pasang secara unpacked di Chrome

1. Buka `chrome://extensions`.
2. Nyalakan **Mode pengembang** (Developer mode).
3. Pilih **Muat yang belum dikemas** (Load unpacked).
4. Pilih folder `ekstensi/gemini-anti-enter` dari repositori ini.
5. Buka kembali `https://gemini.google.com/`, lalu ketik di kotak prompt.
6. Tekan Enter: kursor pindah ke baris baru dan pesan tidak terkirim. Kirim lewat tombol Kirim.

## Uji logika tanpa membuka Gemini

```bash
node --test ekstensi/gemini-anti-enter/uji-enter.mjs
```
