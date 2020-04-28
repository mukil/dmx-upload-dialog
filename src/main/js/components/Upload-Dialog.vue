<template>
    <div class="dm5-upload-command">
        <el-button type="text" class="fa fa-upload" v-if="commandVisible" title="Upload File to DMX" @click="openUploadDialog"></el-button>

        <div v-if="uploadDialogVisible" class="dm5-upload-dialog">
            <el-upload class="manual-upload"
                ref="upload" :action="uploadPath"
                with-credentials
                :on-change="selectionHandler"
                :on-error="errorHandler"
                :on-success="successHandler"
                :auto-upload="false" :list-type="fileListType">
                <!--div slot="file" slot-scope="{file}">
                  <span>{{file.name}}</span>
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div-->

                <el-button slot="trigger" size="small" type="primary">Select file</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Upload to server</el-button>
                <el-button size="small" type="danger" @click="closeUploadDialog">Cancel</el-button>

                <div v-if="uploadOptionsAvailable" class="el-upload__tip" slot="tip">
                  <h3>{{uploadOptionsMessage}}</h3>
                  <!-- el-radio v-model="uploadOption" label="none" border size="small">None</el-radio-->
                  <el-radio @change="updateUploadAction" v-for="option in uploadOptions"
                    v-model="uploadOption" :label="option.value" border size="small" :key="option.value">
                    {{option.label}}
                  </el-radio>
                </div>

            </el-upload>
        </div>

    </div>
</template>

<script>
export default {

  data() {
    return {
        uploadPath: "/files/%2F",
        errorHandler: this.uploadError,
        selectionHandler: this.uploadChanged,
        successHandler: this.uploadSuccess,
        fileNameEnding: "",
        fileListType: "text",
        availableFileTypes: [],
        uploadOption: undefined
    }
  },

  computed: {
    handler: function () {
      return this.$store.state.upload.handler
    },
    uploadOptionsAvailable: function () {
      return (typeof this.$store.state.upload.options !== "undefined")
    },
    uploadOptions: function () {
      return this.$store.state.upload.options
    },
    uploadOptionsMessage: function () {
      return this.$store.state.upload.optionsMessage
    },
    uploadDialogVisible: function() {
      return this.$store.state.upload.uploadDialogVisible
    },
    commandVisible: function() {
      return (this.$store.state.accesscontrol.username)
    }
  },

  methods: {

    uploadSuccess(response, file, fileList) {
      console.log("[Upload Dialog] file upload succesfull", response)
      this.closeUploadDialog()
      this.$store.dispatch("revealTopicById", response.topicId)
      this.$notify({
        title: 'File Uploaded', type: 'success'
      })
    },

    uploadError(err, file, fileList) {
      console.warn("[Upload Dialog] upload failed", err, file, fileList)
      this.$notify.error({
        title: 'Upload Failed',
        message: "Error \"" + JSON.stringify(err) + "\""
      })
    },

    uploadChanged(file, fileList) {
      var available = undefined
      for (const i in this.handler) {
        if (!this.handler[i].hasOwnProperty("mimeTypes")) console.warn("Upload handler object has no mimeTypes attribute set")
        handlerSearch:
        for (const m in this.handler[i].mimeTypes) {
            if (this.handler[i].mimeTypes[m] === file.raw.type.toLowerCase()) {
                console.log("[Upload Dialog] Using custom handler", this.handler[i].mimeTypes)
                available = this.handler[i]
                break handlerSearch
            }
        }
      }
      // Set Custom Handler Active
      if (typeof available !== "undefined") {
        this.errorHandler = available.error
        this.successHandler = available.success
        // call registered file selection handler once here
        available.selected(file) // to mutate dialog state.upload.optons
        this.uploadPath = available.action
        this.availableFileTypes = available.mimeTypes
      } else {
        console.log("[Upload Dialog] no custom file upload handler registered for mimeType (" + file.raw.type + ")")
      }
    },

    updateUploadAction() {
        // console.log("[Upload Dialog] beforeUpload", this.uploadOption, this.uploadOptions)
        /** if (this.uploadOption === "none") {
            // set to standard uploadPath of current custom handler
        }**/
        for (let u in this.uploadOptions) {
            if (this.uploadOptions[u].value === this.uploadOption) {
                // update form action accordingly
                this.uploadPath = this.uploadOptions[u].action
                console.log("[Upload Dialog] Adapted upload endpoint according to user input", this.uploadPath)
            }
        }
    },

    openUploadDialog() {
      this.$store.dispatch("openUploadDialog")
    },

    closeUploadDialog() {
      this.$store.dispatch("closeUploadDialog")
      this.uploadOption = undefined
      this.$refs.upload.clearFiles()
    },

    submitUpload() {
      this.$refs.upload.submit()
    }

  }
}
</script>

<style>
.dm5-upload-dialog {
    background-color: #fff;
    padding: 1em;
    border: 1px dashed #ccc;
    border-radius: .5em;
    position: absolute;
}
</style>
