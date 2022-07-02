module.exports = {
  name: ["tts","caklontong"],
  desc: "Teka teki cak lontong",
  args: true,
  exec: async data => {
	sock.sendMessage(data.id,{text:"Coming soon!"})
  }
}
