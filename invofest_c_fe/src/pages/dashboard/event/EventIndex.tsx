import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useEventStore } from "../../../store/useEventStore";

export default function EventIndex() {
    const {
        events,
        fetchEvents,
        deleteEvent,
    } = useEventStore();

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-200">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-stone-800">
                        Daftar Event
                    </h1>

                    <p className="text-stone-500 text-sm">
                        Jadwal acara dan seminar
                    </p>
                </div>

                <Link to="/dashboard/event/create">
                    <button className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-lg transition-all shadow-sm flex items-center gap-2">
                        Add New Event
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
                                Nama Event
                            </th>

                            <th className="p-4 border-b text-sm font-semibold text-stone-600">
                                Category
                            </th>

                            <th className="p-4 border-b text-sm font-semibold text-stone-600">
                                Pembicara
                            </th>

                            <th className="p-4 border-b text-sm font-semibold text-stone-600 text-center">
                                Waktu
                            </th>

                            <th className="p-4 border-b text-sm font-semibold text-stone-600 text-center">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {events.length > 0 ? (
                            events.map((ev, index) => (
                                <tr
                                    key={ev.id}
                                    className="hover:bg-stone-50/50 transition"
                                >
                                    <td className="p-4 border-b text-sm text-stone-700">
                                        {index + 1}
                                    </td>

                                    <td className="p-4 border-b text-sm text-stone-700 font-medium">
                                        {ev.namaEvent}
                                    </td>

                                    <td className="p-4 border-b text-sm text-stone-600">
                                        {ev.category}
                                    </td>

                                    <td className="p-4 border-b text-sm text-stone-600">
                                        {ev.pembicara}
                                    </td>

                                    <td className="p-4 border-b text-sm text-center text-stone-600">
                                        <span className="bg-stone-100 px-2 py-1 rounded text-xs">
                                            {ev.tanggal}
                                        </span>

                                        <br />

                                        <span className="text-xs text-stone-400">
                                            {ev.jam}
                                        </span>
                                    </td>

                                    <td className="p-4 border-b text-sm text-center">
                                        <Link
                                            to={`/dashboard/event/edit/${ev.id}`}
                                            className="text-stone-400 hover:text-stone-600 mr-3 transition"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => {
                                                const confirmDelete =
                                                    window.confirm(
                                                        "Yakin ingin menghapus event?"
                                                    );

                                                if (confirmDelete) {
                                                    deleteEvent(ev.id);
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
                                    colSpan={6}
                                    className="p-8 text-center text-stone-400 italic"
                                >
                                    Belum ada jadwal event.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}