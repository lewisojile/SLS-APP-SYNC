'use strict';
const { createProgram } = require('../db/admin/mutations');

exports.graphql = async (event, context, callback) => {
  console.log('Received event {}', JSON.stringify(event, 3));

  const consumerKey = event.arguments.consumer_key;
  const consumerSecret = event.arguments.consumer_secret;

  const program = {
    projectID: '4664774',
    organizationID: '94883773',
    departmentName: 'New add',
    programName: 'hdhhhfjjd',
    description: 'fjjfjjfjjf',
    websiteURL: 'www.testing.com',
    terms: [
      {
        termName: 'Summer Term',
        termStartDate: 477747884,
        termEndDate: 477747884,
        applicationAcceptanceStartDate: 477747884,
        applicationAcceptanceEndDate: 477747884,
      },
    ],
    status: 'pending',
    createdAt: '12-01-2021',
    createdBy: 'Lewis',
    updatedAt: '12-01-2021',
    updatedBy: 'jjjkkkk',
  };

  const programs = [
    {
      projectID: '4664774',
      organizationID: '94883773',
      departmentName: 'New add',
      programName: 'hdhhhfjjd',
      description: 'fjjfjjfjjf',
      websiteURL: 'www.testing.com',
      terms: [
        {
          termName: 'Summer Term',
          termStartDate: 477747884,
          termEndDate: 477747884,
          applicationAcceptanceStartDate: 477747884,
          applicationAcceptanceEndDate: 477747884,
        },
      ],
      status: 'pending',
      createdAt: '12-01-2021',
      createdBy: 'Lewis',
      updatedAt: '12-01-2021',
      updatedBy: 'jjjkkkk',
    },
  ];

  console.log('Got an Invoke Request.');
  switch (event.field) {
    case 'getProgram': {
      callback(null, { items: program });
      break;
    }
    case 'listPrograms': {
      callback(null, { items: programs });
      break;
    }
    case 'createProgram': {
      const { input: item } = event.arguments;
      const {
        statusCode,
        body: createdProgram,
        error,
      } = await createProgram(item);
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, { items: createdProgram });
      break;
    }
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};
