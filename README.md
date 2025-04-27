# Pajak CV KU

Aplikasi penghitung pajak untuk CV di Indonesia berdasarkan "Ketentuan Penggunaan PPh Final Pajak CV Terbaru".

## Fitur

- **Perhitungan Otomatis PPh Final UMKM:** Menghitung Pajak Penghasilan (PPh) Final sebesar 0,3% dari omzet bruto bagi CV yang memenuhi kriteria UKM. Termasuk pemantauan batas waktu penggunaan tarif PPh Final (maksimal 4 tahun).

- **Perhitungan Otomatis PPh Lainnya:** Menghitung jenis pajak penghasilan lainnya:
  - PPh Pasal 21 (penghasilan/gaji karyawan)
  - PPh Pasal 22 (transaksi tertentu)
  - PPh Pasal 23 (transaksi dengan bendaharawan pemerintah atau pihak lain)
  - PPh Pasal 4 ayat (2) (penghasilan dari penjualan/penyewaan tanah dan/atau bangunan)
  - PPh Pasal 25 (angsuran PPh bagi CV yang menggunakan tarif PPh Badan normal)

- **Perhitungan Otomatis PPN:** Untuk CV yang telah dikukuhkan sebagai Pengusaha Kena Pajak (PKP).

- **Perhitungan Potensi Pengkreditan PPh Pasal 24:** Membantu menghitung potensi kredit pajak atas penghasilan dari luar negeri.

- **Validasi NPWP:** Fitur untuk validasi format Nomor Pokok Wajib Pajak (NPWP).

## Teknologi

Aplikasi ini dibangun menggunakan:
- React
- React Router
- React Hook Form
- Tailwind CSS
- Vite

## Penggunaan

1. Pilih jenis pajak yang ingin dihitung dari menu utama
2. Isi data yang diperlukan pada form yang tersedia
3. Klik tombol "Hitung" untuk melihat hasil perhitungan
4. Lihat penjelasan detail mengenai perhitungan dan ketentuan yang berlaku

## Instalasi untuk Pengembangan

```bash
# Clone repositori
git clone https://github.com/username/pajak-cv-ku.git

# Masuk ke direktori proyek
cd pajak-cv-ku

# Install dependensi
npm install

# Jalankan server pengembangan
npm run dev
```

## Lisensi

© 2024 Pajak CV KU