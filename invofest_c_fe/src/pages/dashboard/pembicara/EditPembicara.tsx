import { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import { usePembicaraStore } from "../../../store/usePembicaraStore";

export default function EditPembicara() {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        pembicaraList,
        updatePembicara,
    } = usePembicaraStore();

    const pembicara =
        pembicaraList.find(
            (item) =>
                item.id === Number(id)
        );

    const [nama, setNama] =
        useState("");

    const [role, setRole] =
        useState("");

    const [foto, setFoto] =
        useState("");

    useEffect(() => {
        if (pembicara) {
            setNama(pembicara.name);
            setRole(pembicara.role);
            setFoto(pembicara.image || "");
        }
    }, [pembicara]);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        await updatePembicara({
            id: Number(id),
            name: nama,
            role: role,
            image: foto,
        });

        navigate(
            "/dashboard/pembicara"
        );
    };

    if (!pembicara) {
        return (
            <div className="p-6">
                <h1 className="text-red-600 text-xl font-bold">
                    Pembicara tidak ditemukan
                </h1>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200 max-w-2xl">

            <h1 className="text-xl font-bold text-stone-800 mb-6 pb-2 border-b border-stone-100">
                Edit Pembicara
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
                        value={nama}
                        onChange={(e) =>
                            setNama(
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
                            setFoto(
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
                        Update
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