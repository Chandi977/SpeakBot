# SpeakBot - Voice-Enabled Chat Assistant

SpeakBot is a web-based voice assistant that allows users to interact via speech commands. It can provide weather updates, news headlines, movie details, Wikipedia summaries, and more.

[Live Demo](https://chandi977.github.io/SpeakBot/index.html)

---

## Features

- **Voice Interaction**: Uses the Web Speech API for speech recognition and speech synthesis.
- **Weather Updates**: Fetches current weather using OpenWeather API for your city or any specified city.
- **News Headlines**: Retrieves top news using NewsAPI.
- **Movie Information**: Fetches movie details from OMDb API.
- **Wikipedia Summaries**: Provides summaries of any topic from Wikipedia.
- **Web Control**: Open websites and refresh the page using voice commands.
- **Friendly Responses**: Basic conversation handling (greetings, name, creator, date, thank you).

---

## APIs Used

- **OpenWeather API**: For weather data.
- **NewsAPI**: For fetching news articles.
- **OMDb API**: For fetching movie information.
- **Wikipedia REST API**: For topic summaries.

---

## Usage

1. Open the project in a web browser that supports the Web Speech API.
2. Click the microphone button to start voice recognition.
3. Speak one of the supported commands:

### Supported Commands

| Command                                 | Description                               |
| --------------------------------------- | ----------------------------------------- |
| "Hello" / "Hi"                          | Greets the user.                          |
| "How are you"                           | Asks SpeakBot's status.                   |
| "What's the weather"                    | Fetches weather for current location.     |
| "Can you tell me the weather of [City]" | Fetches weather for a specific city.      |
| "Tell me about [Topic]"                 | Provides Wikipedia summary for the topic. |
| "Find a movie name [Movie]"             | Fetches movie details from OMDb.          |
| "News [Topic]"                          | Fetches latest news (default: general).   |
| "What's your name" / "Who are you"      | SpeakBot introduces itself.               |
| "Who created you"                       | Information about the creator.            |
| "What's the date"                       | Provides the current date.                |
| "Open [Website]"                        | Opens a website in a new tab.             |
| "Refresh"                               | Reloads the page.                         |
| "Thank you"                             | Responds politely.                        |

---

## How It Works

- **Speech Recognition**: Uses `SpeechRecognition` for capturing user speech.
- **Speech Synthesis**: Uses `speechSynthesis` to respond verbally.
- **Fetch API**: Requests data from external APIs (weather, news, movies, Wikipedia).
- **Dynamic Chatbox**: Displays messages and API responses dynamically.
- **Error Handling**: Handles invalid inputs and API errors gracefully.

---

## File Structure

- `script.js` - Main logic for voice recognition, command handling, API requests, and chat UI updates.

---

## Dependencies

- Modern web browser with Web Speech API support.
- Internet connection to access APIs.

---

## Author

Chandi Charan Mahato
