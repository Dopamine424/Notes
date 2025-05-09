// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { Skeleton } from "@/components/ui/skeleton";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { cn } from "@/lib/utils";
// import { useUser } from "@clerk/clerk-react";
// import { useMutation } from "convex/react";
// import {
//   ChevronDown,
//   ChevronRight,
//   LucideIcon,
//   MoreHorizontal,
//   Plus,
//   Trash,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// interface ItemProps {
//   id?: Id<"documents">;
//   documentsIcon?: string;
//   active?: boolean;
//   expended?: boolean;
//   isSearch?: boolean;
//   level?: number;
//   onExpend?: () => void;

//   label: string;
//   onClick?: () => void;
//   icon: LucideIcon;
// }

// export const Item = ({
//   id,
//   label,
//   onClick,
//   icon: Icon,
//   active,
//   documentsIcon,
//   isSearch,
//   level = 0,
//   onExpend,
//   expended,
// }: ItemProps) => {
//   const { user } = useUser();

//   const router = useRouter();

//   const create = useMutation(api.documents.create);

//   const archive = useMutation(api.documents.archive);

//   const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     event.stopPropagation();
//     if (!id) return;
//     const promise = archive({ id })
//       .then(() => router.push("/documents"))

//     toast.promise(promise, {
//       loading: "Перенос в корзину...",
//       success: "Записка перенесена в корзину",
//       error: "Не получилось удалить записку",
//     });
//   };

//   const handleExpand = (
//     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
//   ) => {
//     event.stopPropagation();
//     onExpend?.();
//   };

//   const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     event.stopPropagation();
//     if (!id) return;
//     const promise = create({ title: "Untitled", parentDocument: id }).then(
//       (documentId) => {
//         if (!expended) {
//           onExpend?.();
//         }
//         router.push(`/documents/${documentId}`);
//       },
//     );

//     toast.promise(promise, {
//       loading: "Создание новой записки",
//       success: "Новая записка добавлена",
//       error: "Ошибка создания записки",
//     });
//   };

//   const ChevronIcon = expended ? ChevronDown : ChevronRight;

//   return (
//     <div
//       onClick={onClick}
//       role="button"
//       style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
//       className={cn(
//         "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
//         active && "bg-primary/5 text-primary",
//       )}
//     >
//       {!!id && (
//         <div
//           role="button"
//           className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
//           onClick={handleExpand}
//         >
//           <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
//         </div>
//       )}
//       {documentsIcon ? (
//         <div className="shrink-0 mr-2 text-[18px]">{documentsIcon}</div>
//       ) : (
//         <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
//       )}
//       <span className="truncate">{label}</span>
//       {isSearch && (
//         <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
//           <span className="text-xs">⌘</span>K
//         </kbd>
//       )}
//       {!!id && (
//         <div className="ml-auto flex items-center gap-x-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
//               <div
//                 role="button"
//                 className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg neutral-600"
//               >
//                 <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
//               </div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent
//               className="w-60"
//               align="start"
//               side="right"
//               forceMount
//             >
//               <DropdownMenuItem
//                 onClick={onArchive}
//                 className="flex items-center"
//               >
//                 <Trash className="h-4 w-4 mr-2" />
//                 Удалить
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <div className="text-xs text-muted-foreground p-2">
//                 Последнее изменение: {user?.fullName}
//               </div>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <div
//             role="button"
//             onClick={onCreate}
//             className="ml-auto flex items-center gap-x-2"
//           >
//             <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
//               <Plus className="h-4 w-4 text-muted-foreground" />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
//   return (
//     <div
//       style={{
//         paddingLeft: level ? `${level * 12 + 25}px` : "12px",
//       }}
//       className="flex gap-x-2 py-[3px]"
//     >
//       <Skeleton className="h-4 w-4" />
//       <Skeleton className="h-4 w-[30%]" />
//     </div>
//   );
// };


"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useFirebaseAuth } from "@/hooks/use-firebase-auth";
import { createDocument, archiveDocument } from "@/firebase/config";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemProps {
  id?: string;
  documentIcon?: string;
  active?: boolean;
  expended?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpend?: () => void;
  label: string;
  onClick?: () => void;
  icon?: LucideIcon;
}

export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpend,
  expended,
}: ItemProps) => {
  const { user } = useFirebaseAuth();
  const router = useRouter();

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archiveDocument(id).then(() => router.push("/documents"));

    toast.promise(promise, {
      loading: "Перенос в корзину...",
      success: "Записка перенесена в корзину",
      error: "Не получилось удалить записку",
    });
  };

  const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onExpend?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = createDocument("Untitled", id).then((documentId) => {
      if (!expended) {
        onExpend?.();
      }
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Создание новой записки",
      success: "Новая записка добавлена",
      error: "Ошибка создания записки",
    });
  };

  const ChevronIcon = expended ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary",
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        Icon && <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive} className="flex items-center">
                <Trash className="h-4 w-4 mr-2" />
                Удалить
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Последнее изменение: {user?.email}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className="ml-auto flex items-center gap-x-2"
          >
            <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};