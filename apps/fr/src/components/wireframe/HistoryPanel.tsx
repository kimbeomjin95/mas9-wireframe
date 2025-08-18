import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Chip,
  Box,
  Alert,
  Tooltip,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  History,
  Code,
  Trash2,
  RefreshCw,
  Clock,
  FileText,
  Download,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { wireframeService } from '../../services/wireframe';

interface WireframeHistoryItem {
  id: string;
  code: string;
  description: string;
  componentType: string;
  timestamp: string;
  tokensUsed: {
    input: number;
    output: number;
  };
}

interface HistoryPanelProps {
  onSelectItem?: (item: WireframeHistoryItem) => void;
  onReuseItem?: (item: WireframeHistoryItem) => void;
  selectedItemId?: string;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  onSelectItem,
  onReuseItem,
  selectedItemId,
}) => {
  const [historyItems, setHistoryItems] = useState<WireframeHistoryItem[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [clearAllDialogOpen, setClearAllDialogOpen] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const history = wireframeService.getHistory();
    setHistoryItems(history);
  };

  const handleSelectItem = (item: WireframeHistoryItem) => {
    onSelectItem?.(item);
  };

  const handleReuseItem = (item: WireframeHistoryItem) => {
    onReuseItem?.(item);
  };

  const handleDownloadItem = (item: WireframeHistoryItem) => {
    const componentName = item.description
      .replace(/[^a-zA-Z0-9가-힣\s]/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
      .replace(/[가-힣]/g, '')
      .concat('Component') || 'GeneratedComponent';

    const blob = new Blob([item.code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${componentName}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteItem = (itemId: string) => {
    setItemToDelete(itemId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteItem = () => {
    if (itemToDelete) {
      wireframeService.removeFromHistory(itemToDelete);
      loadHistory();
      setItemToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleClearAll = () => {
    setClearAllDialogOpen(true);
  };

  const confirmClearAll = () => {
    wireframeService.clearHistory();
    loadHistory();
    setClearAllDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getComponentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      page: '페이지',
      component: '컴포넌트',
      form: '폼',
      dashboard: '대시보드',
      modal: '모달',
    };
    return labels[type] || type;
  };

  const getComponentTypeColor = (type: string) => {
    const colors: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'info'> = {
      page: 'primary',
      component: 'secondary',
      form: 'success',
      dashboard: 'warning',
      modal: 'info',
    };
    return colors[type] || 'primary';
  };

  return (
    <>
      <Card elevation={2}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <History size={24} />
              <Typography variant="h6">생성 이력</Typography>
              <Chip 
                size="small" 
                label={historyItems.length}
                color="primary"
                variant="outlined"
              />
            </Box>
          }
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="이력 새로고침">
                <IconButton onClick={loadHistory} size="small">
                  <RefreshCw size={18} />
                </IconButton>
              </Tooltip>
              {historyItems.length > 0 && (
                <Tooltip title="전체 삭제">
                  <IconButton onClick={handleClearAll} size="small" color="error">
                    <Trash2 size={18} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          }
        />
        
        <CardContent sx={{ p: 0 }}>
          {historyItems.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
              <History size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
              <Typography variant="body1" gutterBottom>
                생성 이력이 없습니다
              </Typography>
              <Typography variant="body2">
                AI로 화면을 생성하면 이력이 여기에 표시됩니다
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {historyItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedItemId === item.id}
                      onClick={() => handleSelectItem(item)}
                      sx={{ 
                        py: 2,
                        '&.Mui-selected': {
                          backgroundColor: 'primary.50',
                          '&:hover': {
                            backgroundColor: 'primary.100',
                          },
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="subtitle2" noWrap>
                              {item.description}
                            </Typography>
                            <Chip
                              size="small"
                              label={getComponentTypeLabel(item.componentType)}
                              color={getComponentTypeColor(item.componentType)}
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Clock size={12} />
                              <Typography variant="caption">
                                {formatDate(item.timestamp)}
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              토큰: {item.tokensUsed.input + item.tokensUsed.output}개 사용
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="재사용">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReuseItem(item);
                              }}
                            >
                              <RotateCcw size={16} />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="다운로드">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadItem(item);
                              }}
                            >
                              <Download size={16} />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="삭제">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteItem(item.id);
                              }}
                            >
                              <Trash2 size={16} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </ListItem>
                  {index < historyItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* 개별 삭제 확인 다이얼로그 */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>이력 삭제</DialogTitle>
        <DialogContent>
          <Typography>
            선택한 이력을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            취소
          </Button>
          <Button onClick={confirmDeleteItem} color="error" variant="contained">
            삭제
          </Button>
        </DialogActions>
      </Dialog>

      {/* 전체 삭제 확인 다이얼로그 */}
      <Dialog
        open={clearAllDialogOpen}
        onClose={() => setClearAllDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>전체 이력 삭제</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            모든 생성 이력이 삭제됩니다
          </Alert>
          <Typography>
            저장된 모든 화면 생성 이력을 삭제하시겠습니까? 
            이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로 삭제됩니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearAllDialogOpen(false)}>
            취소
          </Button>
          <Button onClick={confirmClearAll} color="error" variant="contained">
            전체 삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};