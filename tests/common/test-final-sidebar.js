const { chromium } = require('playwright');

async function testFinalSidebar() {
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

    // 더 구체적인 선택자로 요소 찾기
    console.log('\n🔍 사이드바 요소 찾기...');
    
    // MUI List 항목들 찾기
    const listItems = await page.locator('.MuiList-root .MuiListItem-root').count();
    console.log(`📊 List 항목 개수: ${listItems}`);
    
    // MUI ListItemButton 찾기
    const listButtons = await page.locator('.MuiListItemButton-root').count();
    console.log(`📊 ListItemButton 개수: ${listButtons}`);

    let successCount = 0;
    let testCount = 0;

    // 1. Fr 앱 섹션 활성화
    console.log('\n📂 1. Fr 앱 섹션 클릭 시도...');
    testCount++;
    
    const frSection = page.locator('.MuiListItemButton-root:has-text("Fr")').first();
    if (await frSection.isVisible({ timeout: 3000 })) {
      await frSection.click();
      console.log('✅ Fr 앱 섹션 클릭 성공');
      successCount++;
      await page.waitForTimeout(1000);
    } else {
      console.log('❌ Fr 앱 섹션을 찾을 수 없음');
    }

    // 2. Home 메뉴 클릭
    console.log('\n🏠 2. Home 메뉴 클릭 시도...');
    testCount++;
    
    const homeMenu = page.locator('.MuiListItemButton-root:has-text("Home")').first();
    if (await homeMenu.isVisible({ timeout: 3000 })) {
      await homeMenu.click();
      console.log('✅ Home 메뉴 클릭 성공');
      successCount++;
      await page.waitForTimeout(1000);
      
      // URL 확인
      const currentPath = page.url();
      if (currentPath.includes('/home')) {
        console.log('✅ Home 페이지로 네비게이션 성공');
      }
    } else {
      console.log('❌ Home 메뉴를 찾을 수 없음');
    }

    // 3. Accounts 섹션 확장
    console.log('\n👥 3. Accounts 섹션 확장 시도...');
    testCount++;
    
    const accountsSection = page.locator('.MuiListItemButton-root:has-text("Accounts")').first();
    if (await accountsSection.isVisible({ timeout: 3000 })) {
      await accountsSection.click();
      console.log('✅ Accounts 섹션 클릭 성공');
      successCount++;
      await page.waitForTimeout(1000);
      
      // 4. Profiles 하위 메뉴 클릭
      console.log('\n📋 4. Profiles 하위 메뉴 클릭 시도...');
      testCount++;
      
      const profilesMenu = page.locator('.MuiListItemButton-root:has-text("Profiles")').first();
      if (await profilesMenu.isVisible({ timeout: 3000 })) {
        await profilesMenu.click();
        console.log('✅ Profiles 메뉴 클릭 성공');
        successCount++;
        await page.waitForTimeout(1000);
        
        // URL 확인
        const profilesPath = page.url();
        if (profilesPath.includes('/accounts/profiles')) {
          console.log('✅ Profiles 페이지로 네비게이션 성공');
        }
      } else {
        console.log('❌ Profiles 메뉴를 찾을 수 없음');
      }
    } else {
      console.log('❌ Accounts 섹션을 찾을 수 없음');
    }

    // 5. Settings 섹션 테스트
    console.log('\n⚙️ 5. Settings 섹션 확장 시도...');
    testCount++;
    
    const settingsSection = page.locator('.MuiListItemButton-root:has-text("Settings")').first();
    if (await settingsSection.isVisible({ timeout: 3000 })) {
      await settingsSection.click();
      console.log('✅ Settings 섹션 클릭 성공');
      successCount++;
      await page.waitForTimeout(1000);
      
      // 6. School Setup 하위 메뉴 클릭
      console.log('\n🏫 6. School Setup 하위 메뉴 클릭 시도...');
      testCount++;
      
      const schoolSetupMenu = page.locator('.MuiListItemButton-root:has-text("School Setup")').first();
      if (await schoolSetupMenu.isVisible({ timeout: 3000 })) {
        await schoolSetupMenu.click();
        console.log('✅ School Setup 메뉴 클릭 성공');
        successCount++;
        await page.waitForTimeout(1000);
        
        // URL 확인
        const schoolSetupPath = page.url();
        if (schoolSetupPath.includes('/settings/school-setup')) {
          console.log('✅ School Setup 페이지로 네비게이션 성공');
        }
      } else {
        console.log('❌ School Setup 메뉴를 찾을 수 없음');
      }
    } else {
      console.log('❌ Settings 섹션을 찾을 수 없음');
    }

    console.log(`\n📊 최종 테스트 결과:`);
    console.log(`✅ 성공: ${successCount}/${testCount}`);
    console.log(`📈 성공률: ${((successCount / testCount) * 100).toFixed(1)}%`);

    if (successCount >= testCount * 0.8) {
      console.log('🎉 사이드바 네비게이션 테스트 대부분 성공!');
    } else if (successCount > 0) {
      console.log('⚠️ 사이드바 네비게이션 일부 성공, 개선 필요');
    } else {
      console.log('❌ 사이드바 네비게이션 테스트 실패');
    }

  } catch (error) {
    console.error('테스트 중 오류 발생:', error);
  } finally {
    await browser.close();
  }
}

testFinalSidebar();