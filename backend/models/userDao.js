const { appDataSource } = require('./index');

const getUserByEmail = async (email) => {
  const userEmail = await appDataSource.query(
    `
    SELECT
      u.id,
      u.social_id AS socialId,
      u.social_type_id AS socialTypeId,
      u.email,
      u.password,
      u.phone_number AS PhoneNumber,
      u.nickname AS nickName,
      u.user_status_id AS userStatusId
    FROM
      users u
    WHERE
      u.email=?
    `,
    [email]
  );
  return userEmail[0];
};
const getUserByPhoneNumber = async (phoneNumber) => {
  const userPhoneNumber = await appDataSource.query(
    `
    SELECT
      u.id,
      u.social_id AS socialId,
      u.social_type_id AS socialTypeId,
      u.email,
      u.phone_number AS PhoneNumber,
      u.nickname AS nickName,
      u.user_status_id AS userStatusId
    FROM
      users u
    WHERE
      u.phone_number=?
    `,
    [phoneNumber]
  );
  return userPhoneNumber[0];
};

const getUserByNickName = async (nickName) => {
  const userNickName = await appDataSource.query(
    `
    SELECT
      u.id,
      u.social_id AS socialId,
      u.social_type_id AS socialTypeId,
      u.email,
      u.phone_number AS PhoneNumber,
      u.nickname AS nickName,
      u.user_status_id AS userStatusId
    FROM
      users u
    WHERE
      u.nickname=?
    `,
    [nickName]
  );
  return userNickName[0];
};

const defaultUserSocialType = Object.freeze({
  itself: 1,
  waem: 2,
});

const defaultUserStatusType = Object.freeze({
  activity: 1,
  reporting: 2,
  stopActivity: 3,
  leave: 4,
});

const createUser = (
  email,
  password,
  phoneNumber,
  nickName,
  socialId,
  profileImageUrl
) => {
  return appDataSource.query(
    `
    INSERT INTO
      users(
        email,
        password,
        phone_number,
        nickname,
        social_id,
        profile_image_url,
        social_type_id,
        user_status_id)
    VALUES
        (?,?,?,?,?,?,?,?)
    `,
    [
      email,
      password,
      phoneNumber,
      nickName,
      socialId,
      profileImageUrl,
      defaultUserSocialType.itself,
      defaultUserStatusType.activity,
    ]
  );
};

const getPasswordByEmail = async (email) => {
  const result = await appDataSource.query(
    `
    SELECT
      u.id,
      u.email,
      u.password
    FROM
      users u
    WHERE
      u.email=?
    `,
    [email]
  );
  return result[0].password;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByPhoneNumber,
  getUserByNickName,
  getPasswordByEmail,
};
