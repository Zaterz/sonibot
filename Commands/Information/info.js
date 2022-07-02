const { isJidGroup } = require("@adiwajshing/baileys")
module.exports = {
  name: ["info","information","about"],
  desc: "Tentang bot ini",
  exec: (data) => {
	const templateButtons = [
    		{index: 1, urlButton: {displayText: 'Github', url: 'https://github.com/Zaterz'}},
    		{index: 2, callButton: {displayText: 'Contact', phoneNumber: '+62812 38981143'}},
    	]

	const templateMessage = {
    		text: "Dev pemalas",
    		footer: config.botName,
    		templateButtons: templateButtons
	}

	sock.sendMessage(data.sender,templateMessage,{quoted: data.message})
	if(isJidGroup(data.id)) return sock.sendMessage(data.id,{ react: {text: "🆗", key: data.message.key} })
	}
}
