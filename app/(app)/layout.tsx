import { Suspense } from "react";
import { SidebarWrapper } from "./_components/SidebarWrapper";
import { AuthGuard } from "./_components/AuthGuard";

export default function AppShellLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			<SidebarWrapper />
			<main className="ml-[260px] flex-1 min-h-screen">
				<Suspense
					fallback={
						<div className="flex items-center justify-center h-screen">
							<div className="text-muted-foreground animate-pulse">Memuat aplikasi...</div>
						</div>
					}
				>
					<AuthGuard>{children}</AuthGuard>
				</Suspense>
			</main>
		</div>
	);
}
