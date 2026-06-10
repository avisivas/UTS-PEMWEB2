import { z } from "zod";
import { InputText } from "../../../components/ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const schema = z.object({
  name: z.string().min(1, "Nama user harus diisi"),
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  password: z.string().min(1, "Password harus diisi"),
});

const API_URL = "http://localhost:3000";

export default function UserCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal menambahkan user");
        return;
      }

      alert("User berhasil ditambahkan");
      reset();
      navigate("/dashboard/users");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menambahkan user");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-[#f8f5f0] rounded-2xl shadow-md p-8 border border-[#e0d6c8]">
        <h2 className="text-2xl font-bold text-[#3e2f1c] mb-6 border-b border-[#d6c7b2] pb-4">
          Add New User
        </h2>

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
            label="Password"
            name="password"
            register={register}
            error={errors.password?.message}
          />

          <div className="flex justify-start mt-4">
            <Button type="submit" label="Save User" />
          </div>
        </form>
      </div>
    </div>
  );
}