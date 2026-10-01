# Concurrency — storyboard dan transkrip

Audio: `concurrency.mp3` · durasi 133,40 detik · 30 fps · 1080×1920.

Transkrip di bawah dibersihkan dari kesalahan pengenalan istilah teknis (concurrency, JavaScript, async/await, asynchronous). Titik masuk adegan mengikuti jeda kalimat pada audio.

| Waktu | Narasi | Visual bergerak |
| --- | --- | --- |
| 00.00–04.82 | Kita akan breakdown apa itu concurrency. Mari kita bahas. | intro · Concurrency itu apa? |
| 04.82–12.08 | Misalnya, ada seribu orang yang lagi pesan makanan lewat aplikasi, ada yang checkout, dan ada yang melakukan pembayaran. | orders · Banyak orang, banyak aktivitas |
| 12.08–15.72 | Apakah semuanya harus nunggu satu per satu sampai selesai? | queue · Harus antre satu per satu? |
| 15.72–19.34 | Nah, di sinilah ada konsep yang namanya concurrency. | intro · Inilah concurrency |
| 19.34–25.34 | Concurrency adalah kemampuan sistem untuk menangani beberapa pekerjaan dalam periode waktu yang bersamaan. | definition · Menangani banyak pekerjaan |
| 25.34–28.84 | Biar gampang, kita pakai analogi. | cafe · Bayangkan sebuah kedai kopi |
| 28.84–32.98 | Bayangin lu adalah seorang barista yang harus melayani tiga pelanggan. | barista · Satu barista, tiga pelanggan |
| 32.98–37.12 | Pelanggan pertama pesan kopi. Lu mulai bikin kopinya. | coffee-start · Pelanggan A pesan kopi |
| 37.12–41.28 | Tapi ternyata lu harus nunggu mesin kopinya selesai bekerja. | machine-wait · Mesin kopi sedang bekerja |
| 41.28–45.50 | Daripada bengong, lu langsung mengambil pesanan pelanggan kedua. | serve-b · Barista melayani B |
| 45.50–49.66 | Sambil menunggu, lu juga menyiapkan gelas untuk pelanggan ketiga. | serve-c · Lalu menyiapkan gelas C |
| 49.66–53.56 | Begitu mesin kopi selesai, lu kembali menyelesaikan pesanan pertama. | finish-a · Kembali selesaikan A |
| 53.56–56.98 | Nah, itulah gambaran concurrency. | definition · Itulah concurrency |
| 56.98–63.40 | Satu barista bisa menangani beberapa pekerjaan dengan cara berpindah dari satu tugas ke tugas lainnya. | switching · Satu barista, beberapa tugas |
| 63.40–66.64 | Terus implementasi di aplikasi gimana? | app-intro · Bagaimana di aplikasi? |
| 66.64–69.50 | Misalnya lu membuka aplikasi e-commerce. | shop · Buka aplikasi e-commerce |
| 69.50–74.64 | Di saat yang hampir bersamaan, aplikasi itu perlu mengambil informasi produk, | product · Ambil informasi produk |
| 74.64–77.64 | Mengecek stok dan memuat rekomendasi. | three-requests · Cek stok dan rekomendasi |
| 77.64–83.42 | Kalau semua proses harus menunggu satu sama lain, waktu tunggunya bisa lebih panjang. | sequential · Jika semuanya menunggu |
| 83.42–91.54 | Dengan concurrency, sistem bisa menangani beberapa operasi tersebut tanpa harus menunggu semuanya selesai secara berurutan. | parallel · Operasi bisa tumpang tindih |
| 91.54–98.76 | Salah satu contohnya di JavaScript adalah penggunaan async/await untuk mengelola operasi asynchronous. | async · Contoh: async/await |
| 98.76–102.62 | Tapi perlu diingat, concurrency juga punya tantangan. | warning · Ada tantangannya juga |
| 102.62–107.12 | Misalnya dua pengguna mencoba membeli barang yang stoknya tinggal satu. | last-stock · Stok tinggal satu |
| 107.12–113.16 | Kalau prosesnya nggak diatur dengan benar, keduanya bisa aja sama-sama dianggap berhasil. | collision · Keduanya merasa berhasil? |
| 113.16–118.16 | Masalah seperti ini berkaitan dengan konsep yang namanya race condition. | race · Ini race condition |
| 118.16–125.24 | Jadi intinya, concurrency ini bukan berarti semua pekerjaan harus dieksekusi pada detik yang sama. | not-simultaneous · Bukan harus di detik yang sama |
| 125.24–133.40 | Tapi bagaimana sebuah sistem bisa mengelola banyak pekerjaan secara efisien tanpa harus selalu menunggu satu pekerjaan selesai terlebih dahulu. | ending · Kelola pekerjaan lebih efisien |
