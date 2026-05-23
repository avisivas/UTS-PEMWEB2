import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCategoryStore } from "../../../store/useCategoryStore";

export default function CategoryCreate() {
    const navigate = useNavigate();

    const { addCategory, categories } = useCategoryStore();

    const [name, setName] = useState("");

    const handleSubmit = async (
        e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Nama category wajib diisi!");
            return;
        }

        const isExist = categories.some(
            (item) =>
                item.name.toLowerCase() ===
                name.toLowerCase()
        );

        if (isExist) {
            alert("Category sudah ada!");
            return;
        }

        await addCategory({
            name,
        });

        navigate("/dashboard/category");

        setName("");

        alert("Category berhasil ditambahkan!");

        navigate("/dashboard/category");
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200 max-w-2xl">
            <h1 className="text-xl font-bold text-stone-800 mb-6 pb-2 border-b border-stone-100">
                Add New Category
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Nama
                    </label>

                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama kategori..."
                        className="w-full border border-stone-300 p-2.5 rounded-lg focus:ring-2 focus:ring-stone-500 outline-none"
                    />
                </div>

                <div className="flex gap-2 pt-2">
                    <button
                        type="submit"
                        className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition"
                    >
                        Simpan
                    </button>

                    <Link
                        to="/dashboard/category"
                        className="bg-stone-100 text-red-600 px-6 py-2 rounded-lg hover:bg-red-200 transition"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}