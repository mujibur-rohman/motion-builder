# Storyboard — Cookie vs localStorage

Audio asli: `public/assets/cookie-vs-localstorage/narasi.mp3` · Durasi: 02:14.14 · 30 fps · 9:16

Narasi diambil dari audio terlampir. Istilah teknis dan salah dengar transkripsi diperbaiki tanpa mengubah makna. Setiap rentang waktu mengikuti jeda narasi. Semua visual digambar sebagai elemen 2D di `src/cookie-local-story.jsx`, sehingga objek bergerak selama adegan.

| Waktu | Narasi | Teks layar | Visual bergerak |
| --- | --- | --- | --- |
| 00:00.00–00:05.36 | Ini full breakdown: cookie vs localStorage. Sini kita bahas. | Cookie vs localStorage | Dua panel melayang berlawanan |
| 00:05.36–00:07.48 | Pertama, kita bahas cookie dulu. | Mulai dari cookie | Cookie berputar di samping browser |
| 00:07.48–00:15.64 | Cookie adalah data kecil yang disimpan di browser dan bisa dikirim secara otomatis ke server melalui HTTP request. | Data kecil yang ikut request | Paket cookie berjalan di jalur request |
| 00:15.64–00:20.24 | Gampangnya gini, bayangin lu lagi nginep di hotel. Setelah check-in, | Bayangin check-in hotel | Tamu bergeser masuk ke lobi |
| 00:20.24–00:25.80 | Resepsionis memberikan kartu kamar sebagai bukti kalau lu sudah terdaftar. | Dapat kartu kamar | Kartu kamar melayang di depan resepsionis |
| 00:25.80–00:33.12 | Jadi setiap kali lu mau mengakses fasilitas tertentu, kartu itu bisa digunakan untuk tanda pengenal. | Kartu jadi tanda pengenal | Kartu bergerak di depan panel akses |
| 00:33.12–00:36.20 | Nah, cookie bekerja dengan konsep yang mirip. | Cookie mirip kartu itu | Kartu hotel dan cookie bergerak lembut |
| 00:36.20–00:42.52 | Misalnya, ketika lu berhasil login, server itu bisa memberikan cookie berisi session ID. | Login menghasilkan session ID | Paket session ID bergerak dari server |
| 00:42.52–00:50.04 | Setiap kali browser mengirim request yang sesuai, cookie tadi bisa otomatis ikut dikirim ke server. | Cookie ikut terkirim | Paket cookie berulang menuju server |
| 00:50.04–00:53.32 | Jadi server bisa mengenali sesi login lu. | Server mengenali sesi | Lampu server berdenyut saat sesi dikenali |
| 00:53.32–00:56.96 | Tanpa harus meminta username dan password berulang kali. | Tidak perlu login ulang | Panel status login muncul |
| 00:56.96–00:59.16 | Terus, localStorage itu apa? | Lalu, localStorage? | Panel localStorage melayang |
| 00:59.16–01:05.20 | localStorage adalah tempat penyimpanan data di browser yang bisa diakses melalui JavaScript. | Diakses lewat JavaScript | Browser dan storage terhubung |
| 01:05.20–01:08.08 | Dan tidak otomatis dikirim ke server. | Tidak otomatis ke server | Paket diblokir sebelum server |
| 01:08.08–01:13.20 | Contohnya, lu membuka website dan mengubah tampilannya dari light mode ke dark mode. | Ubah light ke dark mode | Tema situs berubah terang ke gelap |
| 01:13.20–01:17.24 | Website bisa menyimpan preferensi tersebut ke localStorage. | Pilihan disimpan | Pilihan bergerak ke storage |
| 01:17.24–01:22.44 | Jadi keesokannya, ketika lu membuka website yang sama, tampilannya tetap dark mode. | Besok tetap dark mode | Pilihan kembali ke situs saat dibuka lagi |
| 01:22.44–01:23.88 | Nah, sekarang perbedaannya. | Sekarang perbedaannya | Dua media bergerak berlawanan |
| 01:23.88–01:25.80 | Pertama, pengiriman data. | 01 · Pengiriman data | Dua media bergerak berlawanan |
| 01:25.80–01:30.04 | Cookie bisa otomatis dikirim bersama HTTP request yang sesuai. | Cookie ikut HTTP request | Paket cookie ikut request |
| 01:30.04–01:32.36 | Sedangkan localStorage itu tidak. | localStorage tidak ikut | Jalur otomatis berhenti |
| 01:32.36–01:34.24 | Kedua, kapasitas. | 02 · Kapasitas | Batang kapasitas tumbuh |
| 01:34.24–01:37.72 | Cookie biasanya dibatasi sekitar 4 KB per cookie. | Cookie sekitar 4 KB | Batang kapasitas cookie ditonjolkan |
| 01:37.72–01:44.88 | Sedangkan localStorage umumnya menyediakan kapasitas beberapa MB per origin, tergantung browser. | localStorage beberapa MB | Batang kapasitas localStorage tumbuh lebih besar |
| 01:44.88–01:47.92 | Ketiga, yaitu masa penyimpanan. | 03 · Masa penyimpanan | Jam bergerak |
| 01:47.92–01:50.76 | Cookie bisa memiliki waktu kedaluwarsa. | Cookie bisa kedaluwarsa | Jam berputar menuju masa berlaku |
| 01:50.76–01:53.80 | Atau hanya bertahan selama sesi browser. | Atau selama sesi | Jam menandai akhir sesi |
| 01:53.80–02:01.04 | Sedangkan localStorage itu tetap tersimpan sampai dihapus oleh pengguna, aplikasi, atau kebijakan browser. | localStorage tetap tersimpan | Data storage tetap ada sepanjang linimasa |
| 02:01.04–02:08.00 | Jadi intinya, cookie ini cocok untuk data kecil yang perlu ikut ke dalam komunikasi HTTP dengan server. | Cookie untuk komunikasi HTTP | Panel cookie ditonjolkan |
| 02:08.00–02:14.14 | Sedangkan localStorage cocok untuk menyimpan data yang ingin digunakan kembali oleh aplikasi di browser. | localStorage untuk aplikasi browser | Panel localStorage ditonjolkan |
