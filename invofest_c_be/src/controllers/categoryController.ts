import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// MENAMPILKAN SEMUA DATA
export const getCategories = async (
    req: Request,
    res: Response
) => {
    try {
        const categories =
            await prisma.category.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil category",
        });
    }
};

// CREATE
export const createCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Nama category wajib diisi",
            });
        }

        const newCategory =
            await prisma.category.create({
                data: {
                    name,
                },
            });

        res.status(201).json({
            message: "Category berhasil dibuat",
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal membuat category",
        });
    }
};

// GET BY ID
export const getCategoryById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const category =
            await prisma.category.findUnique({
                where: { id },
            });

        if (!category) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil category",
        });
    }
};

// UPDATE
export const updateCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;

        const updated =
            await prisma.category.update({
                where: { id },
                data: { name },
            });

        res.json({
            message: "Category berhasil diupdate",
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update category",
        });
    }
};

// DELETE
export const deleteCategory = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        await prisma.category.delete({
            where: { id },
        });

        res.json({
            message: "Category berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal hapus category",
        });
    }
};