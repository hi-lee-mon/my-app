import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PostCardProps } from "@/types/post.ts";

export function PostCard({ post }: PostCardProps) {
	return (
		<Card className="hover:shadow-lg transition-shadow duration-300">
			<Link href={`/posts/${post.id}`}>
				{post.topImage && (
					<div className="relative w-full h-48">
						<Image
							src={post.topImage}
							alt={post.title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="rounded-t-md object-cover"
							priority
						/>
					</div>
				)}
				<CardHeader>
					{/* はみ出た要素を三点リーダー表示 */}
					<CardTitle className="line-clamp-2">{post.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-gray-500 mb-2 line-clamp-2">
						{post.content}
					</p>
					<div className="flex items-center justify-between text-sm text-gray-500">
						<span>{post.author.name}</span>
						<time className="text-sm text-gray-500">
							{formatDistanceToNow(new Date(post.createdAt), {
								addSuffix: true, // 〇日前とかで表示する
								locale: ja, // 日本語で表示する
							})}
						</time>
					</div>
				</CardContent>
			</Link>
		</Card>
	);
}
