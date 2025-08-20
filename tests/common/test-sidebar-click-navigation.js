const { chromium } = require('playwright');

async function testSidebarClickNavigation() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 앱에 접속
    await page.goto('http://localhost:3001/mas9-wireframe/');
    console.log('✅ 앱에 접속');

    // 로그인 처리
    await page.waitForTimeout(2000);
    
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('📝 로그인 페이지에서 로그인 진행');
      
      const emailInput = page.locator('input[type="email"]');
      await emailInput.clear();
      await emailInput.fill('admin@demo.com');
      
      const passwordInput = page.locator('input[type="password"]');
      await passwordInput.fill('123456');
      
      const loginButton = page.locator('button[type="submit"]');
      await loginButton.click();
      console.log('✅ 로그인 시도 완료');
      
      await page.waitForTimeout(3000);
    }

    // 사이드바가 로드될 때까지 대기 (Drawer 사용)
    await page.waitForSelector('.MuiDrawer-root', { timeout: 10000 });
    console.log('✅ 사이드바 로드됨');

    // 테스트할 사이드바 메뉴 항목들
    const sidebarItems = [
      { name: 'Home', selector: 'a[href*="/home"]' },
      
      // 1차 메뉴 확장 후 2차 메뉴 클릭
      { name: 'Accounts 확장', selector: 'button:has-text("Accounts"), div:has-text("Accounts") button' },
      { name: 'Profiles', selector: 'a[href*="/accounts/profiles"]' },
      { name: 'Groups', selector: 'a[href*="/accounts/groups"]' },
      
      { name: 'Class 확장', selector: 'button:has-text("Class"), div:has-text("Class") button' },
      { name: 'Class Management', selector: 'a[href*="/class/management"]' },
      { name: 'Attendance History', selector: 'a[href*="/class/attendance-history"]' },
      
      { name: 'Settings 확장', selector: 'button:has-text("Settings"), div:has-text("Settings") button' },
      { name: 'School Setup', selector: 'a[href*="/settings/school-setup"]' },
      { name: 'Payments Settings', selector: 'a[href*="/settings/payments"]' },
    ];

    console.log(`🚀 ${sidebarItems.length}개의 사이드바 항목을 클릭 테스트합니다...`);

    let successCount = 0;
    let failCount = 0;

    for (const item of sidebarItems) {
      try {
        console.log(`\n📍 Testing: ${item.name}`);
        
        // 요소가 존재하는지 확인
        const element = page.locator(item.selector).first();
        
        if (await element.isVisible({ timeout: 2000 })) {
          await element.click();
          await page.waitForTimeout(1000);
          
          console.log(`✅ ${item.name}: 클릭 성공`);
          successCount++;
        } else {
          console.log(`⚠️ ${item.name}: 요소가 보이지 않음`);
          failCount++;
        }
        
        await page.waitForTimeout(500);
        
      } catch (error) {
        console.log(`❌ ${item.name}: 에러 발생 - ${error.message}`);
        failCount++;
      }
    }

    // 추가로 직접적인 메뉴 항목 클릭 테스트
    console.log('\n🔍 실제 메뉴 링크 검색 및 클릭 테스트...');
    
    const menuLinks = [
      '/home',
      '/accounts/profiles',
      '/class/management',
      '/settings/school-setup'
    ];

    for (const link of menuLinks) {
      try {
        const linkElement = page.locator(`a[href*="${link}"]`).first();
        if (await linkElement.isVisible({ timeout: 2000 })) {
          await linkElement.click();
          await page.waitForTimeout(1000);
          
          const currentPath = new URL(page.url()).pathname;
          if (currentPath.includes(link) || currentPath.includes('/mas9-wireframe' + link)) {
            console.log(`✅ ${link}: 네비게이션 성공`);
            successCount++;
          } else {
            console.log(`❌ ${link}: 네비게이션 실패 - 현재 경로: ${currentPath}`);
            failCount++;
          }
        } else {
          console.log(`⚠️ ${link}: 링크가 보이지 않음`);
          failCount++;
        }
      } catch (error) {
        console.log(`❌ ${link}: 에러 발생 - ${error.message}`);
        failCount++;
      }
    }

    console.log(`\n📊 클릭 테스트 결과:`);
    console.log(`✅ 성공: ${successCount}개`);
    console.log(`❌ 실패: ${failCount}개`);
    console.log(`📈 성공률: ${((successCount / (successCount + failCount)) * 100).toFixed(1)}%`);

  } catch (error) {
    console.error('테스트 중 오류 발생:', error);
  } finally {
    await browser.close();
  }
}

testSidebarClickNavigation();