const texts = document.querySelector(".texts");
const btn = document.querySelector(".btn");
var synth = window.speechSynthesis;
var amISpeaking = synth.speaking;
synth.voice = "hi-IN";

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
let p = document.createElement("p");

recognition.addEventListener("result", (e) => {
    texts.appendChild(p);
    const text = Array.from(e.results).map((result) => result[0]).map((result) => result.transcript).join("");
    p.innerText = text;
    const replay = "";

    function speak(replay) {
        speechSynthesis.speak(new SpeechSynthesisUtterance(replay));
        console.log(!amISpeaking)
    }
    const finalText = text.toUpperCase();
    if (e.results[0].isFinal) {

        // the recognition AI......
        if (finalText.includes("HELLO" || "HI" || "HEY" || "HEY SPEAKBOT")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "Hi, I am a SpeakBot. How can i help you";
            speak(p.innerHTML);
            texts.appendChild(p);
        }
        if (finalText.includes("HOW ARE YOU")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "I am fine, Thankyou.";
            speak(p.innerHTML);
            texts.appendChild(p);
        }
        if (finalText.includes("WHAT'S THE WEATHER" || "WHAT'S THE WEATHER IN JAMSHEDPUR")) {
            const url = "https://api.openweathermap.org/data/2.5/weather?q=Jamshedpur&appid=5878944582ef8963d92960f95ef05d29";
            fetch(url).then(function(data) {
                return data.json();
            }).then(function(data) {
                temp = data.main.temp - 273.15;
                const text = "The weather in Jamshedpur is";
                p = document.createElement("p");
                p.classList.add("replay");
                p.innerText = text + ' ' + Math.trunc(temp) + '° celcius.';
                speak(p.innerHTML);
                texts.appendChild(p);
            }).catch(function(err) {
                console.log(err);
            });
        }
        if (finalText.includes("WHAT IS")) {
            let temp = finalText.search("WHAT IS");
            let query = finalText.substr(temp + 7, finalText.length);
            query = query.trim();

            // console.log();

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
                        // console.log(result.snippet);
                        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
                        console.log(removeTags(result.snippet));

                        function removeTags(str) {
                            if ((str === null) || (str === ''))
                                return false;
                            else {
                                str = str.toString();
                                p = document.createElement("p");
                                p.classList.add("replay");
                                p.innerText = str.replace(/(<([^>]+)>)/ig, '');
                                speak(p.innerHTML);
                                texts.appendChild(p);
                            }
                            return str.replace(/(<([^>]+)>)/ig, '');
                        }
                    } else {
                        return false;
                    }
                });
            }
            getResults(query);
        }
        if (finalText.includes("WHAT IS YOUR NAME")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "My Name is SpeakBot";
            speak(p.innerHTML);
            texts.appendChild(p);
        }
        if (finalText.includes("WHAT'S THE DATE")) {
            p = document.createElement("p");
            p.classList.add("replay");
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            p.innerText = today;
            speak(p.innerHTML);
            texts.appendChild(p);
        }
        if (finalText.includes("WHO CREATED YOU")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "Chandi Charan Mahato";
            speak(p.innerHTML);
            texts.appendChild(p);
        }

        if (finalText.includes("OPEN YOUTUBE")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "Opening Youtube..";
            texts.appendChild(p);
            speak(p.innerHTML);
            window.open("https://www.youtube.com/");
        }
        if (finalText.includes("OPEN FACEBOOK")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "Opening..";
            texts.appendChild(p);
            speak(p.innerHTML);
            window.open("https://www.facebook.com/");
        }
        if (finalText.includes("OPEN GITHUB")) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "Opening..";
            texts.appendChild(p);
            speak(p.innerHTML);
            window.open("https://www.github.com/");
        }
        p = document.createElement("p");
    }
});

// recognition.addEventListener("end", () => {
//     recognition.start();
// });