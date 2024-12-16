import Feedback from "../models/feedback.js";
import { v4 as uuidv4 } from "uuid";
import { isValidAdmin, isValidCustomer } from "./userController.js";

export function createFeedback(req, res) {
  const feedback = {
    ...req.body,
    feedbackId: uuidv4(), 
  };

  const newFeedback = new Feedback(feedback);

  newFeedback
    .save()
    .then(() => {
      res.status(200).json({
        message: "Feedback created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to create feedback",
        error: err.message,
      });
    });
}

export function getApprovedFeedback(req, res) {

  Feedback.find().then((feedbacks) => {
      res.status(200).json({
        feedbacks: feedbacks
      });
    })
    .catch(() => {
      res.status(500).json({ message: "Failed to retrieve feedbacks" });
    });
}

export function approveFeedback(req, res) {
    if (!isValidAdmin) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
    
    const feedbackId = req.body.feedbackId;
    const updatedFields = { approved: true }; 

    Feedback.updateOne({ feedbackId: feedbackId }, { $set: updatedFields }).then(() => {
            res.status(200).json({
                message: "Feedback updated successfully"
            });
        }).catch((error) => {
            res.status(500).json({
                message: "Failed to update the feedback",
                Error : error
            });
        });
}

export function deleteFeedbackByParams(req,res){
  if(!isValidAdmin){
      return res.status(403).json({
          message : "Unauthorized"
      })
  }

  const feedbackId = req.params.feedbackId

  Feedback.deleteOne({feedbackId : feedbackId}).then(()=>{
      res.status(200).json({
          message : "Feedback deleted successfully"
      })
  }).catch((err)=>{
      res.status(500).json({
          message : "Failed to delete feedback",
          error: err.message
      })
  })
}

export function deleteFeedback(req,res){
  if(!isValidAdmin){
      return res.status(403).json({
          message : "Unauthorized"
      })
  }

  const feedbackId = req.body.feedbackId

  Feedback.deleteOne({feedbackId : feedbackId}).then(()=>{
      res.status(200).json({
          message : "Feedback deleted successfully"
      })
  }).catch((err)=>{
      res.status(500).json({
          message : "Failed to delete feedback",
          error: err.message
      })
  })
}