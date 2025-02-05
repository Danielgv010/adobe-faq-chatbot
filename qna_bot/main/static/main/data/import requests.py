from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import time

# Setup Selenium WebDriver
options = Options()
options.add_argument("--headless")  # Run in the background
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")

# Start Chrome WebDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Open Adobe FAQ page
url = "https://helpx.adobe.com/es/creative-cloud/faq.html"
driver.get(url)
time.sleep(5)  # Wait for the page to load

# Find all FAQ items
faq_items = driver.find_elements(By.CLASS_NAME, "spectrum-Accordion-item")

data = []

# Loop through FAQ items
for item in faq_items:
    try:
        # Get question
        question_button = item.find_element(By.CLASS_NAME, "spectrum-Accordion-itemHeader")
        question = question_button.text.strip()

        # Click to expand answer
        driver.execute_script("arguments[0].click();", question_button)
        time.sleep(1)  # Wait for the answer to appear

        # Get the answer container
        answer_container = item.find_element(By.CLASS_NAME, "spectrum-Accordion-itemContent")
        
        # Get all the <p> tags and <ul> with <li> tags
        paragraphs = answer_container.find_elements(By.TAG_NAME, "p")
        list_items = answer_container.find_elements(By.TAG_NAME, "li")

        # Collect all text from paragraphs and list items
        answer = []

        # Add text from all <p> tags
        for p in paragraphs:
            text = p.text.strip()
            if text:
                answer.append(text)

        # Add text from all <li> tags
        for li in list_items:
            text = li.text.strip()
            if text:
                answer.append(text)

        # Join the collected answer parts with a space (no line breaks)
        answer = " ".join(answer)

        # Debugging: Check the question and answer being captured
        print(f"Question: {question}")
        print(f"Answer: {answer}\n{'-'*50}")

        data.append([question, answer])
    
    except Exception as e:
        print(f"Skipping an item due to error: {e}")

# Close the browser
driver.quit()

# Save to TSV instead of CSV
df = pd.DataFrame(data, columns=["Question", "Answer"])
df.to_csv("faq.tsv", index=False, sep="\t", encoding="utf-8")

print(f"✅ Scraped {len(data)} Q&A items and saved to faq.tsv")
