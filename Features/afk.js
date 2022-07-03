const { isJidGroup } = require("@adiwajshing/baileys")
module.exports = async data => {
	if(!isJidGroup(data.id)) return
	if(data.isMention){
                const mentions = data.message.message[data.type].contextInfo.mentionedJid
                const musers = await users.find().where("_id").in(mentions).exec()
                if(!musers) return
                musers.forEach(async (muser) => {
                        if(muser.afk.isAfk) return sock.sendMessage(data.id,{text: `@${muser._id.replace("@s.whatsapp.net","")} Sedang Afk, Reason: *${muser.afk.reason}*`,mentions: [muser._id]},{quoted:data.message})
                })
        }
	const user = await users.findById(data.sender).exec()
	if(!user) return
	if(user.afk.isAfk){
		const delayyH = Math.floor(moment.duration(moment().diff(moment(user.afk.date))).asHours())
                const delayyM = Math.floor(moment.duration(moment().diff(moment(user.afk.date))).minutes())
		const res = `Selamat Datang Kembali!,\nKamu Sudah Afk Selama : ${(delayyH <= 0) ? `*${delayyM}* Menit` : `*${delayyH}* Jam *${delayyM}* Menit`}`
		user.afk = {isAfk: false,date: null,reason: null}
		await user.save()
		sock.sendMessage(data.id,{text:res},{quoted:data.message})
	}
}
