const Responses = require("../../../../app/common/apiResponses");
const Dynamo = require("../../../../app/common/dynamo");
const tableName = process.env.tableName;
exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.ID) {
    return Responses._400({ message: "No ID found" });
  }
  const ID = event.pathParameters.ID;
  const user = JSON.parse(event.body);
  user.ID = ID;

  const newUser = await Dynamo.write(user, tableName).catch((err) => {
    console.log("Error in dynamo write", err);
    return null;
  });

  if (!newUser) {
    Responses._400({ message: "Failed to create a new user" });
  }

  return Responses._200({ newUser });
};
