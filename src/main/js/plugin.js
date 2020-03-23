export default () => ({

  extraElementUI: true,

  components: [{
    comp: require('./components/Upload-Dialog').default,
    mount: 'toolbar-left'
  }],

  storeModule: {
    name: 'upload',
    module: require('./upload-dialog-store').default
  }

})
