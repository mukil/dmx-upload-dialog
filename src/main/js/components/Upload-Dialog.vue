<template>
  <div class="dm5-upload-command">
    <el-button type="text" class="fa fa-upload" title="Upload File to DMX" @click="openUploadDialog"></el-button>
    <div v-if="uploadDialogVisible" class="dm5-upload-dialog">
        <el-upload class="manual-upload"
            ref="upload" :action="uploadPath"
            with-credentials multiple
            :on-change="selectionHandler"
            :on-error="errorHandler"
            :on-success="successHandler"
            :before-upload="beforeUpload"
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
            <div class="el-upload__tip" slot="tip"><!-- Todo: Let other plugins hook in their component here --></div>
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
        fileListType: "text"
    }
  },

  computed: {
    handler: function () {
      return this.$store.state.upload.handler
    },
    uploadDialogVisible: function() {
      return this.$store.state.upload.uploadDialogVisible
    }
  },

  methods: {
    uploadSuccess(response, file, fileList) {
      console.log("[Upload Dialog] file upload succesfull", response)
      this.closeUploadDialog()
      this.$refs.upload.clearFiles()
      this.$store.dispatch("revealTopicById", response.topicId)
      this.$notify({
        title: 'File Uploaded', type: 'success'
      })
    },
    uploadError(err, file, fileList) {
      console.warn("upload failed", err, file, fileList)
      this.$notify.error({
        title: 'Upload Failed',
        message: "Error \"" + JSON.stringify(err) + "\""
      })
    },
    uploadChanged(file, fileList) {
      console.log("[Upload Dialog] file selected for upload", file.raw)
      let fileNameEnding = file.name.slice(file.name.lastIndexOf(".") + 1).toUpperCase()
      let available = this.handler[file.raw.type.split("/")]
      if (typeof available === "undefined") {
        console.log("[Upload Dialog] no custom file upload handler registered for mimeType, checking for fileNameEnding...")
        available = this.handler[fileNameEnding]
        if (typeof available === "undefined") {
            console.log("[Upload Dialog] Using standard upload handler, uploading to root directory of filerepository")
        }
      }
      // ...
      if (typeof available !== "undefined") {
        console.log("[Upload Dialog] Hooking in custom file upload handler", available)
        console.log("[Upload Dialog] Trying to register custom handler...")
        this.errorHandler = available[0].error
        this.successHandler = available[0].success
        this.selectionHandler = available[0].selected
        this.uploadPath = available[0].action
      }
    },
    beforeUpload(file) {
        // ### Todo: once a file was selected, subsequent files must have same file ending
    },
    openUploadDialog() {
      this.$store.dispatch("openUploadDialog")
    },
    closeUploadDialog() {
      this.$store.dispatch("closeUploadDialog")
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
