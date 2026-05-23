import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePembicaraStore } from "../../../store/usePembicaraStore";

export default function PembicaraIndex() {
    const {
        pembicaraList,
        fetchPembicara,
        deletePembicara
    } = usePembicaraStore();

    useEffect(() => {
        fetchPembicara();
    }, []);

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-stone-800">
                        Daftar Pembicara
                    </h1>

                    <p className="text-stone-500 text-sm">
                        Manajemen narasumber acara
                    </p>
                </div>

                <Link to="/dashboard/pembicara/create">
                    <button className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-sm">
                        Add New Pembicara
                    </button>
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-stone-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-50">
                        <tr>
                            <th className="p-4 border-b text-sm font-semibold text-stone-600 w-16">
                                No
                            </th>

                            <th className="p-4 border-b text-sm font-semibold text-stone-600">
                                Nama
                            </th>

                            <th className="p-4 border-b text-sm font-semibold text-stone-600">
                                Role
                            </th>

                            <th className="p-4 border-b text-sm font-semibold text-stone-600">
                                Foto
                            </th>

                            <th className="p-4 border-b text-sm font-semibold text-stone-600 text-center">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {pembicaraList.length > 0 ? (
                            pembicaraList.map((p, index) => (
                                <tr
                                    key={p.id}
                                    className="hover:bg-stone-50/50 transition"
                                >
                                    <td className="p-4 border-b text-sm text-stone-700">
                                        {index + 1}
                                    </td>

                                    <td className="p-4 border-b text-sm text-stone-700 font-medium">
                                        {p.name}
                                    </td>

                                    <td className="p-4 border-b text-sm text-stone-600">
                                        {p.role}
                                    </td>

                                    <td className="p-4 border-b text-sm text-stone-600">
                                        {p.image || "-"}
                                    </td>

                                    <td className="p-4 border-b text-sm text-center">
                                        <Link
                                            to={`/dashboard/pembicara/edit/${p.id}`}
                                            className="text-stone-400 hover:text-stone-600 mr-3 transition"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={async () => {
                                                const confirmDelete =
                                                    window.confirm(
                                                        "Yakin ingin menghapus pembicara?"
                                                    );

                                                if (confirmDelete) {
                                                    await deletePembicara(p.id);
                                                }
                                            }}
                                            className="text-red-400 hover:text-red-600 transition"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="p-8 text-center text-stone-400 italic"
                                >
                                    Belum ada data pembicara.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}