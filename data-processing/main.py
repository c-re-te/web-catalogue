import pandas as pd

df = pd.read_csv('./data-processing/biblio.csv', dtype=str)

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

def get_essay_in_book():
    return

def get_entry():
    return

def get_thesis():
    return

def get_full_ref(row):
    if row["TIPO"] == "Articolo in periodico":
        return get_article(row)
    if row["TIPO"] == "Monografia":
        return get_monograph(row)

for idx, row in df.iterrows():
    print(get_full_ref(row))