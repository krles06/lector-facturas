// src/App.jsx
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  const [session, setSession] = useState(null)

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

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-center">Lector de Facturas</h1>

      {!session ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <Login />
          <Register />
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="mb-4">Has iniciado sesión como <strong>{session.user.email}</strong></p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

export default App
