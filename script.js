
"use strict";

// Nama website
const namaKafe = "MenuKita";

// Data menu makanan dan minuman
const daftarMenu = [
  {
    id: 1,
    nama: "Nasi Goreng Spesial",
    harga: 18000,
    kategori: "Makanan",
    deskripsi: "Nasi goreng spesial dengan telur dan bumbu pilihan.",
    gambar: "./assets/nasi-goreng.jpg",
    tersedia: true
  },
  {
    id: 2,
    nama: "Mie Goreng",
    harga: 15000,
    kategori: "Makanan",
    deskripsi: "Mie goreng gurih dengan sayuran segar.",
    gambar: "./assets/mie-goreng.jpg",
    tersedia: true
  },
  {
    id: 3,
    nama: "Ayam Bakar",
    harga: 22000,
    kategori: "Makanan",
    deskripsi: "Ayam bakar dengan bumbu khas.",
    gambar: "./assets/ayam-bakar.jpg",
    tersedia: true
  },
  {
    id: 4,
    nama: "Kentang Goreng",
    harga: 12000,
    kategori: "Camilan",
    deskripsi: "Kentang goreng renyah.",
    gambar: "./assets/kentang-goreng.jpg",
    tersedia: false
  },
  {
    id: 5,
    nama: "Roti Bakar Cokelat",
    harga: 14000,
    kategori: "Camilan",
    deskripsi: "Roti bakar dengan isian cokelat.",
    gambar: "./assets/roti-bakar.jpg",
    tersedia: true
  },
  {
    id: 6,
    nama: "Es Teh Manis",
    harga: 5000,
    kategori: "Minuman",
    deskripsi: "Es teh manis yang menyegarkan.",
    gambar: "./assets/es-teh.jpg",
    tersedia: true
  },
  {
    id: 7,
    nama: "Jus Alpukat",
    harga: 12000,
    kategori: "Minuman",
    deskripsi: "Jus alpukat lembut dan nikmat.",
    gambar: "./assets/jus-alpukat.jpg",
    tersedia: true
  },
  {
    id: 8,
    nama: "Kopi Susu",
    harga: 10000,
    kategori: "Minuman",
    deskripsi: "Kopi susu dengan rasa seimbang.",
    gambar: "./assets/kopi-susu.jpg",
    tersedia: false
  }
];

// Mengambil elemen dari HTML
const menuGrid = document.getElementById("menu-grid");
const pencarianMenu = document.getElementById("pencarian-menu");
const daftarKategori = document.getElementById("daftar-kategori");
const jumlahMenu = document.getElementById("jumlah-menu");
const menuKosong = document.getElementById("menu-kosong");
const resetPencarian = document.getElementById("reset-pencarian");
const namaKafeElement = document.getElementById("nama-kafe");
const namaKafeFooter = document.getElementById("nama-kafe-footer");
const tahunSekarang = document.getElementById("tahun-sekarang");

// Filter aktif
let kataKunci = "";
let kategoriAktif = "Semua";

// Format harga ke Rupiah
function formatHarga(harga) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(harga);
}

// Membuat satu kartu menu
function buatKartuMenu(menu) {
  const kartu = document.createElement("article");
  kartu.className = "menu-card";

  // Area gambar
  const pembungkusGambar = document.createElement("div");
  pembungkusGambar.className = "menu-image-wrapper";

  const gambar = document.createElement("img");
  gambar.className = "menu-image";
  gambar.src = menu.gambar;
  gambar.alt = menu.nama;
  gambar.loading = "lazy";

  // Jika gambar gagal dimuat, tampilkan ikon pengganti
  gambar.onerror = function () {
    pembungkusGambar.replaceChildren();

    const pengganti = document.createElement("div");
    pengganti.className = "menu-image-fallback";
    pengganti.textContent = "🍽️";
    pengganti.setAttribute("role", "img");
    pengganti.setAttribute("aria-label", menu.nama);

    pembungkusGambar.appendChild(pengganti);
  };

  pembungkusGambar.appendChild(gambar);

  // Isi kartu
  const isi = document.createElement("div");
  isi.className = "menu-card-content";

  const kategori = document.createElement("span");
  kategori.className = "menu-category";
  kategori.textContent = menu.kategori;

  const nama = document.createElement("h3");
  nama.className = "menu-name";
  nama.textContent = menu.nama;

  const deskripsi = document.createElement("p");
  deskripsi.className = "menu-description";
  deskripsi.textContent = menu.deskripsi;

  const bagianBawah = document.createElement("div");
  bagianBawah.className = "menu-card-bottom";

  const harga = document.createElement("strong");
  harga.className = "menu-price";
  harga.textContent = formatHarga(menu.harga);

  const status = document.createElement("span");
  status.className = menu.tersedia
    ? "menu-status available"
    : "menu-status unavailable";
  status.textContent = menu.tersedia
    ? "Tersedia"
    : "Habis";

  bagianBawah.append(harga, status);
  isi.append(kategori, nama, deskripsi, bagianBawah);
  kartu.append(pembungkusGambar, isi);

  return kartu;
}

// Menyaring menu berdasarkan pencarian dan kategori
function ambilMenuTerfilter() {
  return daftarMenu.filter(function (menu) {
    const teksMenu = (
      menu.nama + " " +
      menu.deskripsi + " " +
      menu.kategori
    ).toLowerCase();

    const cocokPencarian = teksMenu.includes(kataKunci);
    const cocokKategori =
      kategoriAktif === "Semua" ||
      menu.kategori === kategoriAktif;

    return cocokPencarian && cocokKategori;
  });
}

// Menampilkan menu ke halaman
function tampilkanMenu() {
  const menuTerfilter = ambilMenuTerfilter();

  menuGrid.replaceChildren();

  menuTerfilter.forEach(function (menu) {
    menuGrid.appendChild(buatKartuMenu(menu));
  });

  jumlahMenu.textContent =
    menuTerfilter.length + " menu ditemukan";

  menuKosong.hidden = menuTerfilter.length !== 0;
}

// Mengatur nama dan tahun
if (namaKafeElement) {
  namaKafeElement.textContent = namaKafe;
}

if (namaKafeFooter) {
  namaKafeFooter.textContent = namaKafe;
}

if (tahunSekarang) {
  tahunSekarang.textContent = new Date().getFullYear();
}

// Pencarian menu
if (pencarianMenu) {
  pencarianMenu.addEventListener("input", function () {
    kataKunci = pencarianMenu.value.trim().toLowerCase();
    tampilkanMenu();
  });
}

// Tombol kategori
if (daftarKategori) {
  daftarKategori.addEventListener("click", function (event) {
    const tombol = event.target.closest("[data-kategori]");

    if (!tombol) return;

    kategoriAktif = tombol.dataset.kategori;

    daftarKategori.querySelectorAll("[data-kategori]")
      .forEach(function (item) {
        const aktif = item === tombol;
        item.classList.toggle("active", aktif);
        item.setAttribute("aria-pressed", String(aktif));
      });

    tampilkanMenu();
  });
}

// Tombol reset pencarian
if (resetPencarian) {
  resetPencarian.addEventListener("click", function () {
    kataKunci = "";
    kategoriAktif = "Semua";

    if (pencarianMenu) {
      pencarianMenu.value = "";
    }

    if (daftarKategori) {
      daftarKategori.querySelectorAll("[data-kategori]")
        .forEach(function (item) {
          const aktif = item.dataset.kategori === "Semua";
          item.classList.toggle("active", aktif);
          item.setAttribute("aria-pressed", String(aktif));
        });
    }

    tampilkanMenu();
  });
}

// Jalankan ketika halaman siap
tampilkanMenu();
