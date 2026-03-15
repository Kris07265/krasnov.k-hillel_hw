import {Container} from "react-bootstrap";
import {useState, useEffect} from "react";

function PostCatalog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const postsFetch = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await res.json();
                setPosts(data);
            }
            catch (error) {
                console.error(error)
            }

        }
        postsFetch();
    }, [])
    return (
        <Container className="mt-5">
            <div className="posts">
                <ul className="posts__list">
                    {posts.map((post) => (
                        <li key={post.id} className="posts_single-post" data-post-id={post.id}>
                        <h3 className="posts__post-title">{post.title}</h3>
                        <p className="posts__post-description">{post.body}</p>
                        </li>
                ))}
                </ul>
            </div>
        </Container>
    )
}
export default PostCatalog;