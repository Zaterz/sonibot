const fs = require("fs")

// cakLontong

global.cakLontong = []

module.exports = async(data) => {
  fs.readdirSync("./Features").filter(n => n !== "handle.js")
   .forEach(async file => {
	await require("./"+file)(data)
	})
}
