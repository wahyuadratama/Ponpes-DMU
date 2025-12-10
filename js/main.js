// Main JavaScript for Website

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mobileMenu?.classList.add('hidden');
    }
  });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn?.classList.remove('hidden');
  } else {
    scrollTopBtn?.classList.add('hidden');
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Counter Animation
let statsAnimated = false;

function animateCounter(element, target) {
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Animate stats
function animateStats() {
  if (statsAnimated) return;
  
  const stats = getStats();
  
  const siswaEl = document.getElementById('stat-siswa');
  const guruEl = document.getElementById('stat-guru');
  const keahlianEl = document.getElementById('stat-keahlian');
  const prestasiEl = document.getElementById('stat-prestasi');
  
  if (siswaEl) {
    siswaEl.textContent = '0';
    animateCounter(siswaEl, stats.siswa);
  }
  if (guruEl) {
    guruEl.textContent = '0';
    animateCounter(guruEl, stats.guru);
  }
  if (keahlianEl) {
    keahlianEl.textContent = '0';
    animateCounter(keahlianEl, stats.keahlian);
  }
  if (prestasiEl) {
    prestasiEl.textContent = '0';
    animateCounter(prestasiEl, stats.prestasi);
  }
  
  statsAnimated = true;
}

// Setup Intersection Observer for Counter Animation
function setupStatsObserver() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateStats();
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.stat-card')?.parentElement?.parentElement;
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// LocalStorage Manager
class DataManager {
  constructor(key) {
    this.key = key;
  }

  getAll() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  add(item) {
    const data = this.getAll();
    item.id = Date.now();
    item.tanggal = new Date().toISOString();
    data.push(item);
    this.save(data);
    return item;
  }

  update(id, updatedItem) {
    const data = this.getAll();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedItem };
      this.save(data);
      return data[index];
    }
    return null;
  }

  delete(id) {
    const data = this.getAll();
    const filtered = data.filter(item => item.id !== id);
    this.save(filtered);
  }

  getById(id) {
    const data = this.getAll();
    return data.find(item => item.id === id);
  }
}

// Initialize Data Managers
const beritaManager = new DataManager('berita');
const galeriManager = new DataManager('galeri');
const guruManager = new DataManager('guru');
const pesanManager = new DataManager('pesan');

// Initialize Sample Data if Empty
function initSampleData() {
  if (beritaManager.getAll().length === 0) {
    const sampleBerita = [
      {
        judul: 'Penerimaan Siswa Baru 2024/2025',
        kategori: 'Pengumuman',
        status: 'published',
        author: 'Admin',
        excerpt: 'Pendaftaran siswa baru dibuka dengan berbagai program keahlian unggulan',
        konten: 'SMK Darma Mulia membuka pendaftaran siswa baru untuk tahun ajaran 2024/2025. Tersedia berbagai program keahlian unggulan dengan fasilitas modern dan tenaga pengajar profesional.',
        gambar: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
        tags: 'pendaftaran, siswa baru, ppdb'
      },
      {
        judul: 'Juara 1 Lomba Robotik Nasional',
        kategori: 'Prestasi',
        status: 'published',
        author: 'Admin',
        excerpt: 'Tim robotik sekolah meraih prestasi gemilang di kompetisi nasional',
        konten: 'Tim robotik SMK Darma Mulia berhasil meraih juara 1 dalam kompetisi robotik tingkat nasional. Prestasi membanggakan ini merupakan hasil kerja keras dan dedikasi siswa-siswi kami.',
        gambar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        tags: 'prestasi, robotik, juara'
      },
      {
        judul: 'Workshop Digital Marketing',
        kategori: 'Kegiatan',
        status: 'published',
        author: 'Admin',
        excerpt: 'Pelatihan digital marketing untuk meningkatkan kompetensi siswa',
        konten: 'Sekolah mengadakan workshop digital marketing untuk meningkatkan kompetensi siswa di bidang pemasaran digital. Workshop ini menghadirkan praktisi profesional dari industri.',
        gambar: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        tags: 'workshop, digital marketing, pelatihan'
      }
    ];
    sampleBerita.forEach(item => beritaManager.add(item));
  }

  if (galeriManager.getAll().length === 0) {
    const sampleGaleri = [
      { judul: 'Upacara Bendera', deskripsi: 'Upacara bendera rutin setiap Senin', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400' },
      { judul: 'Praktik Komputer', deskripsi: 'Siswa praktik di lab komputer', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400' },
      { judul: 'Kegiatan Olahraga', deskripsi: 'Kegiatan olahraga siswa', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400' },
      { judul: 'Perpustakaan', deskripsi: 'Fasilitas perpustakaan modern', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400' }
    ];
    sampleGaleri.forEach(item => galeriManager.add(item));
  }

  if (guruManager.getAll().length === 0) {
    const sampleGuru = [
      { nama: 'Dr. Ahmad Fauzi, S.Pd., M.Pd', nip: '197501012000031001', mapel: 'Kepala Sekolah', pendidikan: 'S3', foto: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&size=200&background=2563eb&color=fff' },
      { nama: 'Siti Nurhaliza, S.Kom., M.T', nip: '198203152005012002', mapel: 'Wakil Kepala Sekolah', pendidikan: 'S2', foto: 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&size=200&background=10b981&color=fff' },
      { nama: 'Budi Santoso, S.Pd', nip: '198905202010011003', mapel: 'Guru', pendidikan: 'S1', foto: 'https://ui-avatars.com/api/?name=Budi+Santoso&size=200&background=8b5cf6&color=fff' },
      { nama: 'Dewi Lestari, S.E., M.M', nip: '199012252015012004', mapel: 'Guru', pendidikan: 'S2', foto: 'https://ui-avatars.com/api/?name=Dewi+Lestari&size=200&background=f59e0b&color=fff' }
    ];
    sampleGuru.forEach(item => guruManager.add(item));
  }
}

// Load Berita
function loadBerita(limit = 3) {
  const beritaList = document.getElementById('berita-list');
  if (!beritaList) return;

  // Filter hanya berita yang published
  const allBerita = beritaManager.getAll().filter(item => item.status !== 'draft');
  const berita = allBerita.slice(0, limit);
  
  if (berita.length === 0) {
    beritaList.innerHTML = '<p class="text-gray-600 text-center col-span-3">Belum ada berita tersedia.</p>';
    return;
  }

  beritaList.innerHTML = berita.map(item => `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
      <img src="${item.gambar || 'https://via.placeholder.com/400x250'}" alt="${item.judul}" class="w-full h-48 object-cover">
      <div class="p-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-blue-600 font-semibold">${item.kategori}</span>
          ${item.tags ? `<span class="text-xs text-gray-500">${item.tags.split(',')[0].trim()}</span>` : ''}
        </div>
        <h3 class="text-xl font-bold mt-2 mb-3">${item.judul}</h3>
        <p class="text-gray-600 mb-4">${item.excerpt || item.konten.substring(0, 100)}...</p>
        <div class="flex justify-between items-center text-sm">
          <div class="flex items-center gap-3 text-gray-500">
            <span><i class="fas fa-user text-xs"></i> ${item.author || 'Admin'}</span>
            <span><i class="fas fa-calendar text-xs"></i> ${new Date(item.tanggal).toLocaleDateString('id-ID')}</span>
          </div>
          <button onclick="showBeritaDetail(${item.id})" class="text-blue-600 hover:text-blue-800 font-semibold">Baca →</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Load Galeri
function loadGaleri(limit = 8) {
  const galeriList = document.getElementById('galeri-list');
  if (!galeriList) return;

  const galeri = galeriManager.getAll().slice(0, limit);
  
  if (galeri.length === 0) {
    galeriList.innerHTML = '<p class="text-gray-600 text-center col-span-4">Belum ada foto tersedia.</p>';
    return;
  }

  galeriList.innerHTML = galeri.map(item => `
    <div class="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
      <img src="${item.url}" alt="${item.judul}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110">
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
        <div class="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <h4 class="font-bold mb-2">${item.judul}</h4>
          <p class="text-sm">${item.deskripsi || ''}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// Load Guru
function loadGuru(limit = 4) {
  const guruList = document.getElementById('guru-list');
  if (!guruList) return;

  const guru = guruManager.getAll().slice(0, limit);
  
  if (guru.length === 0) {
    guruList.innerHTML = '<p class="text-gray-600 text-center col-span-4">Belum ada data guru tersedia.</p>';
    return;
  }

  guruList.innerHTML = guru.map(item => `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden text-center card-hover">
      <img src="${item.foto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(item.nama) + '&size=200'}" alt="${item.nama}" class="w-full h-48 object-cover">
      <div class="p-6">
        <h3 class="text-lg font-bold mb-2">${item.nama}</h3>
        <p class="text-blue-600 font-semibold mb-1">${item.mapel || item.jabatan || 'Guru'}</p>
        <p class="text-gray-600 text-sm">${item.pendidikan}</p>
      </div>
    </div>
  `).join('');
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    nama: e.target.nama.value,
    email: e.target.email.value,
    subjek: e.target.subjek.value,
    pesan: e.target.pesan.value
  };

  pesanManager.add(formData);
  
  alert('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
  e.target.reset();
});

// Show Berita Detail
function showBeritaDetail(id) {
  const berita = beritaManager.getById(id);
  if (!berita) return;
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
        <h2 class="text-xl font-bold">Detail Berita</h2>
        <button onclick="this.closest('.fixed').remove()" class="text-gray-600 hover:text-gray-800">
          <i class="fas fa-times text-2xl"></i>
        </button>
      </div>
      <div class="p-6">
        ${berita.gambar ? `<img src="${berita.gambar}" alt="${berita.judul}" class="w-full h-64 object-cover rounded-lg mb-4">` : ''}
        <div class="mb-4">
          <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${berita.kategori}</span>
        </div>
        <h1 class="text-3xl font-bold mb-4">${berita.judul}</h1>
        <div class="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-4 border-b">
          <span><i class="fas fa-user mr-1"></i>${berita.author || 'Admin'}</span>
          <span><i class="fas fa-calendar mr-1"></i>${new Date(berita.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        ${berita.excerpt ? `<p class="text-lg text-gray-600 italic border-l-4 border-blue-500 pl-4 mb-6">${berita.excerpt}</p>` : ''}
        <div class="prose max-w-none text-gray-800 whitespace-pre-line leading-relaxed">${berita.konten}</div>
        ${berita.tags ? `<div class="mt-6 pt-6 border-t">
          <p class="text-sm text-gray-600 mb-3"><i class="fas fa-tags mr-2"></i>Tags:</p>
          <div class="flex flex-wrap gap-2">
            ${berita.tags.split(',').map(tag => `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">#${tag.trim()}</span>`).join('')}
          </div>
        </div>` : ''}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Load More Berita
const loadMoreBtn = document.getElementById('load-more-berita');
let currentBeritaLimit = 3;

loadMoreBtn?.addEventListener('click', () => {
  currentBeritaLimit += 3;
  loadBerita(currentBeritaLimit);
  
  if (currentBeritaLimit >= beritaManager.getAll().length) {
    loadMoreBtn.style.display = 'none';
  }
});

// Stats Manager
function getStats() {
  const defaultStats = {
    siswa: 1200,
    guru: 85,
    keahlian: 15,
    prestasi: 50
  };
  const stats = localStorage.getItem('websiteStats');
  if (!stats) {
    // Jika belum ada, simpan default
    localStorage.setItem('websiteStats', JSON.stringify(defaultStats));
    return defaultStats;
  }
  return JSON.parse(stats);
}

function saveStats(stats) {
  localStorage.setItem('websiteStats', JSON.stringify(stats));
}

function updateStatsDisplay() {
  const stats = getStats();
  const siswaEl = document.getElementById('stat-siswa');
  const guruEl = document.getElementById('stat-guru');
  const keahlianEl = document.getElementById('stat-keahlian');
  const prestasiEl = document.getElementById('stat-prestasi');
  
  if (siswaEl) siswaEl.textContent = stats.siswa;
  if (guruEl) guruEl.textContent = stats.guru;
  if (keahlianEl) keahlianEl.textContent = stats.keahlian;
  if (prestasiEl) prestasiEl.textContent = stats.prestasi;
  
  console.log('✅ Stats updated:', stats);
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Website loading...');
  initSampleData();
  loadBerita();
  loadGaleri();
  loadGuru();
  
  // Setup Intersection Observer for stats animation
  setupStatsObserver();
  
  // Check if stats section is already visible on load
  setTimeout(() => {
    const statsSection = document.querySelector('.stat-card')?.parentElement?.parentElement;
    if (statsSection) {
      const rect = statsSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      if (isVisible && !statsAnimated) {
        animateStats();
      }
    }
  }, 300);
  
  console.log('✅ Website loaded!');
});
