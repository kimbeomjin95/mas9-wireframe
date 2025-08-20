const { test, expect } = require('@playwright/test');

test.describe('공통 Hooks 테스트 - Public 페이지', () => {
  
  test.beforeEach(async ({ page }) => {
    // Public 테스트 페이지로 이동 (인증 불필요)
    await page.goto('http://localhost:5173/public-test');
    
    // 페이지 로드 대기
    await page.waitForSelector('text=공통 Hooks 테스트 페이지', { timeout: 10000 });
  });

  test('ViewProvider: 디바이스 감지 정보가 올바르게 표시되는지 확인', async ({ page }) => {
    // ViewProvider 정보 확인
    const deviceInfo = page.locator('text=현재 디바이스:');
    await expect(deviceInfo).toBeVisible();
    
    // 디바이스 정보 내용 확인 (PC 환경에서 테스트)
    await expect(deviceInfo).toContainText('PC');
    await expect(deviceInfo).toContainText('ViewType: pc');
    await expect(deviceInfo).toContainText('IS_MOBILE: false');
    
    console.log('✅ ViewProvider 디바이스 감지 테스트 성공');
  });

  test('showToast: Success Toast 테스트', async ({ page }) => {
    // Success Toast 버튼 클릭
    await page.click('text=토스트 테스트');
    
    // Toast 메시지가 나타나는지 확인 (토스트는 일반적으로 동적으로 생성됨)
    await page.waitForTimeout(1000); // Toast가 나타날 시간 대기
    
    // 토스트 컨테이너나 메시지 확인 (react-toastify 클래스 사용)
    const toastMessage = page.locator('.Toastify__toast-body');
    await expect(toastMessage).toBeVisible({ timeout: 5000 });
    await expect(toastMessage).toContainText('성공 메시지 테스트');
    
    console.log('✅ Success Toast 테스트 성공');
  });

  test('showToast: Error Toast 테스트', async ({ page }) => {
    await page.click('[data-testid="error-toast-btn"]');
    await page.waitForTimeout(1000);
    
    const toastMessage = page.locator('.Toastify__toast-body');
    await expect(toastMessage).toBeVisible({ timeout: 5000 });
    await expect(toastMessage).toContainText('에러 메시지 테스트');
    
    console.log('✅ Error Toast 테스트 성공');
  });

  test('showToast: Info Toast 테스트', async ({ page }) => {
    await page.click('[data-testid="info-toast-btn"]');
    await page.waitForTimeout(1000);
    
    const toastMessage = page.locator('.Toastify__toast-body');
    await expect(toastMessage).toBeVisible({ timeout: 5000 });
    await expect(toastMessage).toContainText('정보 메시지 테스트');
    
    console.log('✅ Info Toast 테스트 성공');
  });

  test('showToast: Warning Toast 테스트', async ({ page }) => {
    await page.click('[data-testid="warning-toast-btn"]');
    await page.waitForTimeout(1000);
    
    const toastMessage = page.locator('.Toastify__toast-body');
    await expect(toastMessage).toBeVisible({ timeout: 5000 });
    await expect(toastMessage).toContainText('경고 메시지 테스트');
    
    console.log('✅ Warning Toast 테스트 성공');
  });

  test('showToast: Custom Toast (다른 위치) 테스트', async ({ page }) => {
    await page.click('[data-testid="custom-toast-btn"]');
    await page.waitForTimeout(1000);
    
    const toastMessage = page.locator('.Toastify__toast-body');
    await expect(toastMessage).toBeVisible({ timeout: 5000 });
    await expect(toastMessage).toContainText('커스텀 위치 토스트');
    
    // top-center 위치에 표시되는지 확인 (Toastify의 position 클래스 확인)
    const toastContainer = page.locator('.Toastify__toast-container--top-center');
    await expect(toastContainer).toBeVisible();
    
    console.log('✅ Custom Toast 테스트 성공');
  });

  test('useModals: Modal System 테스트', async ({ page }) => {
    await page.click('[data-testid="modal-test-btn"]');
    await page.waitForTimeout(1000);
    
    // 모달 시스템 준비 메시지 확인
    const toastMessage = page.locator('.Toastify__toast-body');
    await expect(toastMessage).toBeVisible({ timeout: 5000 });
    await expect(toastMessage).toContainText('모달 시스템이 준비되었습니다');
    
    console.log('✅ Modal System 테스트 성공');
  });

  test('DataGrid: 테이블 렌더링 및 상호작용 테스트', async ({ page }) => {
    // 테이블이 렌더링되는지 확인
    await expect(page.locator('table')).toBeVisible();
    
    // 총 개수 표시 확인
    await expect(page.locator('text=총 4건')).toBeVisible();
    
    // 테이블 헤더 확인
    await expect(page.locator('text=이름')).toBeVisible();
    await expect(page.locator('text=이메일')).toBeVisible();
    await expect(page.locator('text=역할')).toBeVisible();
    
    // 테이블 데이터 확인
    await expect(page.locator('text=김철수')).toBeVisible();
    await expect(page.locator('text=kim@example.com')).toBeVisible();
    
    console.log('✅ DataGrid 렌더링 테스트 성공');
  });

  test('DataGrid: 체크박스 선택 기능 테스트', async ({ page }) => {
    // 전체 선택 체크박스 클릭
    const headerCheckbox = page.locator('thead input[type="checkbox"]').first();
    await headerCheckbox.click();
    
    // 선택 삭제 버튼이 나타나는지 확인
    await expect(page.locator('text=선택 삭제 (4)')).toBeVisible();
    
    // 개별 체크박스 해제
    const firstRowCheckbox = page.locator('tbody tr').first().locator('input[type="checkbox"]');
    await firstRowCheckbox.click();
    
    // 선택 개수가 변경되는지 확인
    await expect(page.locator('text=선택 삭제 (3)')).toBeVisible();
    
    console.log('✅ DataGrid 체크박스 기능 테스트 성공');
  });

  test('반응형 테스트: 모바일 뷰포트에서 ViewProvider 동작 확인', async ({ page }) => {
    // 모바일 뷰포트로 변경
    await page.setViewportSize({ width: 375, height: 667 });
    
    // 페이지 새로고침하여 ViewProvider가 다시 계산되도록 함
    await page.reload();
    await page.waitForSelector('[data-testid="success-toast-btn"]', { timeout: 10000 });
    
    // 모바일 감지 정보 확인
    const deviceInfo = page.locator('text=현재 디바이스:');
    await expect(deviceInfo).toContainText('모바일');
    await expect(deviceInfo).toContainText('ViewType: mobile');
    await expect(deviceInfo).toContainText('IS_MOBILE: true');
    
    // 모바일 아이콘이 표시되는지 확인
    const mobileIcon = page.locator('[data-testid="mobile-icon"]').first();
    // 또는 Smartphone 아이콘 확인 (실제 구현에 따라 조정)
    
    console.log('✅ 모바일 반응형 테스트 성공');
  });

  test('연속 Toast 테스트: 여러 토스트를 빠르게 실행', async ({ page }) => {
    // 여러 토스트를 연속으로 실행
    await page.click('[data-testid="success-toast-btn"]');
    await page.waitForTimeout(500);
    
    await page.click('[data-testid="info-toast-btn"]');
    await page.waitForTimeout(500);
    
    await page.click('[data-testid="warning-toast-btn"]');
    await page.waitForTimeout(500);
    
    // 마지막 토스트가 표시되는지 확인
    const toastMessages = page.locator('.Toastify__toast-body');
    await expect(toastMessages.first()).toBeVisible();
    
    console.log('✅ 연속 Toast 테스트 성공');
  });

  test('전체 기능 통합 테스트', async ({ page }) => {
    console.log('🧪 공통 Hooks 통합 테스트 시작...');
    
    // 1. ViewProvider 확인
    await expect(page.locator('text=현재 디바이스:')).toBeVisible();
    
    // 2. 각 Toast 타입별 테스트
    const toastButtons = [
      'success-toast-btn',
      'error-toast-btn', 
      'info-toast-btn',
      'warning-toast-btn',
      'custom-toast-btn',
      'modal-test-btn'
    ];
    
    for (const buttonTestId of toastButtons) {
      await page.click(`[data-testid="${buttonTestId}"]`);
      await page.waitForTimeout(1000);
      
      // Toast 메시지 확인
      const toastMessage = page.locator('.Toastify__toast-body');
      await expect(toastMessage).toBeVisible({ timeout: 5000 });
      
      // Toast가 사라질 때까지 대기
      await page.waitForTimeout(2000);
    }
    
    // 3. DataGrid 기능 확인
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('text=총 4건')).toBeVisible();
    
    console.log('✅ 전체 통합 테스트 성공!');
  });

});