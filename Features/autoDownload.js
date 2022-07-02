const axios = require("axios")
const { createWriteStream, unlinkSync, readFileSync } = require("fs")
const { randomBytes } = require("crypto")
module.exports = async data => {
	const tiktokRegex = new RegExp(/^https?:\/\/(www\.|vm\.)?(tiktok\.com)\/?(.*)$/g)
	if(tiktokRegex.test(data.msg)){
		logger.info("link tiktok terdeteksi")
		const link = data.msg.match(tiktokRegex)[0]
		try {
			const resl = await axios.get("https://tkdown.herokuapp.com/snaptik",{params: {url:link}})
			const resv = await axios({method: "get",
						  url: resl.data[0].url,
						  responseType: "stream"})
			const id = randomBytes(3).toString("hex") + ".mp4"
			const writer = createWriteStream("./Media/tmp/"+id)
			resv.data.pipe(writer)
			let error = null
			writer.on("error", err => {
				error = err
				writer.close()
			})
			writer.on("close", async() => {
				if(error) return logger.error("gagal download video tiktok")
				await sock.sendMessage(data.id,{video: readFileSync("./Media/tmp/"+id)},{quoted:data.message})
				unlinkSync("./Media/tmp/"+id)
			})
		} catch(err){
			logger.error(err)
		}
	}
}