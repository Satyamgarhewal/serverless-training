const {
  useHooks,
  logEvent,
  parseEvent,
  handleUnexpectedError,
} = require("lambda-hooks");

const writeHooks = useHooks({
  before: [logEvent, parseEvent],
  after: [],
  onError: [handleUnexpectedError],
});

// Validation of the body of the api request while making a REST api call.
const hooksWithValidation = ({ bodySchema, pathSchema }) => {
  return useHooks(
    {
      before: [logEvent, parseEvent, validateEventBody, validatePaths],
      after: [],
      onError: [handleUnexpectedError],
    },
    // Schemas for validation
    {
      bodySchema,
      pathSchema,
    }
  );
};

const validateBodyHook = ({ bodySchema }) => {
  return useHooks(
    {
      before: [logEvent, parseEvent, validateEventBody],
      after: [],
      onError: [handleUnexpectedError],
    },
    // passing schemas in the state to access it for validation afterwards.
    {
      bodySchema,
    }
  );
};
const validateEventBody = async (state) => {
  const { bodySchema } = state.config;

  if (!bodySchema) {
    throw Error("missing the required body schema");
  }
  try {
    const { event } = state;
    await bodySchema.validate(event.body, { strict: true });
  } catch (error) {
    console.log("yup validation error of event.body", error);
    state.exit = true;
    state.response = {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
  return state;
};

const validatePaths = async (state) => {
  const { pathSchema } = state.config;

  if (!pathSchema) {
    throw Error("missing the required path schema");
  }
  try {
    const { event } = state;
    await pathSchema.validate(event.pathParameters, { strict: true });
  } catch (error) {
    console.log("yup validation error of event.pathParameters", error);
    state.exit = true;
    state.response = {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
  return state;
};

module.exports = { writeHooks, hooksWithValidation, validateBodyHook };
