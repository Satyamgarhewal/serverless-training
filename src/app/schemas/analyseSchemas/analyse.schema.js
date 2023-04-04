const yup = require("yup");

const bodySchema = yup.object().shape({
  text: yup.string().required(),
});

module.exports = { bodySchema };
