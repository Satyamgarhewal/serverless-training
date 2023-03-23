const Responses = require("../../../../app/common/apiResponses");
const Dynamo = require("../../../../app/common/dynamo");
const tableName = process.env.tableName;
const writeHooks = require("../../../../app/common/hooks");

const createPlayer = async (event) => {
  if (!event.pathParameters.ID) {
    return Responses._400({ message: "No ID found" });
  }
  const ID = event.pathParameters.ID;
  const user = event.body;
  user.ID = ID;

  const newUser = await Dynamo.write(user, tableName);

  if (!newUser) {
    Responses._400({ message: "Failed to create a new user" });
  }

  return Responses._200({ newUser });
};

exports.handler = writeHooks(createPlayer);
