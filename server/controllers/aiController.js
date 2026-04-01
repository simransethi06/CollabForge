import { askAI } from "../services/aiService.js";

// @desc    Ask AI about code
// @route   POST /api/ai/ask
// @access  Private
export const ask = async (req, res, next) => {
  try {
    const { code, language, prompt } = req.body;

    if (!prompt) {
      res.status(400);
      return next(new Error("Prompt is required"));
    }

    const result = await askAI(
      code || "// no code provided",
      language || "javascript",
      prompt
    );

    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
};