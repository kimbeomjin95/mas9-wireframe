import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import {
  LayoutDashboard,
  Wand2,
  FileText,
  TrendingUp,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../components/layout';
import { useAuth } from '../hooks/useAuth';
import { wireframeService } from '../services/wireframe';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  description,
  icon,
  color = 'primary.main',
}) => (
  <Card elevation={1}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            backgroundColor: `${color}15`,
            color: color,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export const DashboardPage: React.FC = () => {
  console.log('🎯 ===== DashboardPage 컴포넌트 시작 =====');
  console.log('📊 DashboardPage 렌더링:', new Date().toLocaleTimeString());
  console.log('📍 현재 URL:', window.location.href);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState({
    totalScreens: 0,
    totalTokens: 0,
    recentActivity: [] as any[],
  });

  console.log('👤 현재 사용자:', user);
  console.log('🚀 DashboardPage 렌더링 준비 완료');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const history = wireframeService.getHistory();
    const totalScreens = history.length;
    const totalTokens = history.reduce(
      (sum, item) => sum + item.tokensUsed.input + item.tokensUsed.output,
      0
    );
    const recentActivity = history.slice(0, 5); // 최근 5개

    setDashboardStats({
      totalScreens,
      totalTokens,
      recentActivity,
    });
  };

  const dashboardData = [
    {
      title: '생성된 화면',
      value: dashboardStats.totalScreens,
      description: '현재까지 생성한 화면 수',
      icon: <LayoutDashboard size={24} />,
      color: '#1976d2',
    },
    {
      title: '사용 토큰',
      value: dashboardStats.totalTokens.toLocaleString(),
      description: '총 AI API 토큰 사용량',
      icon: <Wand2 size={24} />,
      color: '#9c27b0',
    },
    {
      title: '저장된 이력',
      value: dashboardStats.totalScreens,
      description: '재사용 가능한 이력',
      icon: <FileText size={24} />,
      color: '#2e7d32',
    },
    {
      title: '성공률',
      value: dashboardStats.totalScreens > 0 ? '100%' : '-',
      description: '화면 생성 성공률',
      icon: <TrendingUp size={24} />,
      color: '#ed6c02',
    },
  ];

  return (
    <AdminLayout title="관리자 대시보드">
      <Box sx={{ flexGrow: 1 }}>
        {/* 환영 메시지 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            대시보드
          </Typography>
          <Typography variant="body1" color="text.secondary">
            AI Wireframe Generator에 오신 것을 환영합니다, {user?.email?.split('@')[0]}님!
          </Typography>
          {import.meta.env.VITE_DEMO_MODE === 'true' && (
            <Box sx={{ mt: 2 }}>
              <Chip
                label="데모 모드로 실행 중"
                color="warning"
                variant="outlined"
                size="small"
              />
            </Box>
          )}
        </Box>

        {/* 대시보드 통계 카드들 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {dashboardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <DashboardCard {...card} />
            </Grid>
          ))}
        </Grid>

        {/* 메인 콘텐츠 영역 */}
        <Grid container spacing={3}>
          {/* 최근 활동 */}
          <Grid item xs={12} md={8}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  최근 활동
                </Typography>
                {dashboardStats.recentActivity.length > 0 && (
                  <Button
                    size="small"
                    endIcon={<ArrowRight size={16} />}
                    onClick={() => navigate('/history')}
                  >
                    전체 보기
                  </Button>
                )}
              </Box>
              
              {dashboardStats.recentActivity.length === 0 ? (
                <Box
                  sx={{
                    minHeight: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.secondary',
                  }}
                >
                  <Box textAlign="center">
                    아직 생성된 화면이 없습니다.
                    <br />
                    사이드바의 "AI 화면설계"를 클릭하여 시작하세요!
                  </Box>
                </Box>
              ) : (
                <List>
                  {dashboardStats.recentActivity.map((item, index) => (
                    <ListItem
                      key={item.id}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        bgcolor: 'grey.50',
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      <ListItemIcon>
                        <LayoutDashboard size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.description}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Clock size={12} />
                            <Typography variant="caption">
                              {new Date(item.timestamp).toLocaleString('ko-KR')}
                            </Typography>
                            <Chip
                              label={item.componentType}
                              size="small"
                              variant="outlined"
                              sx={{ height: 18, fontSize: '0.65rem' }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>

          {/* 빠른 액션 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                빠른 시작
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 2 },
                    transition: 'box-shadow 0.2s',
                  }}
                  onClick={() => navigate('/wireframe')}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Wand2 size={20} color="#9c27b0" />
                      <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                        새 화면 생성
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                <Card 
                  variant="outlined" 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 2 },
                    transition: 'box-shadow 0.2s',
                  }}
                  onClick={() => navigate('/history')}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FileText size={20} color="#2e7d32" />
                      <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                        이력 보기
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};