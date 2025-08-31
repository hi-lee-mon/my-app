import { PostCard } from "@/components/post/post-card";
import { getPosts, searchPosts } from "@/lib/post";

export default async function Page({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const resolvedSearchParams = await searchParams;
	const search = resolvedSearchParams.search || "";
	const posts = search ? await searchPosts(search) : await getPosts();

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 mb:grid-cols-2 lg:grid-cols-3 gap-4">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
}
