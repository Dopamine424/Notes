// "use client";

// import { Id } from "@/convex/_generated/dataModel";
// import {
//     DropdownMenu,
//     DropdownMenuTrigger,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator

// } from "@/components/ui/dropdown-menu";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/clerk-react";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { MoreHorizontal, Trash } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

// interface MenuProps{
//     documentId: Id<"documents">;
// }

// export const Menu = ({
//     documentId
// }: MenuProps) => {

//     const router = useRouter();
//     const { user } = useUser();

//     const archive = useMutation(api.documents.archive);

//     const onArchive = () => {
//         const promise = archive({ id:documentId });
        
//         toast.promise(promise, {
//             loading: "Перемещение в корзину",
//             success: "Записка перемещена в корзину",
//             error: "Не удалось перенести в корзину"
//         });
//         router.push("/documents");
//     };

//     return(
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button
//                     size="sm"
//                     variant="outline"
//                 >
//                     <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
//                 <DropdownMenuItem onClick={onArchive}>
//                     <Trash className="h-4 w-4 mr-2"/>
//                     Удалить
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <div className="text-xs text-muted-foreground p-2">
//                     Последнее изменение: {user?.fullName}
//                 </div>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// };

// Menu.Skeleton = function MenuSkeleton() {
//     return(
//         <Skeleton className="h-10 w-10"/>
//     )
// }

"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/hooks/use-firebase-auth";
import { archiveDocument } from "@/firebase/config";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  documentId: string;
}

export const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { user } = useFirebaseAuth();

  const onArchive = () => {
    const promise = archiveDocument(documentId).then(() => router.push("/documents"));

    toast.promise(promise, {
      loading: "Перемещение в корзину",
      success: "Записка перемещена в корзину",
      error: "Не удалось перенести в корзину",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Удалить
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Последнее изменение: {user?.displayName || user?.email}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};