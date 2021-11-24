const AWS = require("aws-sdk");
const createError = require("http-errors");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.listPrograms = async () => {
  let programs;

  const params = {
    TableName: "Program-3yosw5jxrjdvpmulazaiow5evy-dev",
  };

  try {
    const result = await dynamodb.scan(params).promise();
    programs = result.Items;
  } catch (err) {
    const error = new createError.InternalServerError(err);
    return {
      statusCode: 500,
      body: null,
      error: error,
    };
  }
  return {
    statusCode: 200,
    body: programs,
    error: null,
  };
};
