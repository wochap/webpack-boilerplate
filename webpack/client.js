// imported only in development

// force page reload when html-webpack-plugin template changes
const hotClient = require('webpack-hot-middleware/client')
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
