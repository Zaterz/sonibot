const {isJidGroup} = require("@adiwajshing/baileys")
module.exports = {
  name: ["hidetag"],
  desc: "hidden tag :)",
  exec: async (data) => {
	const args = data.msg.split(/ /gi).slice(1).join(" ")
	if(!isJidGroup(data.id)) return sock.sendMessage(data.id,{text: "Maaf Command Tersebut Hanya Bisa Digunakan Didalam Group."},{quoted:data.message})
	if(data.sender !== config.owner) return sock.sendMessage(data.id, {text: "Command Tersebut Hanya Bisa Digunakan Oleh Owner."},{quoted: data.message})
	const metadata = await sock.groupMetadata(data.id) 
	const participants = metadata.participants.map(p => p.id)
	sock.sendMessage(data.id,{text: args, mentions: participants},{quoted:data.message})
	console.log(participants)
  }
}
