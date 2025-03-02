"use client";

import { useEffect } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import "@blocknote/mantine/style.css";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

const Editor = ({
    onChange,
    initialContent,
    editable = true,
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });
    
        return response.url;
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent
            ? JSON.parse(initialContent) as PartialBlock[]
            : undefined,
            uploadFile: handleUpload
    });

    useEffect(() => {
        // Периодически проверяем изменения
        const interval = setInterval(() => {
            // Печатаем текущее состояние редактора
            const content = JSON.stringify(editor.document, null, 2);
            onChange(content);
        }, 1000); // Проверка каждую секунду

        return () => {
            clearInterval(interval); // Остановка проверки при размонтировании
        };
    }, [editor, onChange]);

    return (
        <div>
            <BlockNoteView
                editor={editor}
                editable={editable}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
            />
        </div>
    );
};

export default Editor;


