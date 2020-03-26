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
        fileListType: "text",
        availableFileTypes: []
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
        // call selected handler to react
        available.selected()
        this.uploadPath = available.action
        this.availableFileTypes = available.mimeTypes
      } else {
        console.log("[Upload Dialog] no custom file upload handler registered for mimeType (" + file.raw.type + ")")
      }
    },

    beforeUpload(file) {
        if (this.availableFileTypes.length > 0) {
            console.log("Upload check for all files", this.availableFileTypes, "fileType", file.type)
            const isCorrectFollowupFile = (typeof this.availableFileTypes[file.type] !== "undefined") ? true : false
            if (!isCorrectFollowupFile) {
              this.$notify.error("For this upload, all files must be of type " + JSON.stringify(this.availableFileTypes));
            }
        }
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
