import { Routes, Route } from 'react-router-dom';
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}
