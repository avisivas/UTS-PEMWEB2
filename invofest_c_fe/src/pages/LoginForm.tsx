import { useForm } from "react-hook-form";
import { InputText } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

type FormData = {
    nim: string;
    password: string;
};

const schema = z.object({
    nim: z.string().min(5, "NIM wajib diisi"),
    password: z.string().min(6, "Password minimal 6 karakter"),
});

export default function LoginForm() {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {

        // LOGIN MANUAL
        if (
            data.nim === "24090094" &&
            data.password === "24090094"
        ) {
            login(data.nim);

            alert("Login berhasil!");

            navigate("/dashboard");
        } else {
            alert("NIM atau Password salah!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <InputText
                label="NIM"
                nama="nim"
                register={register}
                error={errors.nim?.message}
            />

            <InputPassword
                label="Password"
                nama="password"
                register={register}
                error={errors.password?.message}
            />

            <div className="mt-4">
                <Button
                    label="Login"
                    variant="primary"
                    type="submit"
                />
            </div>
        </form>
    );
}