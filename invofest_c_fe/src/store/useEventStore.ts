import api from "../api/axios";

import { create } from "zustand";

import { persist } from "zustand/middleware";

export interface EventType {
    id: number;

    namaEvent: string;

    category: string;

    pembicara: string;

    tanggal: string;

    jam: string;
}

interface EventState {
    events: EventType[];

    fetchEvents: () => Promise<void>;

    addEvent: (
        data: Omit<EventType, "id">
    ) => Promise<void>;

    deleteEvent: (
        id: number
    ) => Promise<void>;

    updateEvent: (
        data: EventType
    ) => Promise<void>;
}

export const useEventStore =
    create<EventState>()(
        persist(
            (set) => ({
                events: [],

                // GET
                fetchEvents:
                    async () => {
                        const res =
                            await api.get(
                                "/events"
                            );

                        set({
                            events:
                                res.data,
                        });
                    },

                // CREATE
                addEvent:
                    async (data) => {
                        await api.post(
                            "/events",
                            data
                        );

                        const res =
                            await api.get(
                                "/events"
                            );

                        set({
                            events:
                                res.data,
                        });
                    },

                // DELETE
                deleteEvent:
                    async (id) => {
                        await api.delete(
                            `/events/${id}`
                        );

                        const res =
                            await api.get(
                                "/events"
                            );

                        set({
                            events:
                                res.data,
                        });
                    },

                // UPDATE
                updateEvent:
                    async (data) => {
                        await api.put(
                            `/events/${data.id}`,
                            data
                        );

                        const res =
                            await api.get(
                                "/events"
                            );

                        set({
                            events:
                                res.data,
                        });
                    },
            }),
            {
                name: "event-storage",
            }
        )
    );