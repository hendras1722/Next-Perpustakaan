"use client";

import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteActionProps {
	id: string;
	onDelete: (id: string) => Promise<{ success: boolean; message?: string }>;
}

export function DeleteAction({ id, onDelete }: DeleteActionProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	async function handleDelete() {
		setIsPending(true);
		setErrorMsg(null);
		try {
			const result = await onDelete(id);
			if (result.success) {
				setIsOpen(false);
			} else {
				setErrorMsg(result.message || "Gagal menghapus data");
			}
		} catch (_error) {
			setErrorMsg("Terjadi kesalahan koneksi saat menghapus data.");
		} finally {
			setIsPending(false);
		}
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open);
				if (!open) {
					setErrorMsg(null);
				}
			}}
		>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
					disabled={isPending}
				>
					Hapus
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="flex flex-col items-center text-center sm:text-center">
					<div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-2">
						<AlertTriangle className="h-6 w-6" />
					</div>
					<DialogTitle className="text-xl font-bold">
						Konfirmasi Hapus
					</DialogTitle>
					<DialogDescription className="text-muted-foreground mt-1 text-center">
						Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat
						dibatalkan.
					</DialogDescription>
				</DialogHeader>

				{errorMsg && (
					<div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg flex items-start gap-2 border border-destructive/20 animate-in fade-in slide-in-from-top-1 duration-200">
						<AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
						<span>{errorMsg}</span>
					</div>
				)}

				<DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center mt-4">
					<Button
						type="button"
						variant="outline"
						onClick={() => setIsOpen(false)}
						disabled={isPending}
						className="w-full sm:w-auto cursor-pointer"
					>
						Batal
					</Button>
					<Button
						type="button"
						variant="destructive"
						onClick={handleDelete}
						disabled={isPending}
						className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
					>
						{isPending ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								Menghapus...
							</>
						) : (
							<>
								<Trash2 className="h-4 w-4" />
								Hapus
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
