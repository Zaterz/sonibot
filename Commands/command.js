const fs = require("fs")

global.commands = {}
fs.readdirSync("./Commands").filter(d => !d.includes("."))
			.forEach(folder => {
				commands[folder] = fs.readdirSync("./Commands/"+folder)
				.map(file => {
					try{
					const cmd = require("./"+folder+"/"+file)
					return {
						name: cmd.name,
						desc: cmd.desc,
						args: cmd.hasOwnProperty("args") ? cmd.args : false,
						exec: cmd.exec
					}} catch (err) {
						logger.error("Terdapat error pada folder "+folder+" di file "+file)
						logger.error(err)
					}
				})
				logger.info("Berhasil load folder "+folder)
			})
console.log(commands)
