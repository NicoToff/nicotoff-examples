import { Post } from "@/components/server/post";
import { notFound } from "next/navigation";

type SinglePostPageProps = { params: { id: string } };
export default async function SinglePostPage({ params: { id } }: SinglePostPageProps) {
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json() as Promise<PostType[]>)
        .catch(err => console.error(err));
    const post = posts?.find(post => post.id === Number(id));

    if (!post) notFound();
    return (
        <main>
            <h1>{`Single post page`}</h1>
            <Post post={post} singlePost />
        </main>
    );
}
