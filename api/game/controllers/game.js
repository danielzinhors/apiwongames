"use strict";

const { default: createStrapi } = require("strapi");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  populate: async (ctx) => {
    const options = {
      page: "1",
      sort: "popularity",
      ...ctx.query,
    };
    strapi.services.game.populate(options);
    ctx.send({ Ok: true });
  },
};
