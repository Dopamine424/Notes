"use client";

import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();
    return(
        <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
            scrolled && "norder-b shadow-sm"
        )}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading &&(
                   <Spinner />
                )}
                {!isAuthenticated && !isLoading &&(
                    <>
                    <SignInButton mode="modal">
                        <Button variant="ghost" size="sm">
                            Войти
                        </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <Button size="sm">
                            Зарегистрироваться
                        </Button>
                    </SignUpButton>
                    </>
                )}
                {isAuthenticated && !isLoading &&(
                    <>
                    <Link href="/documents">
                        <Button variant="ghost" size="sm">
                            Войти в Notes
                        </Button>
                    </Link>
                    <UserButton afterSignOutUrl="/"/>
                    </>
                )}
                <ModeToggle/>
            </div>
        </div>
    )
}