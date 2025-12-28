import { ArrowRight, Users } from 'lucide-react';

// === PERBAIKAN: Link gambar diganti URL biasa agar tidak Error saat Build ===
const logoAdyanala = "https://cdn-icons-png.flaticon.com/512/9312/9312234.png"; 

interface HeroCoverProps {
  onScrollToForm: () => void;
}

export function HeroCover({ onScrollToForm }: HeroCoverProps) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full text-center space-y-10">
          
          {/* Badge */}
          <div className="inline-flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-full border border-[#0D652D]/10 shadow-sm animate-fade-in">
            <img src={logoAdyanala} alt="Logo Kabinet Adyanala" className="w-12 h-12 object-contain" />
          </div>

          {/* Main heading */}
          <div className="space-y-4 animate-slide-up">
            <h1 
              className="text-6xl md:text-7xl lg:text-8xl text-[#1a1a1a] leading-[1.1] uppercase"
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              Open Recruitment
            </h1>
          </div>

          {/* Organization info */}
          <div className="space-y-2 animate-slide-up delay-200">
            <h2 
              className="text-xl md:text-2xl text-[#0D652D]"
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                letterSpacing: '-0.01em'
              }}
            >
              Himpunan Mahasiswa
            </h2>
            <h3 
              className="text-xl md:text-2xl text-[#0D652D]"
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                letterSpacing: '-0.01em'
              }}
            >
              D4 Keselamatan dan Kesehatan Kerja
            </h3>
            <p 
              className="text-xl md:text-2xl text-[#0D652D]"
              style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                letterSpacing: '-0.01em'
              }}
            >
              Universitas Airlangga
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 animate-slide-up delay-400">
            <button
              onClick={onScrollToForm}
              className="group px-8 py-4 bg-[#0D652D] text-white rounded-full hover:bg-[#34A853] transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, letterSpacing: '0.02em' }}
            >
              <Users className="w-5 h-5" />
              Daftar Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#0D652D] rounded-full hover:bg-white transition-all duration-300 border border-[#0D652D]/20 shadow-sm hover:shadow-md"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, letterSpacing: '0.02em' }}
            >
              Pelajari Lebih Lanjut
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="pt-16 animate-fade-in delay-500">
            <div className="inline-flex flex-col items-center gap-2 text-[#666]">
              <span 
                className="text-xs tracking-wider uppercase"
                style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '2px' }}
              >
                Scroll
              </span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-[#666] to-transparent animate-scroll-line"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating shapes */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#34A853]/20 rounded-full animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#4285F4]/20 rounded-full animate-float delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#A50E0E]/20 rounded-full animate-float delay-500"></div>
    </div>
  );
}
