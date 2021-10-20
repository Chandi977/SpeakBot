const texts = document.querySelector(".texts");
const btn = document.querySelector(".btn");
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var synth = window.speechSynthesis;
var amISpeaking = synth.speaking;
synth.voice = "hi-IN";

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
        if (finalText.includes("HELLO")) {
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