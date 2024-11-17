import sys
import json
from transformers import pipeline

qa_pipeline = pipeline("question-answering", model="distilbert-base-uncased")

def solve_question(context, question):
    result = qa_pipeline({'context': context, 'question': question})
    return result['answer']

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    context = input_data['context']
    question = input_data['question']
    
    answer = solve_question(context, question)
    print(json.dumps({'answer': answer}))