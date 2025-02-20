# Adobe FAQ Chatbot with Azure QnA

This project is designed to allow users to interact with an Azure QnA-based chatbot via a simple web interface. The chatbot responds to frequently asked questions (FAQs) related to Adobe products. The project also includes a Python script that helps extract the FAQ data from a specified source.

## Features

- **Web Interface**: A user-friendly web page where users can type questions and get responses from the Azure QnA chatbot.
- **Azure QnA Chatbot Integration**: Connects to an Azure QnA instance to answer Adobe-related questions.
- **FAQ Extraction Script**: A Python script designed to extract FAQ data from adobe. This script has to be manually executed. Stored in qna_bot/main/static/main/data

## Installation

1. Download the installer.bat

2. Run the installation script

3. Create your QnA project in Azure Languaje Studio

4. Configure the .env with the QnA project data

5. Run run.bat to start the webpage

## Deployed project
[Open project](https://danielgv010.pythonanywhere.com/)

> When you open the webpage, you'll be greeted by a chat window. To interact with my Q&A bot deployment, simply use the "Randomize" button at the top of the chat to select one of the available questions for the bot.
