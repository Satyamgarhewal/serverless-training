const aws = require("aws-sdk");
const Responses = require("../../../../app/common/apiResponses");
const { validateBodyHook } = require("../../../../app/common/hooks");
const {
  bodySchema,
} = require("../../../../app/schemas/analyseSchemas/analyse.schema");

const Comprehend = new aws.Comprehend();
const analyseText = async (event) => {
  const text = event.body.text;

  const params = {
    LanguageCode: "en",
    TextList: [text],
  };

  try {
    const entityResults = await Comprehend.batchDetectEntities(
      params
    ).promise();
    const entities = entityResults.ResultList[0];
    const sentimentResults = await Comprehend.batchDetectSentiment(
      params
    ).promise();
    const sentiments = sentimentResults.ResultList[0];

    const responseData = {
      entities,
      sentiments,
    };
    console.log(responseData);
    return Responses._200(responseData);
  } catch (error) {
    console.log("facing error while analysis", error);
    Responses._400({ message: "Failed while working with Comprehend" });
  }
};

exports.handler = validateBodyHook({ bodySchema })(analyseText);
