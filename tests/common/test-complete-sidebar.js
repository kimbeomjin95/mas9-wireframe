const { chromium } = require('playwright');

async function testCompleteSidebar() {
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
      
      await page.waitForTimeout(4000);
    }

    // 관리자 레이아웃이 로드될 때까지 대기
    await page.waitForSelector('.MuiDrawer-root', { timeout: 10000 });
    console.log('✅ 사이드바 로드됨');

    // 테스트할 메뉴 시나리오들
    const testScenarios = [
      {
        name: 'Home 페이지 네비게이션',
        steps: [
          { action: 'click', selector: 'span:has-text("Home")', description: 'Home 메뉴 클릭' },
          { action: 'verify', url: '/home', description: 'Home 페이지 확인' }
        ]
      },
      {
        name: 'Accounts - Profiles 네비게이션',
        steps: [
          { action: 'click', selector: 'span:has-text("Accounts")', description: 'Accounts 섹션 확장' },
          { action: 'wait', duration: 1000 },
          { action: 'click', selector: 'span:has-text("Profiles")', description: 'Profiles 메뉴 클릭' },
          { action: 'verify', url: '/accounts/profiles', description: 'Profiles 페이지 확인' }
        ]
      },
      {
        name: 'Class - Management 네비게이션',
        steps: [
          { action: 'click', selector: 'span:has-text("Class")', description: 'Class 섹션 확장' },
          { action: 'wait', duration: 1000 },
          { action: 'click', selector: 'span:has-text("Class Management")', description: 'Class Management 메뉴 클릭' },
          { action: 'verify', url: '/class/management', description: 'Class Management 페이지 확인' }
        ]
      },
      {
        name: 'Settings - School Setup 네비게이션',
        steps: [
          { action: 'click', selector: 'span:has-text("Settings")', description: 'Settings 섹션 확장' },
          { action: 'wait', duration: 1000 },
          { action: 'click', selector: 'span:has-text("School Setup")', description: 'School Setup 메뉴 클릭' },
          { action: 'verify', url: '/settings/school-setup', description: 'School Setup 페이지 확인' }
        ]
      },
      {
        name: 'eStore - Orders 네비게이션',
        steps: [
          { action: 'click', selector: 'span:has-text("eStore")', description: 'eStore 섹션 확장' },
          { action: 'wait', duration: 1000 },
          { action: 'click', selector: 'span:has-text("Orders")', description: 'Orders 메뉴 클릭' },
          { action: 'verify', url: '/estore/orders', description: 'Orders 페이지 확인' }
        ]
      }
    ];

    let totalSuccessCount = 0;
    let totalTestCount = 0;

    console.log(`\n🚀 ${testScenarios.length}개의 네비게이션 시나리오를 테스트합니다...`);

    for (const scenario of testScenarios) {
      console.log(`\n📋 ${scenario.name} 테스트 시작`);
      let scenarioSuccess = true;
      
      for (const step of scenario.steps) {
        totalTestCount++;
        
        try {
          switch (step.action) {
            case 'click':
              console.log(`  🖱️ ${step.description}`);
              const element = page.locator(step.selector).first();
              
              if (await element.isVisible({ timeout: 3000 })) {
                await element.click();
                console.log(`  ✅ ${step.description} 성공`);
                totalSuccessCount++;
              } else {
                console.log(`  ❌ ${step.description} 실패 - 요소를 찾을 수 없음`);
                scenarioSuccess = false;
              }
              break;
              
            case 'wait':
              await page.waitForTimeout(step.duration);
              totalSuccessCount++;
              break;
              
            case 'verify':
              console.log(`  🔍 ${step.description}`);
              await page.waitForTimeout(1000);
              const currentPath = page.url();
              
              if (currentPath.includes(step.url)) {
                console.log(`  ✅ ${step.description} 성공 - URL: ${step.url}`);
                totalSuccessCount++;
              } else {
                console.log(`  ❌ ${step.description} 실패 - 현재 URL: ${currentPath}`);
                scenarioSuccess = false;
              }
              break;
          }
        } catch (error) {
          console.log(`  ❌ ${step.description} 에러: ${error.message}`);
          scenarioSuccess = false;
        }
      }
      
      if (scenarioSuccess) {
        console.log(`  🎉 ${scenario.name} 시나리오 완료!`);
      } else {
        console.log(`  ⚠️ ${scenario.name} 시나리오 일부 실패`);
      }
    }

    // 추가 직접 URL 테스트
    console.log('\n🔗 추가 직접 URL 네비게이션 테스트...');
    
    const directUrlTests = [
      '/memberships/management',
      '/communications/messaging',
      '/payments/transactions',
      '/staff/members',
      '/reports/insights'
    ];

    for (const testUrl of directUrlTests) {
      totalTestCount++;
      try {
        await page.goto(`http://localhost:3001/mas9-wireframe${testUrl}`);
        await page.waitForTimeout(1000);
        
        const currentPath = page.url();
        if (currentPath.includes(testUrl)) {
          console.log(`  ✅ 직접 네비게이션 성공: ${testUrl}`);
          totalSuccessCount++;
        } else {
          console.log(`  ❌ 직접 네비게이션 실패: ${testUrl}`);
        }
      } catch (error) {
        console.log(`  ❌ 직접 네비게이션 에러: ${testUrl} - ${error.message}`);
      }
    }

    console.log(`\n📊 전체 테스트 결과:`);
    console.log(`✅ 성공: ${totalSuccessCount}/${totalTestCount}`);
    console.log(`📈 성공률: ${((totalSuccessCount / totalTestCount) * 100).toFixed(1)}%`);

    if (totalSuccessCount >= totalTestCount * 0.9) {
      console.log('🎉 사이드바 네비게이션 테스트 대성공! 거의 모든 기능이 정상 작동합니다.');
    } else if (totalSuccessCount >= totalTestCount * 0.7) {
      console.log('✅ 사이드바 네비게이션 테스트 성공! 대부분의 기능이 정상 작동합니다.');
    } else if (totalSuccessCount >= totalTestCount * 0.5) {
      console.log('⚠️ 사이드바 네비게이션 일부 성공, 일부 개선이 필요합니다.');
    } else {
      console.log('❌ 사이드바 네비게이션 테스트 실패, 많은 개선이 필요합니다.');
    }

  } catch (error) {
    console.error('테스트 중 오류 발생:', error);
  } finally {
    await browser.close();
  }
}

testCompleteSidebar();