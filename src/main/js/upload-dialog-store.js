const state = {
  handler: {}
}

const actions = {

  registerUploadHandler({store}, {props}) {
    console.log("[Upload Dialog] Registering Upload Handler", props, store)
    // var obj = {props: props, selected: selected, success: success, error: error}
    /** if (state.handler.hasOwnProperty(props.mimeType)) {
      console.log("appending handler for mimeType", props.mimeType, "list => ", state.handler)
      state.handler[props.mimeType].push(props)
    } else {
      state.handler[props.mimeType] = [props]
      console.log("init handler for mimeType", props.mimeType, "list =>", state.handler)
    } **/
  }

}

export default {
  state,
  actions
}
