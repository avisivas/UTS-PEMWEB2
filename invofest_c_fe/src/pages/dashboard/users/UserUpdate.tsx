import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputText } from "../../../components/ui/InputText";
import Button from "../../../components/ui/Button";

type FormData = {
  name: string;
  email: string;
  password?: string;
};

const schema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  password: z.string().optional(),
});

const API_URL = "http://localhost:3000";

export default function UserUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/${id}`);

        if (!response.ok) {
          throw new Error("Gagal mengambil data user");
        }

        const result = await response.json();

        setValue("name", result.data.name);
        setValue("email", result.data.email);
        setValue("password", "");
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat mengambil data user");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload: {
        name: string;
        email: string;
        password?: string;
      } = {
        name: data.name,
        email: data.email,
      };

      // Password hanya dikirim kalau diisi
      if (data.password && data.password.trim() !== "") {
        payload.password = data.password;
      }

      const response = await fetch(`${API_URL}/auth/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal mengupdate user");
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/dashboard/users");
      }, 1500);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengupdate user");
    }
  };

  if (loading) {
    return <div className="p-6 font-bold text-white">Memuat data...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-[#f8f5f0] rounded-2xl shadow-md p-8 border border-[#e0d6c8]">
        <h2 className="text-2xl font-bold text-[#3e2f1c] mb-6 border-b border-[#d6c7b2] pb-4">
          Update User
        </h2>

        {success && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-green-200 text-green-900 font-bold">
            User berhasil diupdate!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputText
            label="Nama User"
            name="name"
            register={register}
            error={errors.name?.message}
          />

          <InputText
            label="Email"
            name="email"
            register={register}
            error={errors.email?.message}
          />

          <InputText
            label="Password Baru"
            name="password"
            register={register}
            error={errors.password?.message}
          />

          <p className="text-sm text-gray-600 font-medium">
            Kosongkan password jika tidak ingin mengganti password.
          </p>

          <div className="flex justify-start mt-4">
            <Button type="submit" label="Update User" />
          </div>
        </form>
      </div>
    </div>
  );
}