export default ({dmx, axios}) => ({

  components: [{
    comp: require('./components/Upload-Dialog').default,
    mount: 'toolbar-left'
  }],

  storeModule: {
    name: 'upload',
    module: require('./upload-dialog-store').default
  },

  contextCommands: {
    topic: topic => {
      if (topic.typeUri === 'dmx.files.file') {
        return [{
          label: '<i title="Download File" class="fa fa-download"></i>',
          handler: id => {
            dmx.rpc.getTopic(id, true)
              .then(function(response) {
                let filePath = response.children['dmx.files.path'].value
                window.document.location.assign('/filerepo/' + encodeURIComponent(filePath) + '?download')
              })
          }
        }]
      }
    }
  }

})
