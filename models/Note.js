import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: '',
  },
  keyPoints: {
    type: [String],
    default: [],
  },
  content: {
    type: String,
    trim: true,
    default: '',
  },
  summary: {
    type: String,
    trim: true,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Note', noteSchema);
