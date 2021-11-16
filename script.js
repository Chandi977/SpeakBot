const animate = document.querySelectorAll(".animate");
const chatbox = document.querySelector(".chatbox");
const mic = document.getElementById("#mic-btn");

const synth = window.speechSynthesis;
const amISpeaking = synth.speaking;
synth.voice = "hi-IN";
let replay = "";
const api_key = '5878944582ef8963d92960f95ef05d29';

// require('dotenv').config();
// console.log(process.env);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

function speak(replay) {
    speechSynthesis.speak(new SpeechSynthesisUtterance(replay));
    console.log(!amISpeaking)
}
// replay = "Hi, I am a SpeakBot. How can i help you";
// chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
// chatbox.scrollTop = chatbox.scrollHeight;
// speak(replay);

recognition.addEventListener("result", (e) => {
    replay = Array.from(e.results).map((result) => result[0]).map((result) => result.transcript).join("");
    // chatbox.innerHTML += '<div class="eachmessage sent animated"><p>' + replay + '</p></div>';


    const finalText = replay.toUpperCase();
    if (e.results[0].isFinal) {
        chatbox.innerHTML += '<div class="eachmessage sent animated"><p>' + replay + '</p></div>';
        // the recognition AI......
        if (finalText.includes("HELLO" || "HI" || "HEY" || "HEY SPEAKBOT")) {
            replay = "Hi, I am a SpeakBot. How can i help you";
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        } else if (finalText.includes("HOW ARE YOU")) {
            replay = "I am fine, Thankyou.";
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        } else if (finalText.includes("WHAT'S THE WEATHER" || "WHAT'S THE WEATHER IN JAMSHEDPUR" || "WEATHER")) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=Jamshedpur&appid=${api_key}`;
            fetch(url).then(function(data) {
                return data.json();
            }).then(function(data) {
                temp = data.main.temp - 273.15;
                const text = "The weather in Jamshedpur is";
                replay = text + ' ' + Math.trunc(temp) + '° celcius.';
                chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p> </div>';
                chatbox.scrollTop = chatbox.scrollHeight;
                speak(replay);
            }).catch(function(err) {
                console.log(err);
                replay = "Sorry I cannot find The city.";
                chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p> </div>';
                chatbox.scrollTop = chatbox.scrollHeight;
                speak(replay);
            });
        } else if (finalText.includes("CAN YOU TELL ME THE WEATHER OF")) {
            let temp = finalText.search("TELL ME ABOUT");
            let query = finalText.substr(temp + 31, finalText.length);
            query = query.trim();
            console.log(query);
            if (query != "") {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api_key}`;
                fetch(url).then(function(data) {
                    return data.json();
                }).then(function(data) {
                    temp = data.main.temp - 273.15;
                    const text = "The weather in " + query + " is";
                    replay = text + ' ' + Math.trunc(temp) + '° celcius.';
                    chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p> </div>';
                    chatbox.scrollTop = chatbox.scrollHeight;
                    speak(replay);
                }).catch(function(err) {
                    // console.log(err);
                    replay = "Sorry I cannot find The city.";
                    chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p> </div>';
                    chatbox.scrollTop = chatbox.scrollHeight;
                    speak(replay);
                });
            } else {
                replay = "Please tell me the city name.";
                chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
                chatbox.scrollTop = chatbox.scrollHeight;
                speak(replay);
            }

        } else if (finalText.includes("THANK YOU")) {
            replay = "It's my pleasure to help you.";
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '&#x1F60A;</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        } else if (finalText.includes(("WHAT WILL YOU DO FOR ME") || "WHAT CAN YOU DO FOR ME")) {
            replay = "I can run applications, search any text in wikipedia, can give weather update etc.";
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        } else if (finalText.includes("NICE TO MEET YOU")) {
            replay = "NICE TO MEET YOU TO.";
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        } else if (finalText.includes("NICE")) {
            replay = "Nice to";
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>&#128519;Nice to.</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        } else if (finalText.includes("TELL ME ABOUT")) {
            let temp = finalText.search("TELL ME ABOUT");
            let query = finalText.substr(temp + 13, finalText.length);
            query = query.trim();

            function getResults(query) {
                const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&srlimit=25&utf8=&format=json&srsearch=${query}`;
                fetch(url)
                    .then((res) => res.json())
                    .then((data) => {
                        putResults(data.query.search);
                    })
                    .catch((e) => console.log(`ERROR : ${e}`));
            }

            function putResults(sResults) {
                let count = 0;
                sResults.forEach((result) => {
                    count += 1;
                    if (count == 1) {
                        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
                        console.log(removeTags(result.snippet));

                        function removeTags(str) {
                            if ((str === null) || (str === ''))
                                return false;
                            else {
                                str = str.toString();
                                replay = str.replace(/(<([^>]+)>)/ig, '');
                                chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
                                chatbox.scrollTop = chatbox.scrollHeight
                                speak(replay);
                            }
                            return str.replace(/(<([^>]+)>)/ig, '');
                        }
                    } else {
                        return false;
                    }
                });
            }
            getResults(query);
        } else if (finalText.includes("WHAT'S YOUR NAME" || "WHO ARE YOU")) {
            replay = "My Name is SpeakBot";
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        } else if (finalText.includes("ADD")) {
            let temp = finalText.search("ADD");
            let query = finalText.substr(temp + 3, finalText.length);
            query = query.trim();
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        } else if (finalText.includes("WHAT'S THE DATE")) {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            replay = today;
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        } else if (finalText.includes("WHO CREATED YOU")) {
            replay = "Chandi Charan Mahato";
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        } else if (finalText.includes("OPEN")) {
            let temp = finalText.search("OPEN");
            let query = finalText.substr(temp + 4, finalText.length);
            query = query.trim();
            replay = `Opening ${query}..`;
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
            window.open(`https://www.${query}.com/`);
        } else if (finalText.includes("OK")) {
            replay = "OK";
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        } else if (finalText.includes("REFRESH")) {
            replay = "OK refreshing";
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
            location.reload();
        } else {
            console.log(finalText);
            replay = "Sorry I can't help.";
            chatbox.innerHTML += '<div class="eachmessage received animated"><p>' + replay + '</p></div>';
            chatbox.scrollTop = chatbox.scrollHeight;
            speak(replay);
        }
        p = document.createElement("p");
    }
});

function start_animation() {
    for (let i = 0; i < animate.length; i++) {
        setTimeout(function() {
            animate[i].classList.add("animated");
        }, 300 * i + 300);
    }
}

// https://www.google.com/search?q=who+is+the+prime+minister+of+india&rlz=1C1UEAD_enIN971IN971&sxsrf=AOaemvI4v5MP8xENaQFFNxmqkFe1ltIKtA%3A1637087940432&ei=xPqTYcvoGc_rwQOs1JTADQ&oq=who+is+the+prime&gs_lcp=Cgdnd3Mtd2l6EAEYADIICAAQgAQQsQMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BwgjEOoCECc6DAgjECcQnQIQRhCAAjoECCMQJzoFCAAQkQI6BwgAELEDEEM6BAgAEEM6DQgAEIAEELEDEEYQ-wFKBAhBGABQ5hpY2z1g1FBoAXACeACAAa0DiAGxFZIBCjAuMTQuMS4wLjGYAQCgAQGwAQrAAQE&sclient=gws-wiz