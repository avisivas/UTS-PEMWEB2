import { useState } from "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";

import { usePembicaraStore } from "../../../store/usePembicaraStore";

export default function CreatePembicara() {
    const navigate = useNavigate();

    const {
        addPembicara,
        pembicaraList,
    } = usePembicaraStore();

    const [name, setName] =
        useState("");

    const [role, setRole] =
        useState("");

    const [image, setImage] =
        useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (
            !name.trim() ||
            !role.trim()
        ) {
            alert(
                "Semua field wajib diisi!"
            );

            return;
        }

        const isExist =
            pembicaraList.some(
                (item) =>
                    item.name.toLowerCase() ===
                    name.toLowerCase()
            );

        if (isExist) {
            alert(
                "Pembicara sudah ada!"
            );

            return;
        }

        await addPembicara({
            name: name.trim(),
            role: role.trim(),
            image,
        });

        navigate(
            "/dashboard/pembicara"
        );
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200 max-w-2xl">

            <h1 className="text-xl font-bold text-stone-800 mb-6 pb-2 border-b border-stone-100">
                Add New Pembicara
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Nama
                    </label>

                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        className="w-full border border-stone-300 p-2.5 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Role
                    </label>

                    <input
                        type="text"
                        required
                        value={role}
                        onChange={(e) =>
                            setRole(
                                e.target.value
                            )
                        }
                        className="w-full border border-stone-300 p-2.5 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Foto
                    </label>

                    <input
                        type="file"
                        onChange={(e) =>
                            setImage(
                                e.target
                                    .files?.[0]
                                    ?.name || ""
                            )
                        }
                        className="w-full text-sm text-gray-500"
                    />
                </div>

                <div className="flex gap-2 pt-4">

                    <button
                        type="submit"
                        className="bg-red-700 text-white px-8 py-2.5 rounded-lg"
                    >
                        Simpan
                    </button>

                    <Link
                        to="/dashboard/pembicara"
                        className="bg-stone-100 text-red-600 px-8 py-2.5 rounded-lg"
                    >
                        Batal
                    </Link>

                </div>

            </form>

        </div>
    );
}