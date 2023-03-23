const { appDataSource } = require('../../models/');

const getPostInfo = async () => {
  return await appDataSource.query(
    `
    SELECT
      p.id,
      p.user_id as userId,
      p.title,
      p.price,
      p.description,
      p.location,
      p.view_count as viewCount,
      p.price_suggestion as priceSuggestion,
      p.pullup_time as pullUpTime,
      ps.post_status as postStatus,
      aps.admin_post_status as adminPostStatus
    FROM posts p
    INNER JOIN post_status ps ON ps.id=p.post_status_id
    INNER JOIN admin_post_status aps ON aps.id=p.admin_post_status_id;
    `
  );
};

const changePostStatus = async (postId, adminPostStatusId) => {
  return await appDataSource.query(
    `
    UPDATE posts
    SET admin_post_status_id=?
    WHERE id=?
    `,
    [adminPostStatusId, postId]
  );
};

module.exports = { getPostInfo, changePostStatus };
