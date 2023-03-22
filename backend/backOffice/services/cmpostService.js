const cmpostDao = require('../models/cmpostDao');

const getCmpost = () => {
  return cmpostDao.getCmpost();
};

const deleteCmpost = (cmpostId) => {
  return cmpostDao.deleteCmpost(cmpostId);
};

module.exports = { getCmpost, deleteCmpost };
