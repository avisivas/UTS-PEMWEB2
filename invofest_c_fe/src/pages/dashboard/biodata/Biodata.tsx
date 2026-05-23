export default function Biodata() {
    return (
        <div className="p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden max-w-4xl">

                {/* HEADER */}
                <div className="bg-red-700 px-6 py-8 text-white">
                    <h1 className="text-3xl font-bold">
                        Biodata Mahasiswa
                    </h1>

                    <p className="text-red-100 mt-1">
                        Informasi pembuat website
                    </p>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col md:flex-row gap-8">

                    {/* FOTO */}
                    <div className="flex justify-center">
                        <img
                            src="data:image/jpeg;base64,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"
                            alt="Foto Profil"
                            className="w-52 h-52 rounded-2xl object-cover border-4 border-stone-100 shadow"
                        />
                    </div>

                    {/* BIODATA */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-stone-800 mb-6">
                            Data Diri
                        </h2>

                        <div className="space-y-4">

                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-stone-600">
                                    Nama
                                </span>

                                <span className="col-span-2 text-stone-800">
                                    Avicena
                                </span>
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-stone-600">
                                    NIM
                                </span>

                                <span className="col-span-2 text-stone-800">
                                    24090094
                                </span>
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-stone-600">
                                    Program Studi
                                </span>

                                <span className="col-span-2 text-stone-800">
                                    D4 Teknik Informatika
                                </span>
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-stone-600">
                                    Fakultas
                                </span>

                                <span className="col-span-2 text-stone-800">
                                    Fakultas Vokasi
                                </span>
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-stone-600">
                                    Email
                                </span>

                                <span className="col-span-2 text-stone-800">
                                    avisganteng134@gmail.com
                                </span>
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-stone-600">
                                    No HP
                                </span>

                                <span className="col-span-2 text-stone-800">
                                    085290447862
                                </span>
                            </div>

                            <div className="grid grid-cols-3">
                                <span className="font-semibold text-stone-600">
                                    Alamat
                                </span>

                                <span className="col-span-2 text-stone-800">
                                    Indonesia
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}