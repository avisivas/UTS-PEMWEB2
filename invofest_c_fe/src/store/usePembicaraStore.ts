import api from "../api/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Pembicara {
    id: number;
    name: string;
    role: string;
    image?: string;
}

interface PembicaraState {
    pembicaraList: Pembicara[];

    fetchPembicara: () => Promise<void>;

    addPembicara: (
        data: Omit<Pembicara, "id">
    ) => Promise<void>;

    deletePembicara: (
        id: number
    ) => Promise<void>;

    updatePembicara: (
        data: Pembicara
    ) => Promise<void>;
}

export const usePembicaraStore =
    create<PembicaraState>()(
        persist(
            (set) => ({
                pembicaraList: [],

                fetchPembicara: async () => {
                    const res = await api.get("/pembicara");

                    set({
                        pembicaraList: res.data,
                    });
                },

                addPembicara: async (data) => {
                    await api.post("/pembicara", data);

                    const res = await api.get("/pembicara");

                    set({
                        pembicaraList: res.data,
                    });
                },

                deletePembicara: async (id) => {
                    await api.delete(`/pembicara/${id}`);

                    const res = await api.get("/pembicara");

                    set({
                        pembicaraList: res.data,
                    });
                },

                updatePembicara: async (data) => {
                    await api.put(
                        `/pembicara/${data.id}`,
                        data
                    );

                    const res = await api.get(
                        "/pembicara"
                    );

                    set({
                        pembicaraList: res.data,
                    });
                },
            }),
            {
                name: "pembicara-storage",
            }
        )
    );