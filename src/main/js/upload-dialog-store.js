const state = {
  handler: {}
}

const actions = {

  registerUploadHandler({state}, handler) {
    console.log("[Upload Dialog] Registering Upload Handler", handler, state)
    if (state.handler.hasOwnProperty(handler.mimeType)) {
      console.log("[Upload Dialog] Appending handler for mimeType", handler.mimeType, "list => ", state.handler)
      state.handler[handler.mimeType].push(handler)
    } else {
      state.handler[handler.mimeType] = [handler]
      console.log("[Upload Dialog] Init handler for mimeType", handler.mimeType, "list =>", state.handler)
    }
  }

}

export default {
  state,
  actions
}
