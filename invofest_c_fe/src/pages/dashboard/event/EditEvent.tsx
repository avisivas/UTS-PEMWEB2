import { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import { useEventStore } from "../../../store/useEventStore";

import { useCategoryStore } from "../../../store/useCategoryStore";

import { usePembicaraStore } from "../../../store/usePembicaraStore";

export default function EventEdit() {
    const navigate = useNavigate();

    const { id } = useParams();

    const { events, updateEvent } =
        useEventStore();

    const { categories } =
        useCategoryStore();

    const { pembicaraList } =
        usePembicaraStore();

    const event = events.find(
        (item) =>
            item.id === Number(id)
    );

    const [namaEvent, setNamaEvent] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [pembicara, setPembicara] =
        useState("");

    const [tanggal, setTanggal] =
        useState("");

    const [jam, setJam] =
        useState("");

    useEffect(() => {
        if (event) {
            setNamaEvent(event.namaEvent);

            setCategory(
                event.category || ""
            );

            setPembicara(
                event.pembicara
            );

            setTanggal(event.tanggal);

            setJam(event.jam);
        }
    }, [event]);

    // kalau data tidak ditemukan
    if (!event) {
        return (
            <div className="p-6">
                <h1 className="text-xl font-bold text-red-600">
                    Event tidak ditemukan
                </h1>
            </div>
        );
    }

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (
            !namaEvent.trim() ||
            !category ||
            !pembicara ||
            !tanggal ||
            !jam
        ) {
            alert("Semua field wajib diisi!");
            return;
        }

        await updateEvent({
            id: Number(id),
            namaEvent:
                namaEvent.trim(),
            category,
            pembicara,
            tanggal,
            jam,
        });

        navigate("/dashboard/event");
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200 max-w-2xl">

            <h1 className="text-xl font-bold text-stone-800 mb-6 pb-2 border-b border-stone-100">
                Edit Event
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                {/* NAMA EVENT */}
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Nama Event
                    </label>

                    <input
                        type="text"
                        value={namaEvent}
                        onChange={(e) =>
                            setNamaEvent(
                                e.target.value
                            )
                        }
                        className="w-full border border-stone-300 p-2.5 rounded-lg focus:ring-2 focus:ring-stone-500 outline-none"
                    />
                </div>

                {/* CATEGORY */}
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                        className="w-full border border-stone-300 p-2.5 rounded-lg focus:ring-2 focus:ring-stone-500 outline-none"
                    >
                        <option value="">
                            Pilih Category
                        </option>

                        {categories.map(
                            (item) => (
                                <option
                                    key={
                                        item.id
                                    }
                                    value={
                                        item.name
                                    }
                                >
                                    {item.name}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* PEMBICARA */}
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Pembicara
                    </label>

                    <select
                        value={pembicara}
                        onChange={(e) =>
                            setPembicara(
                                e.target.value
                            )
                        }
                        className="w-full border border-stone-300 p-2.5 rounded-lg focus:ring-2 focus:ring-stone-500 outline-none"
                    >
                        <option value="">
                            Pilih Pembicara
                        </option>

                        {pembicaraList.map(
                            (item) => (
                                <option
                                    key={
                                        item.id
                                    }
                                    value={
                                        item.name
                                    }
                                >
                                    {item.name}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* TANGGAL & JAM */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                            Tanggal
                        </label>

                        <input
                            type="date"
                            value={tanggal}
                            onChange={(e) =>
                                setTanggal(
                                    e.target.value
                                )
                            }
                            className="w-full border border-stone-300 p-2.5 rounded-lg focus:ring-2 focus:ring-stone-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                            Jam
                        </label>

                        <input
                            type="time"
                            value={jam}
                            onChange={(e) =>
                                setJam(
                                    e.target.value
                                )
                            }
                            className="w-full border border-stone-300 p-2.5 rounded-lg focus:ring-2 focus:ring-stone-500 outline-none"
                        />
                    </div>

                </div>

                <div className="flex gap-2 pt-4">

                    <button
                        type="submit"
                        className="bg-red-700 text-white px-8 py-2.5 rounded-lg hover:bg-red-800 transition"
                    >
                        Update
                    </button>

                    <Link
                        to="/dashboard/event"
                        className="bg-stone-100 text-red-600 px-8 py-2.5 rounded-lg hover:bg-red-200 transition"
                    >
                        Batal
                    </Link>

                </div>

            </form>

        </div>
    );
}