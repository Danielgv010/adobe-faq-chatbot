py -m venv entorno
entorno\Scripts\activate
pip install -r requirements.txt
git clone https://github.com/Danielgv010/adobe-faq-chatbot
echo AI_SERVICE_ENDPOINT=""\nAI_SERVICE_KEY=""\nQA_PROJECT_NAME=""\nQA_DEPLOYMENT_NAME="" > qna_bot/.env