// "use-client";

// import { useQuery } from "convex/react";
// import { useUser } from "@clerk/clerk-react";
// import { useSearch } from "@/hooks/use-search";
// import { File } from "lucide-react";
// import { api } from "@/convex/_generated/api";
// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export const SearchCommand = () => {
//   const { user } = useUser();
//   const router = useRouter();
//   const documents = useQuery(api.documents.getSearch);
//   const [isMounted, setIsMounted] = useState(false);

//   const toggle = useSearch((store) => store.toggle);
//   const isOpen = useSearch((store) => store.isOpen);
//   const onClose = useSearch((store) => store.onClose);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         toggle();
//       }
//     };

//     document.addEventListener("keydown", down);
//     return () => document.removeEventListener("keydown", down);
//   }, [toggle]);

//   // const onSelect = (id: string) => {
//   //   router.push(`/documents/${id}`);
//   //   onClose();
//   // };

//   const onSelect = (id: string) => {
//     const documentId = id.split('-')[0];
//     router.push(`/documents/${documentId}`);
//     onClose();
//   };

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <CommandDialog open={isOpen} onOpenChange={onClose}>
//       <CommandInput placeholder={`Поиск по запискам ${user?.fullName}`} />
//       <CommandList>
//         <CommandEmpty>Результаты не найдены</CommandEmpty>
//         <CommandGroup heading="Documents">
//           {documents?.map((document) => (
//             <CommandItem
//               key={document._id}
//               value={`${document._id}-${document.title}`}
//               title={document.title}
//               onSelect={onSelect}
//             >
//               {document.icon ? (
//                 <p className="mr-2 text-[18px]">{document.icon}</p>
//               ) : (
//                 <File className="mr-2 h-4 w-4" />
//               )}
//               <span>{document.title}</span>
//             </CommandItem>
//           ))}
//         </CommandGroup>
//       </CommandList>
//     </CommandDialog>
//   );
// };


"use client";

import { useFirebaseAuth } from "@/hooks/use-firebase-auth";
import { useSearch } from "@/hooks/use-search";
import { File } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSearchDocuments } from "@/firebase/config";

export const SearchCommand = () => {
  const { user } = useFirebaseAuth();
  const router = useRouter();
  const [documents, setDocuments] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = getSearchDocuments((docs) => {
      setDocuments(docs);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    const documentId = id.split("-")[0];
    router.push(`/documents/${documentId}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Поиск по запискам ${user?.displayName || user?.email}`} />
      <CommandList>
        <CommandEmpty>Результаты не найдены</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};