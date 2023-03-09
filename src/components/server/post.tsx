import Link from "next/link";

type PostProps = { post: PostType; singlePost?: boolean };
export function Post({ post, singlePost }: PostProps) {
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            {!singlePost ? <Link href={`/posts/${post.id}`}>{`Read more`}</Link> : null}
        </div>
    );
}
