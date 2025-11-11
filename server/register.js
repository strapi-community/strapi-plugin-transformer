"use strict";

const _ = require("lodash");

const { transform } = require("./middleware/transform");
const { getPluginService } = require("./util/getPluginService");

function addTransformMiddleware(route) {
  // ensure path exists
  if (!_.has(route, ["config", "middlewares"])) {
    _.set(route, ["config", "middlewares"], []);
  }

  // register route middleware
  route.config.middlewares.push((ctx, next) => transform(strapi, ctx, next));
}

// Helper functions
function isAllowableAPI({ mode, uid, filterValues }) {
  const filterUID = _.get(filterValues, [uid], false);

  if (mode === "allow" && !filterUID && _.isBoolean(filterUID)) {
    return false;
  } else if (mode === "deny" && filterUID && _.isBoolean(filterUID)) {
    return false;
  }

  return true;
}

function isAllowableMethod({ mode, uid, method, filterValues }) {
  const filterMethod = _.get(filterValues, [uid, method], null);
  if (mode === "allow" && !filterMethod && _.isBoolean(filterMethod)) {
    return false;
  } else if (mode === "deny" && filterMethod && _.isBoolean(filterMethod)) {
    return false;
  }

  return true;
}

function register({ strapi }) {
  const settings = getPluginService("settingsService").get();

  let ctFilterMode = _.get(settings, ["contentTypeFilter", "mode"], "none");
  const pluginFilterMode = _.get(settings, ["plugins", "mode"], "allow");

  const ctFilterUIDs = _.get(settings, ["contentTypeFilter", "uids"], {});
  const pluginFilterIDs = _.get(settings, ["plugins", "ids"], {});

  const apiTypes = ["api"];

  if (_.size(ctFilterUIDs) === 0) {
    ctFilterMode = "none";
  }

  if (_.size(pluginFilterIDs) !== 0) {
    apiTypes.push("plugins");
  }

  _.forEach(apiTypes, (apiType) => {
    const mode = apiType === "api" ? ctFilterMode : pluginFilterMode;
    const filterValues = apiType === "api" ? ctFilterUIDs : pluginFilterIDs;

    _.forEach(strapi[apiType], (api, apiName) => {
      _.forEach(api.contentTypes, (contentType, contentTypeName) => {
        let uid;

        if (apiType === "plugins" && contentType.plugin === apiName) {
          // Plugin content type
          uid = contentType.uid;
          const pluginUIDs = _.get(filterValues, [apiName, "uids"], {});

          if (!isAllowableAPI({ uid, mode, filterValues: pluginUIDs })) {
            return;
          }
        } else {
          // General API content type
          uid = contentType.uid;

          if (!isAllowableAPI({ uid, mode, filterValues })) {
            return;
          }
        }

        _.forEach(api.routes, (router) => {
          if (router.type && router.type === "admin") {
            return;
          }

          if (router.routes) {
            _.forEach(router.routes, (route) => {
              if (
                !isAllowableMethod({
                  uid,
                  mode,
                  filterValues,
                  method: route.method,
                })
              ) {
                return;
              }
              // Add transform middleware to the route
              addTransformMiddleware(route);
            });
            return;
          }

          if (
            !isAllowableMethod({
              uid,
              mode,
              filterValues,
              method: router.method,
            })
          ) {
            return;
          }

          // Add transform middleware to the router
          addTransformMiddleware(router);
        });
      });
    });
  });
}

export default register;
