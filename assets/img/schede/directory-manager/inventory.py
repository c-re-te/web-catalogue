import os
import pandas as pd
import re

# Estensioni immagine da considerare
estensioni_immagini = {'.png', '.jpg', '.jpeg', '.webp'}

# Directory dello script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Directory da analizzare (schede/)
cartella_da_analizzare = os.path.abspath(os.path.join(script_dir, '..'))

# Natural sort helper
def alphanum_key(s):
    # Divide il nome in sequenze di numeri e lettere per ordinamento "naturale"
    return [int(text) if text.isdigit() else text.lower() for text in re.split('([0-9]+)', s)]

# Estrai i soli file immagine (no directory, no sottocartelle)
file_list = []
for nome_file in os.listdir(cartella_da_analizzare):
    percorso_completo = os.path.join(cartella_da_analizzare, nome_file)
    if os.path.isfile(percorso_completo):
        ext = os.path.splitext(nome_file)[1].lower()
        if ext in estensioni_immagini:
            file_list.append(nome_file)

# Ordina in modo naturale
file_list.sort(key=alphanum_key)

# Crea e salva Excel
df = pd.DataFrame({'File immagine': file_list})
output_excel = os.path.join(script_dir, 'lista_file.xlsx')
df.to_excel(output_excel, index=False)

print(f"Excel creato con {len(file_list)} immagini: {output_excel}")
