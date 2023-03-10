const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async get(ID, TableName) {
    // The below params are documented in AWS, so we need to share it as shown below, with no change.
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(
        `There was an error fetching the data for ID of ${id} from ${tableName}`
      );
    }
    console.log(data);
    return data.Item;
  },
};

module.exports = Dynamo;
