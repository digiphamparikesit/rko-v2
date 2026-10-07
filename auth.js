// ============================================================
//  AUTH.JS — Modul autentikasi bersama untuk semua halaman
//  Harus di-load SETELAH Supabase SDK dan client diinisialisasi
// ============================================================

(function() {
  'use strict';

  if (!window.supabase) {
    console.error('[AUTH] window.supabase belum diinisialisasi.');
    return;
  }

  // ============================================================
  //  NOTIFIKASI — role yang boleh lihat badge
  // ============================================================
  const NOTIF_ALLOW_ROLES = ['SUPER_ADMIN', 'ADMIN', 'KOORDINATOR_LOGISTIK_FARMASI', 'KEPALA_INSTALASI_FARMASI'];

  async function fetchNotifCounts() {
    const role = window.currentUser && window.currentUser.role;
    if (!role || !NOTIF_ALLOW_ROLES.includes(role)) return null;
    try {
      const [usulanRes, approvalRes] = await Promise.all([
        window.supabase.from('usulan_pembelian').select('*', { count: 'exact', head: true }).eq('status', 'DIUSULKAN'),
        window.supabase.from('approval_request').select('*', { count: 'exact', head: true }).eq('status', 'PENDING')
      ]);
      return {
        usulan: usulanRes.count || 0,
        approval: approvalRes.count || 0,
        total: (usulanRes.count || 0) + (approvalRes.count || 0)
      };
    } catch (err) {
      console.warn('[NOTIF] fetch gagal:', err);
      return null;
    }
  }

  function ensureNotifStyles() {
    if (document.getElementById('notifWidgetStyles')) return;
    const style = document.createElement('style');
    style.id = 'notifWidgetStyles';
    style.textContent = `
      .notif-widget {
        position: relative;
        display: inline-block;
      }
      .notif-btn {
        width: 38px; height: 38px;
        border-radius: 9px;
        border: 1px solid rgba(255,255,255,0.25);
        background: rgba(255,255,255,0.12);
        color: #fff;
        cursor: pointer;
        position: relative;
        display: inline-flex; align-items: center; justify-content: center;
        transition: background 0.15s;
        padding: 0;
        font-size: 17px;
        line-height: 1;
      }
      .notif-btn:hover { background: rgba(255,255,255,0.22); }
      .notif-btn.has-notif {
        background: rgba(220, 91, 69, 0.9);
        border-color: rgba(220, 91, 69, 1);
      }
      .notif-badge {
        position: absolute;
        top: -6px; right: -6px;
        min-width: 18px; height: 18px;
        padding: 0 5px;
        border-radius: 999px;
        background: #DC5B45;
        color: #fff;
        font-size: 10.5px;
        font-weight: 700;
        display: flex; align-items: center; justify-content: center;
        border: 2px solid #0F3D2E;
        line-height: 1;
        box-sizing: border-box;
      }
      .notif-dropdown {
        display: none;
        position: absolute;
        top: 46px; right: 0;
        width: 320px;
        background: #fff;
        border: 1px solid #E4EAE5;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        overflow: hidden;
        z-index: 200;
      }
      .notif-dropdown.show { display: block; }
      .notif-dropdown-head {
        padding: 12px 16px;
        background: #FAFBFA;
        border-bottom: 1px solid #E4EAE5;
        font-weight: 700;
        font-size: 13px;
        color: #14201A;
      }
      .notif-item {
        display: flex; gap: 12px; align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid #E4EAE5;
        text-decoration: none;
        color: #14201A;
        transition: background 0.15s;
      }
      .notif-item:last-child { border-bottom: none; }
      .notif-item:hover { background: #F1FAF4; }
      .notif-item .notif-icon {
        width: 36px; height: 36px;
        border-radius: 9px;
        background: #E7F5EC;
        display: flex; align-items: center; justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
      }
      .notif-item .notif-text { flex: 1; min-width: 0; }
      .notif-item .notif-title {
        font-size: 13px; font-weight: 600; line-height: 1.3;
      }
      .notif-item .notif-sub {
        font-size: 11px; color: #6B7A72; margin-top: 2px;
      }
      .notif-empty {
        padding: 24px 16px;
        text-align: center;
        color: #6B7A72;
        font-size: 12.5px;
      }
      .notif-refresh {
        padding: 10px 16px;
        text-align: center;
        border-top: 1px solid #E4EAE5;
        background: #FAFBFA;
      }
      .notif-refresh button {
        background: none; border: none;
        color: #16A34A;
        font-size: 12.5px; font-weight: 600;
        cursor: pointer;
        font-family: inherit;
      }
      .notif-refresh button:hover { text-decoration: underline; }
      @media (max-width: 600px) {
        .notif-dropdown { width: 280px; right: -40px; }
      }
    `;
    document.head.appendChild(style);
  }

  function injectNotifWidget() {
    const role = window.currentUser && window.currentUser.role;
    if (!role || !NOTIF_ALLOW_ROLES.includes(role)) return;

    const path = window.location.pathname.toLowerCase();
    if (path.includes('index.html') || path.includes('login.html')) return;

    if (document.getElementById('notifWidget')) return;

    ensureNotifStyles();

    const widget = document.createElement('div');
    widget.id = 'notifWidget';
    widget.className = 'notif-widget';
    widget.innerHTML = `
      <button class="notif-btn" id="notifBtn">
        🔔
        <span class="notif-badge" id="notifBadge" style="display:none;">0</span>
      </button>
      <div class="notif-dropdown" id="notifDropdown">
        <div class="notif-dropdown-head">Notifikasi</div>
        <div id="notifList"><div class="notif-empty">Memuat...</div></div>
        <div class="notif-refresh">
          <button id="notifRefreshBtn">⟳ Refresh</button>
        </div>
      </div>
    `;

    const topbarRight = document.querySelector('.topbar-right');
    if (topbarRight) {
      topbarRight.insertBefore(widget, topbarRight.firstChild);
    } else {
      widget.style.position = 'fixed';
      widget.style.top = '14px';
      widget.style.right = '16px';
      widget.style.zIndex = '90';
      document.body.appendChild(widget);
    }

    const btn = document.getElementById('notifBtn');
    const refreshBtn = document.getElementById('notifRefreshBtn');

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const dd = document.getElementById('notifDropdown');
      dd.classList.toggle('show');
      if (dd.classList.contains('show')) updateNotifBadge();
    });

    refreshBtn.addEventListener('click', function() {
      updateNotifBadge();
    });

    document.addEventListener('click', function(e) {
      const dd = document.getElementById('notifDropdown');
      const w = document.getElementById('notifWidget');
      if (dd && w && !w.contains(e.target)) {
        dd.classList.remove('show');
      }
    });

    updateNotifBadge();
  }

  async function updateNotifBadge() {
    const badge = document.getElementById('notifBadge');
    const list = document.getElementById('notifList');
    const btn = document.getElementById('notifBtn');
    if (!badge || !list) return;

    const counts = await fetchNotifCounts();
    if (!counts) {
      list.innerHTML = '<div class="notif-empty">Gagal memuat notifikasi.</div>';
      return;
    }

    if (counts.total > 0) {
      badge.textContent = counts.total > 99 ? '99+' : counts.total;
      badge.style.display = 'flex';
      if (btn) btn.classList.add('has-notif');
    } else {
      badge.style.display = 'none';
      if (btn) btn.classList.remove('has-notif');
    }

    const items = [];
    if (counts.usulan > 0) {
      items.push(`<a class="notif-item" href="usulan-pembelian.html">
        <div class="notif-icon">📝</div>
        <div class="notif-text">
          <div class="notif-title">${counts.usulan} usulan menunggu approval</div>
          <div class="notif-sub">Buka Usulan Pembelian</div>
        </div>
      </a>`);
    }
    if (counts.approval > 0) {
      items.push(`<a class="notif-item" href="approval.html">
        <div class="notif-icon">✅</div>
        <div class="notif-text">
          <div class="notif-title">${counts.approval} approval edit penerimaan</div>
          <div class="notif-sub">Buka Approval</div>
        </div>
      </a>`);
    }

    list.innerHTML = items.length > 0 ? items.join('') : '<div class="notif-empty">Tidak ada notifikasi.</div>';
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
  //  REQUIRE AUTH
  // ============================================================
  async function requireAuth(options) {
    options = options || {};
    const allowRoles = options.allowRoles || null;

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

    if (user.active === false) {
      alert('Akun Anda dinonaktifkan. Hubungi admin.');
      await window.supabase.auth.signOut();
      sessionStorage.removeItem('rko_user');
      window.location.href = 'login.html';
      return null;
    }

    if (allowRoles && !allowRoles.includes(user.role)) {
      alert('Anda tidak memiliki akses ke halaman ini.');
      window.location.href = 'index.html';
      return null;
    }

    window.currentUser = user;

    // Sisipkan widget notifikasi
    try { injectNotifWidget(); } catch (e) { console.warn('[NOTIF] inject gagal:', e); }

    return user;
  }

  // ============================================================
  //  LOGOUT
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
  //  GET USER
  // ============================================================
  function getUser() {
    return window.currentUser || null;
  }

  // ============================================================
  //  FORMAT RUPIAH GLOBAL
  // ============================================================
  window.formatRp = function(v) {
    return Math.round(Number(v) || 0).toLocaleString('id-ID');
  };

  // ============================================================
  //  EXPOSE KE GLOBAL
  // ============================================================
  window.auth = {
    requireAuth: requireAuth,
    logout: logout,
    getUser: getUser,
    fetchNotifCounts: fetchNotifCounts
  };

  console.log('[AUTH] Modul auth.js siap.');
})();
