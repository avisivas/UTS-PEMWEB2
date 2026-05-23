import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// MENAMPILKAN DATA EVENT
export const getEvents = async (
  req: Request,
  res: Response
) => {
  try {
    const events =
      await prisma.event.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil event",
    });
  }
};

// CREATE
export const createEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      namaEvent,
      category,
      pembicara,
      tanggal,
      jam,
    } = req.body;

    const newEvent =
      await prisma.event.create({
        data: {
          namaEvent,
          category,
          pembicara,
          tanggal,
          jam,
        },
      });

    res.status(201).json({
      message: "Event berhasil dibuat",
      data: newEvent,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Gagal membuat event",
    });
  }
};

// GET BY ID
export const getEventById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const event =
      await prisma.event.findUnique({
        where: { id },
      });

    if (!event) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil event",
    });
  }
};

// UPDATE
export const updateEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const {
      namaEvent,
      category,
      pembicara,
      tanggal,
      jam,
    } = req.body;

    const updated =
      await prisma.event.update({
        where: { id },

        data: {
          namaEvent,
          category,
          pembicara,
          tanggal,
          jam,
        },
      });

    res.json({
      message: "Event berhasil diupdate",
      data: updated,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Gagal update event",
    });
  }
};

// DELETE
export const deleteEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await prisma.event.delete({
      where: { id },
    });

    res.json({
      message: "Event berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal hapus event",
    });
  }
};