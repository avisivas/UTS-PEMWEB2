import api from "../api/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Category {
    id: number;
    name: string;
}

interface CategoryState {
    categories: Category[];

    fetchCategories: () => Promise<void>;

    addCategory: (
        data: Omit<Category, "id">
    ) => Promise<void>;

    deleteCategory: (
        id: number
    ) => Promise<void>;

    updateCategory: (
        data: Category
    ) => Promise<void>;
}

export const useCategoryStore =
    create<CategoryState>()(
        persist(
            (set) => ({
                categories: [],

                fetchCategories: async () => {
                    const res = await api.get("/categories");

                    set({
                        categories: res.data,
                    });
                },

                addCategory: async (data) => {
                    await api.post(
                        "/categories",
                        data
                    );

                    const res = await api.get(
                        "/categories"
                    );

                    set({
                        categories: res.data,
                    });
                },

                deleteCategory: async (id) => {
                    await api.delete(
                        `/categories/${id}`
                    );

                    const res = await api.get(
                        "/categories"
                    );

                    set({
                        categories: res.data,
                    });
                },

                updateCategory: async (data) => {
                    await api.put(
                        `/categories/${data.id}`,
                        data
                    );

                    const res = await api.get(
                        "/categories"
                    );

                    set({
                        categories: res.data,
                    });
                },
            }),
            {
                name: "category-storage",
            }
        )
    );