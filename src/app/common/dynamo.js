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
  async write(data, TableName) {
    if (!data.ID) {
      throw Error("no ID on the Data");
    }
    const params = {
      TableName,
      Item: data,
    };
    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `Error while inserting data for ${data.ID} in table ${TableName}`
      );
    }
    return data;
  },
};

module.exports = Dynamo;
