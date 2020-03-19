export default ({store, dm5, axios: http, Vue}) => ({

  components: [{
    comp: require('./components/Upload-Dialog').default,
    mount: 'toolbar-left'
  }]

})
