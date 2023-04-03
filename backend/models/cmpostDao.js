const { appDataSource } = require('./index');

const createCmpost = async (image, title, description, categoryId, userId) => {
  let location;
  if (image) {
    location = image.location;
  }

  try {
    const cmpost = await appDataSource.query(
      `
      INSERT INTO
        community_posts(
          user_id,
          title,
          image_url,
          description,
          category_id
        )
      VALUES
        (?,?,?,?,?)
      `,
      [userId, title, location, description, categoryId]
    );
    return cmpost;
  } catch (err) {
    const error = new Error('FAILED_CREATE_COMMUNITY_POST');
    error.statusCode = 400;
    throw err;
  }
};

const updateCmpost = async (
  imageUrl,
  title,
  description,
  categoryId,
  postId
) => {
  try {
    const result = await appDataSource.query(
      `
    UPDATE
      community_posts
    SET
      image_url=?,
      title=?,
      description=?,
      category_id=?
    WHERE
      id=?
    `,
      [imageUrl, title, description, categoryId, postId]
    );
    return result;
  } catch (err) {
    const error = new Error('FAILED_UPDATE_COMMUNITY_POST');
    error.statusCode = 400;
    throw error;
  }
};

const deleteCmpost = async (postId) => {
  try {
    const result = await appDataSource.query(
      `
      DELETE
      FROM
        community_posts
      WHERE
        id=?
      `,
      [postId]
    );
    return result;
  } catch (err) {
    const error = new Error('FAILED_DELETE_COMMUNITY_POST');
    error.statusCode = 400;
    throw error;
  }
};

const checkCmpostId = async (postId) => {
  const result = appDataSource.query(
    `
    SELECT EXISTS(
      SELECT
        cp.id
      FROM
        community_posts cp
      WHERE
        cp.id=?
    ) as registed
    `,
    [postId]
  );
  return !!parseInt(result);
};

const getCmpost = async (categoryId) => {
  const whereClause = categoryId ? `WHERE cp.category_id = ${categoryId}` : '';
  const data = await appDataSource.query(
    `
    SELECT
      cp.id AS cmpostId,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "postId", cp.id,
            "postUserId", cp.user_id,
            "postTitle", cp.title,
            "postImageUrl", cp.image_url,
            "postDescription", cp.description,
            "postViewCount", cp.view_count,
            "postCategoryId", cp.category_id,
            "postCategoryName", cc.name,
            "postUserNickname", u.nickname,
            "postCreateTime", cp.created_at,
            "postUpateTime", cp.updated_at,
            "likes", (SELECT COUNT(cl.id) FROM community_likes cl WHERE cp.id=cl.community_post_id)
          ) 
        ) as cmpostInfo
    FROM
      community_posts cp
    LEFT JOIN
      community_categories cc
    ON
      cc.id = cp.category_id
    LEFT JOIN
      users u
    ON
      u.id = cp.user_id
    ${whereClause}
    GROUP BY
      cp.id
    `
  );
  return data;
};

const getCmpostDetail = async (cmpostId) => {
  const data = await appDataSource.query(
    `
    SELECT
      cp.id AS cmpostId,
          JSON_OBJECT(
            "postId", cp.id,
            "postUserId", cp.user_id,
            "postTitle", cp.title,
            "postImageUrl", cp.image_url,
            "postDescription", cp.description,
            "postViewCount", cp.view_count,
            "postCategoryId", cp.category_id,
            "postCategoryName", cc.name,
            "postUserNickname", u.nickname,
            "postCreateTime", cp.created_at,
            "postUpateTime", cp.updated_at,
            "likes", (SELECT COUNT(cl.id) FROM community_likes cl WHERE cp.id=cl.community_post_id)
        ) AS cmpostInfo,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "commentId", cm.id,
            "commentUserId", cm.user_id,
            "commentNickname", cu.nickname,
            "commentUserProfileImageUrl", cu.profile_image_url,
            "commentContent", cm.content
          )
        ) AS commentInfo
    FROM
      community_posts cp
    LEFT JOIN
      community_categories cc
    ON
      cc.id = cp.category_id
    LEFT JOIN
      users u
    ON
      u.id = cp.user_id
    LEFT JOIN
      community_comments cm
    ON
      cm.community_post_id = cp.id
    LEFT JOIN
      users cu
    ON
      cu.id = cm.user_id
    WHERE
      cp.id=?
    GROUP BY
      cp.id
  `,
    [cmpostId]
  );
  return data;
};

const createLike = async (userId, cmpostId) => {
  const result = await appDataSource.query(
    `
    INSERT INTO
      community_likes(
        user_id,
        community_post_id
      ) VALUES(
        ?,
        ?
      )
    `,
    [userId, cmpostId]
  );
  return result;
};

const cancelLike = async (userId, cmpostId) => {
  const result = await appDataSource.query(
    `
    DELETE FROM
      community_likes
    WHERE
      user_id=? AND community_post_id=?
    `,
    [userId, cmpostId]
  );
  return result;
};

const getLikeStatus = async (userId, cmpostId) => {
  const [data] = await appDataSource.query(
    `
    SELECT EXISTS(
      SELECT
        id
      FROM
       community_likes
      WHERE
        user_id=? AND community_post_id=?
    ) AS isLike
    `,
    [userId, cmpostId]
  );
  return !!parseInt(data.isLike);
};

module.exports = {
  createCmpost,
  updateCmpost,
  deleteCmpost,
  checkCmpostId,
  getCmpost,
  getCmpostDetail,
  createLike,
  cancelLike,
  getLikeStatus,
};
