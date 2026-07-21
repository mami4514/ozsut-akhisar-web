"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/auth.service";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta adresi zorunludur.")
    .email("Geçerli bir e-posta adresi girin."),

  password: z
    .string()
    .min(1, "Şifre zorunludur.")
    .min(8, "Şifre en az 8 karakter olmalıdır."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
    };
    access_token: string;
    token_type: string;
  };
}

interface ValidationErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setApiError(null);

    try {
      const response = (await login(values)) as LoginResponse;

      localStorage.setItem(
        "access_token",
        response.data.access_token,
      );

      localStorage.setItem(
        "auth_user",
        JSON.stringify(response.data.user),
      );

      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError<ValidationErrorResponse>(error)) {
        if (!error.response) {
          setApiError(
            "Laravel sunucusuna bağlanılamadı. Backend'in çalıştığından emin olun.",
          );

          return;
        }

        if (error.response.status === 401) {
          setApiError("E-posta adresi veya şifre hatalı.");

          return;
        }

        if (error.response.status === 422) {
          const validationErrors = error.response.data.errors;
          const firstError = validationErrors
            ? Object.values(validationErrors)[0]?.[0]
            : null;

          setApiError(
            firstError ??
              error.response.data.message ??
              "Girilen bilgileri kontrol edin.",
          );

          return;
        }

        setApiError(
          error.response.data.message ??
            "Giriş sırasında beklenmeyen bir hata oluştu.",
        );

        return;
      }

      setApiError("Beklenmeyen bir hata oluştu.");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/40 px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-primary)_0,transparent_28%)] opacity-10" />

      <div className="absolute -left-24 top-1/3 size-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute -right-24 bottom-1/4 size-72 rounded-full bg-primary/10 blur-3xl" />

      <Card className="relative z-10 w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <LockKeyhole className="size-7" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Özsüt Akhisar
            </CardTitle>

            <CardDescription>
              Yönetim paneline erişmek için hesabınızla giriş yapın.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {apiError && (
              <div
                role="alert"
                className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {apiError}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-posta adresi</Label>

              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@ozsut.com"
                aria-invalid={Boolean(errors.email)}
                disabled={isSubmitting}
                {...register("email")}
              />

              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="En az 8 karakter"
                  className="pr-11"
                  aria-invalid={Boolean(errors.password)}
                  disabled={isSubmitting}
                  {...register("password")}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  disabled={isSubmitting}
                  aria-label={
                    showPassword
                      ? "Şifreyi gizle"
                      : "Şifreyi göster"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>

              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <LoaderCircle className="size-4 animate-spin" />
              )}

              {isSubmitting
                ? "Giriş yapılıyor..."
                : "Giriş Yap"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Bu alan yalnızca yetkili personel içindir.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}