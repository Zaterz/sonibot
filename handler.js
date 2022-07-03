const fs = require("fs")
const {isJidUser, isJidGroup, delay} = require("@adiwajshing/baileys")
require("./Commands/command.js")
sock.ev.on("messages.upsert", async Message => {
 const { messages } = Message
 let msg = messages[0];
 if (!msg.message) return
 if (msg.key.fromMe) return
 const type = Object.keys(msg.message)[0]
 if(type === 'protocolMessage' && msg.message[type].type === 0) return
 function info(type,msg){
    this.type = type,
    this.content = JSON.stringify(msg.message),
    this.id = msg.key.remoteJid,
    this.sender = isJidGroup(this.id) ? msg.key.participant : this.id,
    this.message = msg
    this.isMention = this.content.includes('mentionedJid'),
    this.isQuoted = this.content.includes("quotedMessage"),
    this.isRep = (this.type == 'extendedTextMessage' && this.isQuoted) ? { message: this.message.message.extendedTextMessage.contextInfo.quotedMessage } : false
    this.msg = (this.type == 'conversation') ? msg.message.conversation : (this.type == 'extendedTextMessage') ? msg.message.extendedTextMessage.text : (this.type == 'imageMessage') ? msg.message.imageMessage.caption : msg.message.hasOwnProperty('listResponseMessage') ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : msg.message.hasOwnProperty("buttonsResponseMessage") ? msg.message.buttonsResponseMessage.selectedButtonId : (this.type == 'videoMessage') ? msg.message.videoMessage.caption : (this.type == "reactionMessage") ? msg.message.reactionMessage.text : ""
    this.args = this.msg.split(/ /gi).slice(1)
  }
  const data = new info(type,msg)
  await sock.readMessages([msg.key])
  let skip = null
  if(isJidGroup(data.id) && (data.sender !== config.owner)){
             const gc = await group.findById(data.id).exec()
             if(!gc){
                        skip = true
                     }
   }
  if(skip) return
  await features(data)
//  logger.info(data.message)
  if(data.msg.startsWith(config.prefix)){
	for(const folder in commands){
		for(const file of commands[folder]){
		file.name.forEach(async a => {
			if(a == data.msg.split(/ /gi)[0].slice(1)){
				if(file.needReg){
					const user = await users.findById(data.id)
						if(!user){
							sock.sendMessage(data.id,{ text: `Command ini hanya bisa digunakan setelah kamu register silakan ketik *${config.prefix}reg* untuk register` },{quoted:data.message})
							return
						}
				}
				await file.exec(data)
			}
		})
		}
	}
  }
})



