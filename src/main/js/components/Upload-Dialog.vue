<template>
  <div class="dm5-upload-command">

    <el-button type="text" class="fa fa-file" title="Upload File to DMX" @click="openUploadDialog">
    </el-button>

    <div v-if="uploadDialogvisible">
        <el-upload class="manual-upload" ref="upload" action="/files/{uploadPath}" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">Select file</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Upload to server</el-button>
          <div class="el-upload__tip" slot="tip"><!-- Todo: Let other plugins hook in their component here --></div>
        </el-upload>
    </div>

  </div>
</template>

<script>
export default {

  data () {
    return {
        file: undefined,
        uploadDialogVisible: false,
        uploadPath: ''
    }
  },

  methods: {
    openUploadDialog() {
      console.log("Open Upload Dialog")
      this.uploadDialogVisible = true
    },
    submitUpload() {
      this.$refs.upload.submit()
    }
  }
}
</script>

<style>
</style>
