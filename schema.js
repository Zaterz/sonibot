const { Schema } = mongoose
module.exports = {
 user: new Scema({
	_id: String,
	afk: {
	  isAfk: {type: Boolean, default: false},
	  date: {type: Date, default: moment.now()}
	}
  }),
  group: new Schema({
	_id: String,
	antiSpam: {type: Boolean, default: false},
	autoDownload: {type: Boolean, default: true},
  })
}
