from pprint import pprint
import pandas as pd
import ast

df = pd.read_csv('./data-processing/biblio.csv', dtype=str)

df_sorted = df.sort_values(by='AUTORE')


crete_array = []

def get_author_string(row):
    if pd.isna(row['AUTORE']):
        author_string =  row['CURATORE']
    else:
        author_string = row['AUTORE']
    return str(author_string)

def get_article(row):
    ref_first = str(row['AUTORE']) + ", «" + str(row['TITOLO CONTRIBUTO SPECIFICO']) + "», <i>" + str(row['TITOLO VOLUME/RIVISTA']) + "</i>, "
    if not pd.isna(row['SPECIFICHE EDIZIONE']):
        ref_first += (str(row['SPECIFICHE EDIZIONE']) + ", ")
    if not pd.isna(row['NOTE GENERALI']):
        ref_first += (row['NOTE GENERALI'] + ", ")
    full_ref = ref_first + str(row["ANNO"]) + ", " + "pp. " + str(row["PAGINE"]) + "."

    return full_ref

def get_monograph(row):
    if pd.isna(row['AUTORE']):
        ref_first =  str(row['CURATORE']) + "(a cura di), "
    else:
        ref_first = str(row['AUTORE']) + ", "
    ref_first += "<i>" + str(row['TITOLO VOLUME/RIVISTA']) + "</i>, "
    if not pd.isna(row['SPECIFICHE EDIZIONE']):
        ref_first += (str(row['SPECIFICHE EDIZIONE']) + ", ")
    if not pd.isna(row['NOTE GENERALI']):
        ref_first += (row['NOTE GENERALI'] + ", ")
    if not pd.isna(row['EDITORE']):
        ref_first += (row['EDITORE'] + ", ") 
    full_ref = ref_first + str(row["LUOGO EDIZIONE"]) +  ", " + str(row["ANNO"]) + "."
    
    return full_ref

def get_essay_in_book(row):
    ref_first = str(row['AUTORE']) + ", «" + str(row['TITOLO CONTRIBUTO SPECIFICO']) + "», in "
    if not pd.isna(row['CURATORE']):
        ref_first += str(row['CURATORE']) + ", "
    ref_first += "<i>" + str(row['TITOLO VOLUME/RIVISTA']) + "</i>, "
    if not pd.isna(row['SPECIFICHE EDIZIONE']):
        ref_first += (str(row['SPECIFICHE EDIZIONE']) + ", ")
    if not pd.isna(row['NOTE GENERALI']):
        ref_first += (row['NOTE GENERALI'] + ", ")
    ref_first += str(row['EDITORE']) + ", " + str(row["LUOGO EDIZIONE"]) +  ", " + str(row["ANNO"])
    if not pd.isna(row["PAGINE"]):
        full_ref = ref_first + ", pp. " + str(row["PAGINE"]) + "."
    else:
        full_ref = ref_first + "."

    return full_ref

def get_entry(row):
    ref_first = str(row['AUTORE']) + ", «" + str(row['TITOLO CONTRIBUTO SPECIFICO']) + "», in "
    if not pd.isna(row['CURATORE']):
        ref_first += str(row['CURATORE']) + ", "
    ref_first += "<i>" + str(row['TITOLO VOLUME/RIVISTA']) + "</i>, "
    if not pd.isna(row['SPECIFICHE EDIZIONE']):
        ref_first += (str(row['SPECIFICHE EDIZIONE']) + ", ")
    if not pd.isna(row['NOTE GENERALI']):
        ref_first += (row['NOTE GENERALI'] + ", ")
    full_ref = ref_first + str(row['EDITORE']) + ", " + str(row["LUOGO EDIZIONE"]) +  ", " + str(row["ANNO"]) + ", pp. " + str(row["PAGINE"]) + "."
    return full_ref

def get_thesis(row):
    ref_first = str(row['AUTORE']) + ", <i>" + str(row['TITOLO VOLUME/RIVISTA']) + "</i>, "
    if not pd.isna(row['EDITORE']):
        ref_first += (str(row['EDITORE']) + ", ")
    if not pd.isna(row['SPECIFICHE EDIZIONE']):
        ref_first += (str(row['SPECIFICHE EDIZIONE']) + ", ")
    if not pd.isna(row['NOTE GENERALI']):
        ref_first += (str(row['NOTE GENERALI']) + ", ")
    full_ref = ref_first + str(row["ANNO"])
    return full_ref
    
def get_full_ref(row):
    if row["TIPO"] == "Articolo in periodico":
        return get_article(row)
    if row["TIPO"] == "Monografia":
        return get_monograph(row)
    if row["TIPO"] == "Saggio in volume":
        return get_essay_in_book(row)
    if row["TIPO"] == "Scheda di catalogo":
        return get_essay_in_book(row)
    if row["TIPO"] == "Tesi":
        return get_thesis(row)

"""
for idx, row in df.iterrows():
    ref_dict = {
        "Autore": get_author_string(row),
        "Anno": row['ANNO'],
        "Riferimento bibliografico": get_full_ref(row)
    }
    crete_array.append(ref_dict)
"""

for idx, row in df_sorted.iterrows():
    ref_html = "<tdr><td>" + str(get_author_string(row)) + "</td><td>" + str(row['ANNO']) + "</td><td>" + str(get_full_ref(row)) + "</td></tdr>"
    
    crete_array.append(ref_html)

crete = ast.literal_eval(crete_array)

print(crete)