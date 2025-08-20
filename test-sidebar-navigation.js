const { chromium } = require('playwright');

async function testSidebarNavigation() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 앱에 접속
    await page.goto('http://localhost:3001/mas9-wireframe/');
    console.log('✅ 앱에 접속');

    // 로그인 페이지로 리다이렉트되는지 확인하고 로그인 처리
    await page.waitForTimeout(2000);
    
    // 로그인 페이지인지 확인
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('📝 로그인 페이지에서 로그인 진행');
      
      // 이메일 입력 (기본값이 이미 있을 수 있음)
      const emailInput = page.locator('input[type="email"]');
      await emailInput.clear();
      await emailInput.fill('admin@demo.com');
      
      // 패스워드 입력
      const passwordInput = page.locator('input[type="password"]');
      await passwordInput.fill('123456');
      
      // 로그인 버튼 클릭
      const loginButton = page.locator('button[type="submit"]');
      await loginButton.click();
      console.log('✅ 로그인 시도 완료');
      
      // 로그인 성공 후 리다이렉트 대기
      await page.waitForTimeout(3000);
    }

    // 사이드바 메뉴 항목들을 정의
    const menuItems = [
      { name: 'Home', path: '/home' },
      
      // Accounts
      { name: 'Profiles', path: '/accounts/profiles' },
      { name: 'Groups', path: '/accounts/groups' },
      { name: 'Tags', path: '/accounts/tags' },
      
      // Memberships
      { name: 'Membership Management', path: '/memberships/management' },
      
      // Class
      { name: 'Class Management', path: '/class/management' },
      { name: 'Attendance History', path: '/class/attendance-history' },
      { name: 'Bulk Actions', path: '/class/bulk-actions' },
      { name: 'Self Check-in', path: '/class/self-check-in' },
      
      // Communications
      { name: 'Messaging', path: '/communications/messaging' },
      { name: 'Announcements', path: '/communications/announcements' },
      { name: 'Conversations', path: '/communications/conversations' },
      
      // Events
      { name: 'Event Management', path: '/events/management' },
      { name: 'Testing', path: '/events/testings' },
      
      // Learning Centers
      { name: 'Learning Centers', path: '/learning-centers/centers' },
      { name: 'Homeworks', path: '/learning-centers/homeworks' },
      
      // Marketing Tools
      { name: 'Forms', path: '/marketing-tools/forms' },
      { name: 'Automations', path: '/marketing-tools/automations' },
      
      // eStore
      { name: 'Orders', path: '/estore/orders' },
      { name: 'Products', path: '/estore/products' },
      
      // Payments
      { name: 'Transaction Errors', path: '/payments/transaction-errors' },
      { name: 'Transactions', path: '/payments/transactions' },
      { name: 'Invoices', path: '/payments/invoices' },
      { name: 'Autopays', path: '/payments/autopays' },
      
      // Staff
      { name: 'Staff Members', path: '/staff/members' },
      { name: 'Clock In/Out', path: '/staff/clock-in-out' },
      { name: 'Log History', path: '/staff/log-history' },
      
      // Reports
      { name: 'Insights', path: '/reports/insights' },
      { name: 'Reports', path: '/reports/reports' },
      
      // Settings
      { name: 'School Setup', path: '/settings/school-setup' },
      { name: 'Payments', path: '/settings/payments' },
      { name: 'Communication', path: '/settings/communication' },
      { name: 'System & Security', path: '/settings/system-security' },
      { name: 'Subscription & Billing', path: '/settings/subscription-billing' }
    ];

    console.log(`🚀 ${menuItems.length}개의 메뉴 항목을 테스트합니다...`);

    let successCount = 0;
    let failCount = 0;

    for (const item of menuItems) {
      try {
        console.log(`\n📍 Testing: ${item.name} (${item.path})`);
        
        // 직접 URL로 이동하여 페이지가 로드되는지 확인
        await page.goto(`http://localhost:3001/mas9-wireframe${item.path}`);
        await page.waitForTimeout(1000);
        
        // 페이지가 올바르게 로드되었는지 확인 (에러 페이지가 아닌지)
        const currentUrl = page.url();
        if (currentUrl.includes(item.path) || currentUrl.includes('/mas9-wireframe' + item.path)) {
          console.log(`✅ ${item.name}: 페이지 로드 성공`);
          successCount++;
        } else {
          console.log(`❌ ${item.name}: 페이지 로드 실패 - URL: ${currentUrl}`);
          failCount++;
        }
        
        await page.waitForTimeout(500); // 각 테스트 간 딜레이
        
      } catch (error) {
        console.log(`❌ ${item.name}: 에러 발생 - ${error.message}`);
        failCount++;
      }
    }

    console.log(`\n📊 테스트 결과:`);
    console.log(`✅ 성공: ${successCount}개`);
    console.log(`❌ 실패: ${failCount}개`);
    console.log(`📈 성공률: ${((successCount / menuItems.length) * 100).toFixed(1)}%`);

  } catch (error) {
    console.error('테스트 중 오류 발생:', error);
  } finally {
    await browser.close();
  }
}

testSidebarNavigation();