const sendResonse = (res, status, message, success, data = {}) => {
  return res.status(status).send({
    message,
    success,
    ...data,
  });
};
export default sendResonse;
