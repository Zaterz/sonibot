module.exports = {
  name: ["reg","register"],
  desc: "Register nomor",
  exec: async data => {
	try {
		const user = await users.findById(data.sender).exec()
		if(user){
			sock.sendMessage(data.sender,{text: "Anda sudah register."},{quoted:data.message})
			return sock.sendMessage(data.id,{react:{text: "❗",key:data.message.key}})
		}
		await users.create({ _id: data.sender })
		sock.sendMessage(data.id,{text:"Berhasil mendaftar."},{quoted:data.message})
	} catch (error){
		logger.error(error)
	}
  }
}
