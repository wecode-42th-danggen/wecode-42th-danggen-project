const { appDataSource } = require('./index');

const getUserEmail = async (email) => {
  const userEmail = await appDataSource.query(
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
      u.email=?
    `,
    [email]
  );
  console.log(userEmail[0]);
  return userEmail[0];
};
const getUserPhoneNumber = async (phoneNumber) => {
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

const getUserNickName = async (nickName) => {
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
  socialId,
  email,
  password,
  phoneNumber,
  nickName,
  profileImageUrl
) => {
  return appDataSource.query(
    `
    INSERT INTO
      users(
        social_id,
        social_type_id,
        email,
        password,
        phone_number,
        nickname,
        profile_image_url,
        user_status_id)
    VALUES
        (?,?,?,?,?,?,?,?)
    `,
    [
      socialId,
      defaultUserSocialType.itself,
      email,
      password,
      phoneNumber,
      nickName,
      profileImageUrl,
      defaultUserStatusType.activity,
    ]
  );
};

module.exports = {
  createUser,
  getUserEmail,
  getUserPhoneNumber,
  getUserNickName,
};
