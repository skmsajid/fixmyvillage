import Feedback from "../models/Feedback.js";

// @route   POST /api/feedbacks
// @desc    Submit a new feedback
// @access  Public (or protected based on integration, using public for simple use-case)
export const submitFeedback = async (req, res) => {
  try {
    const { userName, rating, category, message, date, time } = req.body;

    if (!userName || !rating || !category || !date || !time) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newFeedback = new Feedback({
      userName,
      rating,
      category,
      message,
      date,
      time,
    });

    await newFeedback.save();
    res.status(201).json({ success: true, data: newFeedback });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @route   GET /api/feedbacks
// @desc    Get all feedbacks
// @access  Admin
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @route   DELETE /api/feedbacks/:id
// @desc    Delete a feedback
// @access  Admin
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }

    await feedback.deleteOne();
    res.status(200).json({ success: true, message: "Feedback removed" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
