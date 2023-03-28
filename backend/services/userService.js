const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const userDao = require('../models/userDao');
const validation = require('../utils/validation');

const getUserImageByUserId = async (userId) => {
  return await userDao.getUserImageByUserId(userId);
};

const signUp = async (email, password, phoneNumber, nickName, image) => {
  await validation.checkValidationEmail(email);
  await validation.checkValidationPassword(password);
  await validation.checkValdationPhoneNumber(phoneNumber);

  const userEmail = await userDao.getUserByEmail(email);
  const userPhoneNumber = await userDao.getUserByPhoneNumber(phoneNumber);
  const userNickName = await userDao.getUserByNickName(nickName);

  if (userEmail) {
    const error = new Error('ALREADY_EXIST_EMAIL');
    error.statusCode = 400;
    throw error;
  }

  if (userPhoneNumber) {
    const error = new Error('ALREADY_EXIST_PHONE_NUMBER');
    error.statusCode = 400;
    throw error;
  }

  if (userNickName) {
    const error = new Error('ALREADY_EXIST_NICKNAME');
    error.statusCode = 400;
    throw error;
  }

  if (!userEmail && !userPhoneNumber && !userNickName) {
    const salt = parseInt(process.env.SALT_ROUNDS);

    const hashedPassword = await bcrypt.hash(password, salt);
    const createUser = await userDao.createUser(
      email,
      hashedPassword,
      phoneNumber,
      nickName,
      image
    );
    return createUser;
  }
};

const accessToken = async (userId) => {
  const secterKey = process.env.SECRET_KEY;
  const time = new Date().getTime() / 1000 + 60 * 60 * 9;
  const currentTime = Math.floor(time);
  const expireTime = currentTime * 60 * 60 * 24;

  const payload = {
    userId: userId,
    iss: 'waem-danggen',
    iat: currentTime,
    exp: expireTime,
  };

  return jwt.sign(payload, secterKey);
};

const signIn = async (email, password) => {
  await validation.checkValidationEmail(email);
  await validation.checkValidationPassword(password);

  const getUserByEmail = await userDao.getUserByEmail(email);
  if (!getUserByEmail) {
    const error = new Error('NOT_EXIST_USER');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await userDao.getPasswordByEmail(email);
  const checkHash = await bcrypt.compare(password, hashedPassword);

  if (!checkHash) {
    const error = new Error('INVALID_PASSWORD');
    error.statusCode = 400;
    throw error;
  }

  const userId = getUserByEmail.id;

  return accessToken(userId);
};

reqId = Math.random().toString(36).substring(2, 11);
siteCode = process.env.WAEM_SIGNIN_SITE_CODE;
sync = true;
clientIp = process.env.WAEM_SIGNIN_CLIENT_IP;

const waemSignIn = async (email) => {
  const loginSync = await axios.post(
    `https://livecertcew.waem.kr:39401/live/client/login_sync`,
    {
      req_id: reqId,
      site_code: siteCode,
      site_usr_id: email,
      sync: true,
      usr_id: 'zeler1004@naver.com',
      client_ip: clientIp,
    },
    {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    }
  );
  const otp = loginSync.data.site_otp;
  const otpKey = loginSync.data.site_otp_key;
  await userDao.waemSignIn(email, otp, otpKey);

  const otpOk = await axios.post(
    `https://livecertcew.waem.kr:39401/live/client/otp_ok`,
    {
      req_id: reqId,
      site_code: siteCode,
      site_usr_id: email,
      sync: sync,
      site_otp: otp,
      site_otp_key: otpKey,
    }
  );
};

const waemSignOut = async () => {
  const logout = await axios.post(
    `https://livecertcew.waem.kr:39401/live/client/logout`,
    {
      req_id: email,
      site_code: siteCode,
      site_usr_id: email,
    }
  );
  const email = await userDao.waemSignOut();
  console.log(logout);
};
module.exports = {
  getUserImageByUserId,
  signUp,
  signIn,
  waemSignIn,
  waemSignOut,
};
