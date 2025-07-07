import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";

import { ToggleTheme } from "@/components/layout/change-theme";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="mx-auto flex h-[88px] w-full max-w-screen-2xl items-center justify-center">
      <div className="my-3 flex h-14 w-full items-center justify-between px-8">
        <div className="flex items-center gap-3.5">
          <div className="flex size-12 items-center justify-center rounded-full border p-3">
            <Calendar className="size-6 text-foreground" />
          </div>

          <div className="space-y-1">
            <p className="text-lg font-medium leading-6">Big calendar</p>
            <p className="text-sm text-foreground">
              Built with Next.js and Tailwind by{" "}
              <Link
                href="https://github.com/lramos33"
                target="_blank"
                className="inline-flex gap-0.5 text-sm underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                lramos33
                <ArrowUpRight size={12} className="text-foreground" />
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="https://github.com/lramos33/big-calendar"
            target="_blank"
            className="inline-flex gap-0.5 text-sm hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            View on GitHub
            <ArrowUpRight size={14} className="text-foreground" />
          </Link>

          <div className="flex items-center gap-2">
            <LogoutButton />
            
            <Button size="icon" asChild variant="ghost">
              <Link href="https://x.com/leoo_ramos1" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </Link>
            </Button>

            <ToggleTheme />
          </div>
        </div>
      </div>
    </header>
  );
}
