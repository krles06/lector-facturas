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
    <div className="min-h-screen bg-gradient-to-br from-light_blue-100 to-light_blue-500 font-sans text-prussian_blue-100">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-center text-prussian_blue-500 mb-8">📄 Lector de Facturas</h1>

        {!session ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Login />
            <Register />
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl p-6 text-prussian_blue-500 animate-fade-in">
            <p className="text-lg mb-4 text-center">
              Has iniciado sesión como <strong>{session.user.email}</strong>
            </p>

            <div className="flex flex-col items-center space-y-4">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="border border-sky_blue-300 rounded px-4 py-2 w-full"
              />
              <button
                onClick={handleUpload}
                disabled={processing || !selectedFile}
                className="bg-prussian_blue-500 hover:bg-prussian_blue-600 text-white font-medium py-2 px-6 rounded w-full transition duration-200"
              >
                {processing ? 'Procesando...' : 'Subir factura'}
              </button>

              {downloadLink && (
                <a
                  href={downloadLink}
                  download="factura_procesada.xlsx"
                  className="text-green-700 underline"
                >
                  Descargar Excel generado
                </a>
              )}

              {error && <p className="text-red-600 text-center">{error}</p>}

              <button
                onClick={handleLogout}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App