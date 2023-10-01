import nltk
import spacy
import re
import pandas as pd
import numpy as np
import math
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
from nltk.corpus import stopwords as nltk_stopwords
from flask import Flask, request, jsonify
from tqdm.notebook import tqdm
from tqdm import notebook
from pandarallel import pandarallel

nlp = spacy.load("en_core_web_sm", disable=['parser', 'ner'])
tqdm.pandas(desc="progress")
pandarallel.initialize(progress_bar = True)
RANDOM_STATE = 42

product_first11 = pd.read_csv('vectorized_text.csv', index_col=[0])
pr1 = pd.read_csv('product.csv', index_col=[0])
pr2 = pd.read_csv('product2.csv', index_col=[0])
pr3 = pd.read_csv('product3.csv', index_col=[0])
pr4 = pd.read_csv('product4.csv', index_col=[0])
pr5 = pd.read_csv('product5.csv', index_col=[0])
pr6 = pd.read_csv('product6.csv', index_col=[0])
pr7 = pd.read_csv('product7.csv', index_col=[0])
pr8 = pd.read_csv('product8.csv', index_col=[0])

pr1 = pr1.head(42)
product_first = pd.concat([pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8])
product_first.reset_index(drop=True, inplace=True)

nltk.download('stopwords')
stopwords = set(nltk_stopwords.words('english'))


def lemmatize_text(text):
    cleared_text = re.sub(r'[^a-zA-Z]', ' ', text.lower())
    doc = nlp(cleared_text)
    return " ".join([token.lemma_ for token in doc])


product_first['lemm_name'] = product_first['Name'].apply(lemmatize_text)

count_tf_idf = TfidfVectorizer(stop_words=list(stopwords))
count_tf_idf.fit(product_first['lemm_name'])

app = Flask(__name__)
CORS(app)

@app.route('/intellect_search/', methods=['POST'])
def intellect_search():
    input_data = request.get_json()
    input_data = input_data["query"]
    input_data = [input_data]
    input_data = pd.DataFrame(input_data, columns=['Name'])

    def vectorize_input_data(indata):
        indata['Name_lemm'] = indata['Name'].apply(lemmatize_text)
        return count_tf_idf.transform(indata['Name_lemm'])

    input_data_vec = vectorize_input_data(input_data)
    input_data_vec = pd.DataFrame(input_data_vec.toarray())

    def euclidean_distance(data1):
        distance = math.sqrt(((data1 - input_data_vec.transpose()) ** 2).sum().sum())
        return distance

    # KNN = product_first11.apply(euclidean_distance, axis=1)
    # product_first11['KNN'] = KNN + product_first['Rating'].to_list()
    # product_first11['ID'] = product_first['ID'].to_list()
    # product_first11 = product_first11.sort_values(by='KNN', ascending = False)
    product_first11[['ID', 'KNN']]

    # product_first['KNN'] = product_first11['KNN'].to_list()
    # answer = product_first.loc[(product_first['KNN'] > 4)]

    answer = product_first.loc[0:10]

    answer = answer.to_json(orient="records")

    return answer

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)