import mongoose from 'mongoose'

const SettingSchema = new mongoose.Schema({
  setting_key: { type: String, required: true, unique: true },
  setting_value: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema)
