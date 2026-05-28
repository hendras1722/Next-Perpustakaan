"use client";

import { LayoutDashboard, Book, Users, Building, FileText, DollarSign, Library } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "@/components/shared/ThemeToggle";

const NAV_ITEMS = [
	{ href: "/dashboard/buku", label: "Buku", icon: Book },
	{ href: "/dashboard/jenis-buku", label: "Jenis Buku", icon: Book },
	{ href: "/dashboard/penulis", label: "Penulis", icon: Users },
	{ href: "/dashboard/penerbit", label: "Penerbit", icon: Building },
	{ href: "/dashboard/peminjaman", label: "Peminjaman", icon: FileText },
	{ href: "/dashboard/denda", label: "Denda", icon: DollarSign },
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-border bg-card/50 backdrop-blur-xl">
			{/* Logo */}
			<div className="flex items-center gap-3 px-6 py-5 border-b border-border">
				<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
					<Library className="h-5 w-5 text-primary" />
				</div>
				<div>
					<h1 className="text-base font-bold tracking-tight">Perpustakaan</h1>
					<p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
						Sistem Informasi
					</p>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
				{NAV_ITEMS.map((item) => {
					const isActive =
						pathname === item.href || pathname.startsWith(`${item.href}/`);
					const Icon = item.icon;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
								isActive
									? "bg-primary/15 text-primary shadow-sm"
									: "text-muted-foreground hover:bg-accent hover:text-foreground",
							)}
						>
							<Icon className="h-4 w-4 shrink-0" />
							{item.label}
						</Link>
					);
				})}
			</nav>

			{/* Footer */}
			<div className="border-t border-border px-3 py-4 space-y-2">
				<ThemeToggle />
				<div className="px-3">
					<p className="text-[10px] text-muted-foreground/60">
						Perpustakaan v1.0.0
					</p>
				</div>
			</div>
		</aside>
	);
}
