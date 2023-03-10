const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async get(id, tableName) {
    const params = {
      tableName,
      key: {
        id,
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
