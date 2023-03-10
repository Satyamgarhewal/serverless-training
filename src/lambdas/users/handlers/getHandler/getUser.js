const Responses = require("../../../../app/common/apiResponses");
exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.ID) {
    return Responses._400({ message: "No ID found!" });
  }

  let id = event.pathParameters.ID;
  if (data[id]) {
    return Responses._200({ user: data[id], message: "User found" });
  }
  return Responses._400({ message: "No user found!" });
};

const data = {
  1234: {
    name: "Anna",
    age: 25,
    job: "writer",
  },
  5678: {
    name: "Chris",
    age: 25,
    job: "teacher",
  },
  9123: {
    name: "Tom",
    age: 25,
    job: "dentist",
  },
};
