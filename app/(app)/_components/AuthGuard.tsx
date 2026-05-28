import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function AuthGuard({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	if (!token) {
		redirect("/login");
	}

	try {
		const payloadBase64 = token.split(".")[1];
		let base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
		while (base64.length % 4) {
			base64 += "=";
		}

		const decodedJson = atob(base64);
		const decoded = JSON.parse(decodedJson);

		const exp = decoded.exp;
		if (exp && Date.now() >= exp * 1000) {
			redirect("/login");
		}
	} catch (error) {
		redirect("/login");
	}

	return <>{children}</>;
}
