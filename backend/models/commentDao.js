const { appDataSource } = require('./index');

const createComment = async (cmpostId, content, userId) => {
  try {
    const result = await appDataSource.query(
      `
    INSERT
    INTO
      community_comments(
        user_id,
        community_post_id,
        content
      )
    VALUES
      (?,?,?)
    `,
      [userId, cmpostId, content]
    );
    return result;
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const deleteComment = async (commentId) => {
  try {
    const result = await appDataSource.query(
      `
    DELETE
    FROM
      community_comments
    WHERE
      id=?
    `,
      [commentId]
    );
  } catch (err) {
    err.statuscode = 400;
    throw err;
  }
};

const checkRegisterCommentId = async (commentId) => {
  try {
    const [result] = await appDataSource.query(
      `
    SELECT EXISTS(
      SELECT
        cc.id
      FROM
        community_comments cc
      WHERE
        cc.id=?
    ) as regited`,
      [commentId]
    );
    return !!parseInt(result);
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

module.exports = { createComment, deleteComment, checkRegisterCommentId };
