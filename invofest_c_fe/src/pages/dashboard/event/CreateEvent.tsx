import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useEventStore } from "../../../store/useEventStore";
import { usePembicaraStore } from "../../../store/usePembicaraStore";
import { useCategoryStore } from "../../../store/useCategoryStore";

export default function EventCreate() {
    const navigate = useNavigate();

    const addEvent = useEventStore(
        (state) => state.addEvent
    );

    const { pembicaraList } =
        usePembicaraStore();

    const { categories } =
        useCategoryStore();

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

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        await addEvent({
            namaEvent,
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
                Add New Event
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Nama Event
                    </label>

                    <input
                        type="text"
                        required
                        value={namaEvent}
                        onChange={(e) =>
                            setNamaEvent(
                                e.target.value
                            )
                        }
                        className="w-full border border-stone-300 p-2.5 rounded-lg"
                    />
                </div>

                {/* CATEGORY */}
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Category
                    </label>

                    <select
                        required
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                        className="w-full border border-stone-300 p-2.5 rounded-lg"
                    >
                        <option value="">
                            Pilih Category
                        </option>

                        {categories.map((item) => (
                            <option
                                key={item.id}
                                value={item.name}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* PEMBICARA */}
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                        Pembicara
                    </label>

                    <select
                        required
                        value={pembicara}
                        onChange={(e) =>
                            setPembicara(
                                e.target.value
                            )
                        }
                        className="w-full border border-stone-300 p-2.5 rounded-lg"
                    >
                        <option value="">
                            Pilih Pembicara
                        </option>

                        {pembicaraList.map((item) => (
                            <option
                                key={item.id}
                                value={item.name}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                            Tanggal
                        </label>

                        <input
                            type="date"
                            required
                            value={tanggal}
                            onChange={(e) =>
                                setTanggal(
                                    e.target.value
                                )
                            }
                            className="w-full border border-stone-300 p-2.5 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                            Jam
                        </label>

                        <input
                            type="time"
                            required
                            value={jam}
                            onChange={(e) =>
                                setJam(
                                    e.target.value
                                )
                            }
                            className="w-full border border-stone-300 p-2.5 rounded-lg"
                        />
                    </div>

                </div>

                <div className="flex gap-2 pt-4">

                    <button
                        type="submit"
                        className="bg-red-700 text-white px-8 py-2.5 rounded-lg"
                    >
                        Simpan
                    </button>

                    <Link
                        to="/dashboard/event"
                        className="bg-stone-100 text-red-600 px-8 py-2.5 rounded-lg"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}