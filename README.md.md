# RKO RSAMP — Sistem Rencana Kebutuhan Obat & BMHP

Aplikasi web untuk mengelola **Rencana Kebutuhan Obat (RKO)** dan **BMHP** di Rumah Sakit. Mencakup perencanaan, pengadaan, penerimaan, mutasi ke ruangan, pemakaian, hingga pelaporan dan audit.

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Arsitektur & Teknologi](#-arsitektur--teknologi)
- [Peran Pengguna (Role)](#-peran-pengguna-role)
- [Alur Kerja Utama](#-alur-kerja-utama)
- [Struktur Database](#-struktur-database)
- [Struktur Proyek](#-struktur-proyek)
- [Cara Menjalankan](#-cara-menjalankan)
- [Konvensi Kode](#-konvensi-kode)
- [Modul & Halaman](#-modul--halaman)

---

## ✨ Fitur Utama

| Modul | Deskripsi |
|---|---|
| **Dashboard** | Ringkasan rencana, realisasi, dan efisiensi RKO |
| **Input RKO Unit** | Input kebutuhan obat & BMHP per ruangan |
| **Monitoring RKO** | Status pelayanan RKO per barang |
| **Usulan Pembelian** | Generate usulan otomatis dari RKO + stok, dengan alur approval |
| **Pembelian (PO)** | Buat & kelola Purchase Order ke distributor |
| **Penerimaan Barang** | Pencocokan barang datang vs PO, termasuk penanganan barang rusak |
| **Retur Barang** | Pengembalian barang rusak ke distributor |
| **Mutasi ke Ruangan** | Distribusi barang dari gudang ke ruangan proporsional RKO |
| **Pemakaian Ruangan** | Input manual / upload data pemakaian dari NUHA |
| **Stok Opname** | Penyesuaian stok fisik gudang & ruangan |
| **Keuangan** | Anggaran, realisasi pembayaran, PPN/PPh |
| **Penjualan Farmasi** | Data penjualan obat dari NUHA |
| **Laporan** | Laporan RKO tahunan, audit trail, rencana per distributor |
| **Approval & Delegasi** | Approval edit data + delegasi sementara |

---

## 🏗 Arsitektur & Teknologi

| Layer | Teknologi |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (no framework) |
| **Backend / Database** | [Supabase](https://supabase.com/) (PostgreSQL + Auth) |
| **CDN Libraries** | `@supabase/supabase-js@2`, `xlsx@0.18.5` |
| **Autentikasi** | Supabase Auth (email + password) |

Aplikasi ini **single-page-per-file**: setiap modul adalah satu file HTML mandiri yang mengimpor `css/style.css` dan `auth.js`.

---

## 👥 Peran Pengguna (Role)

| Role | Kode | Akses Utama |
|---|---|---|
| Super Admin | `SUPER_ADMIN` | Semua modul |
| Admin | `ADMIN` | Semua modul |
| Kepala Instalasi Farmasi | `KEPALA_INSTALASI_FARMASI` | Approval, laporan, verifikasi |
| Koordinator Logistik Farmasi | `KOORDINATOR_LOGISTIK_FARMASI` | Operasional harian, approval |
| Petugas Mutasi Obat | `PETUGAS_MUTASI_OBAT` | Mutasi ke ruangan (obat) |
| Petugas Mutasi BMHP | `PETUGAS_MUTASI_BMHP` | Mutasi ke ruangan (BMHP) |
| Tim Penerimaan | `TIM_PENERIMAAN` | Penerimaan barang, retur |
| Tim Pembelian | `TIM_PEMBELIAN` | PO, pembelian |
| Keuangan | `KEUANGAN` | Anggaran, realisasi, laporan |
| User (Unit) | `USER` | Input RKO unit, pemakaian ruangan |
| Distributor View | `DISTRIBUTOR_VIEW` | Hanya lihat rencana per distributor |

---

## 🔄 Alur Kerja Utama

### 1. Alur RKO → Pengadaan → Penerimaan → Mutasi

```
[USER] Input RKO Unit (per ruangan, per bulan)
        ↓
[KOORDINATOR] Monitoring RKO → Generate Usulan Pembelian
        ↓
[KEPALA IF] Approval Usulan → Pemilihan Distributor
        ↓
[TIM PEMBELIAN] Buat PO ke Distributor
        ↓
[TIM PENERIMAAN] Terima barang → cocokkan vs PO
        ↓
[PETUGAS MUTASI] Distribusi ke ruangan proporsional RKO
        ↓
[USER] Catat pemakaian ruangan
```

### 2. Alur Retur Barang Rusak

```
[TIM PENERIMAAN] Terima barang → ada yang RUSAK
                    ↓
        Status penerimaan: MENUNGGU_RETUR
                    ↓
[RETUR BARANG]  Halaman retur-barang.html:
  ├─ Lihat daftar barang rusak
  ├─ Buat "Surat Retur" (nomor retur, tanggal)
  ├─ Catat pengiriman ke distributor
  └─ Catat nomor tanda terima dari distributor
                    ↓
[KOORDINATOR/KEPALA IF] Verifikasi retur selesai
```

**Status retur:**

```
DRAFT → DIKIRIM → DITERIMA_DIST → SELESAI
  ↓        ↓
  DIBATALKAN
```

| Status | Arti | Aksi Berikutnya |
|---|---|---|
| `DRAFT` | Baru dibuat, belum dikirim | Kirim / Batalkan |
| `DIKIRIM` | Sudah dikirim ke distributor | Konfirmasi diterima |
| `DITERIMA_DIST` | Distributor konfirmasi terima | Verifikasi selesai |
| `SELESAI` | Terverifikasi final | — |
| `DIBATALKAN` | Retur dibatalkan | — |

---

## 🗄 Struktur Database

### Tabel Master

| Tabel | Deskripsi |
|---|---|
| `master_barang` | Data obat & BMHP (nama, kelas terapi, satuan, HPP, prinsipal) |
| `master_ruangan` | Data unit/instalasi (jenis: BESAR / KECIL) |
| `master_distributor` | Data distributor/pemasok + lead time default |
| `master_prinsipal` | Data produsen/pemilik merek |
| `users` | Data pengguna + role + relasi ke Supabase Auth |

### Tabel Transaksi

| Tabel | Deskripsi |
|---|---|
| `kebutuhan` | Kebutuhan per ruangan (RKO unit) |
| `barang_ruangan` | Barang yang aktif di ruangan tertentu |
| `stok_opname` | Stok fisik gudang hasil opname |
| `stok_ruangan` | Stok per ruangan per bulan |
| `rencana_belanja` | Rencana belanja per distributor |
| `anggaran` | Pagu & DPA per bulan |
| `realisasi` | Realisasi pembelian & status bayar |
| `penjualan` | Data penjualan farmasi |
| `kunjungan` | Jumlah kunjungan per ruangan |
| `pemakaian_ruangan` | Pemakaian barang per ruangan per tanggal |
| `pembelian` | Purchase Order (PO) |
| `penerimaan` | Penerimaan barang + kondisi (BAIK/RUSAK) |
| `usulan_pembelian` | Usulan pembelian + alur approval |

### Tabel Mutasi

| Tabel | Deskripsi |
|---|---|
| `mutasi_ruangan` | Header mutasi ke ruangan |
| `mutasi_ruangan_detail` | Detail alokasi per ruangan |
| `mutasi_log` | Log perubahan mutasi (audit trail) |

### Tabel Retur & Approval

| Tabel | Deskripsi |
|---|---|
| `retur_barang` | Header surat retur |
| `retur_barang_detail` | Detail barang yang diretur |
| `approval_request` | Permintaan approval (mis. edit penerimaan) |
| `delegasi_approval` | Delegasi hak approval sementara |
| `penerimaan_log` | Log perubahan penerimaan |
| `pembelian_log` | Log perubahan pembelian |
| `log_perubahan_distributor` | Log pergantian distributor |
| `periode_rko` | Pengaturan periode buka/tutup RKO |

### Field Penting: `penerimaan`

| Field | Nilai | Keterangan |
|---|---|---|
| `kondisi` | `BAIK`, `RUSAK` | Kondisi barang saat diterima |
| `status_rusak` | `MENUNGGU_RETUR`, `SUDAH_RETUR`, `DIMUSNAHKAN` | Status penanganan barang rusak |
| `group_id` | text | Pengelompokan barang dalam 1 kali penerimaan |
| `no_batch` | text | Nomor batch barang |
| `sudah_diproses` | boolean | Sudah masuk alur mutasi? |
| `sudah_dimutasi` | boolean | Sudah dimutasi ke ruangan? |

---

## 📁 Struktur Proyek

```
rko-v2/
├── index.html                    # Menu utama (sidebar + aksi cepat)
├── login.html                    # Halaman login
├── dashboard.html                # Dashboard RKO
├── user.html                     # Input RKO unit
├── monitoring-rko.html           # Monitoring RKO
├── usulan-pembelian.html         # Usulan pembelian
├── pembelian.html                # PO ke distributor
├── penerimaan.html               # Penerimaan barang
├── retur-barang.html             # ★ Retur barang rusak
├── mutasi-barang.html            # Mutasi ke ruangan
├── riwayat-mutasi.html           # Riwayat mutasi
├── pemakaian-ruangan.html        # Pemakaian ruangan
├── stok-opname-gudang.html       # Stok opname gudang
├── stok-opname-ruangan.html      # Stok opname ruangan
├── keuangan.html                 # Keuangan
├── penjualan.html                # Penjualan farmasi
├── laporan.html                  # Laporan RKO
├── laporan-audit.html            # Laporan audit
├── distributor.html              # Rencana per distributor
├── approval.html                 # Approval edit penerimaan
├── delegasi-approval.html        # Delegasi approval
├── admin.html                    # Master barang
├── master-ruangan.html           # Master ruangan
├── master-distributor.html       # Master distributor
├── master-prinsipal.html         # Master prinsipal
├── manajemen-user.html           # Manajemen user
├── pengaturan-rko.html           # Pengaturan periode RKO
├── ubah-password.html            # Ubah password
├── auth.js                       # ★ Helper autentikasi & session
├── css/
│   └── style.css                 # ★ Global stylesheet
└── README.md
```

★ = file inti yang dipakai bersama

---

## 🚀 Cara Menjalankan

### Prasyarat

- Web browser modern (Chrome, Edge, Firefox, Safari)
- Akun Supabase aktif
- (Opsional) Server statis lokal untuk menghindari masalah CORS pada beberapa browser

### Langkah

1. **Clone repo:**
   ```bash
   git clone https://github.com/digiphamparikesit/rko-v2.git
   cd rko-v2
   ```

2. **Konfigurasi Supabase:**
   
   Di setiap file HTML, sudah ada konfigurasi Supabase:
   ```javascript
   const SUPABASE_URL = 'https://xxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJ...';
   ```
   Ganti dengan URL & anon key milik Anda jika menggunakan project Supabase yang berbeda.

3. **Jalankan server statis:**
   
   Opsi A — Python:
   ```bash
   python -m http.server 8000
   ```
   
   Opsi B — Node.js (`npx`):
   ```bash
   npx serve .
   ```
   
   Opsi C — Langsung buka `index.html` di browser (beberapa fitur seperti auth mungkin butuh server).

4. **Buka di browser:**
   ```
   http://localhost:8000
   ```

5. **Login** dengan akun yang sudah terdaftar di tabel `users` + Supabase Auth.

---

## 📐 Konvensi Kode

### CSS

- **Design tokens** di `:root` (warna, spacing, font)
- **Naming**: kebab-case (`.sidebar-item`, `.stat-card`)
- **Modifier**: dipisah titik (`.badge.draft`, `.btn.btn-primary`)
- **Layout**: grid & flexbox, mobile-responsive

### JavaScript

- **Vanilla JS** — tidak ada framework
- **Function global** untuk event handler HTML (`window.namaFungsi = ...`)
- **Async/await** untuk semua query Supabase
- **Helper universal**:
  - `escapeHtml(str)` — sanitasi teks
  - `formatTanggal(iso)` — format `dd Mmm yyyy`
  - `fetchAllRows(table, buildQuery)` — pagination otomatis (1000 baris/halaman)

### Struktur File HTML

```html
<head>
  <link rel="stylesheet" href="css/style.css">
  <script src="supabase-js"></script>
  <script src="auth.js"></script>
  <style>/* CSS khusus halaman */</style>
</head>
<body>
  <header class="topbar">...</header>
  <main>...</main>
  <!-- modal -->
  <script>/* logika halaman */</script>
</body>
```

### Badge & Warna

| Kelas | Warna | Kegunaan |
|---|---|---|
| `.badge.draft` | Abu | Draft / netral |
| `.badge.dikirim` | Amber | Menunggu proses |
| `.badge.diterima` | Biru | Info |
| `.badge.selesai` | Hijau | Sukses / selesai |
| `.badge.batal` / `.badge.rusak` | Coral | Error / batal |

---

## 📚 Modul & Halaman

### Transaksi Harian

- **Input RKO Unit** (`user.html`) — user mengisi kebutuhan per ruangan
- **Pembelian** (`pembelian.html`) — tim pembelian membuat PO
- **Penerimaan** (`penerimaan.html`) — tim penerimaan mencatat barang datang
- **Retur Barang** (`retur-barang.html`) — kelola barang rusak ke distributor
- **Mutasi ke Ruangan** (`mutasi-barang.html`) — distribusi proporsional RKO
- **Pemakaian Ruangan** (`pemakaian-ruangan.html`) — catat pemakaian harian

### Pengadaan & Approval

- **Usulan Pembelian** (`usulan-pembelian.html`) — generate usulan dari RKO + stok
- **Approval Edit Penerimaan** (`approval.html`) — approve koreksi data
- **Delegasi Approval** (`delegasi-approval.html`) — delegasi sementara

### Master Data

- **Master Barang** (`admin.html`)
- **Master Ruangan** (`master-ruangan.html`)
- **Master Distributor** (`master-distributor.html`)
- **Master Prinsipal** (`master-prinsipal.html`)
- **Manajemen User** (`manajemen-user.html`)

### Stok & Keuangan

- **Stok Opname Gudang** (`stok-opname-gudang.html`)
- **Stok Opname Ruangan** (`stok-opname-ruangan.html`)
- **Keuangan** (`keuangan.html`)
- **Penjualan** (`penjualan.html`)

### Laporan

- **Laporan RKO** (`laporan.html`)
- **Laporan Audit** (`laporan-audit.html`)
- **Rencana per Distributor** (`distributor.html`)

### Pengaturan

- **Pengaturan Periode RKO** (`pengaturan-rko.html`)
- **Ubah Password** (`ubah-password.html`)

---

## 🔐 Autentikasi

Autentikasi dikelola lewat `auth.js` (helper) + Supabase Auth.

**Contoh penggunaan di halaman:**

```javascript
(async function() {
  const user = await window.auth.requireAuth({
    allowRoles: ['TIM_PENERIMAAN', 'ADMIN', 'SUPER_ADMIN']
  });
  if (!user) return;
  // lanjut inisialisasi halaman
})();
```

`requireAuth()` akan:
1. Cek session Supabase
2. Ambil profil user dari tabel `users`
3. Validasi role terhadap `allowRoles`
4. Redirect ke `login.html` jika tidak valid
5. Return object user (`id`, `nama`, `role`, `email`, `ruangan_id`)

---

## 📝 Catatan Pengembangan

### Menambah Halaman Baru

1. Duplikat struktur `index.html` (header + sidebar) atau halaman lain
2. Tambahkan entry ke `MENU_GROUPS` di `index.html`:
   ```javascript
   { name: 'Nama Menu', desc: 'Deskripsi', icon: '🎯', color: 'blue',
     url: 'halaman-baru.html', ready: true,
     roles: ['SUPER_ADMIN', 'ADMIN'] }
   ```
3. (Opsional) tambahkan ke `quickPriority` di `renderQuickActions()`

### Menambah Kolom Database

1. Update schema di Supabase
2. Update query `fetchAllRows()` di halaman terkait
3. Update UI (tabel, modal, form)

### Menambah Badge di Sidebar

```javascript
updateSidebarBadge('nama-halaman.html', jumlah);
```

---

## 🐛 Troubleshooting

| Masalah | Solusi |
|---|---|
| Login gagal | Pastikan user ada di tabel `users` + email sama dengan Supabase Auth |
| Menu tidak muncul | Cek role user di `MENU_GROUPS` item yang sesuai |
| Modal muncul di bawah | Pastikan CSS modal punya `position: fixed` + `z-index` > `100` |
| Data tidak muncul | Cek RLS (Row Level Security) policy di Supabase |
| Badge tidak tampil | Cek fungsi `renderSidebarBadges()` / `renderReturBadge()` di console |

---

## 📄 Lisensi

Internal — RS AM Parikesit. Tidak untuk distribusi publik tanpa izin.

---

**Dikembangkan untuk:** RS AM Parikesit  
**Tahun:** 2025–2026