
# DMX Upload Dialog

A vue component to extend the [DMX](https://git.dmx.systems/dmx-platform/dmx-platform) webclient about an extensible single-file upload dialog.

Additionally adds a `Download` command into the context commands of each _File_ topic.

## Installation

You can find the latest stable version of this plugin right here on [github.com/releases](https://github.com/mukil/dmx-upload-dialog/releases).

You will also need to download and install the following plugin/s:

- dmx-file-upload 1.0

After downloading both plugins (.jar, bundle-files), place them in the `bundle-deploy` folder of your DMX installation and restart DMX.

## Usage

DMX Plugins can call `upload/registerUploadHandlers` like for e.g. the dmx-import-export plugin does [here](https://git.dmx.systems/dmx-plugins/dmx-import-export/-/blob/master/src/main/js/plugin.js#L6) or the dmx-csv plugin does [here](https://github.com/mukil/dmx-csv/blob/master/src/main/js/plugin.js).

```
store.dispatch("upload/registerUploadHandler", {
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

DMX Plugins can additionally call `upload/setUploadDialogOptions` like, for example, the dmx-import-export plugin to allow users to upload the file to a custom resource.

```
store.dispatch("upload/setUploadDialogOptions", {
  options: [
    {value: "topicmap", label: "DMX Topicmap", action: "/import-export/import/topicmap"},
    {value: "firefox", label: "Firefox Bookmarks", action: "/import-export/import/bookmarks/firefox"}
  ],
  optionsMessage: "What is the content you want to import?"
})
```

## Version History

**1.0.3** - Jun 30, 2021

* Adapted to be compatible with DMX 5.2
* Namespaced store module ("upload")
* New dependency: dmx-file-upload 1.0 plugin ([sources](https://git.dmx.systems/dmx-plugins/dmx-file-upload), [download](https://download.dmx.systems/ci/dmx-file-upload/))

**1.0.2** - Jan 2, 2021

* Maintenance release compatible with DMX 5.1

**1.0.1** - Aug 15, 2020

* Browser console output line during handler registration less verbose

**1.0.0** - Apr 28, 2020

* Single file upload into root folder of filerepo functional
* Based on ElementUI Upload component
* Allows plugins to register file-selection handlers to provide an options dialog before upload
* Allows plugins to configure upload form action resources (_POST_) per `mimeType`

### Authors

(C) Malte Reißig 2021
