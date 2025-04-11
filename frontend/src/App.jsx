// src/App.jsx
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  const [session, setSession] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [downloadLink, setDownloadLink] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
    setDownloadLink(null)
    setError(null)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('file', selectedFile)

    setProcessing(true)
    setError(null)
    try {
      const response = await fetch('https://lector-facturas-backend.onrender.com/upload/', {
        method: 'POST',
        body: formData,
      })
      const blob = await response.blob()

      if (blob.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const url = window.URL.createObjectURL(blob)
        setDownloadLink(url)
      } else {
        setError('Ocurrió un error al procesar la factura.')
      }
    } catch (err) {
      setError('Error al conectar con el servidor.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-center">Lector de Facturas</h1>

      {!session ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <Login />
          <Register />
        </div>
      ) : (
        <div className="max-w-xl mx-auto mt-10">
          <p className="mb-4 text-center">Has iniciado sesión como <strong>{session.user.email}</strong></p>

          <div className="bg-white p-4 rounded shadow">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mb-4 w-full"
            />
            <button
              onClick={handleUpload}
              disabled={processing || !selectedFile}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              {processing ? 'Procesando...' : 'Subir factura'}
            </button>
            {downloadLink && (
              <a
                href={downloadLink}
                download="factura_procesada.xlsx"
                className="block text-center text-green-600 mt-4"
              >
                Descargar Excel generado
              </a>
            )}
            {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App