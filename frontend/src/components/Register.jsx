// src/components/Register.jsx
import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Registro exitoso. Revisa tu email para confirmar.')
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-prussian_blue-500 text-center">Crear cuenta</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-sky_blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-prussian_blue-500"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-sky_blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-prussian_blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-prussian_blue-500 hover:bg-prussian_blue-600 text-white py-2 px-4 rounded transition duration-200"
        >
          Registrarse
        </button>
        {message && <p className="text-center text-sm text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  )
}