const { chromium } = require('playwright');

async function testWebApp() {
  console.log('🚀 E2E 테스트 시작...');
  
  // 브라우저 시작
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('📍 1. 로그인 페이지 접근');
    await page.goto('http://localhost:3001/mas9-wireframe/login');
    await page.waitForTimeout(2000);

    // 로그인 폼 확인
    console.log('📍 2. 로그인 폼 요소 확인');
    const emailInput = await page.locator('input[type="email"]');
    const passwordInput = await page.locator('input[type="password"]');
    const loginButton = await page.locator('button[type="submit"]');
    
    console.log('📧 이메일 필드 존재:', await emailInput.count() > 0);
    console.log('🔒 패스워드 필드 존재:', await passwordInput.count() > 0);
    console.log('🔘 로그인 버튼 존재:', await loginButton.count() > 0);

    // 기본 이메일 값 확인
    const defaultEmail = await emailInput.inputValue();
    console.log('📧 기본 이메일 값:', defaultEmail);

    // 로그인 정보 입력
    console.log('📍 3. 로그인 정보 입력');
    await emailInput.fill('mas9test@gmail.com');
    await passwordInput.fill('1234');
    
    console.log('📍 4. 로그인 버튼 클릭');
    await loginButton.click();

    // 페이지 이동 대기
    console.log('📍 5. 대시보드 페이지 이동 대기');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    
    const currentUrl = page.url();
    console.log('🌍 현재 URL:', currentUrl);

    // 대시보드 요소 확인
    console.log('📍 6. 대시보드 컴포넌트 확인');
    await page.waitForTimeout(3000);
    
    const dashboardTitle = await page.locator('h1, h4').filter({ hasText: '대시보드' });
    const userWelcome = await page.locator('text=님!');
    const statsCards = await page.locator('[data-testid="dashboard-card"], .MuiCard-root');
    
    console.log('📊 대시보드 제목 존재:', await dashboardTitle.count() > 0);
    console.log('👋 사용자 환영 메시지 존재:', await userWelcome.count() > 0);
    console.log('📈 통계 카드 개수:', await statsCards.count());

    // 사이드바 메뉴 확인
    console.log('📍 7. 사이드바 메뉴 확인');
    const sidebarItems = await page.locator('nav a, [role="menuitem"]');
    console.log('🔗 사이드바 메뉴 항목 수:', await sidebarItems.count());

    // 로그인 상태에서 새로고침 테스트
    console.log('📍 8. 로그인 상태 새로고침 테스트');
    await page.reload();
    await page.waitForTimeout(3000);
    
    const urlAfterReload = page.url();
    console.log('🔄 새로고침 후 URL:', urlAfterReload);
    
    if (urlAfterReload.includes('/dashboard')) {
      console.log('✅ 새로고침 후에도 로그인 상태 유지됨');
    } else {
      console.log('❌ 새로고침 후 로그인 페이지로 이동됨');
    }

    // 로그아웃 테스트
    console.log('📍 9. 로그아웃 테스트');
    const logoutButton = await page.locator('text="로그아웃"').first();
    
    if (await logoutButton.count() > 0) {
      console.log('🔘 로그아웃 버튼 찾음');
      await logoutButton.click();
      await page.waitForTimeout(2000);
      
      // 로그인 페이지로 이동되었는지 확인
      const logoutUrl = page.url();
      console.log('🚪 로그아웃 후 URL:', logoutUrl);
      
      if (logoutUrl.includes('/login')) {
        console.log('✅ 로그아웃 성공 - 로그인 페이지로 이동');
        
        // 재로그인 테스트
        console.log('📍 10. 재로그인 테스트');
        await page.waitForTimeout(2000);
        
        const emailInput2 = await page.locator('input[type="email"]');
        const passwordInput2 = await page.locator('input[type="password"]');
        const loginButton2 = await page.locator('button[type="submit"]');
        
        // 로그인 정보 다시 입력
        await emailInput2.fill('mas9test@gmail.com');
        await passwordInput2.fill('1234');
        await loginButton2.click();
        
        await page.waitForTimeout(5000);
        const reLoginUrl = page.url();
        console.log('🔄 재로그인 후 URL:', reLoginUrl);
        
        if (reLoginUrl.includes('/dashboard')) {
          console.log('✅ 재로그인 성공');
        } else {
          console.log('❌ 재로그인 실패');
        }
        
      } else {
        console.log('❌ 로그아웃 후에도 대시보드에 남아있음');
      }
    } else {
      console.log('❌ 로그아웃 버튼을 찾을 수 없음');
      
      // 대안으로 사용자 메뉴나 드롭다운 찾기
      const userMenus = await page.locator('[data-testid="user-menu"], [aria-label*="user"], .user-menu, [role="button"]:has-text("mas9test")').all();
      console.log('👤 사용자 메뉴 후보:', userMenus.length);
      
      if (userMenus.length > 0) {
        await userMenus[0].click();
        await page.waitForTimeout(1000);
        
        const logoutInMenu = await page.locator('button:has-text("로그아웃"), [role="menuitem"]:has-text("로그아웃")').first();
        if (await logoutInMenu.count() > 0) {
          await logoutInMenu.click();
          console.log('✅ 메뉴에서 로그아웃 클릭');
        }
      }
    }

    console.log('🎉 모든 테스트 완료!');

  } catch (error) {
    console.error('❌ 테스트 실패:', error);
    
    // 스크린샷 저장
    await page.screenshot({ path: 'test-failure.png' });
    console.log('📸 실패 스크린샷 저장: test-failure.png');
  } finally {
    await browser.close();
  }
}

// 테스트 실행
testWebApp().catch(console.error);