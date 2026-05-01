"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
})
type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    router.push("/dashboard")
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-lg lg:text-xl mb-4 font-medium text-foreground">
          Welcome to ValeriumPro
        </h1>
        <p className="text-sm text-[#878787]">
          Sign in or create an account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm text-foreground">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            defaultValue="demo@valerium.pro"
            className="h-10 bg-[#f7f7f7] dark:bg-[#0f0f0f] border-[#e6e6e6] dark:border-[#1d1d1d] rounded-none text-sm focus:ring-0"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm text-foreground">Password</Label>
            <Link href="/forgot-password" className="text-xs text-[#878787] hover:text-foreground transition-colors">
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            defaultValue="demo1234"
            className="h-10 bg-[#f7f7f7] dark:bg-[#0f0f0f] border-[#e6e6e6] dark:border-[#1d1d1d] rounded-none text-sm focus:ring-0"
            {...register("password")}
          />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-10 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs text-[#878787]">demo credentials prefilled</span>
        </div>
      </div>

      <p className="text-center text-sm text-[#878787]">
        No account?{" "}
        <Link href="/register" className="text-foreground hover:opacity-80 transition-opacity underline underline-offset-2">
          Create one
        </Link>
      </p>
    </div>
  )
}
