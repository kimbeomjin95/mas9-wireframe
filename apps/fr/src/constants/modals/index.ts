// 🎯 FR 앱 모달 관리 - 도메인/서브메뉴별로 깔끔하게 분리!

// 🎯 Profiles 도메인 (서브메뉴별로 분리: group, tag, member, notification)
export { PROFILE_MODALS, type ProfileModalKey } from './profiles';

// 🎯 Test 도메인
export { TEST_MODALS, type TestModalKey } from './test';

// 🎯 향후 추가될 도메인들:
// - Classes 도메인 (수업 관리)
// - Payments 도메인 (결제 관리) 
// - Reports 도메인 (리포트 관리)
// - Settings 도메인 (설정 관리)
// 각 도메인은 필요시 서브메뉴별로 분리하여 관리