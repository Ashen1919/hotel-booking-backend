import Feedback from "../models/feedback.js";
import { isValidAdmin, isValidCustomer } from "./userController.js";

export function createFeedback(req, res) {

  const feedback = req.body;
  const newFeedback = new Feedback(feedback);

  newFeedback.save().then(() => {
      res.status(200).json({
        message: "Feedback creation successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to create a feedback",
        error: err.message
      });
    });
}

export function getApprovedFeedback(req, res) {
    if(!isValidAdmin){
        return res.status(403).json({
            message : "Unathorized"
        })
    }

  Feedback.find({approved : true}).then((feedbacks) => {
      res.status(200).json(feedbacks);
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

