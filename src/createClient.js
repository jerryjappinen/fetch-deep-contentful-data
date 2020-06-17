import { createClient } from 'contentful'

// Export constructor that can be used elsewhere
export default ({
  space,
  accessToken,
  previewAccessToken,
  environment
}) => {
  return createClient({
    space: space,
    host: previewAccessToken ? 'preview.contentful.com' : undefined,
    environment: environment || 'master',
    accessToken: previewAccessToken || accessToken
  })
}
