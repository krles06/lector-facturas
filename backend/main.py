import load_env
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import openai
import fitz  # PyMuPDF
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(file_bytes):
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def gpt_extract_data(text):
    prompt = f"""
Extrae la información clave de la siguiente factura. Devuélvela en JSON con las siguientes claves:
- proveedor
- NIF
- fecha_emisión
- número_factura
- conceptos (array de objetos con 'descripcion', 'cantidad', 'precio_unitario', 'importe')
- base_imponible
- iva
- total

Factura:
{text}
"""
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )
    return response.choices[0].message.content

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    extracted_data = gpt_extract_data(text)
    return {"data": extracted_data}
