const { isJidGroup } = require("@adiwajshing/baileys")
module.exports = {
  name: ["addgroup"],
  desc: "Add group to database",
  exec: async data => {
	if(data.sender !== config.owner) return sock.sendMessage(data.id,{react: {text: "❗",key: data.message.key}})
	if(!isJidGroup(data.id)) return sock.sendMessage(data.id,{text: "Maaf command ini hanya bisa digunakan didalam group."},{quoted:data.message})
	try {
		const gc = await group.findById(data.id).exec()
		if(gc) return sock.sendMessage(data.id,{text: "Group sudah terdaftar di database."},{quoted:data.message})
		await group.create({ _id: data.id })
		sock.sendMessage(data.id,{text: "Group berhasil ditambahkan di database."},{quoted:data.message})
	} catch(error){
		logger.error(error)
	}
  }
}
