// Authentication System
// Sistem autentikasi dengan multiple users dan roles

class AuthSystem {
  constructor() {
    this.storageKey = 'admin_users';
    this.initDefaultUsers();
  }

  // Initialize default users (Super Admin)
  initDefaultUsers() {
    const users = this.getAllUsers();
    if (users.length === 0) {
      // Create default super admin
      const superAdmin = {
        id: Date.now(),
        username: 'superadmin',
        password: 'Super@dmin123', // GANTI DI PRODUCTION!
        fullName: 'Super Administrator',
        email: 'superadmin@darulmukhlisin.sch.id',
        role: 'superadmin',
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: null
      };
      this.saveUser(superAdmin);
      console.log('✅ Super Admin created');
    }
  }

  // Get all users
  getAllUsers() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Save user
  saveUser(user) {
    const users = this.getAllUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Update user
  updateUser(userId, updates) {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      return true;
    }
    return false;
  }

  // Delete user
  deleteUser(userId) {
    const users = this.getAllUsers();
    const filtered = users.filter(u => u.id !== userId);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }

  // Login
  login(username, password) {
    const users = this.getAllUsers();
    const user = users.find(u => 
      u.username === username && 
      u.password === password &&
      u.status === 'active'
    );

    if (user) {
      // Update last login
      this.updateUser(user.id, { lastLogin: new Date().toISOString() });

      // Set session
      sessionStorage.setItem('adminLoggedIn', 'true');
      sessionStorage.setItem('adminUserId', user.id);
      sessionStorage.setItem('adminUsername', user.username);
      sessionStorage.setItem('adminRole', user.role);
      sessionStorage.setItem('adminFullName', user.fullName);
      sessionStorage.setItem('loginTime', new Date().toISOString());

      return { success: true, user };
    }

    return { success: false, message: 'Username atau password salah!' };
  }

  // Logout
  logout() {
    sessionStorage.clear();
  }

  // Check if logged in
  isLoggedIn() {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
  }

  // Get current user
  getCurrentUser() {
    if (!this.isLoggedIn()) return null;

    const userId = parseInt(sessionStorage.getItem('adminUserId'));
    const users = this.getAllUsers();
    return users.find(u => u.id === userId);
  }

  // Check role
  hasRole(role) {
    const currentRole = sessionStorage.getItem('adminRole');
    if (role === 'superadmin') {
      return currentRole === 'superadmin';
    }
    if (role === 'admin') {
      return ['superadmin', 'admin'].includes(currentRole);
    }
    if (role === 'staff') {
      return ['superadmin', 'admin', 'staff'].includes(currentRole);
    }
    return false;
  }

  // Register new user (only superadmin/admin can do this)
  register(userData) {
    const currentRole = sessionStorage.getItem('adminRole');
    
    // Only superadmin and admin can register new users
    if (!['superadmin', 'admin'].includes(currentRole)) {
      return { success: false, message: 'Anda tidak memiliki akses untuk mendaftarkan user baru!' };
    }

    // Check if username already exists
    const users = this.getAllUsers();
    if (users.find(u => u.username === userData.username)) {
      return { success: false, message: 'Username sudah digunakan!' };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      username: userData.username,
      password: userData.password,
      fullName: userData.fullName,
      email: userData.email,
      role: userData.role,
      status: 'active',
      createdAt: new Date().toISOString(),
      createdBy: sessionStorage.getItem('adminUsername'),
      lastLogin: null
    };

    this.saveUser(newUser);
    return { success: true, message: 'User berhasil didaftarkan!', user: newUser };
  }

  // Get users by role
  getUsersByRole(role) {
    const users = this.getAllUsers();
    return users.filter(u => u.role === role);
  }

  // Change password
  changePassword(userId, oldPassword, newPassword) {
    const users = this.getAllUsers();
    const user = users.find(u => u.id === userId);

    if (!user) {
      return { success: false, message: 'User tidak ditemukan!' };
    }

    if (user.password !== oldPassword) {
      return { success: false, message: 'Password lama salah!' };
    }

    this.updateUser(userId, { password: newPassword });
    return { success: true, message: 'Password berhasil diubah!' };
  }
}

// Export instance
const authSystem = new AuthSystem();
