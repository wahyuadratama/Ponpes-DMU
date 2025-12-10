// Admin Dashboard JavaScript

// Data Managers (reuse from main.js)
class DataManager {
  constructor(key) {
    this.key = key;
  }

  getGuru() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  save(data) {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        alert('❌ Penyimpanan penuh!\n\nSolusi:\n1. Hapus beberapa data lama\n2. Gunakan URL foto (bukan upload)\n3. Kompres foto sebelum upload\n4. Clear browser cache');
        throw e;
      }
    }
  }

  getAll() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
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
      data[index] = { ...data[index], ...updatedItem, id };
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

const beritaManager = new DataManager('berita');
const galeriManager = new DataManager('galeri');
const guruManager = new DataManager('guru');
const pesanManager = new DataManager('pesan');

// Sidebar Toggle for Mobile
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

sidebarToggle?.addEventListener('click', () => {
  sidebar.classList.toggle('-translate-x-full');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
  if (window.innerWidth < 1024) {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.add('-translate-x-full');
    }
  }
});





// Navigation
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');

  function switchSection(target, title) {
    // Hide all sections
    contentSections.forEach(section => section.classList.add('hidden'));
    
    // Show target section
    const targetSection = document.getElementById(`${target}-section`);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }
    
    // Update page title
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
      headerTitle.textContent = title;
    }
    
    // Update active nav
    navItems.forEach(nav => nav.classList.remove('active', 'bg-gray-700'));
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const href = item.getAttribute('href');
      if (!href || href === '#') return;
      
      const target = href.substring(1);
      const title = item.querySelector('span')?.textContent || 'Dashboard';
      
      // Update active state
      navItems.forEach(nav => nav.classList.remove('active', 'bg-gray-700'));
      item.classList.add('active', 'bg-gray-700');
      
      // Switch section
      switchSection(target, title);
      
      // Load stats form when pengaturan opened
      if (target === 'pengaturan') {
        setTimeout(loadStatsForm, 100);
      }
      
      // Reload guru table when guru section opened
      if (target === 'guru') {
        setTimeout(loadGuruTable, 100);
      }
      
      console.log(`✅ Navigasi ke: ${title}`);
      
      // Auto-close sidebar on mobile
      if (window.innerWidth < 1024 && sidebar) {
        setTimeout(() => {
          sidebar.classList.add('-translate-x-full');
        }, 100);
      }
    });
  });
  
  // Set dashboard as active by default
  const dashboardNav = document.querySelector('a[href="#dashboard"]');
  if (dashboardNav) {
    dashboardNav.classList.add('active', 'bg-gray-700');
  }
}

// Dashboard Statistics with Animation
function animateNumber(element, target) {
  const duration = 1000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
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

function updateDashboardStats() {
  const totalBerita = document.getElementById('total-berita');
  const totalGaleri = document.getElementById('total-galeri');
  const totalGuru = document.getElementById('total-guru');
  const totalPesan = document.getElementById('total-pesan');
  
  const beritaCount = beritaManager.getAll().length;
  const galeriCount = galeriManager.getAll().length;
  const guruCount = guruManager.getAll().length;
  const pesanCount = pesanManager.getAll().length;
  
  if (totalBerita) animateNumber(totalBerita, beritaCount);
  if (totalGaleri) animateNumber(totalGaleri, galeriCount);
  if (totalGuru) animateNumber(totalGuru, guruCount);
  if (totalPesan) animateNumber(totalPesan, pesanCount);
  
  console.log('📊 Dashboard stats updated:', {
    berita: beritaCount,
    galeri: galeriCount,
    guru: guruCount,
    pesan: pesanCount
  });
}

// Chart.js - Visitor Statistics
function initChart() {
  const ctx = document.getElementById('visitorChart');
  if (!ctx) {
    console.log('⚠️ visitorChart canvas not found');
    return;
  }

  try {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        datasets: [{
          label: 'Pengunjung',
          data: [1200, 1900, 3000, 2500, 3200, 4000],
          borderColor: 'rgb(37, 99, 235)',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart'
        }
      }
    });
    console.log('📊 Chart initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing chart:', error);
  }
}

// Recent Activity
function loadRecentActivity() {
  const activityDiv = document.getElementById('recent-activity');
  if (!activityDiv) return;

  const activities = [
    { icon: 'fa-newspaper', text: 'Berita baru ditambahkan', time: '2 jam yang lalu', color: 'text-blue-600' },
    { icon: 'fa-images', text: 'Foto galeri diupdate', time: '5 jam yang lalu', color: 'text-green-600' },
    { icon: 'fa-user-plus', text: 'Data guru ditambahkan', time: '1 hari yang lalu', color: 'text-purple-600' },
    { icon: 'fa-envelope', text: 'Pesan baru diterima', time: '2 hari yang lalu', color: 'text-yellow-600' }
  ];

  activityDiv.innerHTML = activities.map(activity => `
    <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
      <i class="fas ${activity.icon} ${activity.color} text-xl"></i>
      <div class="flex-1">
        <p class="text-gray-800">${activity.text}</p>
        <p class="text-sm text-gray-500">${activity.time}</p>
      </div>
    </div>
  `).join('');
}

// ===== BERITA CRUD =====
let editingBeritaId = null;

function loadBeritaTable() {
  const table = document.getElementById('berita-table');
  if (!table) {
    console.log('⚠️ berita-table element not found');
    return;
  }

  const berita = beritaManager.getAll();
  console.log('📰 Loading berita table, total:', berita.length);
  
  if (berita.length === 0) {
    table.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-gray-600">Belum ada data berita. Klik tombol "Reset Data Sample" di Dashboard.</td></tr>';
    return;
  }

  table.innerHTML = berita.map(item => `
    <tr class="border-b hover:bg-gray-50">
      <td class="px-4 py-3">
        ${item.judul}
        ${item.tags ? `<div class="text-xs text-gray-500 mt-1">${item.tags.split(',').map(tag => `<span class="bg-gray-100 px-2 py-1 rounded mr-1">#${tag.trim()}</span>`).join('')}</div>` : ''}
      </td>
      <td class="px-4 py-3"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">${item.kategori}</span></td>
      <td class="px-4 py-3">
        <span class="${item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded text-sm">
          ${item.status === 'published' ? '✓ Published' : '📝 Draft'}
        </span>
      </td>
      <td class="px-4 py-3 text-sm text-gray-600">${item.author || 'Admin'}</td>
      <td class="px-4 py-3 text-sm">${new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
      <td class="px-4 py-3 text-center">
        <button onclick="viewBerita(${item.id})" class="text-green-600 hover:text-green-800 mr-2" title="Preview">
          <i class="fas fa-eye"></i>
        </button>
        <button onclick="editBerita(${item.id})" class="text-blue-600 hover:text-blue-800 mr-2" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button onclick="deleteBerita(${item.id})" class="text-red-600 hover:text-red-800" title="Hapus">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

document.getElementById('berita-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  let gambarUrl = document.getElementById('berita-gambar').value;
  const fileInput = document.getElementById('berita-gambar-file');
  
  if (fileInput && fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    gambarUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }
  
  const data = {
    judul: document.getElementById('berita-judul').value,
    kategori: document.getElementById('berita-kategori').value,
    status: document.getElementById('berita-status').value,
    author: document.getElementById('berita-author').value || 'Admin',
    excerpt: document.getElementById('berita-excerpt').value,
    konten: document.getElementById('berita-konten').value,
    gambar: gambarUrl,
    tags: document.getElementById('berita-tags').value
  };

  if (editingBeritaId) {
    beritaManager.update(editingBeritaId, data);
    editingBeritaId = null;
    document.getElementById('cancel-berita').classList.add('hidden');
  } else {
    beritaManager.add(data);
  }

  e.target.reset();
  const preview = document.getElementById('berita-preview');
  if (preview) preview.classList.add('hidden');
  
  // Reload table and stats
  setTimeout(() => {
    loadBeritaTable();
    updateDashboardStats();
  }, 100);
  
  alert('✅ Berita berhasil disimpan!');
  console.log('📰 Berita saved, total now:', beritaManager.getAll().length);
});

function editBerita(id) {
  const berita = beritaManager.getById(id);
  if (!berita) return;

  document.getElementById('berita-id').value = id;
  document.getElementById('berita-judul').value = berita.judul;
  document.getElementById('berita-kategori').value = berita.kategori;
  document.getElementById('berita-status').value = berita.status || 'published';
  document.getElementById('berita-author').value = berita.author || '';
  document.getElementById('berita-excerpt').value = berita.excerpt || '';
  document.getElementById('berita-konten').value = berita.konten;
  document.getElementById('berita-gambar').value = berita.gambar || '';
  document.getElementById('berita-tags').value = berita.tags || '';
  
  editingBeritaId = id;
  document.getElementById('cancel-berita').classList.remove('hidden');
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function viewBerita(id) {
  const berita = beritaManager.getById(id);
  if (!berita) return;
  
  const modal = document.getElementById('message-modal');
  const content = document.getElementById('modal-content');
  
  content.innerHTML = `
    <div class="prose max-w-none">
      <div class="mb-4">
        ${berita.gambar ? `<img src="${berita.gambar}" alt="${berita.judul}" class="w-full h-64 object-cover rounded-lg mb-4">` : ''}
        <h2 class="text-2xl font-bold mb-2">${berita.judul}</h2>
        <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span><i class="fas fa-user mr-1"></i>${berita.author || 'Admin'}</span>
          <span><i class="fas fa-calendar mr-1"></i>${new Date(berita.tanggal).toLocaleDateString('id-ID')}</span>
          <span class="${berita.status === 'published' ? 'text-green-600' : 'text-yellow-600'}">
            <i class="fas fa-circle text-xs mr-1"></i>${berita.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${berita.kategori}</span>
      </div>
      ${berita.excerpt ? `<p class="text-gray-600 italic border-l-4 border-blue-500 pl-4 mb-4">${berita.excerpt}</p>` : ''}
      <div class="text-gray-800 whitespace-pre-line">${berita.konten}</div>
      ${berita.tags ? `<div class="mt-4 pt-4 border-t">
        <p class="text-sm text-gray-600 mb-2">Tags:</p>
        ${berita.tags.split(',').map(tag => `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mr-2">#${tag.trim()}</span>`).join('')}
      </div>` : ''}
    </div>
  `;
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function deleteBerita(id) {
  if (confirm('Yakin ingin menghapus berita ini?')) {
    beritaManager.delete(id);
    loadBeritaTable();
    updateDashboardStats();
  }
}

document.getElementById('cancel-berita')?.addEventListener('click', () => {
  document.getElementById('berita-form').reset();
  editingBeritaId = null;
  document.getElementById('cancel-berita').classList.add('hidden');
});

// ===== GALERI CRUD =====
let editingGaleriId = null;

function loadGaleriGrid() {
  const grid = document.getElementById('galeri-grid');
  if (!grid) {
    console.log('⚠️ galeri-grid element not found');
    return;
  }

  const galeri = galeriManager.getAll();
  console.log('🖼️ Loading galeri grid, total:', galeri.length);
  
  if (galeri.length === 0) {
    grid.innerHTML = '<p class="text-center text-gray-600 col-span-4">Belum ada foto galeri. Klik tombol "Reset Data Sample" di Dashboard.</p>';
    return;
  }

  grid.innerHTML = galeri.map(item => `
    <div class="relative group">
      <img src="${item.url}" alt="${item.judul}" class="w-full h-48 object-cover rounded-lg">
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all rounded-lg flex items-center justify-center">
        <div class="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
          <button onclick="editGaleri(${item.id})" class="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="deleteGaleri(${item.id})" class="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <p class="text-sm font-semibold mt-2">${item.judul}</p>
    </div>
  `).join('');
}

document.getElementById('galeri-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  let imageUrl = document.getElementById('galeri-url').value;
  const fileInput = document.getElementById('galeri-file');
  
  if (fileInput && fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    imageUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }
  
  const data = {
    judul: document.getElementById('galeri-judul').value,
    deskripsi: document.getElementById('galeri-deskripsi').value,
    url: imageUrl
  };

  if (editingGaleriId) {
    galeriManager.update(editingGaleriId, data);
    editingGaleriId = null;
    document.getElementById('cancel-galeri').classList.add('hidden');
  } else {
    galeriManager.add(data);
  }

  e.target.reset();
  const preview = document.getElementById('galeri-preview');
  if (preview) preview.classList.add('hidden');
  
  setTimeout(() => {
    loadGaleriGrid();
    updateDashboardStats();
  }, 100);
  
  alert('✅ Galeri berhasil disimpan!');
  console.log('🖼️ Galeri saved, total now:', galeriManager.getAll().length);
});

function editGaleri(id) {
  const galeri = galeriManager.getById(id);
  if (!galeri) return;

  document.getElementById('galeri-id').value = id;
  document.getElementById('galeri-judul').value = galeri.judul;
  document.getElementById('galeri-deskripsi').value = galeri.deskripsi || '';
  document.getElementById('galeri-url').value = galeri.url;
  
  editingGaleriId = id;
  document.getElementById('cancel-galeri').classList.remove('hidden');
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteGaleri(id) {
  if (confirm('Yakin ingin menghapus foto ini?')) {
    galeriManager.delete(id);
    loadGaleriGrid();
    updateDashboardStats();
  }
}

document.getElementById('cancel-galeri')?.addEventListener('click', () => {
  document.getElementById('galeri-form').reset();
  editingGaleriId = null;
  document.getElementById('cancel-galeri').classList.add('hidden');
});

// ===== GURU CRUD =====
let editingGuruId = null;

function loadGuruTable() {
  const table = document.getElementById('guru-table');
  if (!table) {
    console.log('⚠️ Guru table not found');
    return;
  }

  const guru = guruManager.getAll();
  console.log('👥 Loading guru table, total:', guru.length);
  
  if (guru.length === 0) {
    table.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-600">Belum ada data guru</td></tr>';
    return;
  }

  table.innerHTML = guru.map(item => `
    <tr class="border-b hover:bg-gray-50">
      <td class="px-4 py-3">${item.nama}</td>
      <td class="px-4 py-3">${item.nip}</td>
      <td class="px-4 py-3">${item.mapel || item.jabatan || '-'}</td>
      <td class="px-4 py-3">${item.pendidikan || '-'}</td>
      <td class="px-4 py-3 text-center">
        <button onclick="editGuru(${item.id})" class="text-blue-600 hover:text-blue-800 mr-2">
          <i class="fas fa-edit"></i>
        </button>
        <button onclick="deleteGuru(${item.id})" class="text-red-600 hover:text-red-800">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

document.getElementById('guru-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('📝 Form guru submitted');
  
  let fotoUrl = document.getElementById('guru-foto').value;
  const fileInput = document.getElementById('guru-foto-file');
  
  if (fileInput && fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    
    // Check file size (max 10MB)
    if (file.size > 10000000) {
      alert('⚠️ Ukuran foto terlalu besar! Maksimal 10MB.');
      return;
    }
    
    fotoUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }
  
  // Generate default avatar if no photo provided
  const namaGuru = document.getElementById('guru-nama').value;
  if (!fotoUrl) {
    fotoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(namaGuru)}&size=200&background=random&color=fff`;
  }
  
  const data = {
    nama: namaGuru,
    nip: document.getElementById('guru-nip').value,
    mapel: document.getElementById('guru-mapel').value,
    pendidikan: document.getElementById('guru-pendidikan').value,
    foto: fotoUrl
  };
  
  console.log('📊 Data guru:', data);

  if (editingGuruId) {
    guruManager.update(editingGuruId, data);
    console.log('✏️ Updated guru:', editingGuruId);
    editingGuruId = null;
    document.getElementById('cancel-guru').classList.add('hidden');
  } else {
    const result = guruManager.add(data);
    console.log('➕ Added guru:', result);
  }

  e.target.reset();
  const preview = document.getElementById('guru-foto-preview');
  if (preview) preview.classList.add('hidden');
  
  setTimeout(() => {
    loadGuruTable();
    updateDashboardStats();
  }, 100);
  
  alert('✅ Data guru berhasil disimpan!');
  console.log('👨‍🏫 Guru saved, total now:', guruManager.getAll().length);
});

function editGuru(id) {
  const guru = guruManager.getById(id);
  if (!guru) return;

  document.getElementById('guru-id').value = id;
  document.getElementById('guru-nama').value = guru.nama;
  document.getElementById('guru-nip').value = guru.nip;
  document.getElementById('guru-mapel').value = guru.mapel;
  document.getElementById('guru-pendidikan').value = guru.pendidikan || '';
  document.getElementById('guru-foto').value = guru.foto || '';
  
  editingGuruId = id;
  document.getElementById('cancel-guru').classList.remove('hidden');
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteGuru(id) {
  if (confirm('Yakin ingin menghapus data guru ini?')) {
    guruManager.delete(id);
    loadGuruTable();
    updateDashboardStats();
  }
}

document.getElementById('cancel-guru')?.addEventListener('click', () => {
  document.getElementById('guru-form').reset();
  editingGuruId = null;
  document.getElementById('cancel-guru').classList.add('hidden');
});

// ===== PESAN =====
function loadPesanTable() {
  const table = document.getElementById('pesan-table');
  if (!table) return;

  const pesan = pesanManager.getAll();
  
  if (pesan.length === 0) {
    table.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-600">Belum ada pesan masuk</td></tr>';
    return;
  }

  table.innerHTML = pesan.map(item => `
    <tr class="border-b hover:bg-gray-50">
      <td class="px-4 py-3">${item.nama}</td>
      <td class="px-4 py-3">${item.email}</td>
      <td class="px-4 py-3">${item.subjek}</td>
      <td class="px-4 py-3">${new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
      <td class="px-4 py-3 text-center">
        <button onclick="viewPesan(${item.id})" class="text-blue-600 hover:text-blue-800 mr-2">
          <i class="fas fa-eye"></i>
        </button>
        <button onclick="deletePesan(${item.id})" class="text-red-600 hover:text-red-800">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function viewPesan(id) {
  const pesan = pesanManager.getById(id);
  if (!pesan) return;

  const modal = document.getElementById('message-modal');
  const content = document.getElementById('modal-content');
  
  content.innerHTML = `
    <div>
      <p class="text-gray-600 mb-2"><strong>Dari:</strong> ${pesan.nama}</p>
      <p class="text-gray-600 mb-2"><strong>Email:</strong> ${pesan.email}</p>
      <p class="text-gray-600 mb-2"><strong>Subjek:</strong> ${pesan.subjek}</p>
      <p class="text-gray-600 mb-4"><strong>Tanggal:</strong> ${new Date(pesan.tanggal).toLocaleString('id-ID')}</p>
      <div class="border-t pt-4">
        <p class="text-gray-800">${pesan.pesan}</p>
      </div>
    </div>
  `;
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function deletePesan(id) {
  if (confirm('Yakin ingin menghapus pesan ini?')) {
    pesanManager.delete(id);
    loadPesanTable();
    updateDashboardStats();
  }
}

document.getElementById('close-modal')?.addEventListener('click', () => {
  const modal = document.getElementById('message-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
});

// Reset Sample Data
window.resetSampleData = function() {
  if (confirm('Reset semua data ke sample awal? Data yang ada akan dihapus!')) {
    localStorage.removeItem('berita');
    localStorage.removeItem('galeri');
    localStorage.removeItem('guru');
    
    // Re-initialize sample data
    const sampleBerita = [
      {
        id: Date.now(),
        tanggal: new Date().toISOString(),
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
        id: Date.now() + 1,
        tanggal: new Date().toISOString(),
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
        id: Date.now() + 2,
        tanggal: new Date().toISOString(),
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
    
    const sampleGaleri = [
      { id: Date.now(), tanggal: new Date().toISOString(), judul: 'Upacara Bendera', deskripsi: 'Upacara bendera rutin setiap Senin', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400' },
      { id: Date.now() + 1, tanggal: new Date().toISOString(), judul: 'Praktik Komputer', deskripsi: 'Siswa praktik di lab komputer', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400' },
      { id: Date.now() + 2, tanggal: new Date().toISOString(), judul: 'Kegiatan Olahraga', deskripsi: 'Kegiatan olahraga siswa', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400' },
      { id: Date.now() + 3, tanggal: new Date().toISOString(), judul: 'Perpustakaan', deskripsi: 'Fasilitas perpustakaan modern', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400' }
    ];
    
    const sampleGuru = [
      { id: Date.now(), tanggal: new Date().toISOString(), nama: 'Dr. Ahmad Fauzi, S.Pd., M.Pd', nip: '197501012000031001', mapel: 'Kepala Sekolah', pendidikan: 'S3', foto: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&size=200&background=2563eb&color=fff' },
      { id: Date.now() + 1, tanggal: new Date().toISOString(), nama: 'Siti Nurhaliza, S.Kom., M.T', nip: '198203152005012002', mapel: 'Wakil Kepala Sekolah', pendidikan: 'S2', foto: 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&size=200&background=10b981&color=fff' },
      { id: Date.now() + 2, tanggal: new Date().toISOString(), nama: 'Budi Santoso, S.Pd', nip: '198905202010011003', mapel: 'Guru', pendidikan: 'S1', foto: 'https://ui-avatars.com/api/?name=Budi+Santoso&size=200&background=8b5cf6&color=fff' },
      { id: Date.now() + 3, tanggal: new Date().toISOString(), nama: 'Dewi Lestari, S.E., M.M', nip: '199012252015012004', mapel: 'Guru', pendidikan: 'S2', foto: 'https://ui-avatars.com/api/?name=Dewi+Lestari&size=200&background=f59e0b&color=fff' }
    ];
    
    beritaManager.save(sampleBerita);
    galeriManager.save(sampleGaleri);
    guruManager.save(sampleGuru);
    
    loadBeritaTable();
    loadGaleriGrid();
    loadGuruTable();
    updateDashboardStats();
    
    alert('Data sample berhasil direset!');
  }
};

// ===== PENGATURAN STATS =====
function getWebsiteStats() {
  const defaultStats = {
    siswa: 1200,
    guru: 85,
    keahlian: 15,
    prestasi: 50
  };
  const stats = localStorage.getItem('websiteStats');
  if (!stats) {
    localStorage.setItem('websiteStats', JSON.stringify(defaultStats));
    return defaultStats;
  }
  return JSON.parse(stats);
}

function saveWebsiteStats(stats) {
  localStorage.setItem('websiteStats', JSON.stringify(stats));
}

function loadStatsForm() {
  const stats = getWebsiteStats();
  const siswaInput = document.getElementById('stat-siswa-input');
  const guruInput = document.getElementById('stat-guru-input');
  const keahlianInput = document.getElementById('stat-keahlian-input');
  const prestasiInput = document.getElementById('stat-prestasi-input');
  
  if (siswaInput) siswaInput.value = stats.siswa;
  if (guruInput) guruInput.value = stats.guru;
  if (keahlianInput) keahlianInput.value = stats.keahlian;
  if (prestasiInput) prestasiInput.value = stats.prestasi;
}

document.getElementById('stats-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const stats = {
    siswa: parseInt(document.getElementById('stat-siswa-input').value),
    guru: parseInt(document.getElementById('stat-guru-input').value),
    keahlian: parseInt(document.getElementById('stat-keahlian-input').value),
    prestasi: parseInt(document.getElementById('stat-prestasi-input').value)
  };
  
  saveWebsiteStats(stats);
  alert('Statistik berhasil diupdate! Perubahan akan terlihat di website.');
});

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎯 Initializing admin panel...');
  
  // Check if data exists, if not initialize sample data
  const hasData = beritaManager.getAll().length > 0 || 
                  galeriManager.getAll().length > 0 || 
                  guruManager.getAll().length > 0;
  
  if (!hasData) {
    console.log('📦 No data found, initializing sample data...');
    // Call the reset function to populate sample data
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
        konten: 'Tim robotik SMK Darma Mulia berhasil meraih juara 1 dalam kompetisi robotik tingkat nasional.',
        gambar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        tags: 'prestasi, robotik, juara'
      }
    ];
    
    const sampleGaleri = [
      { judul: 'Upacara Bendera', deskripsi: 'Upacara bendera rutin setiap Senin', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400' },
      { judul: 'Praktik Komputer', deskripsi: 'Siswa praktik di lab komputer', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400' },
      { judul: 'Kegiatan Olahraga', deskripsi: 'Kegiatan olahraga siswa', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400' },
      { judul: 'Perpustakaan', deskripsi: 'Fasilitas perpustakaan modern', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400' }
    ];
    
    const sampleGuru = [
      { nama: 'Dr. Ahmad Fauzi, S.Pd., M.Pd', nip: '197501012000031001', mapel: 'Kepala Sekolah', pendidikan: 'S3', foto: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&size=200&background=2563eb&color=fff' },
      { nama: 'Siti Nurhaliza, S.Kom., M.T', nip: '198203152005012002', mapel: 'Wakil Kepala Sekolah', pendidikan: 'S2', foto: 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&size=200&background=10b981&color=fff' },
      { nama: 'Budi Santoso, S.Pd', nip: '198905202010011003', mapel: 'Guru', pendidikan: 'S1', foto: 'https://ui-avatars.com/api/?name=Budi+Santoso&size=200&background=8b5cf6&color=fff' }
    ];
    
    sampleBerita.forEach(item => beritaManager.add(item));
    sampleGaleri.forEach(item => galeriManager.add(item));
    sampleGuru.forEach(item => guruManager.add(item));
    
    console.log('✅ Sample data initialized!');
  }
  
  initNavigation();
  
  // Load all data after initialization
  setTimeout(() => {
    updateDashboardStats();
    loadBeritaTable();
    loadGaleriGrid();
    loadGuruTable();
    loadPesanTable();
    loadStatsForm();
    
    console.log('✅ All data loaded successfully!');
    console.log('📊 Berita:', beritaManager.getAll().length);
    console.log('📊 Galeri:', galeriManager.getAll().length);
    console.log('📊 Guru:', guruManager.getAll().length);
  }, 100);
  
  initChart();
  loadRecentActivity();
  
  console.log('💡 Klik menu di sidebar untuk navigasi');
});
