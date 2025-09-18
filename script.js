// Keys
const MOVIE_API_KEY = "2c76d304";
const WEATHER_API_KEY = "5878944582ef8963d92960f95ef05d29";
const NEWS_API_KEY = "d0e0fc7859e94dd1804fb63251aab60d";

// Speech Recognition
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

const synth = window.speechSynthesis;
let replay = "";

// Dom Elements
const chatbox = document.querySelector(".chatbox");
const animate = document.querySelectorAll(".animate");
const stopBtn = document.getElementById("stop-btn");
// phone screen
function champ() {
  document.getElementById("champ").style.display = "block";
  document.getElementById("mic-btn").style.display = "none";

  recognition.start();

  setTimeout(() => {
    document.getElementById("champ").style.display = "none";
    document.getElementById("mic-btn").style.display = "block";
  }, 3000);
}

function start_animation() {
  animate.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("animated");
    }, 300 * i + 300);
  });
}

// Helper
let currentUtterance = null;

function speak(text) {
  if (synth.speaking) {
    synth.cancel();
  }
  currentUtterance = new SpeechSynthesisUtterance(text);
  synth.speak(currentUtterance);
}

stopBtn.addEventListener("click", () => {
  if (synth.speaking) {
    synth.cancel();
    console.log("Speech stopped by user");
  }
});

// Stop speech when page refreshes/resets
window.addEventListener("beforeunload", () => {
  if (synth.speaking) {
    synth.cancel();
  }
});

// Adding text to display
function addMessageToChat(message, type = "received") {
  chatbox.innerHTML += `<div class="eachmessage ${type} animated"><p>${message}</p></div>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Open Weather
function getCurrentCity() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;

        fetch(url)
          .then((res) => res.json())
          .then((data) => resolve(data.name))
          .catch(reject);
      },
      (error) => reject(error)
    );
  });
}

// Fetch Weather by city name
async function fetchWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}`;
  const res = await fetch(url);
  return await res.json();
}

// News Api
// Fetch news articles
async function fetchNews(topic = "general") {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${topic}&pageSize=5&apiKey=${NEWS_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.articles && data.articles.length > 0) {
      data.articles.forEach((article) => {
        const newsCard = `
          <div class="news-card" style="margin:0.3rem; padding:0.3rem; border:1px solid #ccc; border-radius:6px; background:#f5f5f5;">
            <h6 style="font-size:0.7rem; margin:0;">${article.title}</h6>
            <p style="font-size:0.6rem; margin:0;">${
              article.description || ""
            }</p>
            <a href="${
              article.url
            }" target="_blank" style="font-size:0.55rem; color:#382153;">Read more</a>
          </div>
        `;
        chatbox.innerHTML += newsCard;
      });

      const speechText =
        topic === "general"
          ? "Here are the latest news headlines."
          : `Here are the latest ${topic} news headlines.`;
      speak(speechText);
    } else {
      const reply = "Sorry, no news found for that topic.";
      addMessageToChat(reply);
      speak(reply);
    }
  } catch (err) {
    console.error("News API error:", err);
    const reply = "Sorry, I couldn't fetch the news right now.";
    addMessageToChat(reply);
    speak(reply);
  }
}

// IMDB movie API
function fetchMovieDetails(query) {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(
    query
  )}&apikey=${MOVIE_API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "True") {
        const poster =
          data.Poster !== "N/A"
            ? data.Poster
            : "https://via.placeholder.com/150";
        const title = data.Title;
        const year = data.Year;
        const genre = data.Genre;
        const director = data.Director;
        const writer = data.Writer;
        const actors = data.Actors;
        const released = data.Released;
        const rating = data.imdbRating;
        const plot = data.Plot;

        // 🎬 Build card for chatbox
        const movieCard = `
                    <div class="card mb-2" style="width: 100px; height: 200px; display: flex; flex-direction: column; overflow: hidden; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
                      <img src="${poster}" class="card-img-top" alt="${title}" style="width: 100%; height: 120px; object-fit: cover; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                      <div class="card-body p-1" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <h6 class="card-title" style="font-size: 0.65rem; margin: 0; line-height: 1.1rem;">${title}</h6>
                        <p class="card-text" style="font-size: 0.55rem; margin: 0;">${year}</p>
                        <p class="card-text" style="font-size: 0.55rem; margin: 0;"><small>${genre}</small></p>
                        <p class="card-text" style="font-size: 0.6rem; margin: 0; color: #f0ad4e;">⭐ ${rating}/10</p>
                      </div>
                    </div>
                  `;

        document.querySelector(".chatbox").innerHTML += movieCard;

        // 🗣️ Speak movie details
        const speechText = `
          The movie ${title}, released in ${year}. 
          Genre: ${genre}. 
          Directed by ${director}. 
          Written by ${writer}. 
          Starring: ${actors}. 
          Released on ${released}. 
          It has an IMDb rating of ${rating} out of 10. 
          Brief plot: ${plot}.
        `;
        speak(speechText);
      } else {
        const reply = "Sorry, I couldn't find that movie.";
        addMessageToChat(reply);
        speak(reply);
      }
    })
    .catch((e) => console.error(`OMDb Error: ${e}`));
}

// Wikipedia API
function fetchWikipedia(query) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    query
  )}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Page not found");
      return res.json();
    })
    .then((data) => {
      if (data.extract) {
        addMessageToChat(data.extract);
        speak(data.extract);
      } else {
        const replay = "Sorry, I couldn't find information on that.";
        addMessageToChat(replay);
        speak(replay);
      }
    })
    .catch((e) => {
      const replay = "Sorry, I couldn't fetch Wikipedia data.";
      console.error(`Wikipedia Error: ${e}`);
      addMessageToChat(replay);
      speak(replay);
    });
}

// Triggering Speak event
recognition.addEventListener("result", (e) => {
  replay = Array.from(e.results)
    .map((result) => result[0].transcript)
    .join("");

  const finalText = replay.toUpperCase();

  if (!e.results[0].isFinal) return;

  addMessageToChat(replay, "sent");

  // Handeling different chats
  if (finalText.includes("HELLO") || finalText.includes("HI")) {
    replay = "Hi, I am SpeakBot. How can I help you?";
    addMessageToChat(replay);
    speak(replay);
  } else if (finalText.includes("HOW ARE YOU")) {
    replay = "I am fine, thank you.";
    addMessageToChat(replay);
    speak(replay);
  } else if (finalText.includes("WHAT'S THE WEATHER")) {
    getCurrentCity()
      .then((city) => fetchWeather(city))
      .then((data) => {
        const temp = Math.trunc(data.main.temp - 273.15);
        const weatherDesc = data.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        replay = `
        <div class="weather-card">
          <div class="weather-header">
            <h4>${data.name}</h4>
          </div>
          <div class="weather-body">
            <img src="${icon}" alt="${weatherDesc}" />
            <div class="weather-info">
              <p><strong>${temp}°C</strong></p>
              <p>${weatherDesc}</p>
            </div>
          </div>
        </div>
      `;

        addMessageToChat(replay, "received");
        speak(
          `The weather in ${data.name} is ${temp} degrees Celsius with ${weatherDesc}.`
        );
      })
      .catch(() => {
        replay = "Sorry, I cannot fetch the weather.";
        addMessageToChat(replay, "received");
        speak(replay);
      });
  } else if (finalText.includes("CAN YOU TELL ME THE WEATHER OF")) {
    const query = finalText
      .replace("CAN YOU TELL ME THE WEATHER OF", "")
      .trim();
    if (query) {
      fetchWeather(query)
        .then((data) => {
          const temp = Math.trunc(data.main.temp - 273.15);
          replay = `The weather in ${query} is ${temp}° Celsius.`;
          addMessageToChat(replay);
          speak(replay);
        })
        .catch(() => {
          replay = "Sorry, I cannot find that city.";
          addMessageToChat(replay);
          speak(replay);
        });
    } else {
      replay = "Please tell me the city name.";
      addMessageToChat(replay);
      speak(replay);
    }
  } else if (finalText.includes("TELL ME ABOUT")) {
    const query = finalText.replace("TELL ME ABOUT", "").trim();
    if (query) fetchWikipedia(query);
  } else if (finalText.includes("FIND A MOVIE NAME")) {
    const movieName = finalText.replace("FIND A MOVIE NAME", "").trim();
    if (movieName) {
      fetchMovieDetails(movieName);
    } else {
      replay = "Please tell me which movie to find.";
      addMessageToChat(replay);
      speak(replay);
    }
  } else if (
    finalText.includes("WHAT'S YOUR NAME") ||
    finalText.includes("WHO ARE YOU")
  ) {
    replay = "My name is SpeakBot.";
    addMessageToChat(replay);
    speak(replay);
  } else if (finalText.includes("NEWS")) {
    let topic = finalText.replace("NEWS", "").trim().toLowerCase();
    if (!topic) topic = "general"; // default category
    fetchNews(topic);
  } else if (finalText.includes("WHO CREATED YOU")) {
    replay = "I was created by Chandi Charan Mahato.";
    addMessageToChat(replay);
    speak(replay);
  } else if (finalText.includes("WHAT'S THE DATE")) {
    const today = new Date();
    replay = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;
    addMessageToChat(replay);
    speak(replay);
  } else if (finalText.includes("OPEN")) {
    const query = finalText.replace("OPEN", "").trim();
    replay = `Opening ${query}...`;
    addMessageToChat(replay);
    speak(replay);
    window.open(`https://www.${query}.com/`);
  } else if (finalText.includes("REFRESH")) {
    replay = "Refreshing now.";
    addMessageToChat(replay);
    speak(replay);
    location.reload();
  } else if (finalText.includes("THANK YOU")) {
    replay = "It's my pleasure to help you 😊.";
    addMessageToChat(replay);
    speak(replay);
  } else {
    replay = "Sorry, I can't help with that.";
    addMessageToChat(replay);
    speak(replay);
  }
});
