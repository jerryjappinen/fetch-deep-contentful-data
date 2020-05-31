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
    id: '1abc',
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
    name: 'Mike',
    email: 'foo@bar.com',
    profilePicture: {
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: 'foo'
          }
        },
        type: 'Asset',
        id: 'kdjksdjlkasd',
        revision: 1,
        createdAt: '2020-05-26T15:14:41.188Z',
        updatedAt: '2020-05-26T15:15:01.526Z',
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
        title: 'portrait-jerry-jappinen',
        file: {
          url: '//images.ctfassets.net/j1pumz1rg7u6/P6XzM9QP5JsHggz6jrvlm/70c21ff9157dcd1a9e76f442d28978ec/portrait-jerry-jappinen.jpg',
          details: {
            size: 244324,
            image: {
              width: 1280,
              height: 1280
            }
          },
          fileName: 'portrait-jerry-jappinen.jpg',
          contentType: 'image/jpeg'
        }
      }
    }
  }
}
