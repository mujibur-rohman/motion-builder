# Catatan produksi: Cross App Tracking

Video: `contents/cross-app-tracking.json` → `out/cross-app-tracking.mp4` (9:16, 30 fps, ±54,6 detik).

## Alur visual

1. Pencarian sepatu Rp200.000 di layar e-commerce.
2. Iklan sepatu muncul di feed sosial media.
3. Dugaan mikrofon ditampilkan sebagai pertanyaan, lalu dicoret.
4. Sinyal data bergerak dari aplikasi belanja ke aplikasi sosial.
5. Kartu ID iklan muncul dan berputar perlahan.
6. GAID dan IDFA masuk bergantian.
7. Modul SDK masuk ke dalam ilustrasi aplikasi.
8. Field pencarian, harga, dan belum checkout tersusun menjadi event.
9. Paket ID + event bergerak menuju server iklan.
10. ID dicocokkan dengan profil iklan.
11. Kandidat iklan bergerak dan diperingkat.
12. Iklan sepatu tampil lagi di feed.

Semua layar produk adalah ilustrasi yang digambar langsung dengan React/SVG, bukan tangkapan layar asli. Logo Shopee, Instagram, Meta, Android, dan Apple disimpan lokal dari [Simple Icons](https://simpleicons.org/) agar video dapat dirender ulang tanpa koneksi internet.

## Akurasi naskah

- IDFA memerlukan izin App Tracking Transparency pada iOS modern; bila izin ditolak, IDFA tidak tersedia untuk pelacakan. [Apple Developer](https://developer.apple.com/app-store/user-privacy-and-data-use/)
- Advertising ID Android dapat direset atau dihapus oleh pengguna. [Google for Developers](https://developers.google.com/ad-manager/mobile-ads-sdk/android/privacy/play-data-disclosure)
- SDK dan event dalam video adalah **contoh mekanisme**, bukan klaim bahwa Shopee saat ini memasang Meta SDK atau membagikan event tertentu. Integrasi spesifik harus diverifikasi terpisah.
- Kemunculan iklan yang mirip pencarian tidak membuktikan satu metode pelacakan tertentu. Video memakai istilah “salah satu cara” pada narasi untuk menjaga konteks itu.

Voiceover di `public/assets/cross-app-tracking/voice/` adalah suara draf macOS Damayanti. Ganti file per adegan untuk rekaman final, lalu sesuaikan `seconds` jika durasi berubah.
