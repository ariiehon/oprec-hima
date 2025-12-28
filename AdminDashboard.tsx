import { useState, useEffect } from 'react';
import { Users, Filter, Download, CheckCircle, XCircle, Clock, Search, Lock, ArrowRight, LogOut } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Application {
  id: string;
  fullName: string;
  nim: string;
  email: string;
  phone: string;
  semester: string;
  ipk: number;
  proker1: string;
  department1: string;
  proker2: string;
  department2: string;
  motivation: string;
  experience: string;
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
  division1: string;
}

interface Stats {
  total: number;
  byDivision: Record<string, number>;
  bySemester: Record<string, number>;
  byStatus: {
    pending: number;
    accepted: number;
    rejected: number;
  };
}

export function AdminDashboard() {
  // === STATE LOGIN ===
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const ADMIN_PASSWORD = "admin123"; // Ganti password di sini jika mau

  // === STATE DATA ===
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDivision, setFilterDivision] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [assignedDivision, setAssignedDivision] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
      fetchStats();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedApplication) {
      setAssignedDivision(selectedApplication.department1 || selectedApplication.division1);
    }
  }, [selectedApplication]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Password salah!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setApplications([]);
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0b66b71b/applications/list`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );
      const data = await response.json();
      if (data.success) setApplications(data.applications);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0b66b71b/applications/stats`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
      );
      const data = await response.json();
      if (data.success) setStats(data.stats);
    } catch (error) { console.error(error); }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0b66b71b/applications/${id}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
          body: JSON.stringify({ status, assignedDivision }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setApplications(applications.map(app => 
          app.id === id ? { ...app, status: status as any, department1: assignedDivision, division1: assignedDivision } : app
        ));
        fetchStats();
        setSelectedApplication(null);
      }
    } catch (error) { console.error(error); }
  };

  const filteredApplications = applications.filter(app => {
    const statusMatch = filterStatus === 'all' || app.status === filterStatus;
    const appDivision = app.department1 || app.division1;
    const divisionMatch = filterDivision === 'all' || appDivision === filterDivision;
    const searchMatch = searchTerm === '' || 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.nim.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && divisionMatch && searchMatch;
  });

  const exportToCSV = () => {
    const headers = ['Nama', 'NIM', 'Email', 'Telepon', 'Semester', 'IPK', 'Proker 1', 'Departemen 1', 'Proker 2', 'Departemen 2', 'Status', 'Tanggal Daftar'];
    const rows = filteredApplications.map(app => [
      app.fullName, app.nim, app.email, app.phone, app.semester, app.ipk,
      app.proker1, app.department1 || app.division1, app.proker2 || '-', app.department2 || '-',
      app.status, new Date(app.submittedAt).toLocaleDateString('id-ID')
    ]);
    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pendaftaran_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // TAMPILAN LOGIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#4285F4]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>Admin Login</h2>
            <p className="text-gray-500 text-sm mt-2">Masukkan password untuk mengakses dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4285F4] outline-none" placeholder="Password Admin" autoFocus />
              {loginError && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><XCircle className="w-4 h-4" /> {loginError}</p>}
            </div>
            <button type="submit" className="w-full bg-[#4285F4] text-white py-3 rounded-lg hover:bg-[#174EA6] transition-colors font-medium flex items-center justify-center gap-2">Masuk Dashboard <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-16 h-16 border-4 border-[#34A853] border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#0D652D] to-[#34A853] rounded-2xl p-8 mb-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div><h1 className="mb-2 text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>Dashboard Admin Rekrutmen</h1><p className="text-white/90">Kelola dan pantau pendaftaran anggota baru</p></div>
          <button onClick={handleLogout} className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 backdrop-blur-sm self-start md:self-center"><LogOut className="w-4 h-4" />Logout</button>
        </div>

        {/* Stats & Content */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6"><div className="flex items-center justify-between mb-2"><Users className="w-8 h-8 text-[#4285F4]" /><span className="text-3xl text-gray-800 font-bold">{stats.total}</span></div><p className="text-gray-600">Total Pendaftar</p></div>
            <div className="bg-white rounded-xl shadow-md p-6"><div className="flex items-center justify-between mb-2"><Clock className="w-8 h-8 text-yellow-500" /><span className="text-3xl text-gray-800 font-bold">{stats.byStatus.pending}</span></div><p className="text-gray-600">Pending</p></div>
            <div className="bg-white rounded-xl shadow-md p-6"><div className="flex items-center justify-between mb-2"><CheckCircle className="w-8 h-8 text-[#34A853]" /><span className="text-3xl text-gray-800 font-bold">{stats.byStatus.accepted}</span></div><p className="text-gray-600">Diterima</p></div>
            <div className="bg-white rounded-xl shadow-md p-6"><div className="flex items-center justify-between mb-2"><XCircle className="w-8 h-8 text-red-500" /><span className="text-3xl text-gray-800 font-bold">{stats.byStatus.rejected}</span></div><p className="text-gray-600">Ditolak</p></div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div><label className="block text-sm mb-2 text-gray-700 font-medium">Cari</label><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" placeholder="Nama, NIM, atau Email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34A853] outline-none" /></div></div>
            <div><label className="block text-sm mb-2 text-gray-700 font-medium">Status</label><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34A853] outline-none"><option value="all">Semua Status</option><option value="pending">Pending</option><option value="accepted">Diterima</option><option value="rejected">Ditolak</option></select></div>
            <div><label className="block text-sm mb-2 text-gray-700 font-medium">Departemen</label><select value={filterDivision} onChange={(e) => setFilterDivision(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34A853] outline-none"><option value="all">Semua Departemen</option>{stats && Object.keys(stats.byDivision).map(div => (<option key={div} value={div}>{div}</option>))}</select></div>
            <div className="flex items-end"><button onClick={exportToCSV} className="w-full bg-[#4285F4] text-white px-4 py-2 rounded-lg hover:bg-[#174EA6] transition-colors flex items-center justify-center gap-2"><Download className="w-5 h-5" />Export CSV</button></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Nama', 'NIM', 'Divisi', 'IPK', 'Status', 'Tanggal', 'Aksi'].map(h => <th key={h} className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{app.fullName}</div><div className="text-sm text-gray-500">{app.email}</div></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.nim}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{app.department1 || app.division1}</div></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.ipk?.toFixed(2) || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${app.status === 'accepted' ? 'bg-green-100 text-green-800' : app.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{app.status === 'accepted' ? 'Diterima' : app.status === 'rejected' ? 'Ditolak' : 'Pending'}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(app.submittedAt).toLocaleDateString('id-ID')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"><button onClick={() => setSelectedApplication(app)} className="text-[#4285F4] hover:text-[#174EA6] font-medium">Detail</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center justify-between"><h3 className="text-[#0D652D] text-lg font-bold">Detail Pendaftaran</h3><button onClick={() => setSelectedApplication(null)} className="p-2 hover:bg-gray-100 rounded-full"><XCircle className="w-6 h-6 text-gray-400" /></button></div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Nama Lengkap</p><p className="text-gray-900 font-medium">{selectedApplication.fullName}</p></div>
                <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">WhatsApp</p><p className="text-gray-900 font-medium">{selectedApplication.phone}</p></div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Pilihan Program Kerja</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><p className="text-xs text-gray-500 mb-1">Pilihan 1</p><p className="text-sm font-bold text-gray-900">{selectedApplication.proker1}</p><p className="text-xs text-[#34A853] mt-1 font-medium">{selectedApplication.department1}</p></div>
                  <div><p className="text-xs text-gray-500 mb-1">Pilihan 2</p><p className="text-sm font-bold text-gray-900">{selectedApplication.proker2}</p><p className="text-xs text-[#34A853] mt-1 font-medium">{selectedApplication.department2}</p></div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="block text-sm mb-2 text-gray-700"><span className="font-bold">Tetapkan Departemen Akhir</span></label>
                <select value={assignedDivision} onChange={(e) => setAssignedDivision(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                  {['Departemen Sekretaris Bendahara', 'Departemen PSDM', 'Departemen ILPRES', 'Departemen HUBLU', 'Departemen MEDINFO', 'Departemen EKRAF', 'Departemen SENIORA'].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button onClick={() => updateStatus(selectedApplication.id, 'accepted')} className="flex-1 bg-[#34A853] text-white py-3 rounded-lg hover:bg-[#0D652D] font-medium">Terima</button>
                <button onClick={() => updateStatus(selectedApplication.id, 'rejected')} className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-medium">Tolak</button>
                <button onClick={() => updateStatus(selectedApplication.id, 'pending')} className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 font-medium">Pending</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
