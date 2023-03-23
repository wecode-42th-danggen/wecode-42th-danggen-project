const { catchAsync } = require('../../utils/error');
const cmpostService = require('../services/cmpostService');

const getCmpost = catchAsync(async (req, res) => {
  const data = await cmpostService.getCmpost();

  return res.status(200).json({ data });
});

const deleteCmpost = catchAsync(async (req, res) => {
  const { cmpostId } = req.params;

  await cmpostService.deleteCmpost(cmpostId);

  return res.status(200).json({ message: `DELETE_CMPOST_${cmpostId}` });
});

module.exports = { getCmpost, deleteCmpost };
