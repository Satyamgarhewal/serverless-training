// file imports
const Responses = require("../../../../app/common/apiResponses");
const Dynamo = require("../../../../app/common/dynamo");
const { hooksWithValidation } = require("../../../../app/common/hooks");
const {
  bodySchema,
  pathSchema,
} = require("../../../../app/schemas/playerSchemas/createPlayerScore.schema");
// variables
const tableName = process.env.tableName;

const createPlayer = async (event) => {
  const ID = event.pathParameters.ID;
  const user = event.body;
  user.ID = ID;

  const newUser = await Dynamo.write(user, tableName);

  if (!newUser) {
    Responses._400({ message: "Failed to create a new user" });
  }

  return Responses._200({ newUser });
};

exports.handler = hooksWithValidation({ bodySchema, pathSchema })(createPlayer);
