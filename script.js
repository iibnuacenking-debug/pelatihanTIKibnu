
"use strict";

/* =====================================================
   1. PENGATURAN WEBSITE
   Ubah nama kafe sesuai kebutuhan.
===================================================== */

// Nama kafe yang ditampilkan pada header dan footer.
const namaKafe = "MenuKita";

// Data menu disimpan langsung dalam JavaScript.
// Tidak menggunakan database atau server.
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
        deskripsi: "Ayam bakar dengan bumbu khas dan nasi hangat.",
        gambar: "./assets/ayam-bakar.jpg",
        tersedia: true
    },
    {
        id: 4,
        nama: "Kentang Goreng",
        harga: 12000,
        kategori: "Camilan",
        deskripsi: "Kentang goreng renyah untuk teman bersantai.",
        gambar: "./assets/kentang-goreng.jpg",
        tersedia: false
    },
    {
        id: 5,
        nama: "Roti Bakar Cokelat",
        harga: 14000,
        kategori: "Camilan",
        deskripsi: "Roti bakar dengan isian cokelat manis.",
        gambar: "./assets/roti-bakar.jpg",
        tersedia: true
    },
    {
        id: 6,
        nama: "Es Teh Manis",
        harga: 5000,
        kategori: "Minuman",
        deskripsi: "Teh manis dingin yang menyegarkan.",
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
        deskripsi: "Perpaduan kopi dan susu dengan rasa seimbang.",
        gambar: "./assets/kopi-susu.jpg",
        tersedia: false
    }
];


/* =====================================================
   2. MENGAMBIL ELEMEN HTML
   JavaScript menghubungkan fungsi dengan HTML
   menggunakan ID yang sudah dibuat sebelumnya.
===================================================== */

const elemenNamaKafe = document.getElementById("nama-kafe");
const elemenNamaKafeFooter = document.getElementById("nama-kafe-footer");
const elemenTahun = document.getElementById("tahun-sekarang");

const elemenPencarian = document.getElementById("pencarian-menu");
const elemenKategori = document.getElementById("daftar-kategori");

const elemenMenuGrid = document.getElementById("menu-grid");
const elemenJumlahMenu = document.getElementById("jumlah-menu");

const elemenMenuKosong = document.getElementById("menu-kosong");
const tombolReset = document.getElementById("reset-pencarian");


/* =====================================================
   3. MENYIAPKAN STATUS FILTER
   Nilai awal:
   - Kata pencarian kosong.
   - Kategori yang dipilih adalah Semua.
===================================================== */

let kataKunci = "";
let kategoriAktif = "Semua";


/* =====================================================
   4. MENAMPILKAN IDENTITAS KAFE
===================================================== */

// Nama kafe pada bagian header.
if (elemenNamaKafe) {
    elemenNamaKafe.textContent = namaKafe;
}

// Nama kafe pada bagian footer.
if (elemenNamaKafeFooter) {
    elemenNamaKafeFooter.textContent = namaKafe;
}

// Tahun diperbarui otomatis sesuai tahun perangkat.
if (elemenTahun) {
    elemenTahun.textContent = new Date().getFullYear();
}


/* =====================================================
   5. MEMFORMAT HARGA
   Contoh:
   18000 menjadi Rp18.000
===================================================== */

function formatHarga(harga) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(harga);
}


/* =====================================================
   6. MEMBUAT KARTU MENU
   Fungsi ini mengubah data menjadi elemen HTML.
===================================================== */

function buatKartuMenu(menu) {
    // Membuat elemen kartu utama.
    const kartu = document.createElement("article");
    kartu.className = "menu-card";

    // Membuat wadah gambar.
    const wadahGambar = document.createElement("div");
    wadahGambar.className = "menu-image-wrapper";

    // Membuat gambar makanan.
    const gambar = document.createElement("img");
    gambar.className = "menu-image";
    gambar.src = menu.gambar;
    gambar.alt = menu.nama;
    gambar.loading = "lazy";

    // Jika gambar tidak ditemukan, tampilkan ilustrasi pengganti.
    gambar.addEventListener("error", function () {
        gambar.removeAttribute("src");
        gambar.alt = "Foto " + menu.nama + " tidak tersedia";
        gambar.style.display = "none";

        wadahGambar.textContent = "🍽️";
        wadahGambar.style.display = "grid";
        wadahGambar.style.placeItems = "center";
        wadahGambar.style.fontSize = "48px";
    }, { once: true });

    wadahGambar.appendChild(gambar);

    // Membuat bagian isi kartu.
    const isiKartu = document.createElement("div");
    isiKartu.className = "menu-card-content";

    // Menampilkan kategori makanan.
    const kategori = document.createElement("p");
    kategori.className = "menu-category";
    kategori.textContent = menu.kategori;

    // Menampilkan nama makanan.
    const nama = document.createElement("h3");
    nama.className = "menu-name";
    nama.textContent = menu.nama;

    // Menampilkan deskripsi makanan.
    const deskripsi = document.createElement("p");
    deskripsi.className = "menu-description";
    deskripsi.textContent = menu.deskripsi;

    // Membuat bagian harga dan status.
    const bagianBawah = document.createElement("div");
    bagianBawah.className = "menu-card-bottom";

    // Menampilkan harga.
    const harga = document.createElement("p");
    harga.className = "menu-price";
    harga.textContent = formatHarga(menu.harga);

    // Menampilkan status ketersediaan.
    const status = document.createElement("span");
    status.className = "menu-status";

    if (menu.tersedia) {
        status.classList.add("available");
        status.textContent = "Tersedia";
    } else {
        status.classList.add("unavailable");
        status.textContent = "Habis";
    }

    // Menyusun seluruh elemen kartu.
    bagianBawah.append(harga, status);
    isiKartu.append(kategori, nama, deskripsi, bagianBawah);
    kartu.append(wadahGambar, isiKartu);

    return kartu;
}


/* =====================================================
   7. MENYARING MENU
   Memeriksa kata pencarian dan kategori aktif.
===================================================== */

function dapatkanMenuTerfilter() {
    return daftarMenu.filter(function (menu) {
        // Memeriksa nama, deskripsi, dan kategori.
        const teksMenu = (
            menu.nama + " " +
            menu.deskripsi + " " +
            menu.kategori
        ).toLocaleLowerCase("id-ID");

        const cocokPencarian = teksMenu.includes(kataKunci);

        // Jika Semua dipilih, kategori tidak membatasi hasil.
        const cocokKategori =
            kategoriAktif === "Semua" ||
            menu.kategori === kategoriAktif;

        // Menu ditampilkan jika kedua kondisi terpenuhi.
        return cocokPencarian && cocokKategori;
    });
}


/* =====================================================
   8. MENAMPILKAN DAFTAR MENU
   Memperbarui kartu, jumlah hasil, dan pesan kosong.
===================================================== */

function tampilkanMenu() {
    // Mendapatkan menu sesuai pencarian dan kategori.
    const menuTerfilter = dapatkanMenuTerfilter();

    // Menghapus kartu sebelumnya.
    elemenMenuGrid.replaceChildren();

    // Membuat dan menambahkan kartu menu.
    const kumpulanKartu = document.createDocumentFragment();

    menuTerfilter.forEach(function (menu) {
        kumpulanKartu.appendChild(buatKartuMenu(menu));
    });

    elemenMenuGrid.appendChild(kumpulanKartu);

    // Memperbarui informasi jumlah menu.
    elemenJumlahMenu.textContent =
        menuTerfilter.length + " menu ditemukan";

    // Menampilkan pesan jika tidak ada hasil.
    elemenMenuKosong.hidden = menuTerfilter.length !== 0;

    // Menyembunyikan grid ketika tidak ada hasil.
    elemenMenuGrid.hidden = menuTerfilter.length === 0;
}


/* =====================================================
   9. FUNGSI PENCARIAN
   Berjalan setiap kali pengguna mengetik.
===================================================== */

elemenPencarian.addEventListener("input", function (event) {
    // Mengubah teks menjadi huruf kecil dan menghapus spasi tepi.
    kataKunci = event.target.value
        .trim()
        .toLocaleLowerCase("id-ID");

    // Memperbarui daftar menu.
    tampilkanMenu();
});


/* =====================================================
   10. FUNGSI FILTER KATEGORI
   Berjalan ketika tombol kategori diklik.
===================================================== */

elemenKategori.addEventListener("click", function (event) {
    // Mencari tombol kategori yang diklik.
    const tombol = event.target.closest("[data-kategori]");

    // Mengabaikan klik yang bukan tombol kategori.
    if (!tombol || !elemenKategori.contains(tombol)) {
        return;
    }

    // Menyimpan kategori yang dipilih.
    kategoriAktif = tombol.dataset.kategori;

    // Memperbarui tampilan tombol aktif.
    const semuaTombol = elemenKategori.querySelectorAll(
        "[data-kategori]"
    );

    semuaTombol.forEach(function (item) {
        const sedangAktif =
            item.dataset.kategori === kategoriAktif;

        item.classList.toggle("active", sedangAktif);
        item.setAttribute("aria-pressed", String(sedangAktif));
    });

    // Memperbarui daftar menu.
    tampilkanMenu();
});


/* =====================================================
   11. TOMBOL RESET
   Mengembalikan pencarian dan kategori ke kondisi awal.
===================================================== */

tombolReset.addEventListener("click", function () {
    // Mengosongkan kolom pencarian.
    elemenPencarian.value = "";

    // Mengembalikan filter ke kondisi awal.
    kataKunci = "";
    kategoriAktif = "Semua";

    // Memperbarui tombol kategori.
    const semuaTombol = elemenKategori.querySelectorAll(
        "[data-kategori]"
    );

    semuaTombol.forEach(function (tombol) {
        const sedangAktif =
            tombol.dataset.kategori === "Semua";

        tombol.classList.toggle("active", sedangAktif);
        tombol.setAttribute("aria-pressed", String(sedangAktif));
    });

    // Menampilkan kembali semua menu.
    tampilkanMenu();

    // Mengembalikan fokus ke kolom pencarian.
    elemenPencarian.focus();
});


/* =====================================================
   12. MENJALANKAN WEBSITE
   Menampilkan seluruh menu saat halaman pertama dibuka.
===================================================== */

tampilkanMenu();
