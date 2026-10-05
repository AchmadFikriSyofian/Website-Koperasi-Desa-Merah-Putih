// ===============================
// KONFIGURASI WEBSITE
// ===============================
// Ubah nilai di bawah untuk data koperasi Anda.
// Untuk statistik nasional, isi API_URL dengan endpoint resmi Anda.
// Contoh respons JSON:
// {
//   "anggota": 123456,
//   "aktif": 120000,
//   "pertumbuhan": 4.2,
//   "koperasi": 81613,
//   "updated_at": "2026-10-05T10:00:00+07:00"
// }

const CONFIG = {
  API_URL: "", // contoh: "https://domain-resmi.go.id/api/koperasi/statistik"
};

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
  navToggle.textContent = mainNav.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll("#mainNav a").forEach(a => {
  a.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

function formatNumber(value) {
  if (value === null || value === undefined || value === "") return "—";
  return new Intl.NumberFormat("id-ID").format(value);
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return ` · Update ${date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short"
  })}`;
}

async function loadNationalStats() {
  const status = document.getElementById("dataStatus");
  const updated = document.getElementById("lastUpdated");

  if (!CONFIG.API_URL) {
    status.textContent = "Data anggota belum terhubung ke API resmi";
    updated.textContent = "Statistik anggota ditampilkan sebagai placeholder sampai sumber resmi/API tersedia.";
    return;
  }

  try {
    status.textContent = "Mengambil data terbaru...";
    const response = await fetch(CONFIG.API_URL, {
      headers: { "Accept": "application/json" },
      cache: "no-store"
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    document.getElementById("statAnggota").textContent = formatNumber(data.anggota);
    document.getElementById("statAktif").textContent = formatNumber(data.aktif);
    document.getElementById("statPertumbuhan").textContent =
      data.pertumbuhan === undefined || data.pertumbuhan === null
        ? "—"
        : `${data.pertumbuhan}%`;

    if (data.koperasi) {
      document.getElementById("statKoperasi").textContent = formatNumber(data.koperasi);
    }

    status.textContent = "Data berhasil diperbarui dari sumber API";
    updated.textContent = formatDate(data.updated_at);
  } catch (error) {
    console.error("Statistik gagal dimuat:", error);
    status.textContent = "API statistik belum dapat diakses";
    updated.textContent = "Periksa endpoint API dan konfigurasi CORS.";
  }
}

loadNationalStats();

// Animasi sederhana saat elemen masuk viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".product-card,.person,.potential-card,.stat").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(14px)";
  el.style.transition = "opacity .55s ease, transform .55s ease";
  observer.observe(el);
});

const style = document.createElement("style");
style.textContent = ".visible{opacity:1!important;transform:translateY(0)!important}";
document.head.appendChild(style);
