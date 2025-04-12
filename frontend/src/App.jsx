import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './components/Login'
import Register from './components/Register'

export default function App() {
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
    <div className="min-h-screen bg-gradient-to-br from-background to-white p-6 font-sans">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">📄 Lector de Facturas</h1>

      {!session ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Login />
          <Register />
        </div>
      ) : (
        <div className="bg-white max-w-md mx-auto p-6 rounded-xl shadow-lg text-center">
          <p className="text-xl mb-4 text-secondary">
            Bienvenido, <strong>{session.user.email}</strong>
          </p>

          <div className="mt-4 space-y-4 text-left">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleUpload}
              disabled={processing || !selectedFile}
              className="w-full bg-primary hover:bg-blue-700 text-white py-2 rounded"
            >
              {processing ? 'Procesando...' : 'Subir factura'}
            </button>
            {downloadLink && (
              <a
                href={downloadLink}
                download="factura_procesada.xlsx"
                className="block text-center text-green-600 underline"
              >
                Descargar Excel generado
              </a>
            )}
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          </div>

          <button
            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}