// Registration System with Google Sheets Integration

// KONFIGURASI GOOGLE SHEETS
// Ganti dengan URL Google Apps Script Web App Anda
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

// Kuota maksimal pendaftar
const MAX_KUOTA = 100;

// Data Manager untuk Pendaftaran
class RegistrationManager {
  constructor() {
    this.key = 'pendaftaran';
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
    item.tanggal_daftar = new Date().toISOString();
    item.no_pendaftaran = 'REG' + Date.now();
    data.push(item);
    this.save(data);
    return item;
  }

  count() {
    return this.getAll().length;
  }
}

const registrationManager = new RegistrationManager();

// Update Counter Pendaftar
function updatePendaftarCounter() {
  const total = registrationManager.count();
  const sisaKuota = MAX_KUOTA - total;
  
  // Update di stats section
  const totalEl = document.getElementById('total-pendaftar');
  const kuotaEl = document.getElementById('kuota-tersisa');
  const displayEl = document.getElementById('display-pendaftar');
  const displayKuotaEl = document.getElementById('display-kuota');
  
  if (totalEl) totalEl.textContent = total;
  if (kuotaEl) kuotaEl.textContent = sisaKuota;
  if (displayEl) displayEl.textContent = total;
  if (displayKuotaEl) displayKuotaEl.textContent = MAX_KUOTA;
}

// Submit ke Google Sheets
async function submitToGoogleSheets(data) {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return { success: false, error: error.message };
  }
}

// Form Handler
document.getElementById('registration-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Check kuota
  if (registrationManager.count() >= MAX_KUOTA) {
    alert('Maaf, kuota pendaftaran sudah penuh!');
    return;
  }
  
  // Get form data
  const formData = new FormData(e.target);
  const data = {
    nama: formData.get('nama'),
    nisn: formData.get('nisn'),
    tempat_lahir: formData.get('tempat_lahir'),
    tanggal_lahir: formData.get('tanggal_lahir'),
    jenis_kelamin: formData.get('jenis_kelamin'),
    asal_sekolah: formData.get('asal_sekolah'),
    alamat: formData.get('alamat'),
    nama_ortu: formData.get('nama_ortu'),
    telepon: formData.get('telepon'),
    email: formData.get('email') || '-'
  };
  
  // Show loading
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Mengirim...';
  submitBtn.disabled = true;
  
  // Save to localStorage
  const registration = registrationManager.add(data);
  
  // Submit to Google Sheets (if configured)
  if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
    await submitToGoogleSheets({
      ...data,
      no_pendaftaran: registration.no_pendaftaran,
      tanggal_daftar: new Date(registration.tanggal_daftar).toLocaleString('id-ID')
    });
  }
  
  // Update counter
  updatePendaftarCounter();
  
  // Reset form
  e.target.reset();
  
  // Show success message
  submitBtn.innerHTML = originalText;
  submitBtn.disabled = false;
  
  alert(`Pendaftaran Berhasil!\n\nNo. Pendaftaran: ${registration.no_pendaftaran}\n\nSilakan simpan nomor pendaftaran Anda untuk keperluan verifikasi.`);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updatePendaftarCounter();
  
  // Update counter setiap 30 detik (untuk simulasi realtime)
  setInterval(updatePendaftarCounter, 30000);
});
