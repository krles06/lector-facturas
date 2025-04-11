import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function App() {
  const [files, setFiles] = useState([]);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      setLoading(true);
      const response = await fetch("https://lector-facturas-backend.onrender.com/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      try {
        const parsed = JSON.parse(data.data);
        setExtractedData(parsed);
      } catch {
        setExtractedData({ raw: data.data });
      }
    } catch (error) {
      console.error("Error al subir la factura:", error);
      alert("Ocurrió un error al procesar la factura.");
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (!extractedData) return;

    const data = Array.isArray(extractedData.conceptos)
      ? extractedData.conceptos.map(item => ({
          Descripción: item.descripcion,
          Cantidad: item.cantidad,
          PrecioUnitario: item.precio_unitario,
          Importe: item.importe,
        }))
      : [{ Nota: "No hay conceptos detallados" }];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Factura");

    const blob = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([blob]), "factura.xlsx");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Sube tu factura</h1>

        <div className="mb-4">
          <label htmlFor="file-upload" className="block font-medium mb-1">
            Selecciona una factura en PDF
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            multiple={false}
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading || files.length === 0}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded flex justify-center"
        >
          {loading ? "Procesando..." : "Subir factura"}
        </button>

        {files.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Archivo seleccionado:</h2>
            <p className="text-sm text-gray-700">{files[0].name}</p>
          </div>
        )}

        {extractedData && (
          <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-300">
            <h2 className="text-lg font-semibold mb-2">Datos extraídos:</h2>
            <pre className="text-sm whitespace-pre-wrap overflow-x-auto max-h-96">
              {JSON.stringify(extractedData, null, 2)}
            </pre>
            <button
              onClick={exportToExcel}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
            >
              Descargar como Excel
            </button>
          </div>
        )}
      </div>
    </main>
  );
}