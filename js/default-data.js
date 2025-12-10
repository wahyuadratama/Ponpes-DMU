// Default Data untuk Website
// File ini akan menginisialisasi data default saat pertama kali website dibuka

(function () {
  "use strict";

  // Cek apakah data sudah pernah diinisialisasi
  const isInitialized = localStorage.getItem("dataInitialized");

  if (!isInitialized) {
    console.log("🔄 Initializing default data...");

    // Default Berita
    const defaultBerita = [
      {
        id: 1704067200000,
        tanggal: "2025-12-01T00:00:00.000Z",
        judul: "Pendaftaran Santri Baru 2026/2027",
        kategori: "Pengumuman",
        status: "published",
        author: "Zaenal Wahyudin",
        excerpt:
          "Pendaftaran santri baru dibuka dengan berbagai program unggulan",
        konten:
          "Pondok Pesantren Modern Darul Mukhlisin membuka pendaftaran santri baru untuk tahun ajaran 2024/2025. Tersedia program KMI, Ihya Al-Quran, dan Life Skills dengan fasilitas modern dan tenaga pengajar profesional. Kuota terbatas, segera daftarkan putra-putri Anda!",
        gambar: "assets/images/brosur 1.jpg",
        tags: "pendaftaran, santri baru, ppdb",
      },
      {
        id: 1704153600000,
        tanggal: "2025-12-02T00:00:00.000Z",
        judul: "Keberangkatan Alumni Ke Al-Azhar Mesir",
        kategori: "Prestasi",
        status: "published",
        author: "Zaenal Wahyudin",
        excerpt:
          "Alumni Pondok Pesantren Darul Mukhlisin melanjutkan studi ke Al-Azhar Mesir",
        konten:
          "Alhamdulillah, beberapa alumni Pondok Pesantren Modern Darul Mukhlisin berhasil diterima dan berangkat melanjutkan studi ke Universitas Al-Azhar Mesir. Prestasi membanggakan ini merupakan bukti kualitas pendidikan di pesantren kami.",
        gambar: "assets/images/b6.jpg",
        tags: "alumni, al-azhar, prestasi",
      },
      {
        id: 1704240000000,
        tanggal: "2025-12-03T00:00:00.000Z",
        judul: "Rapat 10 Tahun Pondok",
        kategori: "Kegiatan",
        status: "published",
        author: "Zaenal Wahyudin",
        excerpt:
          "Peringatan 10 tahun berdirinya Pondok Pesantren Darul Mukhlisin",
        konten:
          "Pondok Pesantren Modern Darul Mukhlisin mengadakan rapat dan peringatan 10 tahun berdirinya pesantren. Acara dihadiri oleh pengurus yayasan, pimpinan pondok, ustadz, dan alumni untuk mengevaluasi dan merencanakan program ke depan.",
        gambar: "assets/images/b5.jpg",
        tags: "rapat, anniversary, 10 tahun",
      },
      {
        id: 1704326400000,
        tanggal: "2025-12-04T00:00:00.000Z",
        judul: "Kegiatan Pramuka",
        kategori: "Kegiatan",
        status: "published",
        author: "Zaenal Wahyudin",
        excerpt:
          "Santri mengikuti kegiatan pramuka untuk melatih kedisiplinan dan kemandirian",
        konten:
          "Kegiatan pramuka menjadi salah satu ekstrakurikuler wajib di Pondok Pesantren Modern Darul Mukhlisin. Melalui pramuka, santri dilatih untuk disiplin, mandiri, dan memiliki jiwa kepemimpinan yang kuat.",
        gambar: "assets/images/b3.jpg",
        tags: "pramuka, ekstrakurikuler, kegiatan",
      },
      {
        id: 1704412800000,
        tanggal: "2025-08-05T00:00:00.000Z",
        judul: "Kajian Rutin",
        kategori: "Kegiatan",
        status: "published",
        author: "Zaenal Wahyudin",
        excerpt: "Kajian rutin untuk memperdalam ilmu agama",
        konten:
          "Pondok Pesantren Modern Darul Mukhlisin mengadakan kajian rutin setiap minggu untuk memperdalam pemahaman santri tentang ilmu agama. Kajian dipimpin langsung oleh ustadz senior dengan materi yang aplikatif.",
        gambar: "assets/images/b4.jpg",
        tags: "kajian, ilmu agama, rutin",
      },
      {
        id: 1704499200000,
        tanggal: "2025-09-06T00:00:00.000Z",
        judul: "Tatapan Lensa: Santri DMU Mengikuti Jambore Dunia",
        kategori: "Prestasi",
        status: "published",
        author: "Zaenal Wahyudin",
        excerpt: "Santri Darul Mukhlisin mewakili Indonesia di Jambore Dunia",
        konten:
          "Santri Pondok Pesantren Modern Darul Mukhlisin terpilih mewakili Indonesia dalam kegiatan Jambore Dunia. Kegiatan ini menjadi ajang untuk memperkenalkan budaya Indonesia dan menjalin persahabatan dengan peserta dari berbagai negara.",
        gambar: "assets/images/b1.jpg",
        tags: "jambore, dunia, prestasi",
      },
    ];

    // Default Galeri
    const defaultGaleri = [
      {
        id: 1704067200001,
        tanggal: "2025-06-01T00:00:00.000Z",
        judul: "Kegiatan Kajian Menjelang Berbuka",
        deskripsi:
          "Suasana kajian sore santri bersama bapak pimpinan sebelum berbuka puasa",
        url: "assets/images/b4.jpg",
      },
      {
        id: 1704067200002,
        tanggal: "2025-05-01T00:00:00.000Z",
        judul: "Rapat 10 Tahun Pondok",
        deskripsi:
          "Rapat persiapan memperingati 10 tahun berdirinya Pondok Pesantren Modern Darul Mukhlisin",
        url: "assets/images/b5.jpg",
      },
      {
        id: 1704067200003,
        tanggal: "2025-12-01T00:00:00.000Z",
        judul: "Keberangkatan alumni ke Al-Azhar",
        deskripsi:
          "Alumni ke-4 Pondok Pesantren Modern Darul Mukhlisin berangkat ke Al-Azhar Mesir untuk melanjutkan studi",
        url: "assets/images/b6.jpg",
      },
      {
        id: 1704067200004,
        tanggal: "2025-12-01T00:00:00.000Z",
        judul: "Tasyakuran",
        deskripsi:
          "Tasyakuran dan doa untuk alumni yang berangkat ke Al-Azhar Mesir",
        url: "assets/images/b7.jpg",
      },
      {
        id: 1704067200005,
        tanggal: "2025-04-01T00:00:00.000Z",
        judul: "Kegiatan Pesantren",
        deskripsi: "Berbagai kegiatan positif di lingkungan pesantren",
        url: "assets/images/b8.jpg",
      },
      {
        id: 1704067200006,
        tanggal: "2025-10-01T00:00:00.000Z",
        judul: "Santri menikmati MBG",
        deskripsi: "Suasana santri menikmati makanan bergizi",
        url: "assets/images/b9.jpg",
      },
      {
        id: 1704067200007,
        tanggal: "2025-09-01T00:00:00.000Z",
        judul: "Kegiatan Santri",
        deskripsi: "Dokumentasi kegiatan santri sehari-hari",
        url: "assets/images/b10.jpg",
      },
      {
        id: 1704067200008,
        tanggal: "2025-11-01T00:00:00.000Z",
        judul: "Masjid Pesantren",
        deskripsi: "Masjid Pondok Pesantren Modern Darul Mukhlisin",
        url: "assets/images/masjid.JPG",
      },
    ];

    // Default Guru
    const defaultGuru = [
      {
        id: 1704067200001,
        tanggal: "2025-12-01T00:00:00.000Z",
        nama: "Al-Ustadz Dwi Saputro, S.PdI.",
        nip: "197501012000031001",
        Jabatan: "Pimpinan Pondok",
        pendidikan: "S1 Pendidikan Agama Islam",
        foto: "https://ui-avatars.com/api/?name=Dwi+Saputro&size=200&background=00b7b5&color=fff&bold=true",
      },
      {
        id: 1704067200002,
        tanggal: "2025-12-01T00:00:00.000Z",
        nama: "Ustadz Aflah Gusman, S.E",
        nip: "198203152005012002",
        Jabatan: "Direktur KMI",
        pendidikan: "S1 Ekonomi Syariah",
        foto: "https://ui-avatars.com/api/?name=Ahmad+Fauzi&size=200&background=2563eb&color=fff&bold=true",
      },
      {
        id: 1704067200003,
        tanggal: "2025-12-01T00:00:00.000Z",
        nama: "Al-Ustadz Ahmad Saepudin, S.Pd",
        nip: "198905202010011003",
        Jabatan: "Kepala Pengasuhan Putri",
        pendidikan: "S1 Pendidikan Agama Islam",
        foto: "https://ui-avatars.com/api/?name=Siti+Fatimah&size=200&background=10b981&color=fff&bold=true",
      },
      {
        id: 1704067200004,
        tanggal: "2025-12-01T00:00:00.000Z",
        nama: "Al-Ustadz Hudaebi, S.H",
        nip: "199012252015012004",
        Jabatan: "Sekretaris Pimpinan",
        pendidikan: "S1 Hukum",
        foto: "https://ui-avatars.com/api/?name=Muhammad+Ridwan&size=200&background=8b5cf6&color=fff&bold=true",
      },
    ];

    // Simpan ke localStorage
    localStorage.setItem("berita", JSON.stringify(defaultBerita));
    localStorage.setItem("galeri", JSON.stringify(defaultGaleri));
    localStorage.setItem("guru", JSON.stringify(defaultGuru));

    // Tandai bahwa data sudah diinisialisasi
    localStorage.setItem("dataInitialized", "true");

    console.log("✅ Default data initialized successfully!");
    console.log("📰 Berita:", defaultBerita.length);
    console.log("🖼️ Galeri:", defaultGaleri.length);
    console.log("👨🏫 Guru:", defaultGuru.length);
  } else {
    console.log("✅ Data already initialized");
  }
})();
