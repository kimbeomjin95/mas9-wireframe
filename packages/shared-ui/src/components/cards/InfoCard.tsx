import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Edit3,
} from 'lucide-react';

export interface DetailRowData {
  label: string;
  value: string;
  showEdit?: boolean;
}

export interface DetailRowProps {
  left: DetailRowData;
  right: DetailRowData;
}

export const DetailRow: React.FC<DetailRowProps> = ({ left, right }) => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      {/* Left Section */}
      <Box sx={{ 
        flex: 1,
        borderBottom: '1px solid #dcdfe4',
        px: 3,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}>
        <Typography 
          sx={{ 
            fontSize: 16,
            fontWeight: 500,
            color: '#8b8b8b',
            letterSpacing: '-0.48px',
            width: 200,
          }}
        >
          {left.label}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 4, 
          alignItems: 'center',
          flex: 1
        }}>
          <Typography 
            sx={{ 
              fontSize: 16,
              fontWeight: 500,
              color: '#222222',
              letterSpacing: '-0.48px',
              flex: 1
            }}
          >
            {left.value}
          </Typography>
          {left.showEdit && (
            <IconButton 
              sx={{ 
                width: 22, 
                height: 22,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <Edit3 size={16} color="#8b8b8b" />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Right Section */}
      <Box sx={{ 
        flex: 1,
        borderBottom: '1px solid #dcdfe4',
        px: 3,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}>
        <Typography 
          sx={{ 
            fontSize: 16,
            fontWeight: 500,
            color: '#8b8b8b',
            letterSpacing: '-0.48px',
            width: 200,
          }}
        >
          {right.label}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 4, 
          alignItems: 'center',
          flex: 1
        }}>
          <Typography 
            sx={{ 
              fontSize: 16,
              fontWeight: 500,
              color: '#222222',
              letterSpacing: '-0.48px',
              flex: 1
            }}
          >
            {right.value}
          </Typography>
          {right.showEdit && (
            <IconButton 
              sx={{ 
                width: 22, 
                height: 22,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <Edit3 size={16} color="#8b8b8b" />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export interface TagSectionProps {
  tags: string[];
}

export const TagSection: React.FC<TagSectionProps> = ({ tags }) => {
  const visibleTags = tags.slice(0, 3);
  const remainingCount = tags.length - 3;

  return (
    <Box sx={{ 
      flex: 1,
      borderBottom: '1px solid #dcdfe4',
      px: 3,
      py: 1.5,
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
    }}>
      <Typography 
        sx={{ 
          fontSize: 16,
          fontWeight: 500,
          color: '#8b8b8b',
          letterSpacing: '-0.48px',
        }}
      >
        Tag
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: 32 }}>
        {visibleTags.map((tag, index) => (
          <Chip 
            key={index}
            label={tag} 
            variant="outlined"
            sx={{
              height: 32,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.16px',
              borderColor: '#8c8ca1',
              color: '#222222',
              borderRadius: '8px',
              '& .MuiChip-label': {
                px: 1.5,
                py: 0.375
              }
            }}
          />
        ))}
        {remainingCount > 0 && (
          <Chip 
            label={`+ ${remainingCount} more`} 
            variant="outlined"
            sx={{
              height: 32,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.16px',
              borderColor: '#8c8ca1',
              color: '#222222',
              borderRadius: '8px',
              '& .MuiChip-label': {
                px: 1.5,
                py: 0.375
              }
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export interface NotesSectionProps {
  note: string;
  onViewNote?: () => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ note, onViewNote }) => {
  return (
    <Box sx={{ 
      flex: 1,
      borderBottom: '1px solid #dcdfe4',
      px: 3,
      py: 1.5,
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
    }}>
      <Typography 
        sx={{ 
          fontSize: 16,
          fontWeight: 500,
          color: '#8b8b8b',
          letterSpacing: '-0.48px',
        }}
      >
        Notes
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        gap: 4, 
        alignItems: 'flex-start',
        pr: '22px'
      }}>
        <Typography 
          sx={{ 
            fontSize: 16,
            fontWeight: 500,
            color: '#222222',
            letterSpacing: '-0.48px',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {note}
        </Typography>
        {onViewNote && (
          <Typography
            sx={{
              color: '#dd1921',
              fontSize: 16,
              fontWeight: 400,
              textDecoration: 'underline',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            onClick={onViewNote}
          >
            View
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  rows?: DetailRowProps[];
  tags?: string[];
  note?: string;
  onViewNote?: () => void;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  children,
  rows,
  tags,
  note,
  onViewNote
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 5px 22px 0px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        px: 3, 
        py: 2, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2.5,
        borderBottom: 0
      }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50px',
            backgroundColor: '#FFF',
            boxShadow: '0px 3px 14px 0px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </Box>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 600,
            color: '#222222',
            letterSpacing: '-0.66px',
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ py: '15px' }}>
        {children}
        
        {/* Render rows if provided */}
        {rows && rows.map((row, index) => (
          <DetailRow key={index} {...row} />
        ))}

        {/* Render tags and notes section */}
        {(tags || note) && (
          <Box sx={{ display: 'flex', width: '100%' }}>
            {tags && <TagSection tags={tags} />}
            {note && <NotesSection note={note} onViewNote={onViewNote} />}
          </Box>
        )}
      </Box>
    </Box>
  );
};