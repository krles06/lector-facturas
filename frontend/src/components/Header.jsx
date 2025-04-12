// src/components/Header.jsx
import { supabase } from '../supabaseClient'

export default function Header({ session, onLogout }) {
  return (
    <header className="bg-prussian_blue-500 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Lector de Facturas</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm hidden sm:inline">{session?.user?.email}</span>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}