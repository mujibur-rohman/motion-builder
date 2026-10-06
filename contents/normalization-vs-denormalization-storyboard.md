# Normalization vs Denormalization — storyboard sinkron audio

Audio asli: `public/assets/normalization-vs-denormalization/narasi.mp3` (143,67 detik). Nama berkas sumber berbeda dari isi audio; storyboard mengikuti narasi yang terdengar. Setiap adegan minimal 5 detik. Grafis vektor digambar sebagai lapisan terpisah dan bergerak selama shot.

| Waktu | Narasi | Ilustrasi dan gerak |
| --- | --- | --- |
| 00:00.00–00:06.33 | Ini full breakdown normalization dan denormalization database. Sini kita bahas. | **Normalization vs Denormalization** — Struktur rapi atau baca cepat? |
| 00:06.33–00:15.13 | Pernah nggak lo lihat database yang datanya dipisah ke banyak tabel? Ada tabel users, orders, products, dan order items. | **Kenapa tabelnya banyak?** — users · orders · products · order_items |
| 00:15.13–00:21.00 | Terus kepikiran, kenapa nggak digabungin aja semuanya jadi satu tabel biar gampang? | **Kenapa tidak satu tabel?** — Satu tabel justru menyimpan banyak pengulangan. |
| 00:21.00–00:26.37 | Nah, ini ada hubungannya sama dua konsep, yaitu normalization dan denormalization. | **Dua pendekatan** — Normalization ↔ Denormalization |
| 00:26.37–00:33.13 | Normalization adalah proses menyusun data supaya lebih terstruktur dan mengurangi duplikasi. | **Data rapi, duplikasi berkurang** — Pisahkan data menurut perannya. |
| 00:33.13–00:42.50 | Contohnya kayak gini. Misalnya lo punya tabel pesanan, isinya ada nama customer, email customer, nama produk, harga produk, dan jumlah. | **Satu tabel pesanan** — Customer · email · produk · harga · jumlah |
| 00:42.50–00:48.80 | Kalau customer yang sama beli lima kali, nama dan emailnya bisa ikut tersimpan lima kali. | **Customer sama, data berulang** — Nama dan email tersimpan berkali-kali. |
| 00:48.80–00:54.00 | Nah, lewat normalization, data tadi kita pecah. Data customer masuk ke tabel users, | **Pecah data ke tabel terpisah** — Satu sumber untuk tiap jenis data. |
| 00:54.00–01:02.97 | data product masuk ke products, pesanan ke orders, dan detail barang yang dibeli masuk ke order items. | **Setiap data punya tempat** — users · products · orders · order_items |
| 01:02.97–01:11.97 | Semua tabel itu dihubungkan menggunakan ID. Keuntungannya data ini lebih konsisten, tapi ada satu trade off. | **Tabel dihubungkan dengan ID** — ID menjaga data saling terhubung. |
| 01:11.97–01:20.37 | Karena datanya dipisah ke banyak tabel, saat ingin membaca informasi lengkap, database perlu melakukan yang namanya join. | **Membaca lengkap butuh JOIN** — Beberapa tabel perlu digabung saat dibaca. |
| 01:20.37–01:31.57 | Sekarang denormalization. Denormalization adalah ketika kita sengaja menyimpan data yang redundan atau menggabungkan sebagian data untuk mempermudah atau mempercepat proses baca. | **Denormalization: sengaja menduplikasi** — Data redundan dipakai untuk mempercepat baca. |
| 01:31.57–01:39.13 | Misalnya di tabel order kita ikut menyimpan customer name, padahal nama tersebut sebenarnya sudah ada di tabel users. | **Nama customer ikut di order** — orders menyimpan customer_name. |
| 01:39.13–01:47.50 | Kenapa sengaja bikin data duplikat? Karena di beberapa kasus, kecepatan membaca data itu lebih penting daripada menghindari duplikasi. | **Kenapa sengaja ada duplikat?** — Kecepatan baca bisa jadi prioritas. |
| 01:47.50–01:57.50 | Misalnya dashboard yang dibuka jutaan kali. Daripada setiap request harus menghitung atau join banyak data, kita bisa menyimpan hasil yang sudah siap dibaca. | **Jutaan pembacaan, hasil siap pakai** — Baca data siap tampil tanpa JOIN berulang. |
| 01:57.50–02:02.53 | Tapi konsekuensinya, kita punya data yang sama di beberapa tempat. | **Data sama di beberapa tempat** — Ada beberapa salinan data yang sama. |
| 02:02.53–02:07.57 | Kalau satu data berubah, kita harus memastikan salinannya juga tetap sinkron. | **Perubahan harus sinkron** — Semua salinan perlu ikut berubah. |
| 02:07.57–02:12.67 | Kalau tidak, bisa muncul data yang tidak konsisten. Jadi perbedaannya sederhana. | **Jika gagal, data berbeda** — Nilai yang berbeda menimbulkan inkonsistensi. |
| 02:12.67–02:17.70 | Normalization mengurangi duplikasi dan menjaga data tetap rapi. | **Normalization: lebih rapi** — Kurangi duplikasi · jaga konsistensi |
| 02:17.70–02:23.67 | Sedangkan denormalization menerima sebagian duplikasi demi performa atau kemudahan membaca data. | **Denormalization: baca lebih cepat** — Terima sebagian duplikasi demi performa. |
