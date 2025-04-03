// "use client";

// import { Spinner } from "@/components/spinner";
// import { Button } from "@/components/ui/button";
// import { SignInButton } from "@clerk/clerk-react";
// import { useConvexAuth } from "convex/react";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link";

// export const Heading = () => {
//   const { isAuthenticated, isLoading } = useConvexAuth();
//   return (
//     <div className="max-w-3xl space-y-4">
//       <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
//         Заголовок <span className="underline">Notes</span>
//       </h1>
//       <h3 className="text-base sm:text-xl md:text-2zxl font-medium">
//         Подзаголовок
//       </h3>
//       {isLoading && (
//         <div className="w-full flex items-center justify-center">
//           <Spinner size="lg" />
//         </div>
//       )}
//       {isAuthenticated && !isLoading && (
//         <Button asChild>
//           <Link href="/documents">
//             Войти <ArrowRight h-4 w-4 ml-2 />
//           </Link>
//         </Button>
//       )}
//       {!isAuthenticated && !isLoading && (
//         <SignInButton mode="modal">
//           <Button>
//             Начать <ArrowRight className="h-4 w-4 ml-2" />
//           </Button>
//         </SignInButton>
//       )}
//     </div>
//   );
// };


"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useFirebaseAuth } from "@/hooks/use-firebase-auth";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "@/components/modals/modal";
import { login, register } from "@/firebase/config";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useFirebaseAuth();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Заголовок <span className="underline">Notes</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Подзаголовок
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Войти <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <>
          <Modal
            trigger={
              <Button>
                Начать <ArrowRight className="h-4 w-4 ml-2" />
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
              <p className="text-sm text-center">
                Уже зарегистрированы?{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => {
                    setIsSignUpOpen(false);
                    setIsSignInOpen(true);
                  }}
                >
                  Войти
                </span>
              </p>
            </div>
          </Modal>
          <Modal
            trigger={null} // Этот триггер не нужен напрямую, открывается через ссылку выше
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
        </>
      )}
    </div>
  );
};
