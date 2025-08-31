import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import SearchInput from "../post/search-input";
import { Button } from "../ui/button";

export default function PublicHeader() {
	return (
		<header className="border-b bg-blue-200">
			<div className="container msx-auto px-4 py-4 flex items-center justify-between">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink asChild className="font-bold text-xl">
								<Link href="/">Blog</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<div className="flex items-center gap-4">
					<SearchInput />
					<Button asChild variant="outline">
						<Link href="/login">Login</Link>
					</Button>
					<Button asChild>
						<Link href="/register">Register</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
