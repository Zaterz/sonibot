const jimp = require("jimp")
const { downloadMediaMessage } = require("@adiwajshing/baileys")
const fs = require("fs")
module.exports = {
  name: ["rotate"],
  desc: "rotate gambar",
  exec: async(data) => {
	const isRepImage = data.isRep ? (Object.keys(data.isRep.message)[0] == "imageMessage") : false
	if(data.type !== "imageMessage" && !isRepImage) return sock.sendMessage(data.id,{text: "Maaf fitur ini hanya bisa digunakan dengan format gambar."},{quoted:data.message})
	await sock.sendMessage(data.id,{react: {text:"⏳",key:data.message.key}})
	const buffer = data.isRep ? await downloadMediaMessage(data.isRep,'buffer') : await downloadMediaMessage(data.message,'buffer')
	const id = require("crypto").randomBytes(3).toString("hex") + ".jpeg"
	 jimp.read(buffer).then(img => {
		img.rotate(90)
		img.write("./Media/tmp/"+id,async(res) => {
			await sock.sendMessage(data.id,{image: {url: "./Media/tmp/"+id}},{quoted:data.message})
			fs.unlinkSync("./Media/tmp/"+id)
	})})
	 .catch(err => {
		sock.sendMessage(data.id,{text: "Maaf terjadi error, silakan coba lagi"},{quoted:data.message})
	})
 }
}
