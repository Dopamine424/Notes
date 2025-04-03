// "use client";

// import { useConvexAuth } from "convex/react";
// import { useScrollTop } from "@/hooks/use-scroll-top";
// import { cn } from "@/lib/utils";

// import { Logo } from "./logo";
// import { ModeToggle } from "@/components/mode-toggle";
// import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
// import { Button } from "@/components/ui/button";
// import { Spinner } from "@/components/spinner";
// import Link from "next/link";

// export const Navbar = () => {
//   const { isAuthenticated, isLoading } = useConvexAuth();
//   const scrolled = useScrollTop();
//   return (
//     <div
//       className={cn(
//         "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
//         scrolled && "norder-b shadow-sm",
//       )}
//     >
//       <Logo />
//       <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
//         {isLoading && <Spinner />}
//         {!isAuthenticated && !isLoading && (
//           <>
//             <SignInButton mode="modal">
//               <Button variant="ghost" size="sm">
//                 Войти
//               </Button>
//             </SignInButton>
//             <SignUpButton mode="modal">
//               <Button size="sm">Зарегистрироваться</Button>
//             </SignUpButton>
//           </>
//         )}
//         {isAuthenticated && !isLoading && (
//           <>
//             <Link href="/documents">
//               <Button variant="ghost" size="sm">
//                 Войти в Notes
//               </Button>
//             </Link>
//             <UserButton afterSignOutUrl="/" />
//           </>
//         )}
//         <ModeToggle />
//       </div>
//     </div>
//   );
// };


"use client";

import { useFirebaseAuth } from "@/hooks/use-firebase-auth";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { login, logout, register } from "@/firebase/config";
import { useState } from "react";
import { Modal } from "@/components/modals/modal";

export const Navbar = () => {
  const { isAuthenticated, isLoading, user } = useFirebaseAuth();
  const scrolled = useScrollTop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await login(email, password);
      setEmail("");
      setPassword("");
      setError("");
      setIsSignInOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password);
      setEmail("");
      setPassword("");
      setError("");
      setIsSignUpOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <Modal
              trigger={
                <Button variant="ghost" size="sm">
                  Войти
                </Button>
              }
              title="Вход"
              open={isSignInOpen}
              onOpenChange={setIsSignInOpen}
            >
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Пароль"
                  className="w-full border p-2 rounded"
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <Button onClick={handleLogin} className="w-full">
                  Войти
                </Button>
              </div>
            </Modal>
            <Modal
              trigger={
                <Button size="sm">
                  Зарегистрироваться
                </Button>
              }
              title="Регистрация"
              open={isSignUpOpen}
              onOpenChange={setIsSignUpOpen}
            >
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Пароль"
                  className="w-full border p-2 rounded"
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <Button onClick={handleRegister} className="w-full">
                  Зарегистрироваться
                </Button>
              </div>
            </Modal>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Link href="/documents">
              <Button variant="ghost" size="sm">
                Войти в Notes
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Выйти
            </Button>
            <span className="mr-2">{user?.email}</span>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};