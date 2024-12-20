import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const allowedOrigins = [
  "https://chill-guy-roast.vercel.app",
  "https://chillguy.ramx.in"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
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

    const prompt = `Roast a GitHub user named ${
      profileData.name || username
    } in the most savage and funny way you can. They’ve got ${
      profileData.public_repos
    } repos, ${profileData.followers} followers, ${
      profileData.following
    } following. Their bio says "${
      profileData.bio || "They have No Bio"
    }". Oh, and their account was created on ${
      profileData.created_at
    }. Make it brutally honest, sarcastic, and hilarious! also use simple english words. keep it 3-5 lines.`;

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
