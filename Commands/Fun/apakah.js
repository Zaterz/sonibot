module.exports = {
  name: ["apakah"],
  desc: "Apakah?",
  exec: async(data) => {
 	const answer = ["Ya","Mungkin","Tidak","Gatau"]
	sock.sendMessage(data.id,{text: answer[Math.floor(Math.random() * (answer.length))]}, {quoted:data.message})
  }
}
