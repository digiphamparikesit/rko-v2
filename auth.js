// ============================================================
//  AUTH.JS — Modul autentikasi bersama untuk semua halaman
//  Harus di-load SETELAH Supabase SDK dan client diinisialisasi
// ============================================================

(function() {
  'use strict';

  // Pastikan window.supabase sudah ada (dari tag <script> Supabase SDK di HTML)
  if (!window.supabase) {
    console.error('[AUTH] window.supabase belum diinisialisasi. Pastikan SDK dan client sudah di-load sebelum auth.js.');
    return;
  }

  // ============================================================
  //  AMBIL PROFIL DARI DATABASE
  // ============================================================
  async function fetchProfil(email) {
    const { data, error } = await window.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1);
    if (error) throw error;
    return data && data[0] ? data[0] : null;
  }

  // ============================================================
  //  REQUIRE AUTH — panggil di setiap halaman
  //  Kalau belum login → redirect ke login.html
  //  Kalau sudah login → kembalikan objek user
  //  Opsi: { allowRoles: [...] } untuk membatasi role
  // ============================================================
  async function requireAuth(options) {
    options = options || {};
    const allowRoles = options.allowRoles || null;

    // 1. Cek Supabase Auth session
    let session = null;
    try {
      const res = await window.supabase.auth.getSession();
      session = res.data.session;
    } catch (e) {
      console.warn('[AUTH] getSession gagal:', e);
    }

    if (!session) {
      window.location.href = 'login.html';
      return null;
    }

    // 2. Ambil profil dari sessionStorage; kalau hilang, ambil dari DB
    let user = null;
    try {
      const stored = sessionStorage.getItem('rko_user');
      if (stored) user = JSON.parse(stored);
    } catch (e) {}

    if (!user || !user.role) {
      try {
        const profil = await fetchProfil(session.user.email);
        if (!profil) {
          await window.supabase.auth.signOut();
          window.location.href = 'login.html';
          return null;
        }
        user = {
          id: profil.id,
          auth_id: session.user.id,
          email: profil.email,
          nama: profil.nama,
          role: profil.role,
          ruangan_id: profil.ruangan_id || null,
          active: profil.active !== false
        };
        sessionStorage.setItem('rko_user', JSON.stringify(user));
      } catch (e) {
        console.error('[AUTH] Gagal ambil profil:', e);
        window.location.href = 'login.html';
        return null;
      }
    }

    // 3. Cek akun aktif
    if (user.active === false) {
      alert('Akun Anda dinonaktifkan. Hubungi admin.');
      await window.supabase.auth.signOut();
      sessionStorage.removeItem('rko_user');
      window.location.href = 'login.html';
      return null;
    }

    // 4. Cek role (kalau dibatasi)
    if (allowRoles && !allowRoles.includes(user.role)) {
      alert('Anda tidak memiliki akses ke halaman ini.');
      window.location.href = 'index.html';
      return null;
    }

    // 5. Selesai — set ke global
    window.currentUser = user;
    return user;
  }

  // ============================================================
  //  LOGOUT — panggil dari tombol Keluar
  // ============================================================
  async function logout() {
    if (!confirm('Keluar dari aplikasi?')) return;
    try {
      await window.supabase.auth.signOut();
    } catch (e) {
      console.warn('[AUTH] signOut gagal:', e);
    }
    try { sessionStorage.removeItem('rko_user'); } catch (e) {}
    window.location.href = 'login.html';
  }

  // ============================================================
  //  GET USER — akses cepat ke user yang sudah login
  // ============================================================
  function getUser() {
    return window.currentUser || null;
  }

  // ============================================================
  //  EXPOSE KE GLOBAL
  // ============================================================
  window.auth = {
    requireAuth: requireAuth,
    logout: logout,
    getUser: getUser
  };

  console.log('[AUTH] Modul auth.js siap.');
})();
