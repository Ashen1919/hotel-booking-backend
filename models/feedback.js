import mongoose from "mongoose";

const feedBackSchema = mongoose.Schema({
    
  feedbackId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    default: ""
  },
  occupation: {
    type: String
  },
  approved: {
    type: Boolean,
    default: false
  },
  timeStamp: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model("feedback", feedBackSchema);
export default Feedback;
