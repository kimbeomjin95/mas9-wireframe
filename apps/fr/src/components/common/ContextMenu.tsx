import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import { Edit3, Trash2 } from 'lucide-react';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  color?: 'primary' | 'error' | 'inherit';
  disabled?: boolean;
}

interface ContextMenuProps {
  open: boolean;
  onClose: () => void;
  items?: MenuItem[];
  position?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
  sx?: any;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  open,
  onClose,
  items = [],
  position = { top: 35, right: 8 },
  sx,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // 기본 Edit/Delete 메뉴 아이템
  const defaultItems: MenuItem[] = [
    {
      label: 'Edit',
      icon: <Edit3 size={14} />,
      onClick: () => {},
      color: 'inherit',
    },
    {
      label: 'Delete',
      icon: <Trash2 size={14} />,
      onClick: () => {},
      color: 'error',
    },
  ];

  const menuItems = items.length > 0 ? items : defaultItems;

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Paper
      ref={menuRef}
      elevation={3}
      sx={{
        position: 'absolute',
        zIndex: 1000,
        minWidth: 120,
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        backgroundColor: 'white',
        boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        py: 1,
        ...position,
        ...sx,
      }}
    >
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <Button
            fullWidth
            size="small"
            onClick={() => {
              item.onClick();
              onClose();
            }}
            disabled={item.disabled}
            startIcon={item.icon}
            sx={{
              justifyContent: 'flex-start',
              color: item.color === 'error' ? 'error.main' : 'text.primary',
              py: 1,
              px: 2,
              fontSize: '0.875rem',
              fontWeight: 400,
              textTransform: 'none',
              borderRadius: 1,
              mx: 0.5,
              '&:hover': {
                backgroundColor: item.color === 'error' ? 'error.light' : 'action.hover',
                color: item.color === 'error' ? 'error.contrastText' : 'text.primary',
              },
              '&.Mui-disabled': {
                opacity: 0.5,
              },
            }}
          >
            {item.label}
          </Button>
          {index < menuItems.length - 1 && item.color === 'inherit' && menuItems[index + 1]?.color === 'error' && (
            <Divider sx={{ mx: 1, my: 0.5 }} />
          )}
        </React.Fragment>
      ))}
    </Paper>
  );
};

export default ContextMenu;