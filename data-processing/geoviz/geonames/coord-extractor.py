import pandas as pd
import geocoder

# Nome dei file
input_csv = 'data-processing/geoviz/geonames/geonames-uri-25.csv'
output_excel = 'data-processing/geoviz/geonames/coordinates.xslx'

# Legge il file CSV di input
df = pd.read_csv(input_csv, header=None, names=['URI'])

# Estrae l'ID GeoNames dagli URL
df['GeoNames_ID'] = df['URI'].apply(lambda x: x.split('/')[3] if isinstance(x, str) and len(x.split('/')) > 3 else None)

# Crea colonne per latitudine e longitudine
df['Latitude'] = None
df['Longitude'] = None

# Itera sulle righe e recupera le coordinate con geocoder
for index, row in df.iterrows():
    geonames_id = row['GeoNames_ID']
    if geonames_id:
        try:
            # Usa geocoder con GeoNames ID
            location = geocoder.geonames(geonames_id, method='details', key='manuveggi99')  # Sostituisci con il tuo username GeoNames
            if location.ok:
                df.at[index, 'Latitude'] = location.lat
                df.at[index, 'Longitude'] = location.lng
            else:
                print(f"Coordinate non trovate per GeoNames ID: {geonames_id}")
        except Exception as e:
            print(f"Errore per GeoNames ID {geonames_id}: {e}")
    else:
        df.at[index, 'Latitude'] = ""
        df.at[index, 'Longitude'] = ""

print(df)
# Salva il file CSV di output
#df[['URI', 'Latitude', 'Longitude']].to_excel(output_excel, index=False, engine='openpyxl')

print(f"Output salvato in {output_excel}")