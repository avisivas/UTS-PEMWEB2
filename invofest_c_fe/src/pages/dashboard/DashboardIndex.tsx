import { useState, useEffect } from 'react';

// Tipe data untuk event
interface EventData {
  id: number;
  namaEvent: string;
  tanggal: string;
}

// Tipe data untuk statistik
interface StatsData {
  totalEvent: number;
  totalPembicara: number;
  totalKategori: number;
}

export default function DashboardIndex() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:3000/dashboard'); 
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Gagal mengambil data');
        }

        // Ambil data sesuai struktur JSON yang baru
        setStats(result.data.stats); 
        setEvents(result.data.upcomingEvents); 

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="mb-6">Selamat Datang di halaman Dashboard</p>

      {isLoading && <p>Memuat data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!isLoading && !error && (
        <div className="space-y-6">
          
          {/* Tampilan Statistik */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded shadow">
              <h3 className="font-bold">Total Kategori</h3>
              <p className="text-2xl">{stats?.totalKategori}</p>
            </div>
            <div className="bg-green-100 p-4 rounded shadow">
              <h3 className="font-bold">Total Event</h3>
              <p className="text-2xl">{stats?.totalEvent}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded shadow">
              <h3 className="font-bold">Total Pembicara</h3>
              <p className="text-2xl">{stats?.totalPembicara}</p>
            </div>
          </div>

          {/* Tampilan Upcoming Events */}
          <div className="bg-white p-4 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4">Event Terdekat</h2>
            <ul>
              {events.length > 0 ? (
                events.map((event) => (
                  <li key={event.id} className="border-b py-2 flex justify-between">
                    <strong>{event.namaEvent}</strong> 
                    <span className="text-gray-600">{event.tanggal}</span>
                  </li>
                ))
              ) : (
                <p>Belum ada event terdekat.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}