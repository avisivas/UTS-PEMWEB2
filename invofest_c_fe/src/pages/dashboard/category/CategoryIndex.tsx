import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategoryStore } from "../../../store/useCategoryStore";

export default function CategoryIndex() {

    const {
        categories,
        fetchCategories,
        deleteCategory,
    } = useCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-stone-800">
                    Daftar Category
                </h1>

                <Link to="/dashboard/category/create">
                    <button className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-lg transition-all shadow-sm">
                        Add New Category
                    </button>
                </Link>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg border border-stone-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-50">
                        <tr>
                            <th className="p-4 border-b text-sm font-semibold text-stone-600 w-16">
                                No
                            </th>

                            <th className="p-4 border-b text-sm font-semibold text-stone-600">
                                Nama Kategori
                            </th>

                            <th className="p-4 border-b text-sm font-semibold text-stone-600 text-center">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-stone-50/50 transition"
                                >
                                    <td className="p-4 border-b text-sm text-stone-700">
                                        {index + 1}
                                    </td>

                                    <td className="p-4 border-b text-sm text-stone-700 font-medium">
                                        {item.name}
                                    </td>

                                    <td className="p-4 border-b text-sm text-center">
                                        {/* EDIT */}
                                        <Link
                                            to={`/dashboard/category/edit/${item.id}`}
                                            className="text-stone-400 hover:text-stone-600 mr-4"
                                        >
                                            Edit
                                        </Link>

                                        {/* DELETE */}
                                        <button
                                            onClick={() => {

                                                const confirmDelete =
                                                    window.confirm(
                                                        "Yakin ingin menghapus category ini?"
                                                    );

                                                if (confirmDelete) {
                                                    deleteCategory(item.id);
                                                }
                                            }}
                                            className="text-red-400 hover:text-red-600"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="p-8 text-center text-stone-400 italic"
                                >
                                    Belum ada kategori.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}