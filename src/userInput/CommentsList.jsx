import useQuery from "../api/useQuery";

import { API } from "../api/ApiContext";
import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router";

export default function CommentsList({ id }) {
  const { token, userId } = useAuth();

  //gets comments for that instrument
  const params = useParams();
  const {
    data: comments,
    loading,
    error,
  } = useQuery(`/comments/${id}`, "comments");

  //
  const onComment = async (formData) => {
    const content = formData.get("comment");
    const category = formData.get("category");
    const instrument_id = id;
    const user_id = userId;

    try {
      await postComment({
        user_id,
        category,
        content,
        instrument_id,
      });
    } catch (e) {
      error(e.error);
    }
  };

  //returns comments list if there are comments, if not returns statement. If user is logged in, comment box is also returned
  return (
    <>
      <h3>Comments</h3>
      <div>
        <section id="comment-section">
          {comments?.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ul>
          ) : (
            <p>Be the first to leave a comment!</p>
          )}
        </section>
        {token && (
          <form action={onComment} id="comment-box">
            <label>
              <select name="category">
                <option>General</option>
                <option>Suggestion</option>
              </select>
              <textarea type="text" name="comment" id="comment-textbox" />
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
    <section className="comment">
      <li>
        <p id="category">{comment.category}</p>
        <p>{comment.created_at}</p>
        <p>{comment.content}</p>
      </li>
    </section>
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
