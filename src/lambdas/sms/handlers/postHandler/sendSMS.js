const aws = require("aws-sdk");
const validateBodyHook = require("../../../../app/common/hooks");
const Responses = require("../../../../app/common/apiResponses");

const SNS = new aws.SNS({ apiVersion: "2010-03-21" });
const {
  bodySchema,
} = require("../../../../app/schemas/sendSMSSchemas/sendSMS.schema");

const sendSMS = async (event) => {
  const body = event.body;
  const AttributeParams = {
    attributes: {
      DefaultSMSType: "Promotional",
    },
  };

  const messageParams = {
    Message: body.message,
    PhoneNumber: body.phoneNumber,
  };

  await SNS.setSMSAttributes(AttributeParams).promise();
  await SNS.publish(messageParams).promise();
};

exports.handler = validateBodyHook(bodySchema)(sendSMS);
