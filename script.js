//submit event listener for question-form
document.getElementById('question-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    generateQuestionPaper();
}); 

document.getElementById('num-questions').addEventListener('change', function() {
    const questionCount = parseInt(this.value);
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = ''; // Clear existing questions
    for (let i = 1; i <= questionCount; i++) {
        addQuestion(i);
    }
});


// Function to add new questions to the questions-container based on questioncount
function addQuestion(questionNumber) {
    const questionsContainer = document.getElementById('questions-container');
    const questionInput = document.createElement('div'); // Create a new div element
    questionInput.className = 'question-input'; //creates class for div element
    // Add the question input HTML to the new div element
    questionInput.innerHTML = `
        <label for="question-${questionNumber}">Question ${questionNumber}:</label>
        <input type="text" id="question-${questionNumber}" name="question-${questionNumber}">
    `;
    questionsContainer.appendChild(questionInput);// Append the new div element to the questions-container
}

// Automatically add five questions on page load
window.onload = function() {
    const initialQuestionCount = parseInt(document.getElementById('num-questions').value);
    for (let i = 1; i <= initialQuestionCount; i++) {
        addQuestion(i);
    }
};

//To generate question papaer based on the questions entered by the user
function generateQuestionPaper() {
    const questions = [];
    const questionCount = parseInt(document.getElementById('num-questions').value);

    let filled = true;

    // Check if all the questions are filled
    for (let i = 1; i <= questionCount; i++) {
        const questionText = document.getElementById(`question-${i}`).value; //retrieves the value of the input field
        if (questionText) {
            questions.push(`${i}. ${questionText}`); //pushes the question to the questions array
        }
        else{
            filled = false;
        }
    }

    if(!filled){
        alert(`Please enter all ${questionCount} questions`); //alert message if all questions are not filled
        return;
    }

    // Construct the URL with query parameters
    const queryString = questions.map((question, index) => `q${index + 1}=${encodeURIComponent(question)}`).join('&');
    const url = `display.html?${queryString}`;

    // Resulting queryString: "q1=What%20is%20HTML%3F&q2=Explain%20CSS.&q3=How%20does%20JavaScript%20work%3F"
    // url Output: "display.html?q1=What%20is%20HTML%3F&q2=Explain%20CSS.&q3=How%20does%20JavaScript%20work%3F"

    // Redirect to the new page to the generated URL
    window.location.href = url;
}
