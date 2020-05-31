import contentfulObject1 from './contentfulObject1'
import contentfulObject2 from './contentfulObject2'

export default {
  sys: {
    space: {
      sys: {
        type: 'Link',
        linkType: 'Space',
        id: 'foo'
      }
    },
    type: 'Entry',
    id: '3ghi',
    contentType: {
      sys: {
        type: 'Link',
        linkType: 'ContentType',
        id: 'reviewer'
      }
    },
    revision: 1,
    createdAt: '2020-05-30T10:18:23.239Z',
    updatedAt: '2020-05-30T10:19:00.623Z',
    environment: {
      sys: {
        id: 'master',
        type: 'Link',
        linkType: 'Environment'
      }
    },
    locale: 'en-US'
  },
  fields: {
    name: 'Nathan',
    email: 'foo@bar.com',
    parent: contentfulObject1,
    parents: [
      contentfulObject1,
      contentfulObject2
    ]
  }
}
