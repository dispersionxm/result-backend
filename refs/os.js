const os = require('os')

const log = console.log

log(os.platform())
log(os.arch())
log(os.cpus())
log(os.freemem())
log(os.totalmem())
log(os.uptime() / 60 / 60 / 24)
log(os.userInfo())
log('homedir', os.homedir())
log(os.hostname())
log(os.networkInterfaces())