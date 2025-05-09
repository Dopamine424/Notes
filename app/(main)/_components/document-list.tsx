// "use client";

// import { api } from "@/convex/_generated/api";
// import { Doc, Id } from "@/convex/_generated/dataModel";
// import { useQuery } from "convex/react";
// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import { Item } from "./item";
// import { cn } from "@/lib/utils";
// import { FileIcon } from "lucide-react";

// interface DocumentListProps {
//   parentDocumentId?: Id<"documents">;
//   level?: number;
//   data?: Doc<"documents">[];
// }

// export const DocumentList = ({
//   parentDocumentId,
//   level = 0,
// }: DocumentListProps) => {
//   const params = useParams();
//   const router = useRouter();
//   const [expended, setExpended] = useState<Record<string, boolean>>({});

//   const onExpand = (documentId: string) => {
//     setExpended((prevExpanded) => ({
//       ...prevExpanded,
//       [documentId]: !prevExpanded[documentId],
//     }));
//   };

//   const documents = useQuery(api.documents.getSidebar, {
//     parentDocument: parentDocumentId,
//   });

//   const onRedirect = (documentId: string) => {
//     router.push(`/documents/${documentId}`);
//   };

//   if (documents === undefined) {
//     return (
//       <>
//         <Item.Skeleton level={level} />
//         {level === 0 && (
//           <>
//             <Item.Skeleton level={level} />
//             <Item.Skeleton level={level} />
//           </>
//         )}
//       </>
//     );
//   }

//   return (
//     <>
//       <p
//         style={{
//           paddingLeft: level ? `${level * 12 + 25}px` : undefined,
//         }}
//         className={cn(
//           "hidden text-sm font-medium text-muted-foreground",
//           expended && "last:block",
//           level === 0 && "hidden",
//         )}
//       >
//         Нет страницы
//       </p>
//       {documents.map((document) => (
//         <div key={document._id}>
//           <Item
//             id={document._id}
//             onClick={() => onRedirect(document._id)}
//             label={document.title}
//             icon={FileIcon}
//             documentsIcon={document.icon}
//             active={params.documentId === document._id}
//             level={level}
//             onExpend={() => onExpand(document._id)}
//             expended={expended[document._id]}
//           />
//           {expended[document._id] && (
//             <DocumentList parentDocumentId={document._id} level={level + 1} />
//           )}
//         </div>
//       ))}
//     </>
//   );
// };

"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getSidebarDocuments } from "@/firebase/config";
import { Item } from "./item";

interface Document {
  _id: string;
  title: string;
  userId: string;
  isArchived: boolean;
  isPublished: boolean;
  parentDocument?: string | null;
  icon?: string;
}

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: Document[];
}

export const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initialExpanded: Record<string, boolean> = {};
    if (params.documentId) {
      initialExpanded[params.documentId as string] = true;
    }
    return initialExpanded;
  });

  useEffect(() => {
    const unsubscribe = getSidebarDocuments((docs) => setDocuments(docs), undefined);
    return () => unsubscribe();
  }, []);

  const handleExpand = (documentId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }));
  };

  const handleClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (!documents.length && !parentDocumentId) {
    return <div>Нет заметок</div>;
  }

  return (
    <div>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            label={document.title}
            level={level}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            onClick={() => handleClick(document._id)}
            expended={expanded[document._id]}
            onExpend={() => handleExpand(document._id)}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
};