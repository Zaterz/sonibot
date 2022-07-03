const {isJidGroup} = require("@adiwajshing/baileys")
module.exports = {
  name: ["siapakah","siapa"],
  desc: "Siapa?",
  exec: async(data) => {
	if(!isJidGroup(data.id)) return sock.sendMessage(data.id,{text: "Command ini hanya bisa digunakan didalam group."})
	const metadata = await sock.groupMetadata(data.id)
	const participants = metadata.participants.map(d => d.id)
	const terpilih = participants[Math.floor(Math.random() * (participants.length))]
	sock.sendMessage(data.id,{text: "@"+terpilih.replace("@s.whatsapp.net",""), mentions: [terpilih]},{quoted: data.message})
  }
}
