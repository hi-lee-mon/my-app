import { prisma } from "@/lib/prisma";

export async function getPosts() {
	return await prisma.post.findMany({
		where: { published: true }, // 公開されている投稿のみを取得
		include: { author: { select: { name: true } } }, // リレーション先のユーザー名を取得
		orderBy: { createdAt: "desc" }, // 作成日時の降順で並び替え
	});
}

export async function getPost(id: string) {
	return await prisma.post.findUnique({
		where: { id },
		include: { author: { select: { name: true } } },
	});
}

export async function searchPosts(keywordSearchParams: string) {
	// 全角スペースを半角スペースに変換しつつスペースで分割 (空文字などを除外)
	const decodedSearch = decodeURIComponent(keywordSearchParams);
	// 全角を半角スペースに変換。前後の空白を削除
	const normalizedSearch = decodedSearch.replace(/[\s ]+/g, " ").trim();
	// 空白毎に分割。分割後に空文字の要素は削除
	const searchWords = normalizedSearch.split(" ").filter(Boolean);
	console.log(searchWords);
	const filters = searchWords.map((word) => ({
		title: { contains: word }, // containsはlikeのような機能
		content: { contains: word },
	}));

	return await prisma.post.findMany({
		where: {
			AND: filters,
		},
		include: { author: { select: { name: true } } },
		orderBy: { createdAt: "desc" },
	});
}
