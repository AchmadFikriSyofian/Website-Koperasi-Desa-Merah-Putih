# Website Koperasi Desa Merah Putih

Template company profile berbasis HTML, CSS, dan JavaScript.

## Struktur
- `index.html` — halaman utama
- `style.css` — seluruh styling/responsive design
- `script.js` — navigasi mobile, tahun otomatis, dan integrasi API statistik

## Cara menjalankan
1. Buka `index.html` di browser.
2. Ganti `[Nama Desa]`, alamat, nomor telepon, dan link sosial media.
3. Ganti foto placeholder dengan dokumentasi asli koperasi/desa.
4. Untuk statistik anggota nasional, isi `CONFIG.API_URL` di `script.js` dengan endpoint resmi.

## Format API statistik
Endpoint diharapkan mengembalikan JSON:
{
  "anggota": 123456,
  "aktif": 120000,
  "pertumbuhan": 4.2,
  "koperasi": 81613,
  "updated_at": "2026-10-05T10:00:00+07:00"
}

Catatan:
- Jangan memasukkan angka anggota nasional sebagai angka statis jika belum ada sumber resmi.
- Angka 81.613 unit pada template berasal dari informasi pemerintah yang dipublikasikan pada 2025; perbarui dari sumber resmi bila tersedia angka yang lebih baru.
- Peta memakai OpenStreetMap sebagai embed dan tombol Google Maps untuk navigasi.
