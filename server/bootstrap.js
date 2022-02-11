// "use strict";

// const _ = require("lodash");

// const isAPIRequest = (ctx, prefix = "/api/") =>
//   ctx.request && ctx.request.url && ctx.request.url.indexOf(prefix) !== -1;

// const process_data = (data) => {
//   // array
//   if (Array.isArray(data) && data.length && data[0].attributes) {
//     return data.map((e) => process_data(e));
//   }

//   // attributes
//   if (_.has(data, "attributes")) {
//     return process_data({
//       id: data.id,
//       ...data.attributes,
//     });
//   }

//   // relation
//   const key = _.findKey(data, (p) => p && !Array.isArray(p) && p.data);
//   if (key) {
//     data[key] = process_data(data[key].data);
//   }

//   return data;
// };

// const transform = (body) => {
//   const { data } = body;

//   // leave error obj
//   if (data) {
//     body["data"] = process_data(data);
//   }

//   return body;
// };

// module.exports = ({ strapi }) => {
//   // bootstrap phase
//   strapi.server.use(async (ctx, next) => {
//     try {
//       await next();
//       if (isAPIRequest(ctx)) {
//         ctx.body = transform(ctx.body);
//       }
//     } catch (error) {
//       throw error;
//     }
//   });
// };

const transformMiddleware = require('./middleware/transform');

module.exports = ({ strapi }) => {
	// bootstrap phase
	transformMiddleware({ strapi });
};
