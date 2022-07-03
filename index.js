const P = require('pino')
const pretty = require('pino-pretty')
const { default: makeWASocket, DisconnectReason, useSingleFileAuthState } = require('@adiwajshing/baileys')
const { state, saveState } = useSingleFileAuthState('./config/auth.json')
global.mongoose = require("mongoose")
global.config = require("./config/config.js")
global.moment = require("moment")
const stream = pretty({ colorize: true, hideObject: false, translateTime: true  })
const schema = require("./schema.js")
global.logger = P(stream)
global.features = require("./Features/handle.js")

mongoose.connect(config.db,{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
moment.locale("id")
db.once("open", () => {
	logger.info("Connected to database")
})

db.on("error", (err) => {
	logger.fatal("Terjadi kesalah di database")
})

global.users = mongoose.model("users",schema.users)
global.group = mongoose.model("group",schema.group)

function start(){
 global.sock = makeWASocket({
        logger: P({ level: 'silent' }, stream),
        printQRInTerminal: true,
        auth: state
    })
 sock.ev.on('connection.update', async(update) => {
        var _a, _b
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            if (((_a = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== DisconnectReason.loggedOut) {
                start()
            } else {
                logger.error('Connection Closed...')
            }
        }

        logger.info('Connection Update!')
    })

 sock.ev.on('creds.update', saveState)
 return sock
}

start()
require("./handler.js")
