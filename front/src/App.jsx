import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import ProtectedRoute from "./protectedRoute/ProtectedRoute.jsx";
import AppLayout from "./pages/appLayout/AppLayout.jsx";
import Cupones from "./pages/cupones/Cupones.jsx";
import Usuarios from "./pages/usuarios/Usuarios.jsx";
import CanjeCupon from "./pages/canje/CanjeCupon.jsx";
import Beneficios from "./pages/beneficios/Beneficios.jsx";
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    
                    <Route element={<AppLayout />}>
                        <Route path="/home" element={
                            <ProtectedRoute path="/home">
                                <Home />
                            </ProtectedRoute>
                        } />
                        <Route path="/cupones" element={
                            <ProtectedRoute path="/cupones">
                                <Cupones />
                            </ProtectedRoute>
                        }/>
                        <Route path="/usuarios" element={
                            <ProtectedRoute path="/usuarios">
                                <Usuarios />
                            </ProtectedRoute>
                        }/>
                        <Route path="/canje" element={
                            <ProtectedRoute path="/canje">
                                <CanjeCupon />
                            </ProtectedRoute>
                        }/>
                        <Route path="/beneficios" element={
                            <ProtectedRoute path="/beneficios">
                                <Beneficios />
                            </ProtectedRoute>
                        }/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App