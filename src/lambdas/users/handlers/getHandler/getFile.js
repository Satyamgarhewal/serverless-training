const Response = require("../../../../app/common/apiResponses");
const S3 = require("../../../../app/common/s3");
const bucket = process.env.bucketName;

exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.fileName) {
    return Response._400({ message: "No file name found" });
  }

  const fileName = event.pathParameters.fileName;

  const file = await S3.get(fileName, bucket).catch((err) => {
    console.log("Error in S3 get", err);
    return null;
  });

  if (!file) {
    Response._400({ message: "Failed to get file" });
  }

  return Response._200({ file });
};
