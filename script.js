const api_key2 = "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";

function champ() {
  document.getElementById("champ").style.display = "block";
  document.getElementById("mic-btn").style.display = "none";
  recognition.start();
  setTimeout(function () {
    document.getElementById("champ").style.display = "none";
    document.getElementById("mic-btn").style.display = "block";
  }, 3000);
}

const animate = document.querySelectorAll(".animate");
const chatbox = document.querySelector(".chatbox");
const synth = window.speechSynthesis;
const amISpeaking = synth.speaking;
synth.voice = "hi-IN";
let replay = "";
const api_key = "5878944582ef8963d92960f95ef05d29";

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

function speak(replay) {
  speechSynthesis.speak(new SpeechSynthesisUtterance(replay));
  console.log(!amISpeaking);
}
recognition.addEventListener("result", (e) => {
  let p = document.getElementById("p");
  replay = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  const finalText = replay.toUpperCase();

  if (e.results[0].isFinal) {
    if (finalText.includes("HELLO" || "HI" || "HEY" || "HEY SPEAKBOT")) {
      replay = "Hi, I am a SpeakBot. How can I help you?";
      addMessageToChat(replay, "received");
      speak(replay);
    } else if (finalText.includes("HOW ARE YOU")) {
      replay = "I am fine, Thank you.";
      addMessageToChat(replay, "received");
      speak(replay);
    } else if (finalText.includes("WHAT'S THE WEATHER")) {
      getCurrentCity()
        .then((cityName) => {
          console.log("Current City:", cityName);
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;

          fetch(url)
            .then(function (data) {
              return data.json();
            })
            .then(function (data) {
              const temp = data.main.temp - 273.15;
              const text = `The weather in ${cityName} is`;
              replay = `${text} ${Math.trunc(temp)}° Celsius.`;
              addMessageToChat(replay, "received");
              speak(replay);
            })
            .catch(function (err) {
              console.error(err);
              replay = "Sorry, I cannot find the city.";
              addMessageToChat(replay, "received");
              speak(replay);
            });
        })
        .catch((error) => {
          console.error("Error getting current city:", error);
          replay = "Sorry, I cannot determine the current city.";
          addMessageToChat(replay, "received");
          speak(replay);
        });
    } else if (finalText.includes("CAN YOU TELL ME THE WEATHER OF")) {
      let temp = finalText.search("TELL ME ABOUT");
      let query = finalText.substr(temp + 31, finalText.length);
      query = query.trim();

      if (query != "") {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api_key}`;
        fetch(url)
          .then(function (data) {
            return data.json();
          })
          .then(function (data) {
            temp = data.main.temp - 273.15;
            const text = "The weather in " + query + " is";
            replay = `${text} ${Math.trunc(temp)}° Celsius.`;
            addMessageToChat(replay, "received");
            speak(replay);
          })
          .catch(function (err) {
            replay = "Sorry, I cannot find the city.";
            addMessageToChat(replay, "received");
            speak(replay);
          });
      } else {
        replay = "Please tell me the city name.";
        addMessageToChat(replay, "received");
        speak(replay);
      }
    } else if (finalText.includes("THANK YOU")) {
      replay = "It's my pleasure to help you.";
      addMessageToChat(replay, "received");
      speak(replay);
    } else if (
      finalText.includes("WHAT WILL YOU DO FOR ME" || "WHAT CAN YOU DO FOR ME")
    ) {
      replay =
        "I can run applications, search any text in Wikipedia, and provide weather updates, etc.";
      addMessageToChat(replay, "received");
      speak(replay);
    } else if (finalText.includes("NICE TO MEET YOU")) {
      replay = "Nice to meet you too.";
      addMessageToChat(replay, "received");
      speak(replay);
    } else if (finalText.includes("NICE")) {
      replay = "Nice to";
      addMessageToChat(replay, "received");
      speak(replay);
    } else if (finalText.includes("TELL ME ABOUT")) {
      let temp = finalText.search("TELL ME ABOUT");
      let query = finalText.substr(temp + 13, finalText.length);
      query = query.trim();

      generateResponse(messageElement.querySelector("p"), query); // Call generateResponse with appropriate messageElement
    } else if (finalText.includes("WHAT'S YOUR NAME" || "WHO ARE YOU")) {
      replay = "My name is SpeakBot.";
      addMessageToChat(replay, "received");
      speak(replay);
    } else if (finalText.includes("ADD")) {
      let temp = finalText.search("ADD");
      let query = finalText.substr(temp + 3, finalText.length);
      query = query.trim();

      addMessageToChat(replay, "received");
      speak(replay);
    } else if (finalText.includes("WHAT'S THE DATE")) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      today = mm + "/" + dd + "/";
      replay = today;
      addMessageToChat(replay, "received");
      speak(replay);
    } else if (finalText.includes("WHO CREATED YOU")) {
      replay = "Chandi Charan Mahato";
      addMessageToChat(replay, "received");
      speak(replay);
    } else if (finalText.includes("OPEN")) {
      let temp = finalText.search("OPEN");
      let query = finalText.substr(temp + 4, finalText.length);
      query = query.trim();
      replay = `Opening ${query}..`;
      addMessageToChat(replay, "received");
      speak(replay);
      console.log(query);
      window.open(`https://www.${query}.com/`);
    } else if (finalText.includes("OK")) {
      replay = "OK";
      addMessageToChat(replay, "received");
      speak(replay);
    } else if (finalText.includes("REFRESH")) {
      replay = "OK refreshing";
      addMessageToChat(replay, "received");
      speak(replay);
      location.reload();
    } else {
      console.log(finalText);
      replay = "Searching on Google.";
      addMessageToChat(replay, "received");
      speak(replay);
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        finalText
      )}`;
      window.open(searchUrl, "_blank");
      // location.reload();
      // replay = "Sorry I can't UnderStand";
      // replay = generateResponse(p, finalText);
      // addMessageToChat(replay, "received");
      // speak(replay);
    }
  }
});

// function generateResponse(messageElement, userMessage) {
//   const API_URL = "https://api.openai.com/v1/chat/completions";
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${api_key2}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "user",
//           content: userMessage,
//         },
//       ],
//     }),
//   };

//   fetch(API_URL, requestOptions)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return res.json();
//     })
//     .then((data) => {
//       messageElement.textContent = data.choices[0].message.content;
//       speak(data.choices[0].message.content);
//     })
//     .catch((error) => {
//       messageElement.classList.add("error");
//       messageElement.textContent =
//         "Oops! Something went wrong. Please try again!";
//     })
//     .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
// }

function getCurrentCity() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;

          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              const cityName = data.name;
              resolve(cityName);
            })
            .catch((error) => {
              reject(error);
            });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

function addMessageToChat(message, role) {
  const div = document.createElement("div");
  div.classList.add("eachmessage", role, "animated");
  div.innerHTML = "<p>" + message + "</p>";
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}
