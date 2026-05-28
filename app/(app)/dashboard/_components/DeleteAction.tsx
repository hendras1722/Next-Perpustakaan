"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DeleteActionProps {
	id: string;
	onDelete: (id: string) => Promise<{ success: boolean; message?: string }>;
}

export function DeleteAction({ id, onDelete }: DeleteActionProps) {
	const [isPending, setIsPending] = useState(false);

	async function handleDelete() {
		if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
			setIsPending(true);
			const result = await onDelete(id);
			setIsPending(false);
			if (!result.success) {
				alert(result.message || "Gagal menghapus data");
			}
		}
	}

	return (
		<Button 
			variant="ghost" 
			size="sm" 
			className="text-destructive hover:bg-destructive/10 hover:text-destructive"
			onClick={handleDelete}
			disabled={isPending}
		>
			{isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Hapus"}
		</Button>
	);
}
