const { appDataSource } = require('./index');
const { deleteImage } = require('../utils/imageUploader');

const getUserByEmail = async (email) => {
  const userEmail = await appDataSource.query(
    `
    SELECT
      u.id,
      u.social_id AS socialId,
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

const getUserImageByUserId = async (userId) => {
  const [userImage] = await appDataSource.query(
    `
    SELECT
      u.id,
      u.nickname,
      u.profile_image_url AS profileImageUrl,
      u.phone_number AS phoneNumber,
      u.email
    FROM
      users u
    WHERE
      u.id=?
    `,
    [userId]
  );

  return userImage;
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

const createUser = async (email, password, phoneNumber, nickName, image) => {
  let imageUrl = null;

  if (image) {
    imageUrl = image.location;
  }

  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      `
      INSERT INTO users (
        email,
        password,
        phone_number,
        nickname,
        profile_image_url,
        user_status_id
      )
      VALUES
        (?,?,?,?,?,?)
    `,
      [
        email,
        password,
        phoneNumber,
        nickName,
        imageUrl,
        defaultUserStatusType.activity,
      ]
    );

    const [userId] = await queryRunner.query(
      `SELECT LAST_INSERT_ID() as insertId FROM users`
    );

    await queryRunner.query(
      `
      INSERT INTO users_social_types (
        user_id,
        social_type_id
        )
      VALUES (
        ?,
        ?
      )
      `,
      [userId.insertId, defaultUserSocialType.itself]
    );

    await queryRunner.commitTransaction();
    await queryRunner.release();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    const error = new Error('Failed To Create User');
    error.statusCode = 400;
    throw error;
  } finally {
    await queryRunner.release();
  }
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

const checkRegisterUserId = async (userId) => {
  const [result] = await appDataSource.query(
    `
    SELECT EXISTS(
      SELECT
        id
      FROM
        users
      WHERE
        id=?
    ) AS userIdRegisted`,
    [userId]
  );
  return !!parseInt(result.userIdRegisted);
};

const getEmailByUserId = async (userId) => {
  const result = await appDataSource.query(
    `
    SELECT
      u.email
    FROM
      users u
    WHERE
      u.id=?
    `,
    [userId]
  );
  return result;
};

const checkRegisterUserEmail = async (email) => {
  const [result] = await appDataSource.query(
    `
    SELECT EXISTS(
      SELECT
        email
      FROM
        users
      WHERE
        email=?
    ) AS emailRegisted`,
    [email]
  );
  return !!parseInt(result.registed);
};

const waemSignIn = async (email, otp, otpKey) => {
  try {
    if (email) {
      await appDataSource.query(
        `
        UPDATE
          users
        SET
          otp=?,
          otp_key=?
        WHERE
          email=?
        `,
        [otp, otpKey, email]
      );
    } else {
      await appDataSource.query(
        `
      INSERT INTO
        users(
          email,
          otp,
          otp_key,
          user_status_id
          )
      VALUES
        (?,?,?,?)
    `,
        [email, otp, otpKey, defaultUserStatusType.activity]
      );
    }
  } catch (err) {
    console.error(err);
    const error = new Error('FAILED_WAEM_SIGN_IN');
    error.statusCode = 400;
    throw error;
  }
};

const updateUserInfo = async (phoneNumber, nickName, image, userId) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const [userInfo] = await queryRunner.query(
      `
      SELECT
        u.id,
        u.profile_image_url as imageUrl
      FROM users u
      WHERE u.id=?
      `,
      [userId]
    );

    const imageFileName = userInfo.imageUrl.split('com/')[1];

    deleteImage(imageFileName);

    await queryRunner.query(
      `
      UPDATE users
      SET
        phone_number=?,
        nickname=?,
        profile_image_url=?
      WHERE id=?
    `,
      [phoneNumber, nickName, image.location, userId]
    );

    await queryRunner.commitTransaction();
    await queryRunner.release();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();

    throw new Error('Failed To Update User Info');
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByPhoneNumber,
  getUserByNickName,
  getUserImageByUserId,
  getPasswordByEmail,
  checkRegisterUserId,
  getEmailByUserId,
  checkRegisterUserEmail,
  waemSignIn,
  updateUserInfo,
};
