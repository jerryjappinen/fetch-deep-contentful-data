# fetch-deep-contentful-data

Small utility library that fetches data from the Contentful JSON API, with additional levels of nested references.

## Usage

In your project, import `fetch-deep-contentful-data` and create your own utility function to fetch contentful data from your own space like this.

```js
import { createClient, fetch } from 'fetch-deep-contentful-data'

const spaceId = 'abc123'
const accessToken = 'def456'
const spaceEnvironment = null // defaults to master
const previewAccessToken = null // To use preview API instead of default API

const myClient = createClient(
  spaceId,
  accessToken,
  previewAccessToken,
  spaceEnvironment
)

export default (query) => {
  return fetch(myClient, query)
}
```
