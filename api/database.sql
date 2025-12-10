-- Database Setup untuk Pondok Pesantren Modern Darul Mukhlisin

-- Create Database
CREATE DATABASE IF NOT EXISTS pesantren_dmu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pesantren_dmu;

-- Table: guru
CREATE TABLE IF NOT EXISTS guru (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    nip VARCHAR(50) NOT NULL,
    mapel VARCHAR(100),
    pendidikan VARCHAR(50),
    foto TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: berita
CREATE TABLE IF NOT EXISTS berita (
    id INT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(255) NOT NULL,
    kategori VARCHAR(50),
    status VARCHAR(20) DEFAULT 'published',
    author VARCHAR(100),
    excerpt TEXT,
    konten TEXT,
    gambar TEXT,
    tags VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: galeri
CREATE TABLE IF NOT EXISTS galeri (
    id INT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: pesan
CREATE TABLE IF NOT EXISTS pesan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subjek VARCHAR(255),
    pesan TEXT,
    status VARCHAR(20) DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: pendaftaran
CREATE TABLE IF NOT EXISTS pendaftaran (
    id INT PRIMARY KEY AUTO_INCREMENT,
    no_pendaftaran VARCHAR(50) UNIQUE,
    nama VARCHAR(255) NOT NULL,
    nisn VARCHAR(50),
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    jenis_kelamin ENUM('Laki-laki', 'Perempuan'),
    asal_sekolah VARCHAR(255),
    alamat TEXT,
    nama_ortu VARCHAR(255),
    telepon VARCHAR(20),
    email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: users (admin)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255),
    role ENUM('superadmin', 'admin', 'staff') DEFAULT 'admin',
    status ENUM('active', 'inactive') DEFAULT 'active',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: settings
CREATE TABLE IF NOT EXISTS settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, full_name, email, role) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin@darulmukhlisin.sch.id', 'superadmin');

-- Insert default settings
INSERT INTO settings (setting_key, setting_value) VALUES
('siswa_aktif', '1200'),
('guru_profesional', '85'),
('program_keahlian', '15'),
('prestasi', '50'),
('kuota_pendaftaran', '100');

-- Sample data guru
INSERT INTO guru (nama, nip, mapel, pendidikan, foto) VALUES
('Dr. Ahmad Fauzi, S.Pd., M.Pd', '197501012000031001', 'Kepala Sekolah', 'S3', 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&size=200&background=2563eb&color=fff'),
('Siti Nurhaliza, S.Kom., M.T', '198203152005012002', 'Wakil Kepala Sekolah', 'S2', 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&size=200&background=10b981&color=fff'),
('Budi Santoso, S.Pd', '198905202010011003', 'Guru', 'S1', 'https://ui-avatars.com/api/?name=Budi+Santoso&size=200&background=8b5cf6&color=fff'),
('Dewi Lestari, S.E., M.M', '199012252015012004', 'Guru', 'S2', 'https://ui-avatars.com/api/?name=Dewi+Lestari&size=200&background=f59e0b&color=fff');

-- Sample data berita
INSERT INTO berita (judul, kategori, status, author, excerpt, konten, gambar, tags) VALUES
('Penerimaan Siswa Baru 2024/2025', 'Pengumuman', 'published', 'Admin', 'Pendaftaran siswa baru dibuka dengan berbagai program keahlian unggulan', 'Pondok Pesantren Modern Darul Mukhlisin membuka pendaftaran siswa baru untuk tahun ajaran 2024/2025. Tersedia berbagai program keahlian unggulan dengan fasilitas modern dan tenaga pengajar profesional.', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', 'pendaftaran, siswa baru, ppdb'),
('Juara 1 Lomba Robotik Nasional', 'Prestasi', 'published', 'Admin', 'Tim robotik sekolah meraih prestasi gemilang di kompetisi nasional', 'Tim robotik Pondok Pesantren Modern Darul Mukhlisin berhasil meraih juara 1 dalam kompetisi robotik tingkat nasional. Prestasi membanggakan ini merupakan hasil kerja keras dan dedikasi siswa-siswi kami.', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', 'prestasi, robotik, juara');

-- Sample data galeri
INSERT INTO galeri (judul, deskripsi, url) VALUES
('Upacara Bendera', 'Upacara bendera rutin setiap Senin', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400'),
('Praktik Komputer', 'Siswa praktik di lab komputer', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400'),
('Kegiatan Olahraga', 'Kegiatan olahraga siswa', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400'),
('Perpustakaan', 'Fasilitas perpustakaan modern', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400');
