import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthInitializer, ProtectedRoute } from './components';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoginPage, DashboardPage, WireframePage, HistoryPage } from './pages';
import HomePage from './pages/HomePage';
import ProfilesPage from './pages/accounts/ProfilesPage';
import GroupsPage from './pages/accounts/GroupsPage';
import TagsPage from './pages/accounts/TagsPage';
import MembershipManagementPage from './pages/memberships/MembershipManagementPage';
import ClassManagementPage from './pages/class/ClassManagementPage';
import AttendanceHistoryPage from './pages/class/AttendanceHistoryPage';
import BulkActionsPage from './pages/class/BulkActionsPage';
import SelfCheckInPage from './pages/class/SelfCheckInPage';
import MessagingPage from './pages/communications/MessagingPage';
import AnnouncementsPage from './pages/communications/AnnouncementsPage';
import ConversationsPage from './pages/communications/ConversationsPage';

function App() {
  return (
    <ErrorBoundary>
      <Router basename="/mas9-wireframe">
        <AuthInitializer>
          <Routes>
            {/* 로그인 페이지 */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* 보호된 라우트들 */}
            {/* 기존 라우트 */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/wireframe" element={<ProtectedRoute><WireframePage /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
            
            {/* 새로운 Fr 앱 라우트 */}
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            
            {/* Accounts */}
            <Route path="/accounts/profiles" element={<ProtectedRoute><ProfilesPage /></ProtectedRoute>} />
            <Route path="/accounts/groups" element={<ProtectedRoute><GroupsPage /></ProtectedRoute>} />
            <Route path="/accounts/tags" element={<ProtectedRoute><TagsPage /></ProtectedRoute>} />
            
            {/* Memberships */}
            <Route path="/memberships/management" element={<ProtectedRoute><MembershipManagementPage /></ProtectedRoute>} />
            
            {/* Class */}
            <Route path="/class/management" element={<ProtectedRoute><ClassManagementPage /></ProtectedRoute>} />
            <Route path="/class/attendance-history" element={<ProtectedRoute><AttendanceHistoryPage /></ProtectedRoute>} />
            <Route path="/class/bulk-actions" element={<ProtectedRoute><BulkActionsPage /></ProtectedRoute>} />
            <Route path="/class/self-check-in" element={<ProtectedRoute><SelfCheckInPage /></ProtectedRoute>} />
            
            {/* Communications */}
            <Route path="/communications/messaging" element={<ProtectedRoute><MessagingPage /></ProtectedRoute>} />
            <Route path="/communications/announcements" element={<ProtectedRoute><AnnouncementsPage /></ProtectedRoute>} />
            <Route path="/communications/conversations" element={<ProtectedRoute><ConversationsPage /></ProtectedRoute>} />
            
            {/* 루트 경로는 홈으로 리다이렉션 */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* 404 페이지 (임시로 대시보드로 리다이렉션) */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthInitializer>
      </Router>
    </ErrorBoundary>
  );
}

export default App;