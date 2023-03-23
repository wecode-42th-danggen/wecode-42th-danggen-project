const cmpostDao = require('../models/cmpostDao');

const getCmpost = () => {
  return cmpostDao.getCmpost();
};

const deleteCmpost = async (cmpostId) => {
  const checkCmpostId = await cmpostDao.checkRegistCmpostId(cmpostId);

  if (!checkCmpostId) {
    const error = new Error(`NOT_EXIST_COMMUNITY_POST`);
    error.statusCode = 400;
    throw error;
  }

  return cmpostDao.deleteCmpost(cmpostId);
};

module.exports = { getCmpost, deleteCmpost };
