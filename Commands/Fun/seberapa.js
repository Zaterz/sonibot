module.exports = {
  name: ["seberapa"],
  desc: "Berapa persen?",
  exec: data => {
   sock.sendMessage(data.id,{text: Math.floor(Math.random() * 100) + "%"},{quoted:data.message})
 }
}
