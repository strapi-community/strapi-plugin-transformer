const pluginPkg = require('../../package.json');

/**
 * Returns the plugin id
 *
 * @return plugin id
 */
const pluginId = pluginPkg.name;

module.exports = { pluginId };
