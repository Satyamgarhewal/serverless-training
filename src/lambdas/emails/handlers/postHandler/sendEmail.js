const Responses = require("../../../../app/common/apiResponses");
const aws = require("aws-sdk");
const SES = new aws.SES();

exports.handler = async (event) => {
  const { to, from, subject, text } = JSON.parse(event.body);

  if (!to || !from || !subject || !text) {
    return Responses._400({ message: "Params missing from body" });
  }

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: text },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };

  try {
    await SES.sendEmail(params).promise();
    return Responses._200({});
  } catch (err) {
    console.log("error while sending email", err);
    return Response._400({ message: "Email was failed to send" });
  }
};
