import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
  foto?: string | null;
};

const API_URL = "http://localhost:3000";

export default function UserIndex() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/auth`);

      if (!response.ok) {
        throw new Error("Gagal mengambil data user");
      }

      const result = await response.json();

      // Karena backend kamu mengirim data dalam bentuk { message, data }
      setUsers(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengambil data user");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;

    try {
      const response = await fetch(`${API_URL}/auth/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal menghapus user");
        return;
      }

      alert("User berhasil dihapus");
      getUsers();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus user");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-8">
      {/* Header Halaman */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Daftar User</h1>

        <Link
          to="/dashboard/users/create"
          className="bg-white text-[#651624] px-6 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
        >
          + Tambah User
        </Link>
      </div>

      {/* Grid User */}
      {users.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center font-bold text-gray-600 shadow-lg">
          Belum ada user
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex flex-col transition-transform hover:-translate-y-1"
            >
              {/* Avatar / Foto User */}
              <div className="mb-4 flex justify-center">
                {item.foto ? (
                  <img
                    src={item.foto}
                    alt={item.name}
                    className="rounded-full w-28 h-28 object-cover shadow-sm border-4 border-[#651624]"
                  />
                ) : (
                  <div className="rounded-full w-28 h-28 bg-[#651624] text-white flex items-center justify-center text-4xl font-bold shadow-sm">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info Text */}
              <div className="flex-1 text-center mb-4">
                <p className="font-bold text-gray-900 text-lg">{item.name}</p>
                <p className="text-sm text-gray-500 font-medium">
                  {item.email}
                </p>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-center gap-3 pt-3 border-t border-gray-100">
                {/* Edit */}
                <Link
                  to={`/dashboard/users/edit/${item.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#651624] text-white text-sm font-semibold hover:bg-[#4a101a] transition shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Edit
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#651624] text-white text-sm font-semibold hover:bg-[#4a101a] transition shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.12-2.212a48.047 48.047 0 00-3.52 0c-1.21.048-2.12 1.032-2.12 2.212v.916m7.5 0H9.75"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}