const yup = require("yup");

const bodySchema = yup.object().shape({
  name: yup.string().required(),
  score: yup.number().required(),
});

const pathSchema = yup.object().shape({
  ID: yup.string().required(),
});

module.exports = { bodySchema, pathSchema };
