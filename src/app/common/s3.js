const AWS = require("aws-sdk");
const s3Client = new AWS.S3();

const S3 = {
  async get(fileName, bucket) {
    const params = {
      Bucket: bucket,
      Key: fileName,
    };
    let file = await s3Client.getObject(params).promise();

    if (!file) {
      throw Error("There was an error while fetching the file");
    }

    if (fileName.slice(fileName.length - 4, fileName.length) === "json") {
      file = file.Body.toString();
    }
    return file;
  },
  async write(data, fileName, bucket) {
    console.log("bucket name ---->", bucket);
    const params = {
      Bucket: bucket,
      Body: JSON.stringify(data),
      Key: fileName,
    };
    const newData = await s3Client.putObject(params).promise();

    if (!newData) {
      throw Error("There was an error writing the file");
    }

    return newData;
  },
};

module.exports = S3;
