# fetch-deep-contentful-data

Small utility library that fetches data from the Contentful JSON API, with additional levels of nested references.

## Usage

In your project, import `fetch-deep-contentful-data` and create your own utility function to fetch contentful data from your own space like this.

```js
// my-utils/fetchContentfulData.js
import { createClient, fetch } from 'fetch-deep-contentful-data'

const space = 'abc123'
const accessToken = 'def456'
const environment = null // defaults to master
const previewAccessToken = null // To use preview API instead of default API

const myClient = createClient({
  space,
  accessToken,
  previewAccessToken,
  environment
})

export default async (...queries) => {
  return fetch(myClient, ...queries)
}
```

This `fetchContentfulData` method will now connect to your own Contentful space, and you can `import` it throughout your project easily.

### Multiple parallel requests

You can call `fetch` with multiple query objects to run multiple queries in parallel.

```js
const [responseOne, responseTwo] = await fetch(client, queryOne, queryTwo)
```

`fetch` will throw an error if any of the requests fail. If you provide multiple queries, `fetch` will resolve with an array of query results in the order you provided them.

To force `fetch` to return an array, you can supply an extra argument after only one query.

```js
const [response] = await fetch(client, query, true)
```

### Extract nested entries

By default, `fetch` will return the same response and Contentful's content delivery API, only with more nested objects.

However, especially when working with client-side state management like Vuex or Redux, often you might prefer a flat list of unique entries that refer to each other with IDs.

To achieve this, you can use the `extractNestedEntries` helper.

```js
import { extractNestedEntries } from 'fetch-deep-contentful-data'

import fetchContentfulData from  'my-utils/fetchContentfulData'

const response = await fetchContentfulData({ content_type: 'blogPost' })

const uniqueEntriesById = extractNestedEntries(response.items)
```

`uniqueEntriesById` is an object with with all entries keyed by their ID. Any nested references will include `{ sys: { id: 'foobar' } }` so that you know what they refer to.

Now you can easily add these items to your store in a database-like model, and write getters that index them by content type or other parameters. Note that Contentful will have unique IDs across content types.
