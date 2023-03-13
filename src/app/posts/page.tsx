import { Post } from "@/components/server/post";
export default async function PostPage() {
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json() as Promise<PostType[]>)
        .catch(err => console.error(err));

    return (
        <main>
            <h1>{`Posts page`}</h1>
            {posts ? posts.map(post => <Post key={post.id} post={post} />) : null}
        </main>
    );
}

/* 
 This function allows us to generate static pages (Static Site Generation)
 See: https://youtu.be/E1HzFvXgrCs?t=525
 */
export async function generateStaticParams() {
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json() as Promise<PostType[]>)
        .catch(err => console.error(err));

    return posts ? posts.map(post => ({ params: { id: post.id.toString() } })) : [];
}
