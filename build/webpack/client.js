// imported only in development

const hotClient = require('webpack-hot-middleware/client')
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    // force page reload when html-webpack-plugin template changes
    window.location.reload()
  }
})
