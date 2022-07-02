const { isJidGroup } = require("@adiwajshing/baileys")
module.exports = {
	name: ["?","help","bantuan"],
	desc: "Bantuan",
	exec: async(data) => {
		const buttons = [
 			 {buttonId: '.command', buttonText: {displayText: 'Command'}, type: 1},
  			 {buttonId: '.info', buttonText: {displayText: 'About'}, type: 1},
  		]

		const buttonMessage = {
    			text: "*Silakan Klik Salah Satu Tombol Dibawah*",
    			footer: config.botName,
    			buttons: buttons,
    			headerType: 1
		}
		await sock.sendMessage(data.sender,buttonMessage, {quoted:data.message})
		if(isJidGroup(data.id)) return sock.sendMessage(data.id,{ react: {text: "🆗", key: data.message.key} })

	}
}
