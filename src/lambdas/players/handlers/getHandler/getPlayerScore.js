const Responses = require("../../../../app/common/apiResponses");
const Dynamo = require("../../../../app/common/dynamo");
const tableName = process.env.tableName;
exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.ID) {
    return Responses._400({ message: "No ID Found!" });
  }

  let id = event.pathParameters.ID;
  console.log("id fetched --->", id);
  console.log("tableName ---->", tableName);
  try {
    const user = await Dynamo.get(id, tableName).catch((err) => {
      console.log("Error in Dynamo get", err);
      return null;
    });
    console.log("user ----->", user);
    if (!user) {
      return Responses._400({ message: "Failed to get user by ID" });
    }

    return Responses._200({ user });
  } catch (err) {
    console.log("error fetched ----->", err);
  }
};
