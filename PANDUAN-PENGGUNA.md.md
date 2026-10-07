# Panduan Pengguna per Role — RKO RSAMP

Dokumen ini menjelaskan **setiap peran (role)**, **menu apa saja yang bisa diakses**, dan **cara penggunaan** masing-masing modul sesuai alur kerja di RS AM Parikesit.

---

## 📋 Daftar Isi

- [Ringkasan Akses per Role](#-ringkasan-akses-per-role)
- [1. SUPER_ADMIN](#1-super_admin)
- [2. ADMIN](#2-admin)
- [3. KEPALA_INSTALASI_FARMASI](#3-kepala_instalasi_farmasi)
- [4. KOORDINATOR_LOGISTIK_FARMASI](#4-koordinator_logistik_farmasi)
- [5. PETUGAS_MUTASI_OBAT](#5-petugas_mutasi_obat)
- [6. PETUGAS_MUTASI_BMHP](#6-petugas_mutasi_bmhp)
- [7. TIM_PENERIMAAN](#7-tim_penerimaan)
- [8. TIM_PEMBELIAN](#8-tim_pembelian)
- [9. KEUANGAN](#9-keuangan)
- [10. USER](#10-user)
- [11. DISTRIBUTOR_VIEW](#11-distributor_view)

---

## 🗺 Ringkasan Akses per Role

| Menu | SUPER_ADMIN | ADMIN | KEPALA_IF | KOORD_LOG | PMO | PMB | TIM_TERIMA | TIM_BELI | KEU | USER | DIST_VIEW |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Dashboard RKO | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Input RKO Unit | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Pembelian (PO) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Penerimaan Barang | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Retur Barang | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Mutasi ke Ruangan | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Riwayat Mutasi | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Pemakaian Ruangan | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Monitoring RKO | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Usulan Pembelian | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Approval Edit Penerimaan | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Delegasi Approval | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Master Barang | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Master Ruangan | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Master Distributor | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Master Prinsipal | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manajemen User | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Stok Opname Gudang | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Stok Opname Ruangan | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Keuangan | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Penjualan Farmasi | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Laporan RKO | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Laporan Audit | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Rencana per Distributor | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Pengaturan Periode RKO | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Ubah Password | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Keterangan:**
- `KEPALA_IF` = Kepala Instalasi Farmasi
- `KOORD_LOG` = Koordinator Logistik Farmasi
- `PMO` = Petugas Mutasi Obat
- `PMB` = Petugas Mutasi BMHP
- `TIM_TERIMA` = Tim Penerimaan
- `TIM_BELI` = Tim Pembelian
- `KEU` = Keuangan
- `DIST_VIEW` = Distributor View

---

## 1. SUPER_ADMIN

### Deskripsi
Akses penuh ke seluruh sistem. Digunakan untuk maintenance, setup awal, dan penanganan masalah teknis.

### Menu yang Bisa Diakses
**Semua menu** (lihat tabel ringkasan).

### Cara Penggunaan
1. **Login** dengan akun SUPER_ADMIN.
2. **Setup awal sistem** (hanya sekali):
   - Master Data → **Master Barang** → tambahkan semua obat & BMHP
   - Master Data → **Master Ruangan** → tambahkan semua unit/instalasi
   - Master Data → **Master Distributor** & **Master Prinsipal**
   - Pengaturan → **Pengaturan Periode RKO** → atur jadwal buka/tutup input
   - Master Data → **Manajemen User** → buat akun untuk seluruh pengguna
3. **Monitoring harian**: Dashboard RKO untuk melihat kondisi keseluruhan.
4. **Troubleshooting**: cek Laporan → **Laporan Audit** untuk menelusuri masalah data.

---

## 2. ADMIN

### Deskripsi
Mengelola data master dan konfigurasi sistem. Mirip SUPER_ADMIN, tapi tidak punya akses approval/delegasi.

### Menu yang Bisa Diakses
Semua **kecuali** Approval Edit Penerimaan & Delegasi Approval.

### Cara Penggunaan
1. **Login** dengan akun ADMIN.
2. **Kelola master data**:
   - **Master Barang** (`admin.html`):
     - Tambah barang baru → isi nama, kelas terapi, satuan jual/beli, HPP, prinsipal, gudang (OBAT/BMHP)
     - Edit / nonaktifkan barang yang sudah tidak dipakai
   - **Master Ruangan** (`master-ruangan.html`):
     - Tambah unit → isi nama, jenis (BESAR/KECIL), status aktif
   - **Master Distributor** (`master-distributor.html`):
     - Tambah distributor → isi nama, kontak, lead time default (hari)
   - **Master Prinsipal** (`master-prinsipal.html`):
     - Tambah produsen/pemilik merek
3. **Manajemen User** (`manajemen-user.html`):
   - Buat akun user baru → isi email, nama, role, ruangan (jika `USER`)
   - Reset password user yang lupa
   - Nonaktifkan user yang tidak aktif lagi
4. **Pengaturan Periode RKO** (`pengaturan-rko.html`):
   - Atur tanggal buka & tutup input RKO tiap bulan
   - Paksa tutup periode jika diperlukan

---

## 3. KEPALA_INSTALASI_FARMASI

### Deskripsi
Pimpinan Instalasi Farmasi. Fokus pada **approval**, **verifikasi**, dan **pengawasan** menyeluruh.

### Menu yang Bisa Diakses
- Dashboard RKO, Retur Barang, Riwayat Mutasi, Monitoring RKO
- Usulan Pembelian
- **Approval Edit Penerimaan**, **Delegasi Approval**
- Laporan RKO, Laporan Audit
- Ubah Password

### Cara Penggunaan

**a. Verifikasi Retur Barang**
1. Buka **Retur Barang** (`retur-barang.html`)
2. Filter status = **DITERIMA_DIST**
3. Klik **Verifikasi Selesai** pada retur yang sudah dikonfirmasi distributor
4. Status akan berubah menjadi **SELESAI**

**b. Approval Usulan Pembelian**
1. Buka **Usulan Pembelian** (`usulan-pembelian.html`)
2. Cek usulan berstatus **DIUSULKAN**
3. Review qty, distributor, dan justifikasi
4. **Setujui** → status jadi DISETUJUI, lanjut ke pembuatan PO
5. Atau **Tolak** dengan catatan alasan

**c. Approval Edit Penerimaan**
1. Buka **Approval Edit Penerimaan** (`approval.html`)
2. Lihat permintaan koreksi data penerimaan dari Tim Penerimaan
3. Bandingkan `data_lama` vs `data_baru`
4. **Setujui** atau **Tolak** dengan catatan

**d. Delegasi Approval (saat cuti/dinas)**
1. Buka **Delegasi Approval** (`delegasi-approval.html`)
2. Buat delegasi → pilih penerima (Koordinator), tanggal mulai & berakhir, alasan
3. Selama periode, penerima bisa melakukan approval atas nama Kepala IF

**e. Monitoring Laporan**
- **Laporan RKO** → realisasi vs rencana tahunan
- **Laporan Audit** → semua log mutasi, penerimaan, approval

---

## 4. KOORDINATOR_LOGISTIK_FARMASI

### Deskripsi
Penggerak operasional harian logistik farmasi. Paling banyak memakai menu transaksi.

### Menu yang Bisa Diakses
- Dashboard RKO
- **Retur Barang**, Mutasi ke Ruangan, Riwayat Mutasi, Pemakaian Ruangan, Monitoring RKO
- **Usulan Pembelian**
- **Approval Edit Penerimaan**
- Stok Opname Gudang, Stok Opname Ruangan
- Laporan RKO, Laporan Audit, Rencana per Distributor
- Ubah Password

### Cara Penggunaan

**a. Generate Usulan Pembelian**
1. Buka **Monitoring RKO** untuk melihat barang yang perlu dipesan
2. Buka **Usulan Pembelian** (`usulan-pembelian.html`)
3. Klik **Generate Usulan** → sistem hitung otomatis:
   - Qty RKO total dari semua ruangan
   - Sisa stok ruangan & gudang
   - Buffer & lead time
4. Review hasil → **Kirim ke Kepala IF untuk approval**

**b. Verifikasi Retur Barang**
1. Buka **Retur Barang**
2. Filter status = **DITERIMA_DIST**
3. Klik **Verifikasi Selesai** (jika mendapat delegasi dari Kepala IF)

**c. Pantau Mutasi**
1. Buka **Riwayat Mutasi** (`riwayat-mutasi.html`)
2. Cek log semua mutasi ke ruangan, termasuk koreksi

**d. Stok Opname**
1. Buka **Stok Opname Gudang** → cocokkan stok fisik vs sistem
2. Buka **Stok Opname Ruangan** → verifikasi opname yang diinput USER

---

## 5. PETUGAS_MUTASI_OBAT

### Deskripsi
Petugas yang khusus menangani mutasi **obat** dari gudang ke ruangan.

### Menu yang Bisa Diakses
- Dashboard RKO
- **Mutasi ke Ruangan**, **Riwayat Mutasi**
- Monitoring RKO
- **Stok Opname Gudang**
- Ubah Password

### Cara Penggunaan

**a. Mutasi Obat ke Ruangan**
1. Buka **Mutasi ke Ruangan** (`mutasi-barang.html`)
2. Pilih barang (filter gudang = OBAT)
3. Sistem tampilkan alokasi proporsional berdasarkan RKO tiap ruangan
4. Review qty per ruangan → **Konfirmasi Mutasi**
5. Sistem update `stok_ruangan` & `mutasi_ruangan`

**b. Koreksi Mutasi**
1. Buka **Riwayat Mutasi** (`riwayat-mutasi.html`)
2. Cari mutasi yang perlu dikoreksi → klik **Edit**
3. Isi alasan koreksi → simpan
4. Semua perubahan tercatat di `mutasi_log`

**c. Stok Opname Gudang**
1. Buka **Stok Opname Gudang** (`stok-opname-gudang.html`)
2. Input stok fisik hasil hitung
3. Sistem hitung selisih → catat penyesuaian

---

## 6. PETUGAS_MUTASI_BMHP

### Deskripsi
Sama dengan Petugas Mutasi Obat, tapi khusus **BMHP** (Bahan Medis Habis Pakai).

### Menu yang Bisa Diakses
Sama dengan PETUGAS_MUTASI_OBAT.

### Cara Penggunaan
Sama dengan Petugas Mutasi Obat, hanya berbeda pada **filter gudang = BMHP** di semua form mutasi & opname.

---

## 7. TIM_PENERIMAAN

### Deskripsi
Petugas yang menerima barang datang dari distributor dan mencatat kondisi barang.

### Menu yang Bisa Diakses
- Dashboard RKO
- **Penerimaan Barang**
- **Retur Barang**
- Ubah Password

### Cara Penggunaan

**a. Input Penerimaan Barang**
1. Buka **Penerimaan Barang** (`penerimaan.html`)
2. Pilih PO yang mau diterima
3. Input per barang:
   - Qty diterima (aktual)
   - No. batch
   - Tanggal kadaluarsa
   - Kondisi: **BAIK** / **RUSAK**
   - Jika selisih dengan PO → isi kolom selisih
4. Simpan

**b. Barang Rusak → Retur**
1. Barang dengan kondisi **RUSAK** otomatis punya status `MENUNGGU_RETUR`
2. Buka **Retur Barang** (`retur-barang.html`)
3. Klik **+ Buat Retur Baru**
4. Pilih penerimaan rusak (dropdown menampilkan batch yang belum diretur)
5. Review daftar barang rusak → isi tanggal retur, alasan utama, catatan
6. Klik **Simpan Retur** → status **DRAFT**

**c. Kirim ke Distributor**
1. Di halaman Retur Barang, cari retur status **DRAFT**
2. Klik **Kirim** → isi nomor tanda terima/surat jalan (opsional)
3. Status berubah menjadi **DIKIRIM**

**d. Konfirmasi Distributor Menerima**
1. Setelah distributor konfirmasi terima, klik **Konfirmasi Diterima**
2. Status berubah menjadi **DITERIMA_DIST**
3. Menunggu verifikasi Kepala IF / Koordinator

**e. Batalkan Retur (jika salah input)**
1. Pada status **DRAFT**, klik **Batalkan**
2. Status berubah menjadi **DIBATALKAN**

---

## 8. TIM_PEMBELIAN

### Deskripsi
Petugas yang membuat dan mengelola Purchase Order (PO) ke distributor.

### Menu yang Bisa Diakses
- Dashboard RKO
- **Pembelian (PO)**
- Ubah Password

### Cara Penggunaan

**a. Buat PO dari Usulan yang Disetujui**
1. Buka **Pembelian (PO)** (`pembelian.html`)
2. Filter usulan pembelian berstatus **DISETUJUI**
3. Klik **Buat PO** pada usulan yang mau di-PO-kan
4. Isi:
   - No. PO (auto-generate)
   - Distributor (bisa berbeda dari usulan, dengan alasan)
   - Tanggal PO
   - Qty pesan (dalam satuan beli)
5. Simpan → status PO **DRAFT**

**b. Kirim PO ke Distributor**
1. Review PO draft
2. Klik **Kirim** → status **DIKIRIM**
3. Distributor memproses pengiriman

**c. Update Status PO**
1. Setelah barang diterima (oleh Tim Penerimaan), status PO otomatis ter-update
2. Jika perlu ganti distributor → isi alasan → tercatat di `log_perubahan_distributor`

---

## 9. KEUANGAN

### Deskripsi
Mengelola anggaran, realisasi pembayaran, dan data penjualan farmasi.

### Menu yang Bisa Diakses
- Dashboard RKO
- **Pemakaian Ruangan** (read-only)
- **Keuangan**, **Penjualan Farmasi**
- Laporan RKO, **Rencana per Distributor**
- Ubah Password

### Cara Penggunaan

**a. Input Anggaran**
1. Buka **Keuangan** (`keuangan.html`)
2. Input pagu & DPA per bulan
3. Set target efisiensi (default 90%)

**b. Catat Realisasi Pembayaran**
1. Masih di Keuangan → tab **Realisasi**
2. Input realisasi qty & Rp per barang per bulan
3. Set **status bayar** (BELUM_BAYAR / LUNAS)
4. Isi tanggal bayar, nilai PPN, PPh

**c. Input Penjualan**
1. Buka **Penjualan Farmasi** (`penjualan.html`)
2. Input qty terjual, HPP terjual, harga jual per barang per bulan
3. (Opsional) Upload dari NUHA via Excel

**d. Laporan**
1. Buka **Laporan RKO** → lihat realisasi vs rencana
2. Buka **Rencana per Distributor** → lihat nilai rencana belanja per distributor

---

## 10. USER

### Deskripsi
Pengguna dari unit/ruangan. Fokus pada input RKO dan pemakaian barang di ruangan sendiri.

### Menu yang Bisa Diakses
- **Input RKO Unit** (`user.html`)
- Pemakaian Ruangan
- Monitoring RKO
- Stok Opname Ruangan
- Ubah Password

**Catatan:** User **hanya melihat & mengelola data ruangannya sendiri**. Akses ke ruangan lain dibatasi.

### Cara Penggunaan

**a. Input RKO Bulanan**
1. Login saat periode RKO **terbuka** (sesuai Pengaturan Periode)
2. Buka **Input RKO Unit** (`user.html`)
3. Pilih bulan & tahun
4. Input kebutuhan tiap barang (nama barang + qty + satuan)
5. (Opsional) Input jumlah kunjungan ruangan
6. **Simpan** → data masuk ke tabel `kebutuhan`

**b. Catat Pemakaian Harian**
1. Buka **Pemakaian Ruangan** (`pemakaian-ruangan.html`)
2. Input tanggal pakai + qty pakai per barang
3. Bisa **manual** atau **upload dari NUHA** (Excel)
4. Simpan → sistem update `stok_ruangan`

**c. Monitoring Status RKO**
1. Buka **Monitoring RKO** (`monitoring-rko.html`)
2. Lihat status pelayanan RKO per barang → apakah sudah disetujui, sudah di-PO, sudah diterima, sudah dimutasi

**d. Stok Opname Ruangan**
1. Buka **Stok Opname Ruangan** (`stok-opname-ruangan.html`)
2. Input stok fisik hasil hitung
3. Sistem hitung selisih & update stok

---

## 11. DISTRIBUTOR_VIEW

### Deskripsi
Akses terbatas untuk distributor/pihak eksternal. Hanya bisa melihat **rencana belanja** yang dialokasikan ke mereka.

### Menu yang Bisa Diakses
- Dashboard RKO (read-only)
- **Rencana per Distributor**
- Ubah Password

### Cara Penggunaan

**a. Lihat Rencana Belanja**
1. Buka **Rencana per Distributor** (`distributor.html`)
2. Filter bulan & tahun
3. Lihat daftar barang yang direncanakan dibeli dari distributor Anda
4. (Opsional) Download Excel untuk keperluan internal

**Catatan:** Role ini **tidak bisa** melihat data internal seperti stok, mutasi, atau data keuangan RS.

---

## 🔑 Alur Login & Session

1. Buka `login.html` → input email & password
2. Sistem validasi lewat Supabase Auth
3. Ambil profil dari tabel `users` → simpan di `sessionStorage`
4. Redirect ke `index.html`
5. Menu sidebar difilter sesuai role → hanya yang berhak muncul
6. Aksi cepat (quick actions) juga difilter otomatis

## 🚪 Logout

Klik tombol **Keluar** di pojok kiri bawah sidebar. Session Supabase + `sessionStorage` akan dihapus, lalu redirect ke `login.html`.

## 🔒 Ubah Password

Semua role bisa akses **Akun → Ubah Password** (`ubah-password.html`). Disarankan ganti password secara berkala.

---

## 📞 Dukungan

Kalau menemukan bug atau butuh penambahan hak akses, hubungi:
- **Admin Sistem** (role `ADMIN` atau `SUPER_ADMIN`)

---

**Dokumen ini diperbarui seiring penambahan fitur baru.**  
**Versi:** 1.0 · **Tahun:** 2025–2026