import useQuery from "../api/useQuery";

import { API } from "../api/ApiContext";
import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router";

export default function CommentsList({ id }) {
  //gets comments for that instrument
  const params = useParams();
  const {
    data: comments,
    loading,
    error,
  } = useQuery(`/comments/${id}`, "comments");
  const { token, userId } = useAuth();

  //
  const onComment = async (formData) => {
    const content = formData.get("comment");
    const category = formData.get("category");
    const instrument_id = id;
    const username = username;
    const user_id = userId;

    try {
      await postComment({
        user_id,
        username,
        category,
        content,
        instrument_id,
      });
    } catch (e) {}
  };
  //returns comments list if there are comments, if not returns statement. If user is logged in, comment box is also returned
  return (
    <>
      <h3>Comments</h3>
      <div className="comment-box">
        {comments?.length > 0 ? (
          <ul className="comments-list">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ul>
        ) : (
          <p>Be the first to leave a comment!</p>
        )}
        {token && (
          <form action={onComment} id="comments">
            <label>
              <select name="category" className="menu">
                <option>General</option>
                <option>Suggestion</option>
              </select>
              <textarea type="text" name="comment" id="comment-box" />
            </label>
            <button type="submit">Send</button>
            {error && <output>{error}</output>}
          </form>
        )}
      </div>
    </>
  );
}
// single comment returns username, catergory, time/date created, and content
function Comment({ comment }) {
  return (
    <li className="comment">
      <p>{comment.username}</p>
      <p>{comment.category}</p>
      <p>{comment.created_at}</p>
      <p>{comment.content}</p>
    </li>
  );
}

// fetches array of comments and posts new comment
async function postComment(commentData) {
  const response = await fetch(API + "/comments/" + commentData.instrument_id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  });
  const result = await response.text();
  if (!response.ok) throw Error(result);
}
