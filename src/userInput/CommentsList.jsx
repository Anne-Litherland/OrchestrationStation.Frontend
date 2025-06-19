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
      <form>
        <label>
          <textarea type="text" name="comment" id="comment-box" />
        </label>
        <button type="submit">Send</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}

function Comment({ comment }) {
  return (
    <li className="comment">
      <p>{comment.user_id}</p>
      <p>{comment.category}</p>
      <p>{comment.created_at}</p>
      <p>{comment.content}</p>
    </li>
  );
}
