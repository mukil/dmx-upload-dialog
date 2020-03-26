const state = {
  handler: [],
  uploadDialogVisible: false
}

const actions = {

  registerUploadHandler({state}, handler) {
    console.log("[Upload Dialog] Registering Dialog Handler", handler, state)
    state.handler.push(handler)
  },
  openUploadDialog() {
    state.uploadDialogVisible = true
  },
  closeUploadDialog() {
    state.uploadDialogVisible = false
  }

}

export default {
  state,
  actions
}
