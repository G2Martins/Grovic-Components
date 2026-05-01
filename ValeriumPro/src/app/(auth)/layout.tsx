import Link from "next/link"
import { Icons } from "@/components/ui/icons"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Logo fixed top-left */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
        <div className="relative py-3 xl:py-4 px-4 sm:px-6 flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity pointer-events-auto">
            <Icons.LogoSmall className="w-5 h-5 text-foreground" />
            <span className="text-sm font-semibold text-foreground">ValeriumPro</span>
          </Link>
        </div>
      </nav>

      {/* Centered form */}
      <div className="w-full flex flex-col justify-center items-center p-8 lg:p-12 pb-2">
        <div className="w-full max-w-[360px] flex flex-col h-full">
          <div className="space-y-8 flex-1 flex flex-col justify-center">
            {children}
          </div>
          <div className="text-center mt-8 pb-4">
            <p className="text-xs text-[#878787]">
              By signing in you agree to our{" "}
              <Link href="#" className="text-[#878787] hover:text-foreground transition-colors underline">
                Terms of service
              </Link>{" "}
              &{" "}
              <Link href="#" className="text-[#878787] hover:text-foreground transition-colors underline">
                Privacy policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
