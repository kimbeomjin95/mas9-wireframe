import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import { COLORS } from '../../constants/colors';

export type DesignSystemButtonColor = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'quaternary' 
  | 'text' 
  | 'textAccent';

export type DesignSystemButtonSize = 'small' | 'medium' | 'large';

export interface DesignSystemButtonProps extends Omit<ButtonProps, 'color' | 'size'> {
  color?: DesignSystemButtonColor;
  size?: DesignSystemButtonSize;
}

const StyledButton = styled(Button)<{ designColor: DesignSystemButtonColor; designSize: DesignSystemButtonSize }>(({ designColor, designSize }) => {
  const getSizeStyles = () => {
    switch (designSize) {
      case 'large':
        return {
          height: '50px',
          borderRadius: '10px',
          paddingX: '40px',
          paddingY: '16px',
          fontSize: '16px',
        };
      case 'medium':
        return {
          height: '40px',
          borderRadius: '5px',
          paddingX: '32px',
          paddingY: '8px',
          fontSize: '14px',
        };
      case 'small':
        return {
          height: '36px',
          borderRadius: '5px',
          paddingX: '24px',
          paddingY: '8px',
          fontSize: '14px',
        };
      default:
        return {};
    }
  };

  const getColorStyles = () => {
    switch (designColor) {
      case 'primary':
        return {
          backgroundColor: COLORS.PRIMARY.RED,
          color: COLORS.BACKGROUND.WHITE,
          '&:hover': {
            backgroundColor: COLORS.BUTTON.PRIMARY_HOVER,
          },
          // '&:focus': {
          //   backgroundColor: COLORS.BUTTON.PRIMARY_HOVER,
          //   boxShadow: `0 0 0 2px ${COLORS.PRIMARY.RED}30`,
          // },
          '&:disabled': {
            backgroundColor: COLORS.BUTTON.DISABLED,
            color: COLORS.BACKGROUND.WHITE,
          },
        };
      case 'secondary':
        return {
          backgroundColor: COLORS.TEXT.GRAY_DISABLED,
          color: COLORS.BACKGROUND.WHITE,
          '&:hover': {
            backgroundColor: COLORS.BUTTON.SECONDARY_HOVER,
          },
          // '&:focus': {
          //   backgroundColor: COLORS.BUTTON.SECONDARY_HOVER,
          //   boxShadow: `0 0 0 2px ${COLORS.TEXT.GRAY_DISABLED}30`,
          // },
          '&:disabled': {
            backgroundColor: COLORS.BUTTON.DISABLED,
            color: COLORS.BACKGROUND.WHITE,
          },
        };
      case 'tertiary':
        return {
          backgroundColor: 'transparent',
          color: COLORS.PRIMARY.RED,
          border: `1px solid ${COLORS.PRIMARY.RED}`,
          '&:hover': {
            backgroundColor: '#FFF1F1',
            color: COLORS.PRIMARY.RED,
            border: `1px solid ${COLORS.PRIMARY.RED}`,
          },
          // '&:focus': {
          //   backgroundColor: COLORS.PRIMARY.RED,
          //   color: COLORS.BACKGROUND.WHITE,
          //   boxShadow: `0 0 0 2px ${COLORS.PRIMARY.RED}30`,
          // },
          '&:disabled': {
            backgroundColor: 'transparent',
            color: COLORS.BUTTON.DISABLED,
            border: `1px solid ${COLORS.BUTTON.DISABLED}`,
          },
        };
      case 'quaternary':
        return {
          backgroundColor: 'transparent',
          color: COLORS.TEXT.GRAY_DISABLED,
          border: `1px solid ${COLORS.TEXT.GRAY_DISABLED}`,
          '&:hover': {
            backgroundColor: '#DDDDDD',
            color: '#777777',
            border: `1px solid #888888`,
          },
          // '&:focus': {
          //   backgroundColor: COLORS.TEXT.GRAY_DISABLED,
          //   color: COLORS.BACKGROUND.WHITE,
          //   boxShadow: `0 0 0 2px ${COLORS.TEXT.GRAY_DISABLED}30`,
          // },
          '&:disabled': {
            backgroundColor: 'transparent',
            color: COLORS.BUTTON.DISABLED,
            border: `1px solid ${COLORS.BUTTON.DISABLED}`,
          },
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: COLORS.TEXT.BLACK_PRIMARY,
          border: 'none',
          '&:hover': {
            backgroundColor: `${COLORS.TEXT.BLACK_PRIMARY}0A`,
          },
          // '&:focus': {
          //   backgroundColor: `${COLORS.TEXT.BLACK_PRIMARY}0A`,
          //   boxShadow: `0 0 0 2px ${COLORS.TEXT.BLACK_PRIMARY}1F`,
          // },
          '&:disabled': {
            backgroundColor: 'transparent',
            color: COLORS.BUTTON.DISABLED,
          },
        };
      case 'textAccent':
        return {
          backgroundColor: 'transparent',
          color: COLORS.PRIMARY.RED,
          border: 'none',
          textDecoration: 'underline',
          '&:hover': {
            backgroundColor: 'transparent',
            color: COLORS.BUTTON.PRIMARY_HOVER,
            textDecoration: 'underline',
          },
          // '&:focus': {
          //   backgroundColor: 'transparent',
          //   border: `1px solid ${COLORS.PRIMARY.RED}`,
          //   boxShadow: `0 0 0 2px ${COLORS.PRIMARY.RED}1F`,
          // },
          '&:disabled': {
            backgroundColor: 'transparent',
            color: COLORS.BUTTON.DISABLED,
            textDecoration: 'none',
          },
        };
      default:
        return {};
    }
  };

  return {
    textTransform: 'none',
    fontWeight: 500,
    ...getSizeStyles(),
    ...getColorStyles(),
  };
});

export const DesignSystemButton: React.FC<DesignSystemButtonProps> = ({
  color = 'primary',
  size = 'medium',
  children,
  ...props
}) => {
  return (
    <StyledButton
      designColor={color}
      designSize={size}
      {...props}
    >
      {children}
    </StyledButton>
  );
};