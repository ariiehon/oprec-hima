import { useState } from 'react';
import { HeroCover } from './components/HeroCover';
import { DivisionCard } from './components/DivisionCard';
import { TimelineItem } from './components/TimelineItem';
import { ApplicationForm } from './components/ApplicationForm';
import { AdminDashboard } from './components/AdminDashboard';
import { StatusChecker } from './components/StatusChecker';
import { Target, Calendar, FileText, Mail, Shield, Edit, Instagram, Lock, ArrowRight } from 'lucide-react';
import { Search } from 'lucide-react';

// === PERBAIKAN DI SINI ===
// Hapus import figma:asset, ganti dengan URL atau path lokal
// Kalau punya file logonya, taruh di folder 'public' dan panggil '/logo.png'
const imgLogoHimaK3 = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // Placeholder Logo K3

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [showAdmin, setShowAdmin] = useState(false);
  const [showStatusChecker, setShowStatusChecker] = useState(false);
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const ADMIN_PASSWORD = "admin123"; 

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Password salah!');
      setAdminPasswordInput('');
    }
  };

  if (showAdmin) {
    if (!isAdminAuthenticated) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#4285F4]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
              <p className="text-gray-500 text-sm">Masukkan password untuk mengakses dashboard</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4285F4] focus:border-transparent outline-none transition-all"
                  placeholder="Password Admin"
                  autoFocus
                />
                {loginError && (
                  <p className="text-red-500 text-sm mt-2 ml-1">{loginError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#4285F4] text-white py-3 rounded-lg hover:bg-[#174EA6] transition-colors font-medium flex items-center justify-center gap-2"
              >
                Masuk Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <button
              onClick={() => {
                setShowAdmin(false);
                setLoginError('');
                setAdminPasswordInput('');
              }}
              className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm py-2"
            >
              ← Kembali ke Website Utama
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <button
            onClick={() => setShowAdmin(false)}
            className="text-[#4285F4] hover:text-[#174EA6] font-medium flex items-center gap-2"
          >
            ← Kembali ke Website
          </button>
          <button
            onClick={() => {
              setIsAdminAuthenticated(false);
              setShowAdmin(false);
            }}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Logout
          </button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  if (showStatusChecker) {
    return (
      <div>
        <div className="bg-white shadow-md p-4">
          <button
            onClick={() => setShowStatusChecker(false)}
            className="text-[#4285F4] hover:text-[#174EA6]"
          >
            ← Kembali ke Website
          </button>
        </div>
        <StatusChecker />
      </div>
    );
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const divisions = [
    {
      id: 1,
      title: 'Departemen Sekretaris Bendahara',
      description: 'Menjamin tata kelola administrasi dan keuangan organisasi yang akuntabel, transparan, dan teratur.',
      requirements: [
        'Pelatihan Kesekretariatan dan Kebendaharaan',
        'Musma GD dan AD/ART'
      ]
    },
    {
      id: 2,
      title: 'Departemen PSDM',
      description: 'Berfokus pada pengelolaan dan penguatan hubungan internal organisasi demi terjalinnya komunikasi yang baik serta sdm organisasi yang berkompeten guna menguatkan nilai kontribusi mahasiswa baik untuk HIMA maupun Program Studi K3.',
      requirements: [
        'Upgrading',
        'OSG (OSH Student Gathering)',
        'Dies Natalis K3',
        'Shield (Safety and Health Introduction Education and Learning Development)',
        'LKMM-Pra TD',
        'Welwis'
      ]
    },
    {
      id: 3,
      title: 'Departemen ILPRES',
      description: 'Menyelenggarakan program kerja yang berkaitan dengan bidang keilmuan dan prestasi Mahasiswa-Mahasiswi D-IV Keselamatan dan Kesehatan Kerja yang dikemas dengan lingkup program kerja internal hingga eksternal yang menaungi lingkup prestasi dan informasi untuk Program Studi.',
      requirements: [
        'Seminar Nasional K3',
        'Session Sharing',
        'Paper Sharing and Learning (PSL)',
        'K3 Training',
        'Pojok Prestasi'
      ]
    },
    {
      id: 4,
      title: 'Departemen HUBLU',
      description: 'Menjalin dan menjaga hubungan strategis dari lingkup internal dengan mitra eksternal yang bertujuan untuk menjadikan HIMA K3 UNAIR menjadi organisasi yang kolaboratif dengan memperluas wawasan serta jaring relasi dengan pihak eksternal.',
      requirements: [
        'K3R (K3 Roadshow)',
        'Relation Work Program (WRP)',
        'OSH Welcoming',
        'ONPOSH (Devotion Public Occupational Safety & Health)',
        'Kajian Aksi Strategis'
      ]
    },
    {
      id: 5,
      title: 'Departemen MEDINFO',
      description: 'Mengelola dan mengembangkan citra publik (branding) serta kanal-kanal komunikasi visual HIMA, serta bertanggung jawab atas produksi konten, desain grafis, dan dokumentasi visual yang informatif, menarik, dan relevan.',
      requirements: [
        'Creative Design',
        'Creative Media',
        'Copywriting'
      ]
    },
    {
      id: 6,
      title: 'Departemen EKRAF',
      description: 'Sebagai penggerak perekonomian organisasi dalam bentuk produksi, kreatif, dan marketing merchandise serta bertanggung jawab sebagai wadah untuk menaungi minat dan bakat Mahasiswa/i di bidang kewirausahaan.',
      requirements: [
        'Safe Merch',
        'OSH FEST',
        'OSHTEN'
      ]
    },
    {
      id: 7,
      title: 'Departemen SENIORA',
      description: 'Menjadi wadah pengembangan minat dan bakat mahasiswa dalam bidang seni, kreativitas, dan olahraga guna mendukung terciptanya keseimbangan fisik dan mental serta semangat sportivitas dan ekspresi diri.',
      requirements: [
        'K3 Running Fest',
        'Kelas Seni',
        'K3 Sport Cup',
        'OSH Cup',
        'Olgarut (Olahraga Rutin)'
      ]
    }
  ];

  const timeline = [
    { date: '05-10 Januari 2026', title: 'Pendaftaran', description: 'Periode pendaftaran open recruitment dibuka' },
    { date: '11-14 Januari 2026', title: 'Wawancara', description: 'Wawancara dengan Departemen Pilihan' },
    { date: '17 Januari 2026', title: 'Pengumuman', description: 'Pengumuman hasil seleksi' }
  ];

  return (
    <div className="min-h-screen bg-[#FCF5E8]">
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3 md:py-4 gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={imgLogoHimaK3} 
                alt="Logo Himakesker" 
                className="h-8 w-8 md:h-12 md:w-12 object-contain rounded-lg"
              />
            </div>

            <div className="flex gap-1 md:gap-2">
              {[
                { id: 'about', label: 'Guidebook', icon: FileText },
                { id: 'divisions', label: 'Divisi', icon: Target },
                { id: 'timeline', label: 'Timeline', icon: Calendar },
                { id: 'form', label: 'Daftar', icon: Edit },
                { id: 'contact', label: 'Kontak', icon: Mail }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    scrollToSection(id);
                  }}
                  className={`flex items-center gap-2 px-2 py-2 md:px-6 md:py-2 rounded-lg transition-all ${
                    activeTab === id 
                      ? 'bg-gradient-to-r from-[#0D652D] to-[#34A853] text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title={label}
                >
                  <Icon className="w-4 h-4 md:w-4 md:h-4" />
                  <span className="hidden md:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <HeroCover onScrollToForm={() => scrollToSection('form')} />

      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-4 bg-gradient-to-r from-[#174EA6] to-[#4285F4] bg-clip-text text-transparent font-bold text-[32px] font-[Poppins]">
            Guidebook Open Recruitmen Hima K3 Unair Kabinet Adyanala
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Pelajari lebih lanjut tentang HIMA K3 UNAIR Kabinet Adyanala
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#0D652D] to-[#34A853] rounded-2xl flex items-center justify-center shadow-lg">
                    <FileText className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="mb-3 text-[#0D652D]">📖 Guidebook Rekrutmen</h3>
                  <p className="text-gray-600 mb-6">
                    Akses guidebook yang berisi informasi detail tentang visi misi, departemen, dan proker dari HIMA K3 Kabinet Adyanala
                  </p>
                  
                  <a
                    href="https://drive.google.com/drive/folders/1eGqwTforfjs4ZGsF9nWCzLw1_qS9IxV6?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-[#174EA6] to-[#4285F4] text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                  >
                    <FileText className="w-6 h-6" />
                    <span className="font-medium">Buka Guidebook</span>
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">🎯 Visi & Misi</p>
                    <p className="font-medium text-[#174EA6]">Kabinet Adyanala</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">📂 Departemen</p>
                    <p className="font-medium text-[#0D652D]">Program Kerja</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">👥 Kepengurusan</p>
                    <p className="font-medium text-[#A50E0E]">Kabinet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="divisions" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-4 bg-gradient-to-r from-[#174EA6] to-[#4285F4] bg-clip-text text-transparent font-bold text-[32px] font-[Poppins]">
            Departemen yang Membuka Rekrutmen
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Pilih departemen yang sesuai dengan minat dan kemampuanmu
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisions.map((division, index) => (
              <div 
                key={division.id} 
                className={`h-full ${index === 6 ? "lg:col-start-2" : ""}`}
              >
                <DivisionCard {...division} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-12 bg-gradient-to-r from-[#174EA6] to-[#4285F4] bg-clip-text text-transparent text-[32px] font-[Poppins] font-bold">
            Persyaratan Umum
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="mb-6 text-[#0D652D]">Persyaratan Administrasi</h3>
              <ul className="space-y-4">
                {[
                  'Mahasiswa aktif D4 K3 Universitas Airlangga',
                  'IPK minimal 3.00',
                  'Belum pernah terlibat dalam tindak pelanggaran',
                  'Scan KTM dan KRS semester aktif',
                  'Surat rekomendasi dari dosen (opsional)'
                ].map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#0D652D] to-[#34A853] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">{index + 1}</span>
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="mb-6 text-[#A50E0E]">Kompetensi yang Dibutuhkan</h3>
              <ul className="space-y-4">
                {[
                  'Komitmen tinggi terhadap organisasi',
                  'Mampu bekerja dalam tim',
                  'Komunikatif dan proaktif',
                  'Bertanggung jawab dan disiplin',
                  'Memiliki inisiatif dan kreativitas'
                ].map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#A50E0E] to-[#EA4335] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">{index + 1}</span>
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12 bg-gradient-to-r from-[#174EA6] to-[#4285F4] bg-clip-text text-transparent text-[32px] font-[Poppins] font-bold">
            Timeline Rekrutmen
          </h2>
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <TimelineItem 
                key={index} 
                {...item} 
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

       <section id="form" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-4 bg-gradient-to-r from-[#174EA6] to-[#4285F4] bg-clip-text text-transparent font-bold text-[32px] font-[Poppins]">
            Formulir Pendaftaran
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Isi formulir berikut
          </p>
          <ApplicationForm divisions={divisions} />
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-[#0D652D] to-[#34A853] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4">Hubungi Kami</h2>
          <p className="mb-12 text-white/90">
            Ada pertanyaan? Jangan ragu untuk menghubungi kami
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Instagram className="w-12 h-12 text-white" />
            </div>
            <h3 className="mb-2">Instagram</h3>
            <p className="text-white/80">@himak3unair</p>
          </div>
        </div>
      </section>

      <footer className="bg-[#383432] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-white/80">
              © 2026 Departemen Media dan Informasi
            </p>
            <p className="text-white/60 mt-2">
              Himpunan Mahasiswa D4 Keselamatan dan Kesehatan Kerja Kabinet Adyanala
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10">
            <button
              onClick={() => setShowStatusChecker(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#34A853] hover:bg-[#0D652D] rounded-lg transition-colors text-white text-sm"
            >
              <Search className="w-4 h-4" />
              Cek Status Pendaftaran
            </button>
            
            <button
              onClick={() => setShowAdmin(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/70 hover:text-white text-sm"
            >
              <Shield className="w-4 h-4" />
              Dashboard Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
