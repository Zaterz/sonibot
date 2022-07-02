module.exports = {
  name: ["seberapa"],
  desc: "Berapa persen?",
  args: true,
  exec: data => {
   sock.sendMessage(data.id,{text: Math.floor(Math.random() * 100) + "%"},{quoted:data.message})
 }
}
