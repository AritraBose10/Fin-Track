import json
import random

import spacy
from spacy.tokens import DocBin
from spacy.training import Example
from spacy.util import compounding, minibatch

# Load the training data
with open("train_data.json", "r") as f:
    training_data = json.load(f)

# Initialize spaCy
nlp = spacy.blank("en")

# Add custom components
ner = nlp.add_pipe("ner")
textcat = nlp.add_pipe("textcat")

# Add labels
for example in training_data:
    ner.add_label("AMOUNT")
    ner.add_label("DESC")
    textcat.add_label(example["label"])

# Prepare training data
train_examples = []
for example in training_data:
    doc = nlp.make_doc(example["text"])
    entities = []

    # Find amount in text
    amount_start = example["text"].lower().find(str(example["amount"]))
    if amount_start != -1:
        amount_end = amount_start + len(str(example["amount"]))
        entities.append((amount_start, amount_end, "AMOUNT"))

    # Find desc in text (improved approach)
    words = example["text"].lower().split()
    desc_words = example["desc"].lower().split()
    for i in range(len(words) - len(desc_words) + 1):
        if words[i : i + len(desc_words)] == desc_words:
            desc_start = example["text"].lower().index(" ".join(desc_words))
            desc_end = desc_start + len(" ".join(desc_words))
            entities.append((desc_start, desc_end, "DESC"))
            break

    spans = spacy.training.offsets_to_biluo_tags(doc, entities)
    example = Example.from_dict(
        doc, {"entities": spans, "cats": {example["label"]: 1.0}}
    )
    train_examples.append(example)

# Training settings
n_iter = 100
batch_size = 4

# Train the model
other_pipes = [pipe for pipe in nlp.pipe_names if pipe != "ner" and pipe != "textcat"]
with nlp.disable_pipes(*other_pipes):
    optimizer = nlp.begin_training()
    for itn in range(n_iter):
        random.shuffle(train_examples)
        losses = {}
        batches = minibatch(train_examples, size=batch_size)
        for batch in batches:
            nlp.update(batch, drop=0.5, losses=losses)
        print(f"Iteration {itn+1}, Losses: {losses}")

# Save the model
nlp.to_disk("ml_model")

# Test the model
test_text = "I spent 3000 rupees on a new smartphone"
doc = nlp(test_text)

# Extract entities
for ent in doc.ents:
    print(f"Entity: {ent.text}, Label: {ent.label_}")

# Get predicted label
print("Predicted label:", max(doc.cats, key=doc.cats.get))


# Function to process new transactions
def process_transaction(text):
    doc = nlp(text)
    amount = None
    desc = None
    for ent in doc.ents:
        if ent.label_ == "AMOUNT":
            amount = ent.text
        elif ent.label_ == "DESC":
            desc = ent.text
    label = max(doc.cats, key=doc.cats.get)
    return {
        "text": text,
        "amount": amount,
        "desc": desc,
        "label": label,
    }


# Example usage
new_transaction = "I paid 5000 rupees for a new phone"
result = process_transaction(new_transaction)
print(result)
