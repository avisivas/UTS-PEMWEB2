import { create } from "zustand";

// Definisi tipe data (kalau pakai TypeScript)
export interface Category {
    id: number;
    name: string;
    createdAt: string;
}

interface CategoryStore {
    categories: Category[];
    isLoading: boolean;
    fetchCategories: () => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
}

// Set URL Backend: akan membaca environment variable, 
// kalau tidak ada, otomatis fallback ke localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    isLoading: false,

    // Fungsi untuk MENGAMBIL data dari Backend
    fetchCategories: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/categories`);
            
            if (!response.ok) {
                throw new Error("Gagal mengambil data dari server");
            }
            
            const data = await response.json();
            set({ categories: data, isLoading: false });
        } catch (error) {
            console.error("Error fetching categories:", error);
            set({ isLoading: false });
            // Bisa tambahkan state error di sini jika perlu
        }
    },

    // Fungsi untuk MENGHAPUS data
    deleteCategory: async (id: number) => {
        try {
            const response = await fetch(`${API_URL}/categories/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Gagal menghapus data di server");
            }

            // Jika sukses di database, hapus juga data dari state/layar (biar gak perlu refresh page)
            set((state) => ({
                categories: state.categories.filter((item) => item.id !== id),
            }));
            
            alert("Category berhasil dihapus!");
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Gagal menghapus category. Coba lagi.");
        }
    },
}));