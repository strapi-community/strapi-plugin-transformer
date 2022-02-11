# strapi-plugin-transformer

A plugin for [Strapi](https://github.com/strapi/strapi) that provides the ability to transform the API response.

## Requirements

The installation requirements are the same as Strapi itself and can be found in the documentation on the [Quick Start](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html) page in the Prerequisites info card.

### Supported Strapi versions

- v4.x.x

**NOTE**: While this plugin may work with the older Strapi versions, they are not supported, it is always recommended to use the latest version of Strapi.

## Installation

```sh
npm install strapi-plugin-transformer
```

**or**

```sh
yarn add strapi-plugin-transformer
```

## Configuration

The plugin configuration is stored in a config file located at `./config/plugins.js`.

```javascript
module.exports = ({ env }) => ({
 'transformer': {
    enabled: true,
    config: {
      prefix: '/api/'
    }
  },
});
```

**IMPORTANT NOTE**: Make sure any sensitive data is stored in env files.

### The Complete Plugin Configuration  Object

| Property | Description | Type | Default | Required |
| -------- | ----------- | ---- | ------- | -------- |
| prefix | The prefix for the API | String | '/api/' | No |

## Usage

Once the plugin has been installed, configured and enabled any request to the Strapi API will be auto transformed.

## Current Supported Transformations

### Remove the attributes key and shift all of its properties up a level

#### Before

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "the title",
      "createdAt": "2022-02-11T01:51:49.902Z",
      "updatedAt": "2022-02-11T01:51:52.797Z",
      "publishedAt": "2022-02-11T01:51:52.794Z",
    },
  },
  "meta": {},
}
```

#### After

```json
{
  "data": {
    "id": 1,
    "title": "the title",
    "createdAt": "2022-02-11T01:51:49.902Z",
    "updatedAt": "2022-02-11T01:51:52.797Z",
    "publishedAt": "2022-02-11T01:51:52.794Z",
  },
  "meta": {},
}
```

## Bugs

If any bugs are found please report them as a [Github Issue](https://github.com/ComfortablyCoding/strapi-plugin-transformer/issues)
