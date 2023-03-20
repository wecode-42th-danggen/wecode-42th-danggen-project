const { appDataSource } = require('./index');

const createCmpost = async (image, cmpostInfo) => {
  const { imageUrl } = image;
  const { userId, title, description, categoryId } = cmpostInfo;

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
      [userId, title, imageUrl, description, categoryId]
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

module.exports = { createCmpost, updateCmpost, deleteCmpost, checkCmpostId };
