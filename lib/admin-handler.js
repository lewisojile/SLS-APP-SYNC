"use strict";
const { createProgram } = require("../db/admin/mutations");
const { listPrograms } = require("../db/admin/queries");
const { ADMIN_MUTATION_ACTIONS } = require("../db/admin/constants");

exports.graphql = async (event, context, callback) => {
  console.log(
    "Got an Invoke Request.Received event {}",
    JSON.stringify(event, 3)
  );

  switch (event.field) {
    case ADMIN_MUTATION_ACTIONS.GET_PROGRAM: {
      callback(null, { items: null });
      break;
    }

    case ADMIN_MUTATION_ACTIONS.LIST_PROGRAMS: {
      const { body: programs, error } = await listPrograms();

      if (error) {
        callback(error, null);
        return;
      }
      callback(null, { items: programs });
      break;
    }

    case ADMIN_MUTATION_ACTIONS.CREATE_PROGRAM: {
      const { input: item } = event.arguments;
      const { body: createdProgram, error } = await createProgram(item);

      if (error) {
        callback(error, null);
        return;
      }
      callback(null, createdProgram);
      break;
    }
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};
