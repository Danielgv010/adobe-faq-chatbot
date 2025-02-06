py -m venv entorno
git clone https://github.com/Danielgv010/adobe-faq-chatbot
call entorno\Scripts\activate.bat
pip install -r adobe-faq-chatbot/requirements.txt
call entorno\Scripts\deactivate.bat
echo AI_SERVICE_ENDPOINT="" > adobe-faq-chatbot/qna_bot/.env
echo AI_SERVICE_KEY="" >> adobe-faq-chatbot/qna_bot/.env
echo QA_PROJECT_NAME="" >> adobe-faq-chatbot/qna_bot/.env
echo QA_DEPLOYMENT_NAME="" >> adobe-faq-chatbot/qna_bot/.env