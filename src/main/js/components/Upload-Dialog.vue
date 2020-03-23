<template>
  <div class="dm5-upload-command">
    <el-button type="text" class="fa fa-upload" title="Upload File to DMX" @click="openUploadDialog"></el-button>
    <div v-if="uploadDialogVisible" class="dm5-upload-dialog">
      <el-upload class="manual-upload"
          ref="upload" :action="uploadPath"
          with-credentials multiple
          :on-change="dialogChanged"
          :on-error="uploadError"
          :on-success="uploadSuccess"
          :auto-upload="false">
          <div class="el-upload__tip" slot="tip"><!-- Todo: Let other plugins hook in their component here --></div>
          <el-button slot="trigger" size="small" type="primary">Select file</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success"
            @click="submitUpload">Upload to server</el-button>
          <el-button size="small" type="danger" @click="closeUploadDialog">Cancel</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
        uploadDialogVisible: false,
        uploadPath: "/files/%2F" // Fixme: Allow for custom paths in filerepo
    }
  },

  updated() {
    console.log("[Upload-Dialog] Registered Handler", this.$store.state.upload.handler)
  },

  methods: {
    uploadSuccess(response, file, fileList) {
      this.uploadDialogVisible = false
      this.$refs.upload.clearFiles()
      this.$store.dispatch("revealTopicById", response.topicId)
    },
    uploadError(err, file, fileList) {
      console.warn("upload failed", err, file, fileList)
    },
    openUploadDialog() {
      this.uploadDialogVisible = true
    },
    closeUploadDialog() {
      this.uploadDialogVisible = false
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
