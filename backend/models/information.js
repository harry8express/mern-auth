import mongoose from 'mongoose'

const informationSchema = mongoose.Schema({
  姓名: {
    type: String,
    required: true
  }, 生日: {
    type: String,
    required: true
  }, 住址: {
    type: String,
    required: true
  }, 推薦人: {
    type: String,
    default: ''
  }, 次數: {
    type: Number,
    default: null
  }
}, 
{ timestamps: true },
 {
  collection: 'information'
}
)

const Information = mongoose.model('Information', informationSchema)
export default Information