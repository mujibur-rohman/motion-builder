# Storyboard — Auto Increment ID vs UUID

Audio: 133,521 detik (sumber: `untitled.mp3`). Cap waktu mengikuti awal frasa hasil transkripsi dan jeda antarkalimat. Istilah teknis UUID dikoreksi dari keluaran ASR.

| Waktu | Narasi | Tampilan dan gerak |
| --- | --- | --- |
| 000.00–007.19 | Ini full breakdown auto increment ID versus UUID. Mari kita bahas. | **Auto Increment vs UUID** — Dua strategi penomoran data. Gerak: `intro`. |
| 007.19–010.87 | Pernah nggak lo lihat ID database angka kayak gini? | **ID angka yang familiar** — user_id: 1, 2, 3… Gerak: `number-id`. |
| 010.87–014.61 | Terus di aplikasi lain, ID-nya malah kayak gini. | **ID panjang di aplikasi lain** — UUID berbentuk rangkaian karakter panjang. Gerak: `uuid-id`. |
| 014.61–018.27 | Kenapa ada yang simpel banget, tapi ada juga yang panjang? | **Kenapa bentuknya beda?** — Bentuk ID mengikuti kebutuhan sistem. Gerak: `question`. |
| 018.27–020.73 | Kita mulai dari auto increment ID. | **Mulai dari auto increment** — Angka bertambah otomatis. Gerak: `auto-intro`. |
| 020.73–027.81 | Auto increment adalah ID berbentuk angka yang nilainya naik otomatis setiap ada data baru. | **Setiap data baru, angka naik** — Satu baris baru → nomor berikutnya. Gerak: `auto-definition`. |
| 027.81–034.95 | Misalnya, user pertama dapat ID satu, user kedua dapat ID dua, dan seterusnya. | **User 1 → ID 1, user 2 → ID 2** — Nomor mengikuti urutan penambahan data. Gerak: `sequence`. |
| 034.95–037.31 | Kelebihannya cukup simpel. | **Kelebihannya: simpel** — Mudah dipahami saat melihat data. Gerak: `simple`. |
| 037.31–043.57 | Ukuran datanya kecil, gampang dibaca manusia, dan biasanya efisien untuk indeks database. | **Kecil, terbaca, efisien** — Ukuran kecil · terbaca · indeks efisien. Gerak: `benefits`. |
| 043.57–045.31 | Tapi ada kekurangannya. | **Tetap ada kekurangan** — Urutan mudah diprediksi. Gerak: `drawback`. |
| 045.31–049.71 | Karena urutannya berurutan, ID-nya itu gampang sekali ditebak. | **ID berurutan mudah ditebak** — Angka berikutnya bisa dicoba. Gerak: `guess`. |
| 049.71–054.89 | Kalau URL seperti ini, misalkan slash user slash seratus. | **/user/100** — Akun dengan ID 100. Gerak: `url-100`. |
| 054.89–059.73 | Nah, orang bisa aja mencoba slash user slash seratus satu. | **Lalu mencoba /user/101** — Tebakan ID bukan izin akses. Gerak: `url-101`. |
| 059.73–064.83 | Tapi perlu diingat, ini bukan berarti auto increment itu otomatis nggak aman. | **Auto increment tidak otomatis tidak aman** — ID yang mudah ditebak tidak otomatis membocorkan data. Gerak: `not-insecure`. |
| 064.83–069.41 | Security tetap harus ditangani lewat authentication dan authorization. | **Keamanan ada di kontrol akses** — Pastikan siapa pengguna dan apa yang boleh diakses. Gerak: `security`. |
| 069.41–076.79 | Masalah lainnya muncul kalau sistem lo itu punya banyak database atau banyak server yang sama-sama membuat data. | **Bagaimana kalau banyak server?** — Beberapa tempat membuat ID secara bersamaan. Gerak: `distributed`. |
| 076.79–081.91 | Karena lo harus memastikan dua tempat berbeda nggak menghasilkan ID yang sama. | **Jangan sampai ID bentrok** — Dua server bisa memilih nomor yang sama. Gerak: `collision`. |
| 081.91–084.89 | Nah, di sinilah UUID sering digunakan. | **Di sinilah UUID dipakai** — ID bisa dibuat di banyak tempat. Gerak: `uuid-intro`. |
| 084.89–089.87 | UUID adalah singkatan dari Universally Unique Identifier. | **Universally Unique Identifier** — Universally Unique Identifier. Gerak: `uuid-definition`. |
| 089.87–092.65 | Bentuknya biasanya panjang seperti ini. | **Bentuknya lebih panjang** — Contoh: 550e8400-e29b-41d4-a716-446655440000 Gerak: `uuid-shape`. |
| 092.65–097.45 | UUID dirancang supaya kemungkinan dua ID yang sama itu sangat kecil. | **Tabrakan ID sangat kecil** — Peluang tabrakan sangat kecil. Gerak: `uniqueness`. |
| 097.45–101.23 | Bahkan kalau ID-nya dibuat sama mesin atau server yang berbeda. | **Walau servernya berbeda** — Setiap server bisa membuat UUID sendiri. Gerak: `different-servers`. |
| 101.23–105.15 | Analoginya gini, auto increment itu kayak nomor antrean. | **Auto increment = nomor antrean** — Nomor dikeluarkan berurutan. Gerak: `queue-analogy`. |
| 105.15–108.31 | Orang pertama nomor satu, berikutnya dua, dan seterusnya. | **Antrean: 1, 2, 3…** — Nomor berikutnya mengikuti nomor sebelumnya. Gerak: `queue-numbers`. |
| 108.31–114.09 | UUID itu lebih kayak nomor identitas yang bisa dibuat dari banyak tempat. | **UUID = identitas dari banyak tempat** — Identitas dibuat tanpa antre pada satu loket. Gerak: `identity-analogy`. |
| 114.09–118.53 | Makanya UUID ini cocok untuk sistem yang terdistribusi. | **Cocok untuk sistem terdistribusi** — Beberapa mesin bekerja mandiri. Gerak: `distributed-fit`. |
| 118.53–125.43 | Misalnya aplikasi lo punya beberapa server, atau data dibuat dari banyak lokasi. | **Beberapa server, banyak lokasi** — Data dibuat di beberapa titik. Gerak: `many-servers`. |
| 125.43–129.41 | Jadi intinya auto increment itu unggul di kesederhanaan. | **Auto increment unggul di kesederhanaan** — Ringkas dan efisien untuk alur terpusat. Gerak: `auto-summary`. |
| 129.41–133.53 | UUID menang di fleksibilitas untuk sistem yang terdistribusi. | **UUID unggul untuk sistem tersebar** — Fleksibel saat ID dibuat di banyak tempat. Gerak: `uuid-summary`. |
