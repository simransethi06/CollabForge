import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';

const AppRoutes = () => (
  <Routes>
    {/* The root path now goes directly to Home */}
    <Route path="/" element={<Home />} />
    {/* Direct room paths go straight to the Editor */}
    <Route path="/editor/:roomId" element={<EditorPage />} />
    {/* Any other random link redirects back to Home */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}