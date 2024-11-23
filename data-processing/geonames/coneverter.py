import pandas as pd

# Nome dei file
input_csv = 'data-processing/geonames/coordinates.csv'
output_excel = 'data-processing/geonames/geocoordinates.xlsx'

# Legge il file CSV di input
df = pd.read_csv(input_csv, header=None, names=['URI', 'Latitude', 'Longitude'])

# Salva il DataFrame come file Excel
df.to_excel(output_excel, index=False, engine='openpyxl')

print(f"File Excel salvato come {output_excel}")