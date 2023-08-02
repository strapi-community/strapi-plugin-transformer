# strapi-plugin-transformer

A plugin for [Strapi](https://github.com/strapi/strapi) that provides the ability to transform the API request and/or response.

[![Downloads](https://img.shields.io/npm/dm/strapi-plugin-transformer?style=for-the-badge)](https://img.shields.io/npm/dm/strapi-plugin-transformer?style=for-the-badge)
[![Install size](https://img.shields.io/npm/l/strapi-plugin-transformer?style=for-the-badge)](https://img.shields.io/npm/l/strapi-plugin-transformer?style=for-the-badge)
[![Package version](https://img.shields.io/github/v/release/ComfortablyCoding/strapi-plugin-transformer?style=for-the-badge)](https://img.shields.io/github/v/release/ComfortablyCoding/strapi-plugin-transformer?style=for-the-badge)

## Requirements

The installation requirements are the same as Strapi itself and can be found in the documentation on the [Quick Start](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html) page in the Prerequisites info card.

### Support

**IMPORTANT**: GraphQL is not supported, see [#23](https://github.com/ComfortablyCoding/strapi-plugin-transformer/issues/23) and [#13](https://github.com/ComfortablyCoding/strapi-plugin-transformer/discussions/13) for additional context.

#### Strapi versions

- v4.x.x

**NOTE**: While this plugin may work with the older Strapi versions, they are not supported, it is always recommended to use the latest version of Strapi.

## Installation

```sh
npm install strapi-plugin-transformer

# OR

yarn add strapi-plugin-transformer
```

## Configuration

The plugin configuration is stored in a config file located at `./config/plugins.js`. If this file doesn't exist, you will need to create it.

### Minimal Configuration


```javascript
module.exports = ({ env }) => ({
  // ..
 'transformer': {
    enabled: true,
    config: {}
  },
  // ..
});
```

### Sample configuration

```javascript
module.exports = ({ env }) => ({
  // ..
 'transformer': {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      requestTransforms : {
        wrapBodyWithDataKey: true
      },
      hooks: {
        preResponseTransform : (ctx) => console.log('hello from the preResponseTransform hook!'),
        postResponseTransform : (ctx) => console.log('hello from the postResponseTransform hook!')
      },
      contentTypeFilter: {
        mode: 'allow',
        uids: {
          'api::article.article': true,
          'api::category.category': {
            'GET':true,
          }
        }
      },
      plugins: {
        ids: {
          'slugify': true,
        }
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
| responseTransforms | The transformations to enable for the API response | Object | N/A | No |
| responseTransforms.removeAttributesKey | Removes the attributes key from the response | Boolean | false | No |
| responseTransforms.removeDataKey | Removes the data key from the response | Boolean | false | No |
| requestTransforms | The transformations to enable for an API request | Object | N/A | No |
| requestTransforms.wrapBodyWithDataKey | Auto wraps the body of PUT and POST requests with a data key | Boolean | false | No |
| hooks | The hooks to enable for the plugin | Object | N/A | No |
| hooks.preResponseTransform | A hook that executes before the Response Transforms are applied | Function | () => {} | No |
| hooks.postResponseTransform | A hook that executes after the Response Transforms are applied | Function | () => {} | No |
| contentTypeFilter | The content types to deny or allow the middleware to be registered on. Defaults to allow all content types | Object | N/A | No |
| contentTypeFilter.mode | The filter mode. The current supported modes are `none`, `allow` or `deny` | String | 'none' | No |
| contentTypeFilter.uids | The uids to filter | Object | {} | No |
| plugins | The plugins to deny or allow the middleware to be registered on. Defaults to deny all plugins | Object | N/A | No |
| plugins.mode | The filter mode. The current supported modes are `none`, `allow` or `deny` | String | 'none' | No |
| plugins.ids | The plugin ids to filter. The plugin id is the name you set in the `plugins.js` file | Object | {} | No |
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

### Auto wrap the body content with a data key

This request transform will auto wrap the body content with a surrounding data key on all enabled routes.

#### Before

```json
{
  "title": "Lorem Ipsum",
}
```

#### After

```json
{
  "data": {
    "title": "Lorem Ipsum",
  }
}
```

## Supported Headers

| Name | Description | Type | Default | Required |
| -------- | ----------- | ---- | ------- | -------- |
| Strapi-Transformer-Ignore | Indicates if transform should be ignored for this request | String | 'false' | No |

### CORS
By default, CORS will block any custom headers. To enable custom headers to be accepted the [cors middlware](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html#cors) headers property must include the custom header(s) that should be accepted.

Example CORS configuration
```js
module.exports = [
  // ..
  {
    name: 'strapi::cors',
    config: {
      headers: ['Strapi-Transformer-Ignore'],
    },
  },
  // ..
]
```

## Bugs

If any bugs are found please report them as a [Github Issue](https://github.com/ComfortablyCoding/strapi-plugin-transformer/issues)
