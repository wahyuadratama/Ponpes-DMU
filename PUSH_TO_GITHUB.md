# Panduan Push ke GitHub

## Langkah-langkah:

### 1. Inisialisasi Git (jika belum)
```bash
git init
```

### 2. Tambahkan semua file
```bash
git add .
```

### 3. Commit perubahan
```bash
git commit -m "Initial commit: Website Pondok Pesantren Modern Darul Mukhlisin"
```

### 4. Tambahkan remote repository
```bash
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
```
*Ganti USERNAME dan NAMA-REPO dengan milik Anda*

### 5. Push ke GitHub
```bash
git branch -M main
git push -u origin main
```

## Atau jika sudah ada repository:

```bash
git add .
git commit -m "Update: Tambah halaman program KMI, Ihya Al-Quran, dan Life Skills"
git push
```

## File yang sudah dibersihkan:
- ✅ Hapus index-backup.html
- ✅ Hapus test-admin.html  
- ✅ Hapus admin-api.html
- ✅ Hapus admin-api.js
- ✅ Hapus admin-full-api.js
- ✅ Update .gitignore

## Struktur File Final:
```
WEBSITE SEKOLAH DMU/
├── api/                    # Backend PHP (opsional)
├── assets/images/          # Gambar & logo
├── css/                    # Styling
├── js/                     # JavaScript
├── uploads/                # Folder upload (ignored)
├── index.html              # Halaman utama
├── login.html              # Login admin
├── admin.html              # Dashboard admin
├── program-kmi.html        # Detail Program KMI
├── program-ihya.html       # Detail Program Ihya
├── program-lifeskills.html # Detail Program Life Skills
├── README.md               # Dokumentasi
└── LICENSE                 # Lisensi
```

## Deploy ke GitHub Pages:
1. Buka repository di GitHub
2. Settings → Pages
3. Source: Deploy from branch
4. Branch: main / (root)
5. Save
6. Website akan live di: https://USERNAME.github.io/NAMA-REPO/
