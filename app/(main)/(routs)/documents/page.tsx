"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {useUser} from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({ title: "Untitled" });

        toast.promise(promise, {
            loading: "Создание новой записки",
            success: "Новая записка добавлена",
            error: "Не получилось создать записку"
        });
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image src="/logo.svg" width="300" height="300" alt="Empty" className="dark:hidden"/>
            <Image src="/logo-dark.svg" width="300" height="300" alt="Empty" className="hidden dark:block"/>
            <h2 className="text-lg font-medium">Добро пожаловать {user?.firstName}</h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Создать записку
            </Button>
        </div>
    );
}

export default DocumentsPage;