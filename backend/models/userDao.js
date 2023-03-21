const { appDataSource } = require('./index');

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

const createUser = async (
  email,
  password,
  phoneNumber,
  nickName,
  socialId,
  profileImageUrl
) => {
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
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      `
      INSERT INTO
        users(
          email,
          password,
          phone_number,
          nickname,
          social_id,
          profile_image_url,
          user_status_id)
      VALUES
        (?,?,?,?,?,?,?)
    `,
      [
        email,
        password,
        phoneNumber,
        nickName,
        socialId,
        profileImageUrl,
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
    await queryRunner.release();

    throw new Error('Failed To Create User');
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
    ) AS registed`,
    [userId]
  );
  return !!parseInt(result.registed);
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByPhoneNumber,
  getUserByNickName,
  getPasswordByEmail,
  checkRegisterUserId,
};
