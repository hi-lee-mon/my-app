import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPost } from "@/lib/post";

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = await params;
	const post = await getPost(id);

	if (!post) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Card className="max-w-3xl mx-auto">
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
					<div className="flex items-center justify-between mb-4">
						<p className="text-sm text-gray-500">投稿者：{post.author.name}</p>
						<time className="text-sm text-gray-500">
							{format(new Date(post.createdAt), "yyyy月dd日", {
								locale: ja,
							})}
						</time>
					</div>
					<CardTitle>{post.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<p>{post.content}</p>
				</CardContent>
			</Card>
		</div>
	);
}
