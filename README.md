# Website Pondok Pesantren Modern Darul Mukhlisin

Website resmi Pondok Pesantren Modern Darul Mukhlisin dengan sistem manajemen konten dan pendaftaran siswa baru online.

## 🚀 Fitur Utama

### Frontend (Website Publik)
- ✅ Beranda dengan statistik pesantren
- ✅ Profil (Visi & Misi)
- ✅ Pendaftaran Online dengan sistem kuota
- ✅ Berita dengan kategori
- ✅ Galeri foto kegiatan
- ✅ Profil tenaga pendidik
- ✅ Form kontak
- ✅ Responsif (Mobile, Tablet, Desktop)

### Backend (Admin Dashboard)
- ✅ Dashboard statistik
- ✅ Manajemen Berita (CRUD)
- ✅ Manajemen Galeri (CRUD)
- ✅ Manajemen Guru (CRUD)
- ✅ Data Pendaftar
- ✅ Pesan Masuk
- ✅ Pengaturan Statistik
- ✅ Multi-user dengan role (Superadmin, Admin, Staff)

## 🛠️ Teknologi

- **HTML5** - Struktur semantic
- **Tailwind CSS** - Styling modern
- **JavaScript (Vanilla)** - Interaktivitas
- **PHP** - Backend API
- **MySQL** - Database
- **LocalStorage** - Alternatif penyimpanan lokal

## 📁 Struktur Folder

```
WEBSITE SEKOLAH DMU/
├── index.html              # Halaman utama
├── login.html              # Login admin
├── admin.html              # Dashboard admin (LocalStorage)
├── admin-api.html          # Dashboard admin (PHP Backend)
├── css/
│   ├── input.css          # Input Tailwind
│   ├── output.css         # Output Tailwind
│   └── style.css          # Custom CSS
├── js/
│   ├── main.js            # JavaScript utama
│   ├── auth.js            # Autentikasi
│   ├── admin.js           # Admin LocalStorage
│   ├── admin-api.js       # Admin PHP (Guru only)
│   ├── admin-full-api.js  # Admin PHP (Full modules)
│   └── registration.js    # Pendaftaran
├── api/
│   ├── config.php         # Konfigurasi database
│   ├── database.sql       # Schema database
│   ├── guru.php           # API Guru
│   ├── berita.php         # API Berita
│   ├── galeri.php         # API Galeri
│   ├── pesan.php          # API Pesan
│   └── upload.php         # Upload foto
├── assets/
│   └── images/            # Gambar
└── uploads/               # Folder upload (auto-created)
```

## 🚀 Instalasi

### Mode 1: LocalStorage (Tanpa Server)

1. Buka `index.html` di browser
2. Login admin: `admin.html`
   - Username: `admin`
   - Password: `admin123`

### Mode 2: PHP Backend (Dengan Database)

1. **Install XAMPP**
   - Download dari https://www.apachefriends.org/

2. **Setup Database**
   ```bash
   # Buka phpMyAdmin (http://localhost/phpmyadmin)
   # Buat database: pesantren_dmu
   # Import file: api/database.sql
   ```

3. **Konfigurasi**
   - Edit `api/config.php` sesuai database Anda

4. **Copy Project**
   ```bash
   # Copy folder ke: C:\xampp\htdocs\pesantren-dmu\
   ```

5. **Akses Website**
   - Website: http://localhost/pesantren-dmu/
   - Admin: http://localhost/pesantren-dmu/admin-api.html
   - Login: `superadmin` / `Super@dmin123`

## 📝 Penggunaan

### Mengelola Konten

1. **Login Admin**
   - Buka `login.html` atau klik "Login" di website
   - Masukkan username & password

2. **Tambah Berita**
   - Dashboard → Berita → Tambah Berita
   - Isi form → Simpan

3. **Tambah Galeri**
   - Dashboard → Galeri → Tambah Foto
   - Upload foto atau masukkan URL → Simpan

4. **Tambah Guru**
   - Dashboard → Guru → Tambah Guru
   - Isi data guru → Simpan

5. **Lihat Pendaftar**
   - Dashboard → Pendaftar
   - Lihat data pendaftar baru

6. **Pengaturan**
   - Dashboard → Pengaturan
   - Update statistik website

### Upload Foto

- **Maksimal ukuran**: 10MB
- **Format**: JPG, PNG, GIF
- **Cara 1**: Upload file langsung
- **Cara 2**: Masukkan URL foto

## 🔒 Keamanan

**Mode LocalStorage:**
- Data tersimpan di browser lokal
- Cocok untuk demo/testing
- Tidak memerlukan server

**Mode PHP Backend:**
- Data tersimpan di database MySQL
- Validasi input server-side
- Upload file dengan validasi
- Session management
- Untuk production, tambahkan HTTPS

## 🎨 Kustomisasi

### Ubah Warna
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#00B7B5', // Warna utama
  }
}
```

### Ubah Logo
Ganti file: `assets/images/LOGO DMU.png`

### Ubah Nama Pesantren
Edit di `index.html` dan `admin.html`

## 📱 Responsif

Website otomatis menyesuaikan untuk:
- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🚀 Deployment

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
# Settings → Pages → Deploy
```

### Netlify / Vercel
- Drag & drop folder
- Atau connect GitHub repository
- Deploy otomatis

### Hosting PHP
- Upload semua file ke hosting
- Import database.sql
- Update config.php dengan kredensial hosting
- Akses website

## 📞 Support

Untuk pertanyaan atau bantuan:
- Baca dokumentasi ini
- Cek console browser (F12) untuk error
- Pastikan JavaScript enabled

## 📝 Lisensi

Free to use untuk keperluan pendidikan dan non-komersial.

## 🎉 Credits

Dibuat dengan ❤️ untuk Pondok Pesantren Modern Darul Mukhlisin

---

**Version**: 1.0.0  
**Last Updated**: 2024
