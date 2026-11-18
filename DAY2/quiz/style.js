// Questions

let questions = [
    {
        question: "Which language is used to create a webpage?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: "HTML"
    },

    {
        question: "Which language is used to style a webpage?",
        options: ["HTML", "CSS", "Java", "Python"],
        answer: "CSS"
    },

    {
        question: "Which language makes a webpage interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "Which HTML tag is used to insert an image?",
        options: ["<img>", "<image>", "<pic>", "<src>"],
        answer: "<img>"
    },

    {
        question: "Which symbol is used for ID in CSS?",
        options: [".", "#", "*", "&"],
        answer: "#"
    }
];
// Variables
let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
// Start Quiz
document.getElementById("studentForm").onsubmit = function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let studentClass = document.getElementById("class").value;
    let rollno = document.getElementById("rollno").value;
    let sec = document.getElementById("sec").value;
    // Show student details
    document.getElementById("studentName").innerHTML =
        "Name: " + name;
    document.getElementById("studentClass").innerHTML =
        "Class: " + studentClass;
    document.getElementById("studentRoll").innerHTML =
        "Roll No: " + rollno;
    document.getElementById("studentSec").innerHTML =
        "Sec: " + sec;
    // Hide details page
    document.getElementById("detailsPage").style.display =
        "none";
    // Show quiz page
    document.getElementById("quizPage").style.display =
        "block";
    // Show first question

    showQuestion();
};


// Show Question

function showQuestion() {

    let question = questions[currentQuestion];

    selectedAnswer = "";


    // Question number

    document.getElementById("questionNumber").innerHTML =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;


    // Show question

    document.getElementById("question").innerHTML =
        question.question;


    // Remove old options

    document.getElementById("options").innerHTML = "";


    // Create options

    for (let i = 0; i < question.options.length; i++) {

        let option = document.createElement("div");

        option.className = "option";


        // textContent is used so <img> appears as text

        option.textContent = question.options[i];


        // Option click

        option.onclick = function() {

            // Stop selecting again

            if (selectedAnswer != "") {
                return;
            }


            // Store selected answer

            selectedAnswer = question.options[i];


            // Get all options

            let allOptions =
                document.getElementsByClassName("option");


            // Make all options RED

            for (let j = 0; j < allOptions.length; j++) {

                allOptions[j].style.backgroundColor = "red";

                allOptions[j].style.color = "white";

                allOptions[j].style.border =
                    "2px solid #ddd";

                allOptions[j].style.transform =
                    "scale(1)";
            }


            // Make correct option GREEN

            for (let j = 0; j < allOptions.length; j++) {

                if (
                    allOptions[j].textContent ==
                    question.answer
                ) {

                    allOptions[j].style.backgroundColor =
                        "green";

                    allOptions[j].style.color =
                        "white";
                }
            }


            // Highlight the selected option

            option.style.border =
                "4px solid #333";

            option.style.transform =
                "scale(1.02)";


            // Increase score if correct

            if (selectedAnswer == question.answer) {

                score++;
            }
        };


        // Add option to webpage

        document.getElementById("options")
            .appendChild(option);
    }


    // Change button text

    if (currentQuestion == questions.length - 1) {

        document.getElementById("nextBtn").innerHTML =
            "Submit Quiz";

    } else {

        document.getElementById("nextBtn").innerHTML =
            "Next Question";
    }
};


// Next Question

document.getElementById("nextBtn").onclick = function() {

    // Check if answer is selected

    if (selectedAnswer == "") {

        alert("Please select an answer");

        return;
    }


    // Move to next question

    currentQuestion++;


    // Check if questions are left

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
};


// Show Result

function showResult() {

    // Hide quiz page

    document.getElementById("quizPage").style.display =
        "none";


    // Show result page

    document.getElementById("resultPage").style.display =
        "block";


    // Result message

    document.getElementById("resultMessage").innerHTML =
        "Well Done!";


    // Show score

    document.getElementById("score").innerHTML =
        "Your Score: " +
        score +
        " / " +
        questions.length;
}