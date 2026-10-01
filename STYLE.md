# Gaya visual Motion Builder

Referensi visual: video vertikal “Belajar Claude Code dari Nol — Ep5” yang diberikan pengguna. Ambil **bahasa visualnya**, bukan teks, watermark, warna jingga, atau promosi di dalam video tersebut.

## Identitas yang dipakai di setiap konten

- Format utama 9:16, latar `#1E1F22` dengan grid sangat halus dan cahaya blurple samar.
- Teks putih `#F2F3F5`, aksen blurple `#5865F2`, mint `#43B581` untuk hasil positif, merah `#F23F43` untuk error.
- Satu gagasan per beat. Teks layar pendek dan terbaca di ponsel. Sisakan ruang kosong di sekitar visual utama.
- Bentuk 2D yang rapi: kartu, garis alur, titik, ikon, dan terminal hanya ketika adegannya benar-benar membutuhkan terminal.
- Gerak bertahap sesuai isi: kartu muncul berurutan, alur mengarah, kata kunci membesar, ilustrasi masuk perlahan. Hindari semua adegan memakai gerak yang sama.
- Tidak ada watermark atau header di tepi atas. Objek penting tetap dalam safe area. Progres tipis di bawah boleh dipakai.
- Palet tetap dark Discord. Warna tambahan hanya untuk status atau penekanan yang relevan.

## Memilih visual dari script

| Isi beat | `visual.type` | Isi yang wajib ditulis |
| --- | --- | --- |
| Hook atau satu kalimat inti | `statement` | `accentWord` bila ada kata penting |
| Dua konsep yang dibandingkan | `compare` | `left` dan `right`, masing-masing `title` dan `detail` |
| Beberapa fakta atau konsekuensi | `cards` | `items` berisi 1–4 judul dan detail singkat |
| Perintah atau layar produk | `terminal` | `lines` yang masuk akal untuk topik |
| Langkah atau sebab akibat | `flow` | `steps` berisi 2–4 langkah |
| Riwayat perubahan atau checkpoint | `timeline` | `nodes` berisi 2–4 titik dengan `title` |
| Satu pesan penutup | `focus` | `keyword` singkat |
| Ilustrasi atau logo yang dibutuhkan | `image` | `scene.image` dari `public/` |
| Perpindahan session ID atau token antara client dan server | `auth-diagram` | `mode`: `session-create`, `session-request`, `token-issue`, atau `token-request` |

Jangan memilih visual hanya agar daftar jenis shot seimbang. Isi tiap kartu, langkah, dan gambar harus menjelaskan kalimat narasi pada beat itu. Bila topik perlu analogi visual baru, buat aset 2D sesuai topik dan gunakan `image`; jangan memaksa analogi game, terminal, atau kode pada topik yang tidak cocok.

Nama `motion` harus menggambarkan gerak yang dipilih, misalnya `title-rise`, `cards-stagger`, `flow-build`, atau `focus-pop`. `npm run check` menolak nama motion yang dipakai lebih dari tiga kali. Untuk konten panjang, rancang beberapa komposisi sesuai konteks daripada mengganti nama gerak yang sama.

## Alur sebelum render final

1. Pecah script menjadi beat dan tentukan satu pesan layar per beat.
2. Pilih jenis visual serta isi yang spesifik untuk setiap beat.
3. Siapkan gambar atau logo resmi bila diperlukan; gunakan grafis 2D untuk konsep abstrak.
4. Sesuaikan durasi dengan voiceover, preview beberapa frame dan transisi, lalu render.
5. Jalankan `npm run check` dan cek MP4 final.

`contents/style-demo.json` menunjukkan tujuh jenis visual dalam satu tema. `contents/example.json` adalah contoh pendek untuk Studio. Template umum ada di `src/motion.jsx`; latar dan palet bersama ada di `src/editorial-style.jsx`.
