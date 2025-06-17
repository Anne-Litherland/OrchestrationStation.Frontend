import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";

export default function CommentsList() {
  const { loading, error } = useQuery();
  const comments = [];
  return (
    <>
      <h3>Comments</h3>
      {comments.length > 0 ? (
        <ul className="comments">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : (
        <p>Be the first to leave a comment!</p>
      )}
    </>
  );
}

function Comment({ comment }) {
  return (
    <li className="comment">
      <p>{comment.user_id}</p>
      <p>{comment.content}</p>
    </li>
  );
}
