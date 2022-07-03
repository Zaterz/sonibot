module.exports = {
  name: ["afk"],
  desc: "away from keyboard",
  needReg: true,
  exec: async data => {
	const args = data.msg.split(/ /gi).slice(1).join(" ").trim()
	const user = await users.updateOne({_id: data.sender},{afk: {isAfk:true,date: moment.now(),reason: args}})
	const res = args == "" ? `@${data.sender.replace('@s.whatsapp.net','')} now Afk` : `@${data.sender.replace('@s.whatsapp.net','')} now Afk: *${args}*`
	sock.sendMessage(data.id,{text: res, mentions: [data.sender]},{quoted: data.message})
  }
}
