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
    err.statusCode = 400;
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
    ) as registed`,
      [commentId]
    );

    return !!parseInt(result.registed);
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const getUserIdByCommentId = async (commentId) => {
  const [result] = await appDataSource.query(
    `
    SELECT
      cc.user_id AS userId
    FROM
      community_comments cc
    WHERE
      cc.id=?
    `,
    [commentId]
  );
  return result.userId;
};

const getComment = async (cmpostId) => {
  try {
    const data = await appDataSource.query(
      `
      SELECT
        cc.id AS commentId,
        cc.user_id AS commentUserId,
        cc.community_post_id AS cmpostId,
        cc.content AS commentContent,
        u.nickname AS userNickname,
        u.profile_image_url AS userProfileImage
      FROM
        community_comments cc
      INNER JOIN
        users u
      ON
        u.id = cc.user_id
      WHERE
        cc.community_post_id=?
      `,
      [cmpostId]
    );
    return data;
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const comparePostAndCommentPost = async (cmpostId) => {
  const [result] = await appDataSource.query(
    `
    SELECT EXISTS(
      SELECT
        cp.id
      FROM
        community_posts cp
      INNER JOIN
        community_comments cc
      ON
        cp.id=cc.community_post_id
      WHERE
        cp.id=?)AS registed
    `,
    [cmpostId]
  );
  return !!parseInt(result.registed);
};

module.exports = {
  createComment,
  deleteComment,
  checkRegisterCommentId,
  getUserIdByCommentId,
  getComment,
  comparePostAndCommentPost,
};
