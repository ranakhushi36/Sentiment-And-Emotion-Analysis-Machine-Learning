# Sentiment and Emotion Analysis with Translation

## Project Overview

In today’s digital world, people constantly share opinions, feedback, reviews, and emotions through text on social media, customer support platforms, surveys, online reviews, and messaging applications. Manually analyzing such huge amounts of textual data is difficult, time-consuming, and inefficient.

This project, **Sentiment and Emotion Analysis with Translation**, is a Machine Learning based web application designed to automatically analyze user feedback and detect the underlying emotions expressed in the text. The application also supports multilingual translation, making it accessible to users from different linguistic backgrounds.

The system uses **Natural Language Processing (NLP)** techniques and a **Machine Learning classification model** to identify emotions such as joy, anger, sadness, fear, surprise, love, optimism, disappointment, and many more from user input text.

In addition to emotion prediction, the application provides:
- Real-time language translation
- Emotion probability visualization
- Dominant emotion word extraction
- Speech-to-text functionality
- Text-to-speech functionality
- Interactive graphical analysis

The project combines Machine Learning, Flask backend development, NLP, API integration, and frontend web technologies into one complete intelligent application.


## Problem Statement

People express emotions differently through written text across multiple languages. Traditional sentiment analysis systems generally classify text into only three categories:
- Positive
- Negative
- Neutral

However, human emotions are much more complex than simple polarity classification.

For example:

| Text | Actual Emotion |
|------|----------------|
| "I am really excited for tomorrow!" | Excitement |
| "I miss those old memories." | Sadness |
| "Why would you do something like this?" | Anger |
| "Thank you so much for your support." | Gratitude |

Most traditional systems fail to identify these fine-grained emotions accurately.

Additionally:
- Users communicate in multiple languages.
- Existing systems lack multilingual accessibility.
- Manual analysis of emotional feedback is inefficient.
- Businesses struggle to understand customer emotions deeply.

Therefore, there is a need for an intelligent system capable of:
- Detecting detailed emotions from text
- Supporting multiple languages
- Providing visual insights
- Improving human-computer interaction

This project aims to solve these challenges using Machine Learning and NLP.

## Proposed Solution

The proposed solution is a Flask-based web application that:
1. Accepts user feedback/input text.
2. Translates the text into selected languages using Google Translate API.
3. Processes the text using NLP techniques.
4. Predicts the dominant emotion using a trained Machine Learning model.
5. Displays prediction probabilities for all emotions.
6. Highlights dominant emotional words present in the text.
7. Visualizes the results using charts and graphs.

The system provides an easy-to-use interface for users to interact with emotion analysis in real time.

## Features

### Emotion Detection
The system predicts emotions from textual input using Machine Learning.


## Sentiment Analysis
Analyzes user opinions and emotional tone from text.


### Multilingual Translation
Supports translation into multiple languages using Google Translate API.


### Interactive Visualization
Displays:
- Emotion probability graphs
- Pie charts
- Emotion distribution

using Plotly.js.


### Speech Recognition
Allows users to input feedback using microphone input.


### Text-to-Speech
Reads text aloud using browser speech synthesis.


### Dominant Emotion Word Detection
Identifies emotionally significant words present in the input.


### User-Friendly Interface
Modern and interactive frontend design.


## Technologies Used

### Frontend Technologies
- HTML5
- CSS3
- JavaScript
- Plotly.js

### Backend Technologies
- Python
- Flask

### Machine Learning & NLP
- Scikit-learn
- Logistic Regression
- TF-IDF Vectorizer
- Natural Language Processing (NLP)

### Libraries Used

| Library | Purpose |
|---|---|
| Flask | Backend Framework |
| Pandas | Data Handling |
| Scikit-learn | Machine Learning |
| Joblib | Model Saving/Loading |
| Googletrans | Language Translation |
| Plotly | Data Visualization |


## Working of the System

### Step 1: User Input
The user enters feedback or text into the application.

Example:
```text
I am extremely happy with the service.
```

### Step 2: Translation
The application translates the input text into the selected language using Google Translate API.


### Step 3: Text Preprocessing
The text is cleaned and transformed into numerical features using:
- TF-IDF Vectorization

### Step 4: Emotion Prediction
The Machine Learning model predicts the dominant emotion.

Example Output:
```text
Joy
```

### Step 5: Probability Calculation
The system calculates probability scores for all emotions.

Example:
| Emotion | Probability |
|---|---|
| Joy | 87% |
| Optimism | 7% |
| Love | 3% |

### Step 6: Visualization
The results are displayed using:
- Bar Charts
- Pie Charts
- Dominant Word Analysis

## Machine Learning Model

### Model Used
The project uses:
- Logistic Regression Classifier


### Why Logistic Regression?
Logistic Regression was selected because:
- Efficient for text classification
- Good performance on NLP tasks
- Fast training and prediction
- Suitable for multiclass classification

### Feature Extraction
The project uses:
- TF-IDF Vectorizer

TF-IDF converts textual data into numerical vectors based on word importance.


##  Dataset Used

### GoEmotions Dataset

The model is trained using Google's GoEmotions dataset.

#### Dataset Features
- 58k+ Reddit comments
- 27 emotions + neutral
- Fine-grained emotion labels

### Supported Emotions

The model can classify text into:

- Admiration
- Amusement
- Anger
- Annoyance
- Approval
- Caring
- Confusion
- Curiosity
- Desire
- Disappointment
- Disapproval
- Disgust
- Embarrassment
- Excitement
- Fear
- Gratitude
- Grief
- Joy
- Love
- Nervousness
- Optimism
- Pride
- Realization
- Relief
- Remorse
- Sadness
- Surprise
- Neutral


## Core Functionalities

## 1. Emotion Prediction

```python
predict_emotions(text)
```

Predicts the dominant emotion from input text.


## 2. Emotion Probability Analysis

```python
get_prediction_proba(text)
```

Returns probability scores for all emotions.

## 3. Translation Feature

```python
translate()
```

Translates text into selected language.


## 4. Dominant Word Extraction

The system identifies emotionally significant words from the user input.

Example:
```text
happy, excited, amazing
```

## Data Visualization

The project uses Plotly.js to generate:
- Interactive Bar Graphs
- Emotion Distribution Pie Charts
- Probability Visualizations

These graphs help users understand emotional patterns more clearly.

## Translation Support

The application supports multiple languages including:
- English
- Hindi
- French
- German
- Spanish
- Japanese
- Chinese
- Arabic
- Korean
- Russian
- And many more


##  Speech Features

## Speech-to-Text
Users can provide input through microphone voice recording.

### Text-to-Speech
The application can read translated text aloud.


## Advantages of the Project

- Real-time emotion analysis
- Multilingual accessibility
- Interactive visual output
- Easy-to-use interface
- Fine-grained emotion detection
- Useful for businesses and researchers
- Improves customer feedback analysis


## Applications

This project can be used in:
- Customer Feedback Analysis
- Social Media Monitoring
- Mental Health Analysis
- Chatbots
- Virtual Assistants
- Online Review Systems
- Educational Platforms
- Human Emotion Research


## Limitations

- Accuracy depends on training data quality
- Translation APIs may sometimes produce errors
- Sarcasm detection remains challenging
- Voice recognition accuracy may vary
- Limited contextual understanding compared to deep learning models


## Future Improvements

Possible future enhancements include:

- Deep Learning Models (LSTM/BERT)
- Transformer-based NLP models
- Real-time chatbot integration
- Cloud deployment
- Mobile application development
- Voice emotion analysis
- Better multilingual accuracy
- User authentication system
- Database integration
- API deployment


## Installation Guide

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/sentiment-emotion-analysis.git
```

## Step 2: Navigate to Project Directory

```bash
cd sentiment-emotion-analysis
```

## Step 3: Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

## Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

If requirements.txt is unavailable:

```bash
pip install flask pandas scikit-learn joblib googletrans==4.0.0-rc1 plotly
```

## Running the Project

```bash
python app.py
```

Then open:

```text
http://127.0.0.1:5000/
```

in your browser.

## Model Training

To retrain the model:

```bash
python train_model.py
```

The trained model will be saved as:

```text
trained_emotion_classifier.pkl
```

## Learning Outcomes

Through this project, I learned:

- Natural Language Processing (NLP)
- Machine Learning model training
- Text preprocessing
- Flask backend development
- Frontend and backend integration
- API integration
- Data visualization
- Emotion classification techniques
- Translation systems

## Author

### Khushi Rana

## Support

If you found this project useful, give it a ⭐ on GitHub.

