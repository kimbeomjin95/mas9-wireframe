import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthInitializer, ProtectedRoute } from './components';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoginPage, DashboardPage, WireframePage, HistoryPage } from './pages';

function App() {
  return (
    <ErrorBoundary>
      <Router basename="/mas9-wireframe">
        <AuthInitializer>
          <Routes>
            {/* 로그인 페이지 */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* 보호된 라우트들 */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/wireframe" 
              element={
                <ProtectedRoute>
                  <WireframePage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              } 
            />
            
            {/* 루트 경로는 대시보드로 리다이렉션 */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 페이지 (임시로 대시보드로 리다이렉션) */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthInitializer>
      </Router>
    </ErrorBoundary>
  );
}

export default App;