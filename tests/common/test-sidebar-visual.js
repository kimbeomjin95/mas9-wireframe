const { chromium } = require('playwright');

async function testSidebarVisual() {
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

    // 사이드바가 로드될 때까지 대기
    await page.waitForSelector('.MuiDrawer-root', { timeout: 10000 });
    console.log('✅ 사이드바 로드됨');

    // 현재 사이드바 구조 분석
    console.log('\n🔍 사이드바 구조 분석 중...');
    
    // 모든 버튼과 링크 찾기
    const buttons = await page.locator('.MuiDrawer-root button').count();
    const links = await page.locator('.MuiDrawer-root a').count();
    
    console.log(`📊 사이드바 내 버튼 개수: ${buttons}`);
    console.log(`📊 사이드바 내 링크 개수: ${links}`);

    // Fr 앱 섹션 클릭하여 확장
    console.log('\n📂 Fr 앱 섹션 찾기 및 클릭...');
    
    const frButton = page.locator('text=Fr').first();
    if (await frButton.isVisible()) {
      await frButton.click();
      console.log('✅ Fr 앱 섹션 클릭됨');
      await page.waitForTimeout(2000);
      
      // 확장 후 다시 카운트
      const expandedButtons = await page.locator('.MuiDrawer-root button').count();
      const expandedLinks = await page.locator('.MuiDrawer-root a').count();
      
      console.log(`📊 확장 후 버튼 개수: ${expandedButtons}`);
      console.log(`📊 확장 후 링크 개수: ${expandedLinks}`);
    }

    // Home 링크 찾기 및 클릭
    console.log('\n🏠 Home 링크 찾기...');
    const homeLink = page.locator('text=Home').first();
    if (await homeLink.isVisible()) {
      await homeLink.click();
      console.log('✅ Home 링크 클릭됨');
      await page.waitForTimeout(2000);
    }

    // Accounts 섹션 찾기 및 확장
    console.log('\n👥 Accounts 섹션 찾기...');
    const accountsButton = page.locator('text=Accounts').first();
    if (await accountsButton.isVisible()) {
      await accountsButton.click();
      console.log('✅ Accounts 섹션 클릭됨');
      await page.waitForTimeout(2000);
      
      // Profiles 링크 찾기
      const profilesLink = page.locator('text=Profiles').first();
      if (await profilesLink.isVisible()) {
        await profilesLink.click();
        console.log('✅ Profiles 링크 클릭됨');
        await page.waitForTimeout(2000);
      }
    }

    console.log('\n✅ 시각적 테스트 완료. 브라우저가 5초 후 닫힙니다.');
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('테스트 중 오류 발생:', error);
    await page.waitForTimeout(10000); // 오류 발생 시 10초 대기
  } finally {
    await browser.close();
  }
}

testSidebarVisual();