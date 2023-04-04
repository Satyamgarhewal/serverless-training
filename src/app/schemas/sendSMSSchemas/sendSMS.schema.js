const yup = require("yup");

const bodySchema = yup.object().shape({
  phoneNumber: yup.number().required(),
  message: yup.string().required(),
});

module.exports = { bodySchema };
