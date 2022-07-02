module.exports = {
  name: ["dadu"],
  desc: "Dadu",
  exec: (data) => {
	sock.sendMessage(data.id,{text: `🎲Anda Mendapatkan *${Math.floor(Math.random() * 12)+1}*🎲`},{quoted:data.message})
  }
}
