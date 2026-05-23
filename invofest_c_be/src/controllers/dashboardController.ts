import { Request, Response } from 'express';
// Pastikan kamu mengimpor prisma client milikmu, misalnya:
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDashboardSummary = async (req: Request, res: Response) => {
    try {
        // Kita gunakan Promise.all agar 4 pencarian database ini berjalan bersamaan (lebih cepat)
        const [totalEvent, totalPembicara, totalKategori, upcomingEvents] = await Promise.all([
            prisma.event.count(),
            prisma.pembicara.count(),
            prisma.category.count(),
            prisma.event.findMany({
                where: {
                    // Sesuaikan filter tanggal ini dengan format string yang ada di database-mu
                    tanggal: {
                        gte: new Date().toISOString(),
                    }
                },
                orderBy: {
                    tanggal: 'asc', // Urutkan dari yang terdekat
                },
                take: 5, // Ambil maksimal 5 event
                select: {
                    id: true,
                    namaEvent: true,
                    tanggal: true,
                }
            })
        ]);

        // Kirim respons persis dengan format JSON yang kamu minta
        return res.status(200).json({
            success: true,
            message: "Data dashboard berhasil diambil",
            data: {
                stats: {
                    totalEvent,
                    totalPembicara,
                    totalKategori
                },
                upcomingEvents
            }
        });

    } catch (error: any) {
        console.error("ERROR ASLI:", error);

        return res.status(500).json({
            success: false,
            message: "Gagal mengambil pembicara",
            error: error.message
        });
    }
};