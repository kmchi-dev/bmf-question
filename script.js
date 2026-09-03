/*screen nav*/

const screens = {
opening: document.getElementById("opening-screen"),
letter: document.getElementById("letter-screen"),
music: document.getElementById("music-screen"),
question: document.getElementById("question-screen"),
yes: document.getElementById("yes-screen"),
confirmed: document.getElementById("confirmed-screen"),
final: document.getElementById("final-screen"),
no: document.getElementById("no-screen")
};

/*scrn change*/

function showScreen(screen) {

    Object.values(screens).forEach(section => {
        section.classList.remove("active");
    });

    screen.classList.add("active");

    /* Reset letter animation */
    if (screen === screens.letter) {

        screen.classList.remove("letter-screen-open");

        setTimeout(() => {
            screen.classList.add("letter-screen-open");
        }, 300);

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/*open btn func*/

const openButton = document.getElementById("open-button");

openButton.addEventListener("click", () => {

showScreen(screens.letter);

});

/* letter 2 musci transition*/

const letterNextButton =
document.getElementById("letter-next-button");

letterNextButton.addEventListener("click", () => {

showScreen(screens.music);

});

/* music 2 question transition */

const musicNextButton =
    document.getElementById("music-next-button");

musicNextButton.addEventListener("click", () => {

    showScreen(screens.question);

});

/*yes btn*/

const yesButton =
document.getElementById("yes-button");

yesButton.addEventListener("click", () => {

showScreen(screens.yes);

});

/*no btn */

const noButton =
document.getElementById("no-button");

let noCount = 0;

noButton.addEventListener("click", () => {

    noCount++;

    /* Make YES bigger */
    const scale = Math.min(1 + noCount * 0.15, 3);

    yesButton.style.transform =
        `scale(${scale})`;

    /* Change NO text */
    const messages = [
        "u sure?",
        "rlly? :[",
        "mayb think abt it for a sec :p",
        "pls?",
        "wb try the other one?",
        "cmonn libre ko :>",
        "libre ko legit langg",
        "plesssssss"
    ];

    /*keeping it going*/
    if (noCount <= messages.length) {

        noButton.textContent =
            messages[noCount - 1];

        return;
    }

    /*actual no funct*/

    showScreen(screens.no);

});

/* date n time select */

const datePicker =
document.getElementById("date-picker");

const timePicker =
document.getElementById("time-picker");

const confirmDateButton =
document.getElementById("confirm-date-button");

const dateError =
document.getElementById("date-error");

const confirmedDateText =
document.getElementById("confirmed-date-text");

const confirmedTimeText =
document.getElementById("confirmed-time-text");

const confirmedEventText =
document.getElementById("confirmed-event-text");


const eventPicker =
    document.getElementById("event-picker");

const customEventContainer =
    document.getElementById("custom-event-container");

const customEvent =
    document.getElementById("custom-event");

/* suggestion */

eventPicker.addEventListener("change", () => {

    if (eventPicker.value === "Something else") {

        customEventContainer.style.display = "flex";

        customEvent.focus();

    } else {

        customEventContainer.style.display = "none";

        customEvent.value = "";

    }

});    
/* prevent repeating n past dates*/

const today = new Date();

const year =
today.getFullYear();

const month =
String(today.getMonth() + 1)
.padStart(2, "0");

const day =
String(today.getDate())
.padStart(2, "0");

const todayString =
`${year}-${month}-${day}`;

datePicker.min =
todayString;

/*confirm*/


confirmDateButton.addEventListener("click", () => {

    const selectedDate = datePicker.value;
    const selectedTime = timePicker.value;
    const selectedEvent = eventPicker.value;

    /* Make sure both were selected */
    if (!selectedDate || !selectedTime || !selectedEvent) {

    dateError.textContent =
        "Pick a date, time, and activity first :p";

    return;
}

let finalEvent = selectedEvent;

if (selectedEvent === "Something else") {

    if (!customEvent.value.trim()) {

        dateError.textContent =
            "Tell me what you'd like to do first ";

        customEvent.focus();

        return;
    }

    finalEvent =
        customEvent.value.trim();
}

    /* Clear error */
    dateError.textContent = "";

    /* Format date */
    const dateObject =
        new Date(selectedDate + "T00:00:00");

    const formattedDate =
        dateObject.toLocaleDateString(
            undefined,
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );

    /* Format time */
    const [hours, minutes] =
        selectedTime.split(":");

    let hour = Number(hours);

    const ampm = hour >= 12 ? "PM" : "AM";=

    hour = hour % 12 || 12;
                hour: "numeric",
                minute: "2-digit"
    const formattedTime =
    `${hour}:${minutes} ${ampm}`;

    /* Put selections on confirmation screen */
    confirmedDateText.textContent =
        formattedDate;

    confirmedTimeText.textContent =
        formattedTime;

    confirmedEventText.textContent =
    ":]" + finalEvent;    

    /* Show confirmation screen */
    showScreen(screens.confirmed);
});

/* confirm 2 final */

const confirmedNextButton =
    document.getElementById("confirmed-next-button");

confirmedNextButton.addEventListener("click", () => {

    showScreen(screens.final);

});
