const state = {
  handler: [],
  uploadDialogVisible: false,
  options: undefined,
  optionsMessage: undefined
}

const actions = {

  registerUploadHandler({state}, handler) {
    console.debug("[Upload Dialog] Registering Dialog Handler", handler)
    state.handler.push(handler)
  },
  setUploadDialogOptions({state}, options) {
    state.options = options.options
    state.optionsMessage = options.optionsMessage
  },
  openUploadDialog() {
    state.uploadDialogVisible = true
  },
  closeUploadDialog({state}) {
    state.uploadDialogVisible = false
    state.options = undefined
    state.optionsMessage = undefined
  }

}

export default {
  namespaced: true,
  state,
  actions
}
