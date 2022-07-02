const { downloadMediaMessage } = require("@adiwajshing/baileys")
const fs = require("fs")
const { spawn } = require("child_process")

module.exports = {
  name: ["s","sticker","stiker"],
  desc: "Ubah gambar/video ke stiker",
  exec: async data => {
	const isRepMedia = data.isRep ? (Object.keys(data.isRep.message)[0] == "imageMessage" || Object.keys(data.isRep.message)[0] == "videoMessage") : false
	const isMedia = data.type == "imageMessage" || data.type == "videoMessage"
	if(!isRepMedia && !isMedia) return sock.sendMessage(data.id,{ text:"Media yang dikirim harus berupa gambar/video" }, { quoted:data.message })
	const media = isRepMedia ? data.isRep : data.message
	if((Object.keys(media.message)[0] === "videoMessage") && media.message.videoMessage.seconds > 4) return sock.sendMessage(data.id,{text: "Video tidak boleh lebih dari 3detik"},{quoted:data.message})
	await sock.sendMessage(data.id,{react:{text:"⏳",key:data.message.key}})
	const buffer = await downloadMediaMessage(media,"buffer")
	const ID = require("crypto").randomBytes(3).toString("hex")
	const id = ((isRepMedia && Object.keys(data.isRep.message)[0] === "imageMessage") || data.type === "imageMessage") ? ID+".jpeg" : ID+".mp4"
	fs.writeFile("./Media/tmp/"+id,buffer,async(err) => {
		if(err) return sock.sendMessage(data.id,{text: "Maaf terjadi kesalahan, silakan coba lagi."},{quoted: data.message})
		const cmd = `ffmpeg`
                const argu = ((Object.keys(media.message)[0] === "videoMessage")) ? ['-i', "./Media/tmp/"+id, '-vcodec', 'libwebp', '-filter:v', 'fps=fps=20', '-lossless', '0', '-compression_level', '3', '-q:v', '70', '-loop', '1', '-preset', 'picture', '-an', '-vsync', '0', '-s', '600:600', `./Media/tmp/${ID}.webp`] : ['-i', `./Media/tmp/${ID}.jpeg`, `./Media/tmp/${ID}.webp`]
                const proc = spawn(cmd, argu)
		proc.on("close", async()  => {
			function handleErr(){
				sock.sendMessage(data.id,{text: "Maaf terjadi kesalahan, silakan coba lagi."},{quoted: data.message})
				fs.unlinkSync(id)
				sock.sendMessage(data.id,{react:{text:"",key:data.message.key}})
				return sock.sendMessage(data.id,{text:"Maaf terjadi kesalahan, silakan coba lagi."},{quoted:data.message})
			}
			if(!fs.existsSync("./Media/tmp/"+ID+".webp")) return handleErr()
			sock.sendMessage(data.id,{sticker: fs.readFileSync("./Media/tmp/"+ID+".webp")},{quoted: data.message})
			fs.unlinkSync("./Media/tmp/"+id)
			fs.unlinkSync("./Media/tmp/"+ID+".webp")
		})
	})
  }
}
