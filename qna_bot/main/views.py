from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from dotenv import load_dotenv
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.language.questionanswering import QuestionAnsweringClient
from django.template import loader
import csv
from django.conf import settings

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

load_dotenv(os.path.join(BASE_DIR, '.env'))

ai_endpoint = os.getenv('AI_SERVICE_ENDPOINT')
ai_key = os.getenv('AI_SERVICE_KEY')
ai_project_name = os.getenv('QA_PROJECT_NAME')
ai_deployment_name = os.getenv('QA_DEPLOYMENT_NAME')

# Create client using endpoint and key
credential = AzureKeyCredential(ai_key)
ai_client = QuestionAnsweringClient(endpoint=ai_endpoint, credential=credential)


def qna_main(request):
    """Render the Q&A page."""
    template = loader.get_template('qna.html')
    return HttpResponse(template.render({}, request))


def ask(request):
    """Process a question and return an AI-generated answer."""
    if request.method == 'GET':
        question = request.GET.get('question', '')
        if not question:
            return JsonResponse({'error': 'No question provided'}, status=400)

        try:
            response = ai_client.get_answers(
                question=question,
                project_name=ai_project_name,
                deployment_name=ai_deployment_name
            )

            if response.answers:
                answer_text = response.answers[0].answer
            else:
                answer_text = "I'm not sure about that."

            return JsonResponse({'question': question, 'answer': answer_text})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


def get_data(request):
    """Return the first column of the TSV file as JSON, skipping the header row."""
    
    # Correct file path
    file_path = os.path.join(settings.BASE_DIR, "main", "static", "main", "data", "faq.tsv")
    
    # Check if the file exists
    if not os.path.exists(file_path):
        return JsonResponse({"error": "File not found", "path_checked": file_path}, status=404)

    # Read the TSV file
    with open(file_path, encoding="utf-8") as fd:
        rd = csv.reader(fd, delimiter="\t", quotechar='"')
        next(rd, None)  # Skip the first row (header)
        first_column = [row[0] for row in rd if row]  # Extract first column, ignoring empty rows

    # Return JSON with explicit UTF-8 encoding
    return JsonResponse(
        {"questions": first_column},
        json_dumps_params={"ensure_ascii": False}
    )