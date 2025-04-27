# Pajak CV KU

Aplikasi penghitung pajak untuk badan usaha CV di Indonesia. Aplikasi ini dirancang untuk membantu badan usaha berbentuk Commanditaire Vennootschap (CV) dalam mengelola dan menghitung kewajiban perpajakan mereka secara otomatis sesuai dengan peraturan yang berlaku.

## Fitur

- **Perhitungan Otomatis PPh Final UMKM (0.3%)** - Untuk CV dengan omzet hingga Rp4,8 miliar per tahun
- **Monitoring batas waktu penggunaan PPh Final** - Maksimal 4 tahun
- **Perhitungan jenis pajak lainnya**:
  - PPh Pasal 21 (pajak penghasilan karyawan)
  - PPh Pasal 22 (pajak atas transaksi tertentu)
  - PPh Pasal 23 (pajak transaksi dengan pihak lain)
  - PPh Pasal 4 ayat (2) (pajak final untuk penghasilan tertentu)
  - PPh Pasal 25 (angsuran pajak bulanan)
- **Perhitungan PPN** - Untuk CV dengan status PKP
- **Validasi NPWP** - Memastikan format NPWP yang benar

## Penggunaan

1. Pilih jenis pajak yang ingin dihitung
2. Masukkan nilai-nilai yang diperlukan (omzet, nilai transaksi, dll)
3. Sistem akan otomatis menghitung kewajiban pajak Anda

## Teknologi

- React.js
- Tailwind CSS
- Chart.js

## Prasyarat

Node.js versi 14 atau lebih tinggi

## Instalasi

```bash
# Clone repositori
git clone [url-repositori]

# Pindah ke direktori proyek
cd pajak-cv-ku

# Instal dependensi
npm install

# Jalankan aplikasi dalam mode pengembangan
npm run dev
```

## Pembangunan untuk Produksi

```bash
npm run build
```

## Ketentuan dan Peraturan Pajak

Aplikasi ini mengacu pada peraturan perpajakan terbaru yang berlaku di Indonesia, termasuk:

- PP No. 55 Tahun 2022 mengenai PPh Final UMKM 0.3%
- Peraturan perpajakan terkait PPh Pasal 21, 22, 23, 4(2), dan 25
- Peraturan terkait PPN

## Catatan Penting

Aplikasi ini adalah alat bantu untuk perhitungan estimasi pajak. Untuk perhitungan resmi, konsultasikan dengan akuntan atau konsultan pajak.