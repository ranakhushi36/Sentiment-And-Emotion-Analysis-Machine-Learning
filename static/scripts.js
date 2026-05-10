document.addEventListener("DOMContentLoaded", function () {
    // Element Selectors
    const elements = {
        submitButton: document.getElementById("submit-feedback"),
        startRecordingButton: document.getElementById("start-recording"),
        resultElement: document.getElementById("result"),
        resultContainer: document.getElementById("result-container"),
        graphsContainer: document.getElementById("graphs-container"),
        translatedFeedbackElement: document.getElementById("translated-feedback"),
        textareaElement: document.getElementById("feedback"),
        dropdownButton: document.querySelector(".dropdown-button"),
        dropdownContainer: document.querySelector(".dropdown-container"),
        languageLinks: document.querySelectorAll(".language-grid a"),
        searchBar: document.querySelector(".search-bar"),
        speakerTextareaButton: document.getElementById("speaker-textarea"), 
        speakerFeedbackButton: document.getElementById("speaker-feedback"),   
        copyFeedbackButton: document.getElementById("copy-textarea"),        
        copyTranslatedFeedbackButton: document.getElementById("copy-feedback") 
    };

    let selectedLanguage = "en";

    // Web Speech API for voice input
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
        elements.textareaElement.value = event.results[0][0].transcript;
    };
    recognition.onerror = (event) => alert("Speech recognition error: " + event.error);




    // Event Listeners
    elements.startRecordingButton.addEventListener("click", () => recognition.start());

    elements.submitButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const feedback = elements.textareaElement.value.trim();

        if (!feedback) return alert("Please enter feedback.");

        try {
            // Translate feedback if necessary
            const translatedFeedback = selectedLanguage !== "en" ? await translateText(feedback) : feedback;

            // Analyze feedback
            const analysisData = await analyzeFeedback(feedback);
            displayAnalysisResults(analysisData, translatedFeedback);
            generateCharts(analysisData.probabilities);

        } catch (error) {
            console.error("Error during submit:", error);
            alert("An error occurred while processing your feedback.");
        }
    });

    elements.languageLinks.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            selectedLanguage = item.getAttribute("data-lang");
            elements.dropdownButton.textContent = `Translate to: ${item.textContent}`;
            elements.dropdownContainer.classList.remove("open");
        });
    });

    // Language Search Filtering
    document.querySelector(".search-bar").addEventListener("input", function (e) {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll(".language-grid a").forEach((item) => {
            const language = item.textContent.toLowerCase();
            item.style.display = language.includes(searchTerm) ? "block" : "none";
        });
    });
    

    elements.dropdownButton.addEventListener("click", () => {
        elements.dropdownContainer.classList.toggle("open");
    });

    // Add event listeners to speaker buttons
    elements.speakerTextareaButton.addEventListener("click", () => readTextAloud("feedback"));
    elements.speakerFeedbackButton.addEventListener("click", () => readTextAloud("translated-feedback"));

    // Add event listeners to copy buttons
    elements.copyFeedbackButton.addEventListener("click", () => copyToClipboard("feedback"));
    elements.copyTranslatedFeedbackButton.addEventListener("click", () => copyToClipboard("translated-feedback"));

    // Function to translate feedback text
    async function translateText(text) {
        try {
            const response = await fetch("/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, language: selectedLanguage }),
            });
            if (!response.ok) throw new Error("Translation request failed.");
            return (await response.json()).translated_text;
        } catch (error) {
            console.error("Error translating text:", error);
            return text; // Return original text if translation fails
        }
    }

    // Function to analyze feedback for emotion
    async function analyzeFeedback(feedback) {
        try {
            const response = await fetch("/analyze-feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback }),
            });
            if (!response.ok) throw new Error("Feedback analysis request failed.");
            return await response.json();
        } catch (error) {
            console.error("Error analyzing feedback:", error);
            throw error;
        }
    }

    // Function to generate charts
    async function generateCharts(probabilities) {
        await generateProbabilityBarChart(probabilities);
        await generateEmotionPieChart(probabilities);
        Plotly.Plots.resize(document.getElementById("probability-chart"));
        Plotly.Plots.resize(document.getElementById("emotion-pie-chart"));
    }

    // Function to generate probability bar chart
    async function generateProbabilityBarChart(probabilities) {
        const labels = Object.keys(probabilities);
        const values = Object.values(probabilities).map(value => parseFloat(value.toFixed(2)));

        const data = [{
            x: labels,
            y: values,
            type: "bar",
            marker: { color: "rgba(58, 71, 80, 0.8)" },
        }];
        const layout = {
            title: "Prediction Probabilities",
            xaxis: { title: "Emotions", tickangle: 45 },
            yaxis: { title: "Probability", range: [0, 1] },
            margin: { t: 50, b: 120, l: 70, r: 50 },
        };
        Plotly.newPlot("probability-chart", data, layout);
    }

    // Function to generate emotion pie chart
    async function generateEmotionPieChart(probabilities) {
        const labels = Object.keys(probabilities);
        const values = Object.values(probabilities).map(value => parseFloat(value.toFixed(2)));

        const data = [{
            labels: labels,
            values: values,
            type: "pie",
            hole: 0.4,
            textinfo: "none",
            hoverinfo: "label+value",
        }];
        const layout = { title: "Emotion Distribution" };
        Plotly.newPlot("emotion-pie-chart", data, layout);
    }

    // Function to read text aloud
    function readTextAloud(elementId) {
        const text = document.getElementById(elementId).value || document.getElementById(elementId).textContent;
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }

    // Function to copy text to clipboard
    function copyToClipboard(elementId) {
        const text = document.getElementById(elementId).value || document.getElementById(elementId).textContent;
        navigator.clipboard.writeText(text).then(() => {
            alert("Text copied to clipboard!");
        }).catch((error) => {
            console.error("Error copying text:", error);
            alert("Failed to copy text.");
        });
    }

    function displayAnalysisResults(analysisData, translatedFeedback) {
        elements.resultElement.innerHTML = `<span style="color:#264d54;">Emotion: ${analysisData.feedback_type}, Confidence: ${analysisData.emotion_score.toFixed(2)}</span>`;

        elements.resultContainer.style.display = "block";
        elements.translatedFeedbackElement.value = translatedFeedback;
    
        const dominantWordsElement = document.getElementById("dominant-words");
if (analysisData.dominant_words) {
    let dominantWordsText = "";
    for (const [emotion, words] of Object.entries(analysisData.dominant_words)) {
        if (words.length > 0) {
            // Wrap the emotion word in a span with the color applied
            const emotionColor = `<span style="color:#264d54;">${emotion.charAt(0).toUpperCase() + emotion.slice(1)}</span>`;
            dominantWordsText += `${emotionColor}: ${words.join(", ")}<br>`;
        }
    }
    dominantWordsElement.innerHTML = dominantWordsText;
} else {
    dominantWordsElement.textContent = "No dominant words detected.";
}

    }
    
    



});
