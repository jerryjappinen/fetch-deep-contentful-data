import { createClient } from 'contentful'

// Export constructor that can be used elsewhere
export default (spaceId, accessToken, environment, preview) => {
  return createClient({
    space: spaceId,
    host: preview ? 'preview.contentful.com' : undefined,
    environment: environment || 'master',
    accessToken: accessToken
  })
}
