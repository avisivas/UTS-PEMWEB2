import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// GET ALL
export const getPembicara = async (
    req: Request,
    res: Response
) => {
    try {
        const data =
            await prisma.pembicara.findMany();

        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil pembicara",
        });
    }
};

// CREATE
export const createPembicara = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, role, image } = req.body;

        const newData =
            await prisma.pembicara.create({
                data: {
                    name,
                    role,
                    image,
                },
            });

        res.status(201).json({
            message: "Pembicara berhasil ditambahkan",
            data: newData,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menambah pembicara",
        });
    }
};

// GET BY ID
export const getPembicaraById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const data =
            await prisma.pembicara.findUnique({
                where: { id },
            });

        if (!data) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil pembicara",
        });
    }
};

// UPDATE
export const updatePembicara = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const { name, role, image } = req.body;

        const updated =
            await prisma.pembicara.update({
                where: { id },
                data: {
                    name,
                    role,
                    image,
                },
            });

        res.json({
            message: "Pembicara berhasil diupdate",
            data: updated,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update pembicara",
        });
    }
};

// DELETE
export const deletePembicara = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        await prisma.pembicara.delete({
            where: { id },
        });

        res.json({
            message: "Pembicara berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal hapus pembicara",
        });
    }
};