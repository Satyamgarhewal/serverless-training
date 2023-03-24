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

module.exports = { writeHooks };
