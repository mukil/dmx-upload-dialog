
# DMX Upload Dialog

A vue component to extend the [DMX](https://git.dmx.systems/dmx-platform/dmx-platform) webclient about a single file upload dialog.

Additionally adds a `Download` command into the context commands of each _File_ topic.

## Usage

DMX Plugins can call `registerUploadHandlers` like for e.g. the dmx-import-export plugin does [here](https://git.dmx.systems/dmx-plugins/dmx-import-export/-/blob/master/src/main/js/plugin.js#L6) or the dmx-csv plugin does [here](https://github.com/mukil/dmx-csv/blob/master/src/main/js/plugin.js).

```
store.dispatch("registerUploadHandler", {
  mimeTypes:  ["application/vnd.ms-excel", "text/csv"], // 1. Win 10 FFox CSV 2. Other CSV
  action: "/csv/import",
  selected: function(file, fileList) {
    console.log("[CSV] upload dialog change selected for upload", fileList)
  },
  success: function(response, file, fileList) {
    this.$store.dispatch("revealTopicById", response.id)
    this.$notify({
      title: 'CSV File Uploaded', type: 'success'
    }),
  },
  error: ...
})
```

## Version History

**1.0.0** - Apr 28, 2020

* Single file upload into root folder of filerepo functional
* Based on ElementUI Upload component
* Allows plugins to register file-selection handlers to provide an options dialog before upload
* Allows plugins to configure upload form action resources (_POST_) per `mimeType`

### Authors

(C) Malte Reißig 2020
