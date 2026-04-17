const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
require('./database'); // MongoDB connection
const CodeReview = require('./models/CodeReview');
const reviewRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// POST /review-code
app.post('/review-code', async (req, res) => {
  const { code } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Review this code:\n\n${code}\n\nIdentify bugs, suggest improvements, and refactoring tips.`,
      max_tokens: 150,
    });

    // Save to database
    const aiResponse = response.data.choices[0].text;
    const codeReview = new CodeReview({ code, response: aiResponse });
    await codeReview.save();

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to review code', details: error.message });
  }
});

// Use reviews route
app.use('/reviews', reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});