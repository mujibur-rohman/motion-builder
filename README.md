# Motion Builder

Pembuat motion graphic berbasis **JavaScript + Remotion**. Setiap video disimpan sebagai satu file JSON di `contents/`. Referensi gerak dan cara menyusun adegan berasal dari [Bang Motion](https://github.com/bangtutorial/bang-motion); implementasi render memakai Remotion.

## Mulai

```bash
npm install
npm run studio
```

Studio menampilkan contoh `contents/example.json`. Untuk melihat semua jenis visual, render `contents/style-demo.json`:

```bash
npm run render -- contents/example.json
npm run render -- contents/style-demo.json
```

Hasil ada di `out/example.mp4`.

## Konten baru

Tulis script di file teks. Satu paragraf atau kalimat menjadi satu adegan awal:

```bash
npm run new -- nama-konten script.txt
```

Periksa `contents/nama-konten.json`. Pemecahan otomatis hanya draft. Template baru sudah memakai palet dark Discord dan gaya editorial dari referensi video. Ubah `text` menjadi kalimat pendek yang enak dibaca, atur `seconds`, dan rancang `visual` serta `motion` yang sesuai isi adegan. Panduan lengkap ada di [STYLE.md](STYLE.md). Saat script diberikan kepada agen, agen menyusun storyboard dan mengisi JSON ini secara lebih terarah.

Preview konten tersebut dengan `npm run studio -- contents/nama-konten.json`.

Gambar hasil generasi atau aset sendiri disimpan di `public/assets/`. Untuk shot `image`, isi `image` pada adegan dengan path seperti `"/assets/adegan-01.png"`. Audio dapat dipasang pada project atau per adegan; simpan di `public/assets/`, lalu tambahkan `"audio": "/assets/voiceover.mp3"`. Panjang dan timing audio perlu disesuaikan lewat `seconds` tiap adegan.

```bash
npm run check
npm run render -- contents/nama-konten.json
```

`ratio` mendukung `9:16`, `16:9`, dan `1:1`. Render selalu 30 fps. Studio memakai contoh sebagai default.

## Alur kerja per konten

1. Terima script dan referensi gaya/brand.
2. Pecah script menjadi beat visual dan pilih konsep gerak.
3. Tulis JSON visual yang sesuai topik; buat gambar 2D atau pakai logo resmi saat dibutuhkan, lalu isi `image`.
4. Preview di Studio, koreksi timing dan keterbacaan.
5. Render MP4.

Generator gambar AI belum diikat ke satu layanan. Gambar dibuat oleh agen ketika brief konten tersedia dan disimpan sebagai aset lokal, sehingga proyek tetap bisa dirender ulang tanpa API key.

Template umum menawarkan shot `statement`, `compare`, `cards`, `terminal`, `flow`, `timeline`, `focus`, dan `image`. Semua memakai grid gelap, tipografi tegas, kartu 2D, ruang kosong, dan transisi bertahap yang terinspirasi video referensi. Isi visual tetap ditentukan per script agar akurat untuk topiknya; generator `npm run new` membuat storyboard awal yang perlu diedit sebelum render final.

## Konten pertama: Git vs GitHub

`contents/git-vs-github.json` berisi naskah, 25 beat visual bergaya editorial baru, serta timing yang mengikuti narasi draf. Adegan memakai template `src/motion.jsx` dengan kombinasi logo resmi, ilustrasi 2D yang relevan, timeline commit, kartu, terminal, dan alur. Versi komposisi lama tersimpan di `archive/git-vs-github-legacy.json` dan bisa dibuka sebagai `GitVsGithubLegacy` di Studio.

```bash
npm run studio -- contents/git-vs-github.json
npm run render -- contents/git-vs-github.json
```

Di Studio, pilih komposisi `GitVsGithub`. Hasil render ada di `out/git-vs-github.mp4`; MP4 gaya sebelumnya ada di `out/git-vs-github-previous-style.mp4`. Narasi saat ini memakai suara draf macOS `Damayanti`; file per adegan ada di `public/assets/git-vs-github/voice/`. Untuk membuat ulang narasi draf setelah mengubah `voiceText` di macOS, jalankan `npm run draft-voice -- contents/git-vs-github.json`. Audio rekaman final bisa menggantikan file per adegan dengan timing JSON yang disesuaikan.

Logo Git berasal dari [halaman resmi Git](https://git-scm.com/community/logos) (desain Jason Long, CC BY 3.0); logo GitHub berasal dari [GitHub Brand Toolkit](https://brand.github.com/foundations/logo) dan dipakai tanpa mengubah bentuk atau warnanya.

Versi visual terbaru memakai ilustrasi 2D untuk save point, error, dan cloud; tracking commit digambar langsung di Remotion. Adegan memilih `visual` serta `motion` di JSON; `npm run check` memastikan satu nama gerak tidak dipakai lebih dari tiga kali. Tidak ada header atau watermark di bagian atas video.

## Konten: Anatomi URL

`contents/struktur-url.json` berisi 19 adegan untuk membedah scheme, subdomain, domain, port, path, query parameters, dan fragment. Ilustrasi browser, server, produk, filter, serta halaman ulasan digambar langsung di `src/url-story.jsx` agar elemennya dapat dianimasikan selama adegan. Narasi sementara ada di `public/assets/struktur-url/voice/`.

```bash
npm run studio -- contents/struktur-url.json
npm run render -- contents/struktur-url.json
```

Komposisi Studio bernama `StrukturUrl`. Hasil video ada di `out/struktur-url.mp4`.

## Konten: Cookie vs localStorage

`contents/cookie-vs-localstorage.json` memakai narasi asli berdurasi 2 menit 14 detik, dipetakan ke 30 adegan sesuai cap waktu audio. Storyboard dan transkripsi yang sudah dikoreksi ada di `contents/cookie-vs-localstorage-storyboard.md`; berkas subtitle terpisah ada di `contents/cookie-vs-localstorage.srt`. Ilustrasi hotel, kartu kamar, browser, server, request, serta localStorage digambar dan dianimasikan langsung di `src/cookie-local-story.jsx`.

```bash
npm run studio -- contents/cookie-vs-localstorage.json
npm run render -- contents/cookie-vs-localstorage.json
```

Komposisi Studio bernama `CookieVsLocalStorage`. Hasil render ada di `out/cookie-vs-localstorage.mp4`.

## Konten: SQL vs NoSQL

`contents/sql-vs-nosql.json` memakai audio asli berdurasi 120 detik dan 29 adegan yang dimulai pada frasa narasi terkait. Rincian transkrip, waktu, dan ilustrasi ada di `contents/sql-vs-nosql-storyboard.md`; subtitle ada di `contents/sql-vs-nosql.srt`. Ilustrasi tabel, relasi, lemari arsip, dokumen JSON, dan kotak penyimpanan digambar sebagai elemen SVG terpisah di `src/sql-nosql-story.jsx` sehingga isinya bergerak selama adegan.

```bash
npm run studio -- contents/sql-vs-nosql.json
npm run render -- contents/sql-vs-nosql.json
```

Komposisi Studio bernama `SqlVsNosql`. Hasil video ada di `out/sql-vs-nosql.mp4`.
