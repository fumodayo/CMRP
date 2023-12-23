from flask import Flask, request, jsonify
from flask_ngrok2 import run_with_ngrok
from flask_cors import CORS, cross_origin
import torch
from transformers import RobertaForSequenceClassification, AutoTokenizer

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
run_with_ngrok(app, auth_token="2Z7mPkRu9fr59IBsvoCJljXiRHM_6p9J1JAPPVPaTMP4owHhk")

model = RobertaForSequenceClassification.from_pretrained("wonrax/phobert-base-vietnamese-sentiment")
tokenizer = AutoTokenizer.from_pretrained("wonrax/phobert-base-vietnamese-sentiment", use_fast=False)

@app.route('/rating-comment', methods=['POST'])
@cross_origin()
def rating_comment():
    data = request.json
    sentence = data['sentence']
    input_ids = torch.tensor([tokenizer.encode(sentence)])
    with torch.no_grad():
        out = model(input_ids)
        return jsonify(out.logits.softmax(dim=-1).tolist())
        # Output:
        # [[0.002, 0.988, 0.01]]
        #     ^      ^      ^
        #    NEG    POS    NEU
        # NEG: Tiêu cực
        # POS: Tích cực
        # NEU: Trung lập     


if __name__ == '__main__':
    app.run()
