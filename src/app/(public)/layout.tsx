import type { PropsWithChildren } from "react";
import PublicHeader from "@/components/layouts/public-header";

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<>
			<PublicHeader />
			{children}
		</>
	);
}
