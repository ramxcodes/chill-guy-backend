import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(
  cors({
    origin: "https://chill-guy-roast.vercel.app/"
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/roast/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const githubResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const profileData = githubResponse.data;

    if (!profileData)
      return res.status(404).json({ error: "GitHub user not found" });

    const prompt = `Tell me a brutal roast in simple english don't make sure its very brutal and don't tone down the language about a GitHub user named ${
      profileData.name || username
    } who has ${profileData.public_repos} repositories, ${
      profileData.followers
    } followers, and their bio is ${
      profileData.bio || "Don't have a bio"
    }. Make it funny and creative!`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    if (result && result.response.text()) {
      const roast = result.response.text();
      res.json({ roast });
    } else {
      res
        .status(500)
        .json({ error: "Failed to generate a roast from Gemini AI" });
    }
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ error: "Failed to fetch data or generate roast" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
