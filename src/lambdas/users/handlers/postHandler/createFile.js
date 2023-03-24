const Response = require("../../../../app/common/apiResponses");
const S3 = require("../../../../app/common/s3");
const bucket = process.env.bucketName;

exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.fileName) {
    return Response._400({ message: "No file name found" });
  }

  const fileName = event.pathParameters.fileName;
  const data = JSON.parse(event.body);

  const newData = await S3.write(data, fileName, bucket).catch((err) => {
    console.log("Error in S3 write", err);
    return null;
  });

  if (!newData) {
    Response._400({ message: "Failed to create a new file" });
  }

  return Response._200({ newData });
};
