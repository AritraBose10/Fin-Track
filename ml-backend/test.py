import spacy
import json

def process_transaction(nlp, text):
    doc = nlp(text)
    amount = None
    description = None

    # Extract entities
    for ent in doc.ents:
        if ent.label_ == "AMOUNT":
            amount = ent.text
        elif ent.label_ == "DESC":
            description = ent.text

    # If description is not found, try to extract it based on context
    if not description:
        for token in doc:
            if token.dep_ in ["dobj", "pobj"] and token.head.pos_ == "VERB":
                description = " ".join([child.text for child in token.subtree])
                break

    category = max(doc.cats, key=doc.cats.get)
    return {
        "text": text,
        "amount": amount,
        "description": description,
        "category": category
    }

# Load the trained model
nlp = spacy.load("financial_model")

# Test examples
test_examples = [
    "I received 10000 rupees as a bonus from work",
    "Paid 2000 rupees for dinner at a restaurant",
    "Transferred 5000 rupees to my savings account",
    "Got a refund of 1500 rupees for a returned item",
    "Spent 500 rupees on coffee and snacks",
    "My salary of 50000 rupees was credited to my account",
    "Invested 20000 rupees in mutual funds",
    "Lost 100 rupees while shopping",
    "Found 50 rupees on the street",
    "Donated 1000 rupees to charity"
]

# Process each example and print results
for example in test_examples:
    result = process_transaction(nlp, example)
    print(json.dumps(result, indent=2))
    print()

# Interactive testing
print("Enter your own transactions (type 'quit' to exit):")
while True:
    user_input = input("> ")
    if user_input.lower() == 'quit':
        break
    result = process_transaction(nlp, user_input)
    print(json.dumps(result, indent=2))
    print()

print("Testing complete.")
