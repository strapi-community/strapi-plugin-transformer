'use strict';

const pluginPkg = require('../../package.json');

/**
 * Returns the plugin id
 *
 * @return plugin id
 */
const pluginId = pluginPkg.strapi.name;

module.exports = { pluginId };
