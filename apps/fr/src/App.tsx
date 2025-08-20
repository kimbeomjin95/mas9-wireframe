import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthInitializer, ProtectedRoute } from './components';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoginPage, DashboardPage, WireframePage, HistoryPage } from './pages';
import HomePage from './pages/HomePage';

// Accounts
import ProfilesPage from './pages/accounts/ProfilesPage';
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
import EventManagementPage from './pages/events/EventManagementPage';
import TestingPage from './pages/events/TestingPage';
import LearningCentersPage from './pages/learning-centers/LearningCentersPage';
import HomeworksPage from './pages/learning-centers/HomeworksPage';
import FormsPage from './pages/marketing-tools/FormsPage';
import AutomationsPage from './pages/marketing-tools/AutomationsPage';
import OrdersPage from './pages/estore/OrdersPage';
import ProductsPage from './pages/estore/ProductsPage';
import TransactionErrorsPage from './pages/payments/TransactionErrorsPage';
import TransactionsPage from './pages/payments/TransactionsPage';
import InvoicesPage from './pages/payments/InvoicesPage';
import AutopaysPage from './pages/payments/AutopaysPage';
import StaffMembersPage from './pages/staff/StaffMembersPage';
import ClockInOutPage from './pages/staff/ClockInOutPage';
import LogHistoryPage from './pages/staff/LogHistoryPage';
import InsightsPage from './pages/reports/InsightsPage';
import ReportsPage from './pages/reports/ReportsPage';
import SchoolSetupPage from './pages/settings/SchoolSetupPage';
import PaymentsPage from './pages/settings/PaymentsPage';
import CommunicationPage from './pages/settings/CommunicationPage';
import SystemSecurityPage from './pages/settings/SystemSecurityPage';
import SubscriptionBillingPage from './pages/settings/SubscriptionBillingPage';
import MessagesPage from './pages/communications/MessagesPage';

// Events
import EventManagementPage from './pages/events/EventManagementPage';
import TestingPage from './pages/events/TestingPage';

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
import PaymentsSettingsPage from './pages/settings/PaymentsPage';
import CommunicationPage from './pages/settings/CommunicationPage';
import SystemSecurityPage from './pages/settings/SystemSecurityPage';
import SubscriptionBillingPage from './pages/settings/SubscriptionBillingPage';

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
            
            {/* Events */}
            <Route path="/events/management" element={<ProtectedRoute><EventManagementPage /></ProtectedRoute>} />
            <Route path="/events/testings" element={<ProtectedRoute><TestingPage /></ProtectedRoute>} />
            
            {/* Learning Centers */}
            <Route path="/learning-centers/centers" element={<ProtectedRoute><LearningCentersPage /></ProtectedRoute>} />
            <Route path="/learning-centers/homeworks" element={<ProtectedRoute><HomeworksPage /></ProtectedRoute>} />
            
            {/* Marketing Tools */}
            <Route path="/marketing-tools/forms" element={<ProtectedRoute><FormsPage /></ProtectedRoute>} />
            <Route path="/marketing-tools/automations" element={<ProtectedRoute><AutomationsPage /></ProtectedRoute>} />
            
            {/* eStore */}
            <Route path="/estore/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/estore/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
            
            {/* Payments */}
            <Route path="/payments/transaction-errors" element={<ProtectedRoute><TransactionErrorsPage /></ProtectedRoute>} />
            <Route path="/payments/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
            <Route path="/payments/invoices" element={<ProtectedRoute><InvoicesPage /></ProtectedRoute>} />
            <Route path="/payments/autopays" element={<ProtectedRoute><AutopaysPage /></ProtectedRoute>} />
            
            {/* Staff */}
            <Route path="/staff/members" element={<ProtectedRoute><StaffMembersPage /></ProtectedRoute>} />
            <Route path="/staff/clock-in-out" element={<ProtectedRoute><ClockInOutPage /></ProtectedRoute>} />
            <Route path="/staff/log-history" element={<ProtectedRoute><LogHistoryPage /></ProtectedRoute>} />
            
            {/* Reports */}
            <Route path="/reports/insights" element={<ProtectedRoute><InsightsPage /></ProtectedRoute>} />
            <Route path="/reports/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
            
            {/* Settings */}
            <Route path="/settings/school-setup" element={<ProtectedRoute><SchoolSetupPage /></ProtectedRoute>} />
            <Route path="/settings/payments" element={<ProtectedRoute><PaymentsPage /></ProtectedRoute>} />
            <Route path="/settings/communication" element={<ProtectedRoute><CommunicationPage /></ProtectedRoute>} />
            <Route path="/settings/system-security" element={<ProtectedRoute><SystemSecurityPage /></ProtectedRoute>} />
            <Route path="/settings/subscription-billing" element={<ProtectedRoute><SubscriptionBillingPage /></ProtectedRoute>} />
            <Route path="/communications/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
            
            {/* Events */}
            <Route path="/events/management" element={<ProtectedRoute><EventManagementPage /></ProtectedRoute>} />
            <Route path="/events/testing" element={<ProtectedRoute><TestingPage /></ProtectedRoute>} />
            
            {/* Learning Centers */}
            <Route path="/learning-centers" element={<ProtectedRoute><LearningCentersPage /></ProtectedRoute>} />
            <Route path="/learning-centers/homeworks" element={<ProtectedRoute><HomeworksPage /></ProtectedRoute>} />
            
            {/* Marketing Tools */}
            <Route path="/marketing-tools/forms" element={<ProtectedRoute><FormsPage /></ProtectedRoute>} />
            <Route path="/marketing-tools/automations" element={<ProtectedRoute><AutomationsPage /></ProtectedRoute>} />
            
            {/* eStore */}
            <Route path="/estore/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/estore/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
            
            {/* Payments */}
            <Route path="/payments/transaction-errors" element={<ProtectedRoute><TransactionErrorsPage /></ProtectedRoute>} />
            <Route path="/payments/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
            <Route path="/payments/invoices" element={<ProtectedRoute><InvoicesPage /></ProtectedRoute>} />
            <Route path="/payments/autopays" element={<ProtectedRoute><AutopaysPage /></ProtectedRoute>} />
            
            {/* Staff */}
            <Route path="/staff/members" element={<ProtectedRoute><StaffMembersPage /></ProtectedRoute>} />
            <Route path="/staff/clock-in-out" element={<ProtectedRoute><ClockInOutPage /></ProtectedRoute>} />
            <Route path="/staff/log-history" element={<ProtectedRoute><LogHistoryPage /></ProtectedRoute>} />
            
            {/* Reports */}
            <Route path="/reports/insights" element={<ProtectedRoute><InsightsPage /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
            
            {/* Settings */}
            <Route path="/settings/school-setup" element={<ProtectedRoute><SchoolSetupPage /></ProtectedRoute>} />
            <Route path="/settings/payments" element={<ProtectedRoute><PaymentsSettingsPage /></ProtectedRoute>} />
            <Route path="/settings/communication" element={<ProtectedRoute><CommunicationPage /></ProtectedRoute>} />
            <Route path="/settings/system-security" element={<ProtectedRoute><SystemSecurityPage /></ProtectedRoute>} />
            <Route path="/settings/subscription-billing" element={<ProtectedRoute><SubscriptionBillingPage /></ProtectedRoute>} />
            
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