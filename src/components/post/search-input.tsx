"use client";

import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export default function SearchInput() {
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// デバウンス (高頻度に呼び出されるのを防ぐ 500ms後に実行
	useEffect(() => {
		setIsLoading(true);
		const timer = setTimeout(() => {
			setDebouncedSearch(search);
			setIsLoading(false);
		}, 500);
		return () => clearTimeout(timer);
	}, [search]);

	useEffect(() => {
		if (debouncedSearch.trim()) {
			router.push(`/?search=${debouncedSearch.trim()}`);
		} else {
			router.push("/");
		}
	}, [debouncedSearch, router]);

	return (
		<div className="flex items-center gap-2 relative">
			{isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
			<Input
				placeholder="Search"
				className="w-64"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button
				type="button"
				onClick={() => setSearch("")}
				className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-red-500 duration-300"
			>
				<X className="w-4 h-4" />
			</button>
		</div>
	);
}
