const { isJidGroup } = require("@adiwajshing/baileys")
module.exports = {
  name: ["cmd","command"],
  desc: "Command yang ada dibot ini",
  exec: data => {
		let sections = []
		Object.keys(commands).forEach(c => {
			if(commands[c].length == 0) return
			sections.push( {
				title: c,
				rows: commands[c].map(file => {
					return {
						title: file.name.join(", "),
						rowId: "."+file.name[0],
						description: file.desc
					}
				})
			})
		})

		const listMessage = {
  			text: "Silakan Klik Tombol Dibawah.",
  			footer: config.botName,
  			title: "Command / Utility",
  			buttonText: "Command",
  			sections
		}
		console.log(sections)
		console.log(Object.keys(commands))
		sock.sendMessage(data.sender,listMessage)
		if(isJidGroup(data.id)) return sock.sendMessage(data.id,{ react: {text: "🆗", key: data.message.key} })
	}
}
