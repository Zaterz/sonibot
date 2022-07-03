const { Schema } = mongoose
module.exports = {
 users: new Schema({
	_id: String,
	afk: {
	  isAfk: {type: Boolean, default: false},
	  date: {type: Date, default: null},
	  reason: {type: String, default: null}
	}
  }),
  group: new Schema({
	_id: String,
	antiSpam: {type: Boolean, default: false},
	autoDownload: {type: Boolean, default: true},
	welcome: {
		isWelcome: {type: Boolean, default: false},
		welcomeMsg: {type: String, default: "Hai @user Selamat Datang Di @group!"}
	},
	goodbye: {
		isGoodbye: {type: Boolean, default: false},
		goodbyeMsg: {type: String, default: "Bye @user :("}
	}
  })
}
