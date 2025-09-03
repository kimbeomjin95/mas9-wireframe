import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthInitializer, ProtectedRoute } from './components';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AdminLayout } from './components/layout/AdminLayout';
import { ViewProvider, ModalsProvider } from '@mas9/shared-ui';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage, DashboardPage, WireframePage, HistoryPage } from './pages';
import HomePage from './pages/HomePage';

// Accounts
import ProfileContainer from './pages/accounts/ProfileContainer';
import GroupsPage from './pages/accounts/GroupsPage';
import TagsPage from './pages/accounts/TagsPage';

// Memberships
import MembershipManagementPage from './pages/memberships/MembershipManagementPage';

// Class
import ClassManagementPage from './pages/class/ClassManagementPage';
import AttendanceHistoryPage from './pages/class/AttendanceHistoryPage';
import BulkActionsPage from './pages/class/BulkActionsPage';
import SelfCheckInPage from './pages/class/SelfCheckInPage';

// Communications
import MessagingPage from './pages/communications/MessagingPage';
import AnnouncementsPage from './pages/communications/AnnouncementsPage';
import ConversationsPage from './pages/communications/ConversationsPage';

// Events
import EventManagementPage from './pages/events/EventManagementPage';
import TestingContainer from './pages/events/TestingContainer';

// Learning Centers
import LearningCentersPage from './pages/learning-centers/LearningCentersPage';
import HomeworksPage from './pages/learning-centers/HomeworksPage';

// Marketing Tools
import FormsPage from './pages/marketing-tools/FormsPage';
import AutomationsPage from './pages/marketing-tools/AutomationsPage';

// eStore
import OrdersPage from './pages/estore/OrdersPage';
import ProductsPage from './pages/estore/ProductsPage';

// Payments
import TransactionErrorsPage from './pages/payments/TransactionErrorsPage';
import TransactionsPage from './pages/payments/TransactionsPage';
import InvoicesPage from './pages/payments/InvoicesPage';
import AutopaysPage from './pages/payments/AutopaysPage';

// Staff
import StaffMembersPage from './pages/staff/StaffMembersPage';
import ClockInOutPage from './pages/staff/ClockInOutPage';
import LogHistoryPage from './pages/staff/LogHistoryPage';

// Reports
import InsightsPage from './pages/reports/InsightsPage';
import ReportsPage from './pages/reports/ReportsPage';

// Settings
import SchoolSetupPage from './pages/settings/SchoolSetupPage';
import PaymentsPage from './pages/settings/PaymentsPage';
import CommunicationPage from './pages/settings/CommunicationPage';
import SystemSecurityPage from './pages/settings/SystemSecurityPage';
import SubscriptionBillingPage from './pages/settings/SubscriptionBillingPage';

// Design System
import ToastPage from './pages/design-system/ToastPage';
import ModalPage from './pages/design-system/ModalPage';
import ButtonPage from './pages/design-system/ButtonPage';
import FormPage from './pages/design-system/FormPage';

// Example
import ExamplePage from './pages/ExamplePage';
import PublicTestPage from './pages/PublicTestPage';

// Protected Route with Admin Layout
const ProtectedAdminRoute: React.FC<{ 
  children: React.ReactNode;
  title?: string;
  pageId?: string;
}> = ({ children, title, pageId }) => (
  <ProtectedRoute>
    <AdminLayout title={title} pageId={pageId}>
      {children}
    </AdminLayout>
  </ProtectedRoute>
);

function App() {
  return (
    <ErrorBoundary>
      <ViewProvider>
        <ModalsProvider>
          <Router>
            <AuthInitializer>
          <Routes>
            {/* 로그인 페이지 */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Public 테스트 페이지 (인증 불필요) */}
            <Route path="/public-test" element={<PublicTestPage />} />
            
            {/* 보호된 라우트들 */}
            {/* 기존 라우트 */}
            <Route path="/dashboard" element={<ProtectedAdminRoute><DashboardPage /></ProtectedAdminRoute>} />
            <Route path="/wireframe" element={<ProtectedAdminRoute><WireframePage /></ProtectedAdminRoute>} />
            <Route path="/history" element={<ProtectedAdminRoute><HistoryPage /></ProtectedAdminRoute>} />
            
            {/* 새로운 Fr 앱 라우트 */}
            <Route path="/home" element={<ProtectedAdminRoute><HomePage /></ProtectedAdminRoute>} />
            
            {/* Accounts */}
            <Route path="/accounts/profiles" element={
              <ProtectedAdminRoute title="Accounts" pageId="accounts">
                <ProfileContainer />
              </ProtectedAdminRoute>
            } />
            <Route path="/accounts/groups" element={<ProtectedAdminRoute>그룹 관리<GroupsPage /></ProtectedAdminRoute>} />
            <Route path="/accounts/tags" element={<ProtectedAdminRoute>태그 관리<TagsPage /></ProtectedAdminRoute>} />
            
            {/* Memberships */}
            <Route path="/memberships/management" element={<ProtectedAdminRoute>멤버십 관리<MembershipManagementPage /></ProtectedAdminRoute>} />
            
            {/* Class */}
            <Route path="/class/management" element={<ProtectedAdminRoute>클래스 관리<ClassManagementPage /></ProtectedAdminRoute>} />
            <Route path="/class/attendance-history" element={<ProtectedAdminRoute>출석 이력<AttendanceHistoryPage /></ProtectedAdminRoute>} />
            <Route path="/class/bulk-actions" element={<ProtectedAdminRoute>일괄 작업<BulkActionsPage /></ProtectedAdminRoute>} />
            <Route path="/class/self-check-in" element={<ProtectedAdminRoute>자체 체크인<SelfCheckInPage /></ProtectedAdminRoute>} />
            
            {/* Communications */}
            <Route path="/communications/messaging" element={<ProtectedAdminRoute>메시징<MessagingPage /></ProtectedAdminRoute>} />
            <Route path="/communications/announcements" element={<ProtectedAdminRoute>공지사항<AnnouncementsPage /></ProtectedAdminRoute>} />
            <Route path="/communications/conversations" element={<ProtectedAdminRoute>대화<ConversationsPage /></ProtectedAdminRoute>} />
            
            {/* Events */}
            {/* <Route path="/events/management" element={<ProtectedAdminRoute>이벤트 관리<EventManagementPage /></ProtectedAdminRoute>} /> */}
            <Route path="/events/testings" element={
              <ProtectedAdminRoute title="Events" pageId="events">
                <TestingContainer />
              </ProtectedAdminRoute>
            } />
            
            {/* Learning Centers */}
            <Route path="/learning-centers/centers" element={<ProtectedAdminRoute>학습 센터<LearningCentersPage /></ProtectedAdminRoute>} />
            <Route path="/learning-centers/homeworks" element={<ProtectedAdminRoute>숙제<HomeworksPage /></ProtectedAdminRoute>} />
            
            {/* Marketing Tools */}
            <Route path="/marketing-tools/forms" element={<ProtectedAdminRoute>폼 관리<FormsPage /></ProtectedAdminRoute>} />
            <Route path="/marketing-tools/automations" element={<ProtectedAdminRoute>자동화<AutomationsPage /></ProtectedAdminRoute>} />
            
            {/* eStore */}
            <Route path="/estore/orders" element={<ProtectedAdminRoute>주문 관리<OrdersPage /></ProtectedAdminRoute>} />
            <Route path="/estore/products" element={<ProtectedAdminRoute>상품 관리<ProductsPage /></ProtectedAdminRoute>} />
            
            {/* Payments */}
            <Route path="/payments/transaction-errors" element={<ProtectedAdminRoute>결제 오류<TransactionErrorsPage /></ProtectedAdminRoute>} />
            <Route path="/payments/transactions" element={<ProtectedAdminRoute>결제 내역<TransactionsPage /></ProtectedAdminRoute>} />
            <Route path="/payments/invoices" element={<ProtectedAdminRoute>인보이스<InvoicesPage /></ProtectedAdminRoute>} />
            <Route path="/payments/autopays" element={<ProtectedAdminRoute>자동결제<AutopaysPage /></ProtectedAdminRoute>} />
            
            {/* Staff */}
            <Route path="/staff/members" element={<ProtectedAdminRoute>직원 관리<StaffMembersPage /></ProtectedAdminRoute>} />
            <Route path="/staff/clock-in-out" element={<ProtectedAdminRoute>출퇴근 관리<ClockInOutPage /></ProtectedAdminRoute>} />
            <Route path="/staff/log-history" element={<ProtectedAdminRoute>로그 이력<LogHistoryPage /></ProtectedAdminRoute>} />
            
            {/* Reports */}
            <Route path="/reports/insights" element={<ProtectedAdminRoute>인사이트<InsightsPage /></ProtectedAdminRoute>} />
            <Route path="/reports/reports" element={<ProtectedAdminRoute>보고서<ReportsPage /></ProtectedAdminRoute>} />
            
            {/* Settings */}
            <Route path="/settings/school-setup" element={<ProtectedAdminRoute>학교 설정<SchoolSetupPage /></ProtectedAdminRoute>} />
            <Route path="/settings/payments" element={<ProtectedAdminRoute>결제 설정<PaymentsPage /></ProtectedAdminRoute>} />
            <Route path="/settings/communication" element={<ProtectedAdminRoute>커뮤니케이션 설정<CommunicationPage /></ProtectedAdminRoute>} />
            <Route path="/settings/system-security" element={<ProtectedAdminRoute>시스템 보안<SystemSecurityPage /></ProtectedAdminRoute>} />
            <Route path="/settings/subscription-billing" element={<ProtectedAdminRoute>구독 및 요금<SubscriptionBillingPage /></ProtectedAdminRoute>} />
            
            {/* Design System */}
            <Route path="/design-system/toast" element={<ProtectedAdminRoute><ToastPage /></ProtectedAdminRoute>} />
            <Route path="/design-system/modal" element={<ProtectedAdminRoute><ModalPage /></ProtectedAdminRoute>} />
            <Route path="/design-system/button" element={<ProtectedAdminRoute><ButtonPage /></ProtectedAdminRoute>} />
            <Route path="/design-system/form" element={<ProtectedAdminRoute><FormPage /></ProtectedAdminRoute>} />
            
            {/* 루트 경로는 홈으로 리다이렉션 */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* Example 페이지 */}
            <Route path="/example" element={<ProtectedAdminRoute><ExamplePage /></ProtectedAdminRoute>} />
            
            {/* 404 페이지 (임시로 대시보드로 리다이렉션) */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthInitializer>
        <ToastContainer />
      </Router>
    </ModalsProvider>
  </ViewProvider>
</ErrorBoundary>
  );
}

export default App;