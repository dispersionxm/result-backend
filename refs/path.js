const path = require('path')

const log = console.log

log(path.dirname(__filename))
log(path.basename(__filename))
log(path.extname(__filename).slice(1))
log(path.parse(__filename))
log(path.resolve(__dirname, '..', './modules', './app.js'))
log(path.join(__dirname, '..', 'modules', 'app.js'))


