py -m venv entorno
git clone https://github.com/Danielgv010/adobe-faq-chatbot
call entorno\Scripts\activate.bat
pip install -r adobe-faq-chatbot/requirements.txt
call entorno\Scripts\deactivate.bat
echo AI_SERVICE_ENDPOINT=""\nAI_SERVICE_KEY=""\nQA_PROJECT_NAME=""\nQA_DEPLOYMENT_NAME="" > qna_bot