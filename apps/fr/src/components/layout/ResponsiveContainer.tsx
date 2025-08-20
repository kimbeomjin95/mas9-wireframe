import React from 'react';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import { useView } from '@mas9/shared-ui';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disableGutters?: boolean;
  sx?: any;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = 'lg',
  disableGutters = false,
  sx = {},
}) => {
  const theme = useTheme();
  const { IS_MOBILE } = useView();

  return (
    <Container 
      maxWidth={maxWidth}
      disableGutters={IS_MOBILE ? true : disableGutters}
      sx={{
        px: IS_MOBILE ? 2 : 3,
        py: IS_MOBILE ? 2 : 3,
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};

interface ResponsiveSectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  spacing?: number;
  sx?: any;
}

export const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({
  children,
  spacing = 3,
  sx = {},
}) => {
  const { IS_MOBILE } = useView();

  return (
    <Box
      sx={{
        mb: IS_MOBILE ? spacing - 1 : spacing,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

interface ResponsiveGridProps {
  children: React.ReactNode;
  spacing?: number;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  sx?: any;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  spacing = 2,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  sx = {},
}) => {
  const { IS_MOBILE, IS_TABLET } = useView();
  
  const getColumns = () => {
    if (IS_MOBILE) return columns.xs || 1;
    if (IS_TABLET) return columns.sm || 2;
    return columns.md || 3;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
        gap: IS_MOBILE ? spacing : spacing + 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default ResponsiveContainer;