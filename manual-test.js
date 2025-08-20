const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🚀 수동 테스트 시작...');
  
  try {
    // 1. 페이지 이동
    console.log('1. Public 테스트 페이지로 이동...');
    await page.goto('http://localhost:5173/public-test', { waitUntil: 'networkidle' });
    
    // 페이지 제목 확인
    const title = await page.title();
    console.log('페이지 제목:', title);
    
    // 2. 기본 요소 확인
    console.log('2. 기본 요소 확인...');
    const heading = await page.textContent('h1, h4');
    console.log('메인 헤딩:', heading);
    
    // 3. ViewProvider 정보 확인
    console.log('3. ViewProvider 정보 확인...');
    try {
      const deviceInfo = await page.textContent('.MuiAlert-message');
      console.log('디바이스 정보:', deviceInfo);
    } catch (error) {
      console.log('디바이스 정보 요소를 찾을 수 없습니다.');
    }
    
    // 4. Toast 버튼 확인
    console.log('4. Toast 버튼 확인...');
    const buttons = await page.$$('button');
    console.log(`버튼 개수: ${buttons.length}`);
    
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      console.log(`버튼 ${i + 1}: ${text}`);
    }
    
    // 5. Toast 테스트
    console.log('5. Success Toast 테스트...');
    try {
      await page.click('button:has-text("Success Toast")');
      console.log('Success Toast 버튼 클릭됨');
      
      // Toast 메시지 대기
      await page.waitForTimeout(2000);
      
      // Toast 확인
      const toastExists = await page.locator('.Toastify__toast').count();
      console.log(`Toast 개수: ${toastExists}`);
      
      if (toastExists > 0) {
        const toastText = await page.locator('.Toastify__toast-body').first().textContent();
        console.log('Toast 메시지:', toastText);
        console.log('✅ Toast 테스트 성공!');
      } else {
        console.log('❌ Toast가 표시되지 않음');
      }
    } catch (error) {
      console.log('Toast 테스트 실패:', error.message);
    }
    
    // 6. 다른 Toast 타입 테스트
    console.log('6. Error Toast 테스트...');
    try {
      await page.click('button:has-text("Error Toast")');
      await page.waitForTimeout(1000);
      console.log('✅ Error Toast 테스트 완료');
    } catch (error) {
      console.log('❌ Error Toast 테스트 실패:', error.message);
    }
    
    console.log('7. 모바일 뷰포트 테스트...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload({ waitUntil: 'networkidle' });
    
    // 모바일에서 디바이스 정보 확인
    await page.waitForTimeout(1000);
    try {
      const mobileDeviceInfo = await page.textContent('.MuiAlert-message');
      console.log('모바일 디바이스 정보:', mobileDeviceInfo);
      
      if (mobileDeviceInfo.includes('모바일')) {
        console.log('✅ 모바일 감지 성공!');
      } else {
        console.log('❌ 모바일 감지 실패');
      }
    } catch (error) {
      console.log('모바일 디바이스 정보 확인 실패:', error.message);
    }
    
    console.log('🎉 수동 테스트 완료!');
    
  } catch (error) {
    console.error('❌ 테스트 실패:', error.message);
  }
  
  // 브라우저를 5초 후에 닫음
  await page.waitForTimeout(5000);
  await browser.close();
})();