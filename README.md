# strapi-plugin-transformer

A plugin for [Strapi](https://github.com/strapi/strapi) that provides the ability to transform the API request and/or response.

[![Downloads](https://img.shields.io/npm/dm/strapi-plugin-transformer?style=for-the-badge)](https://img.shields.io/npm/dm/strapi-plugin-transformer?style=for-the-badge)
[![Install size](https://img.shields.io/npm/l/strapi-plugin-transformer?style=for-the-badge)](https://img.shields.io/npm/l/strapi-plugin-transformer?style=for-the-badge)
[![Package version](https://img.shields.io/github/v/release/ComfortablyCoding/strapi-plugin-transformer?style=for-the-badge)](https://img.shields.io/github/v/release/ComfortablyCoding/strapi-plugin-transformer?style=for-the-badge)

## Requirements

The installation requirements are the same as Strapi itself and can be found in the documentation on the [Quick Start](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html) page in the Prerequisites info card.

### Supported Strapi versions

- v4.x.x

**NOTE**: While this plugin may work with the older Strapi versions, they are not supported, it is always recommended to use the latest version of Strapi.

## Installation

```sh
npm install strapi-plugin-transformer

# OR

yarn add strapi-plugin-transformer
```

## Configuration

The plugin configuration is stored in a config file located at `./config/plugins.js`. If this file doesn't exists, you will need to create it.

A sample configuration

```javascript
module.exports = ({ env }) => ({
  // ..
 'transformer': {
    enabled: true,
    config: {
      prefix: '/api/',
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      }
    }
  },
  // ..
});
```

**IMPORTANT NOTE**: Make sure any sensitive data is stored in env files.

### The Complete Plugin Configuration  Object

| Property | Description | Type | Default | Required |
| -------- | ----------- | ---- | ------- | -------- |
| prefix | The prefix for the API | String | '/api/' | No |
| responseTransforms | The transformations to enable for the API response | Object | undefined | No |
| responseTransforms.removeAttributesKey | Removes the attributes key from the response | Boolean | false | No |
| responseTransforms.removeDataKey | Removes the data key from the response | Boolean | false | No |

## Usage

Once the plugin has been installed, configured and enabled any request to the Strapi API will be auto transformed.

## Current Supported Transformations

### Remove the attributes key

This response transform will remove the attributes key from the response and shift all of its properties up one level.

#### Before

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Lorem Ipsum",
      "createdAt": "2022-02-11T01:51:49.902Z",
      "updatedAt": "2022-02-11T01:51:52.797Z",
      "publishedAt": "2022-02-11T01:51:52.794Z",
      "ipsum": {
        "data": {
          "id": 2,
          "attributes": {
            "title": "Dolor sat",
            "createdAt": "2022-02-15T03:45:32.669Z",
            "updatedAt": "2022-02-17T00:30:02.573Z",
            "publishedAt": "2022-02-17T00:07:49.491Z",
          },
        },
      },
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
    "title": "Lorem Ipsum",
    "createdAt": "2022-02-11T01:51:49.902Z",
    "updatedAt": "2022-02-11T01:51:52.797Z",
    "publishedAt": "2022-02-11T01:51:52.794Z",
    "ipsum": {
      "data": {
        "id": 2,
        "title": "Dolor sat",
        "createdAt": "2022-02-15T03:45:32.669Z",
        "updatedAt": "2022-02-17T00:30:02.573Z",
        "publishedAt": "2022-02-17T00:07:49.491Z",
      },
    },
  },
  "meta": {},
}
```

### Remove the data key

This response transform will remove the data key from the response and shift the attribute data to be top level.

#### Before

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Lorem Ipsum",
      "createdAt": "2022-02-11T01:51:49.902Z",
      "updatedAt": "2022-02-11T01:51:52.797Z",
      "publishedAt": "2022-02-11T01:51:52.794Z",
      "ipsum": {
        "data": {
          "id":2,
          "attributes": {
            "title": "Dolor sat",
            "createdAt": "2022-02-15T03:45:32.669Z",
            "updatedAt": "2022-02-17T00:30:02.573Z",
            "publishedAt": "2022-02-17T00:07:49.491Z",
          },
        },
      },
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
    "attributes": {
      "title": "Lorem Ipsum",
      "createdAt": "2022-02-11T01:51:49.902Z",
      "updatedAt": "2022-02-11T01:51:52.797Z",
      "publishedAt": "2022-02-11T01:51:52.794Z",
      "ipsum": {
        "id":2,
        "attributes": {
          "title": "Dolor sat",
          "createdAt": "2022-02-15T03:45:32.669Z",
          "updatedAt": "2022-02-17T00:30:02.573Z",
          "publishedAt": "2022-02-17T00:07:49.491Z",
        },
      },
    },
  },
  "meta": {},
}
```

## Bugs

If any bugs are found please report them as a [Github Issue](https://github.com/ComfortablyCoding/strapi-plugin-transformer/issues)
