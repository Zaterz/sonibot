const axios = require("axios")
module.exports = {
  name: ["sim","simi"],
  desc: "ngomong sama simi :D",
  args: true,
  exec: async(data) => {
	const chatSimi = async(msg) => {
    try {
        const res = await axios.get(`https://api-sv2.simsimi.net/v2/?text=${msg}&lc=id`)
        if(res.status != 200) return 'Maaf Aku Lagi Gak Tau'
        if(!res.data['success']) return 'Maaf Aku Enggak Paham'
        return res.data['success']
    } catch(err){
        return 'Maaf Aku Enggak Paham'
    }
}
	const args = data.msg.split(/ /gi).slice(1).join(" ")
	const res = await chatSimi(args)
	sock.sendMessage(data.id,{text: res}, {quoted: data.message})
  }
}
