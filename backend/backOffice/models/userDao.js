const { appDataSource } = require('../../models/');

const getUserInfo = async () => {
  return await appDataSource.query(
    `
    SELECT
      u.id,
      userType.name,
      u.nickname,
      u.email,
      u.password,
      u.phone_number,
      u.profile_image_url,
      us.user_status
    FROM users u
    INNER JOIN (
      SELECT
        ust.id,
        ust.user_id,
        st.name
      FROM users_social_types ust
      INNER JOIN social_types st ON ust.social_type_id=st.id
    ) AS userType ON userType.user_id = u.id
    INNER JOIN user_status us ON us.id=u.user_status_id;
    `
  );
};

const changeUserStatus = async (userId, userStatusId) => {
  return await appDataSource.query(
    `
    UPDATE users
    SET user_status_id=?
    WHERE id=?
    `,
    [userStatusId, userId]
  );
};

module.exports = { getUserInfo, changeUserStatus };
