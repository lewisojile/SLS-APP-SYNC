const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');
const createError = require('http-errors');

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.createProgram = async (program) => {
  const now = new Date();

  program.id = uuid();
  program.createdAt = now.toISOString();

  try {
    await dynamodb
      .put({
        TableName: 'Program-3yosw5jxrjdvpmulazaiow5evy-dev',
        Item: program,
      })
      .promise();
  } catch (err) {
    const createErr = new createError.InternalServerError(err);
    return {
      statusCode: 500,
      body: null,
      error: createErr,
    };
  }
  return {
    statusCode: 201,
    body: program,
    error: null,
  };
};
