# Chill Guy Backend

Welcome to the backend of the Chill Guy Roast app! 
This is an Express-based server that interacts with GitHub's public API and uses Google's Gemini AI to generate custom roasts for GitHub users based on their profile data. The roast is generated using AI-powered content, making it humorous and creative.

## Features

- **Fetch GitHub Profile Data**: Retrieve basic user information such as public repositories, followers, and bio from GitHub.
- **Generate Brutal Roasts**: Uses Google's Gemini AI to generate a personalized, brutal roast based on the retrieved GitHub profile.
- **CORS Support**: The server allows requests from the front-end hosted at `https://chill-guy-roast.vercel.app`.

## Tech Stack

- **Express**: The server is built with Express, a minimal and flexible Node.js web application framework.
- **Axios**: Axios is used to make HTTP requests to the GitHub API to retrieve user profile information.
- **Google Gemini API**: The Google Generative AI (Gemini API) is used to generate the personalized roast.
- **dotenv**: Environment variables are managed with the `dotenv` package.
- **CORS**: Cross-Origin Resource Sharing (CORS) is enabled for the Chill Guy Roast frontend hosted on Vercel.

## API Endpoints

### `GET /`

- **Description**: A basic endpoint to check if the server is running.
- **Response**: A simple "Hello World" message.

### `GET /roast/:username`

- **Description**: This endpoint takes a GitHub username as a parameter and generates a custom roast based on their public GitHub profile information.
- **Parameters**:
  - `username`: GitHub username to fetch profile information.
- **Response**: A JSON object with the generated roast.
  - **Example**:
    ```json
    {
      "roast": "Your GitHub profile is as empty as your promise to write clean code."
    }
    ```

- **Error Responses**:
  - **404**: If the GitHub user does not exist.
  - **500**: If there is an error in fetching GitHub data or generating the roast.


## API Key

To interact with Google's Gemini AI, you'll need an API key from Google. You can sign up and get the key from the [Google Cloud Console](https://console.cloud.google.com/).

### CORS Configuration

The server is configured to allow requests only from the Chill Guy Roast frontend app hosted on Vercel. The origin is set to:
```js
"origin": "https://chill-guy-roast.vercel.app"
```
This means that only the official front-end application can make requests to this server.

## Error Handling

The API has basic error handling for issues such as:
- Invalid GitHub username
- Failure in retrieving data from GitHub's API
- Issues with generating the roast from Gemini AI

If something goes wrong, the server will respond with an appropriate error message.
Enjoy roasting GitHub users with Chill Guy!