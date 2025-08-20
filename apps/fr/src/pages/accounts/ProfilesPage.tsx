import React, { useState } from 'react';
import { Box, Typography, Button, Chip, Card, CardContent, Alert } from '@mui/material';
import { Users, Plus, Edit, Trash2, Smartphone, Monitor, TestTube } from 'lucide-react';
import { DataGrid, ColumnDef, useView, showToast } from '@mas9/shared-ui';
import { useModal } from '@/hooks/useModal';
import { TEST_MODALS, PROFILE_NOTIFICATION_MODALS } from '@/constants/modals';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
}

const ProfilesPage: React.FC = () => {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  
  // 공통 hooks 사용
  const { IS_MOBILE, IS_TABLET, viewType } = useView();
  const { openModal } = useModal();

  // 샘플 데이터
  const profiles: UserProfile[] = [
    {
      id: 1,
      name: '김철수',
      email: 'kim@example.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2024-08-20 09:30'
    },
    {
      id: 2,
      name: '이영희',
      email: 'lee@example.com',
      role: 'teacher',
      status: 'active',
      createdAt: '2024-02-20',
      lastLogin: '2024-08-19 14:20'
    },
    {
      id: 3,
      name: '박민수',
      email: 'park@example.com',
      role: 'student',
      status: 'inactive',
      createdAt: '2024-03-10',
      lastLogin: '2024-08-10 16:45'
    },
    {
      id: 4,
      name: '최미영',
      email: 'choi@example.com',
      role: 'parent',
      status: 'active',
      createdAt: '2024-03-15',
      lastLogin: '2024-08-20 08:15'
    }
  ];

  const columns: ColumnDef<UserProfile>[] = [
    {
      name: '이름',
      field: 'name',
      width: 120,
      align: 'left'
    },
    {
      name: '이메일',
      field: 'email',
      width: 200,
      align: 'left'
    },
    {
      name: '역할',
      field: 'role',
      width: 100,
      formatter: (row) => {
        const roleLabels = {
          admin: '관리자',
          teacher: '강사',
          student: '학생',
          parent: '학부모'
        };
        const colors = {
          admin: 'error',
          teacher: 'primary',
          student: 'success',
          parent: 'warning'
        } as const;
        
        return (
          <Chip 
            label={roleLabels[row.role]} 
            color={colors[row.role]}
            size="small"
          />
        );
      }
    },
    {
      name: '상태',
      field: 'status',
      width: 80,
      formatter: (row) => (
        <Chip 
          label={row.status === 'active' ? '활성' : '비활성'} 
          color={row.status === 'active' ? 'success' : 'default'}
          size="small"
          variant="outlined"
        />
      )
    },
    {
      name: '가입일',
      field: 'createdAt',
      width: 120,
      align: 'center'
    },
    {
      name: '최근 로그인',
      field: 'lastLogin',
      width: 150,
      align: 'center'
    },
    {
      name: '액션',
      width: 120,
      formatter: (row) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<Edit size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit user:', row.id);
            }}
          >
            수정
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<Trash2 size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Delete user:', row.id);
            }}
          >
            삭제
          </Button>
        </Box>
      )
    }
  ];

  const handleSelectAll = () => {
    setSelected(new Set(profiles.map(p => p.id)));
  };

  const handleDeselectAll = () => {
    setSelected(new Set());
  };

  const handleSelectOne = (_event: React.ChangeEvent, row: UserProfile) => {
    const newSelected = new Set(selected);
    newSelected.add(row.id);
    setSelected(newSelected);
  };

  const handleDeselectOne = (_event: React.ChangeEvent, row: UserProfile) => {
    const newSelected = new Set(selected);
    newSelected.delete(row.id);
    setSelected(newSelected);
  };

  const handleRowClick = (_event: React.MouseEvent, row: UserProfile) => {
    console.log('Row clicked:', row);
  };

  // 공통 hooks 테스트 함수들
  const handleSuccessToast = () => {
    showToast('✅ 성공 메시지 테스트!', { type: 'success' });
  };

  const handleErrorToast = () => {
    showToast('❌ 에러 메시지 테스트!', { type: 'error' });
  };

  const handleInfoToast = () => {
    showToast('ℹ️ 정보 메시지 테스트!', { type: 'info' });
  };

  const handleWarningToast = () => {
    showToast('⚠️ 경고 메시지 테스트!', { type: 'warning' });
  };

  const handleCustomToast = () => {
    showToast('🎉 커스텀 위치 토스트!', {
      type: 'success',
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false
    });
  };

  // 🎯 개선된 모달 테스트 - 도메인별로 직접 사용!
  const handleModalTest = async () => {
    try {
      const result = await openModal(TEST_MODALS.TEST_SAMPLE_MODAL, {
        title: '샘플 모달 테스트',
        data: { message: '프로필 페이지에서 열었습니다!' }
      });
      
      showToast(`모달 결과: ${result}`, { 
        type: 'success',
        position: 'top-right' 
      });
    } catch (error) {
      showToast('모달 테스트 실패', { type: 'error' });
    }
  };

  const handleResponsiveModalTest = async () => {
    try {
      const result = await openModal(TEST_MODALS.TEST_RESPONSIVE_MODAL, {
        title: '반응형 모달 테스트',
        data: { 
          message: IS_MOBILE ? '모바일에서 BottomSheet로 표시됩니다' : 'PC에서 Dialog로 표시됩니다',
          device: IS_MOBILE ? 'Mobile' : IS_TABLET ? 'Tablet' : 'PC'
        }
      });
      
      showToast(`반응형 모달 결과: ${result}`, { 
        type: 'info',
        position: 'top-right' 
      });
    } catch (error) {
      showToast('반응형 모달 테스트 실패', { type: 'error' });
    }
  };

  const handleNotificationModalTest = async () => {
    try {
      const result = await openModal(PROFILE_NOTIFICATION_MODALS.PROFILE_NOTIFICATION_SETTINGS, {
        title: '알림 설정',
        userData: {
          id: 1,
          name: '김철수',
          email: 'kim@example.com',
          notifications: {
            email: true,
            push: false,
            sms: true
          }
        }
      });
      
      showToast(`알림 설정 모달 결과: ${result}`, { 
        type: 'warning',
        position: 'top-right' 
      });
    } catch (error) {
      showToast('알림 설정 모달 테스트 실패', { type: 'error' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Users size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          프로필 관리
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        사용자 프로필을 조회하고 관리할 수 있습니다.
      </Typography>

      {/* 공통 Hooks 테스트 섹션 */}
      <Card sx={{ mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TestTube size={20} style={{ marginRight: 8 }} />
            <Typography variant="h6">공통 Hooks 테스트</Typography>
          </Box>
          
          {/* ViewProvider 테스트 */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {IS_MOBILE ? <Smartphone size={16} /> : <Monitor size={16} />}
              <Typography variant="body2">
                현재 디바이스: {IS_MOBILE ? '모바일' : IS_TABLET ? '태블릿' : 'PC'} | 
                ViewType: {viewType} | 
                IS_MOBILE: {IS_MOBILE ? 'true' : 'false'}
              </Typography>
            </Box>
          </Alert>

          {/* Toast 테스트 버튼들 */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Button 
              size="small" 
              variant="contained" 
              color="success"
              onClick={handleSuccessToast}
              data-testid="success-toast-btn"
            >
              Success Toast
            </Button>
            <Button 
              size="small" 
              variant="contained" 
              color="error"
              onClick={handleErrorToast}
              data-testid="error-toast-btn"
            >
              Error Toast
            </Button>
            <Button 
              size="small" 
              variant="contained" 
              color="info"
              onClick={handleInfoToast}
              data-testid="info-toast-btn"
            >
              Info Toast
            </Button>
            <Button 
              size="small" 
              variant="contained" 
              color="warning"
              onClick={handleWarningToast}
              data-testid="warning-toast-btn"
            >
              Warning Toast
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleCustomToast}
              data-testid="custom-toast-btn"
            >
              Custom Toast
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleModalTest}
              data-testid="modal-test-btn"
            >
              샘플 모달
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleResponsiveModalTest}
              data-testid="responsive-modal-btn"
            >
              반응형 모달
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleNotificationModalTest}
              data-testid="notification-modal-btn"
            >
              알림 설정 모달
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button 
          variant="contained" 
          startIcon={<Plus size={16} />}
          onClick={() => console.log('Add new profile')}
        >
          새 프로필 추가
        </Button>
        {selected.size > 0 && (
          <Button 
            variant="outlined" 
            color="error"
            startIcon={<Trash2 size={16} />}
            onClick={() => console.log('Delete selected:', Array.from(selected))}
          >
            선택 삭제 ({selected.size})
          </Button>
        )}
      </Box>

      <DataGrid
        columns={columns}
        rows={profiles}
        count={profiles.length}
        selectable
        selected={selected}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onSelectOne={handleSelectOne}
        onDeselectOne={handleDeselectOne}
        onClick={handleRowClick}
        hover
        uniqueRowId={(row) => row.id}
      />
    </Box>
  );
};

export default ProfilesPage;