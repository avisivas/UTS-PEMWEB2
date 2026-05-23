import { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import { useCategoryStore } from "../../../store/useCategoryStore";

export default function CategoryEdit() {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        categories,
        updateCategory,
    } = useCategoryStore();

    const category = categories.find(
        (item) =>
            item.id === Number(id)
    );

    const [name, setName] =
        useState("");

    useEffect(() => {
        if (category) {
            setName(category.name);
        }
    }, [category]);

    // kalau data tidak ditemukan
    if (!category) {
        return (
            <div className="p-6">
                <h1 className="text-xl font-bold text-red-600">
                    Category tidak ditemukan
                </h1>
            </div>
        );
    }

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!name.trim()) {
            alert(
                "Nama category wajib diisi!"
            );
            return;
        }

        await updateCategory({
            id: Number(id),
            name: name.trim(),
        });

        navigate(
            "/dashboard/category"
        );
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200 max-w-2xl">

            <h1 className="text-xl font-bold text-stone-800 mb-6 pb-2 border-b border-stone-100">
                Edit Category
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Nama Category
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        className="w-full border border-stone-300 p-2.5 rounded-lg focus:ring-2 focus:ring-stone-500 outline-none"
                    />
                </div>

                <div className="flex gap-2 pt-2">

                    <button
                        type="submit"
                        className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition"
                    >
                        Update
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