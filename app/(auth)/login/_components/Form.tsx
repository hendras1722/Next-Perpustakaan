"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const initialState = {
	success: false,
	message: "",
};

export default function LoginForm() {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		loginAction,
		initialState,
	);

	useEffect(() => {
		if (state?.success) {
			router.push("/dashboard/jenis-buku");
			router.refresh();
		}
	}, [state, router]);

	return (
		<div className="space-y-4">
			<form action={formAction} className="space-y-4">
				<div className="space-y-2">
					<label htmlFor="username" className="text-sm font-medium">
						Username
					</label>
					<Input
						id="username"
						name="username"
						type="text"
						placeholder="admin"
						required
						autoComplete="username"
					/>
				</div>
				<div className="space-y-2">
					<label htmlFor="password" className="text-sm font-medium">
						Password
					</label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="••••••••"
						required
						autoComplete="current-password"
					/>
				</div>

				{state?.message && !state.success && (
					<div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-2.5 text-xs text-destructive font-medium">
						{state.message}
					</div>
				)}

				<Button type="submit" className="w-full" disabled={isPending}>
					{isPending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Signing in...
						</>
					) : (
						"Sign In"
					)}
				</Button>
			</form>
		</div>
	);
}