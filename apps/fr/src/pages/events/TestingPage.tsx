import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  Avatar,
} from '@mui/material';
import { ArrowLeft, Calendar, Users, Search, ChevronDown } from 'lucide-react';
import { COLORS, DataGrid, InfoCard, DetailRow } from '@mas9/shared-ui';
import type { ColumnDef } from '@mas9/shared-ui';

interface Candidate {
  id: number;
  name: string;
  description: string;
  avatar: string;
  rankSystem: string;
  currentRank: string;
  nextRank: string;
  testingCriteria: string;
  status:
    | 'Promoted'
    | 'Invited'
    | 'Not Ready'
    | 'Paid'
    | 'Did Not Pass'
    | 'Request';
  selected: boolean;
}

const TestingPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [rankFilter, setRankFilter] = useState('Rank');
  const [selected, setSelected] = useState<Set<number>>(new Set([1]));

  const candidates: Candidate[] = [
    {
      id: 1,
      name: 'Xin Yue',
      description: 'Description',
      avatar: '/api/placeholder/40/40',
      rankSystem: 'Default Rank',
      currentRank: 'White',
      nextRank: 'White',
      testingCriteria: 'Not Ready',
      status: 'Promoted',
      selected: true,
    },
    {
      id: 2,
      name: 'Xin Yue',
      description: 'Description',
      avatar: '/api/placeholder/40/40',
      rankSystem: 'Default Rank',
      currentRank: 'White',
      nextRank: 'White',
      testingCriteria: 'Not Ready',
      status: 'Invited',
      selected: false,
    },
    {
      id: 3,
      name: 'Xin Yue',
      description: 'Description',
      avatar: '/api/placeholder/40/40',
      rankSystem: 'Default Rank',
      currentRank: 'White',
      nextRank: 'White',
      testingCriteria: 'Not Ready',
      status: 'Invited',
      selected: false,
    },
    {
      id: 4,
      name: 'Xin Yue',
      description: 'Description',
      avatar: '/api/placeholder/40/40',
      rankSystem: 'Default Rank',
      currentRank: 'White',
      nextRank: 'White',
      testingCriteria: 'Not Ready',
      status: 'Invited',
      selected: false,
    },
    {
      id: 5,
      name: 'Xin Yue',
      description: 'Description',
      avatar: '/api/placeholder/40/40',
      rankSystem: 'Default Rank',
      currentRank: 'White',
      nextRank: 'White',
      testingCriteria: 'Not Ready',
      status: 'Invited',
      selected: false,
    },
  ];

  const filterOptions = [
    'All',
    'Invited',
    'Paid',
    'Promoted',
    'Did Not Pass',
    'Request',
  ];

  const handleSelectAll = () => {
    if (selected.size === candidates.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(candidates.map((c) => c.id)));
    }
  };

  const handleSelectOne = (candidate: Candidate) => {
    const newSelected = new Set(selected);
    if (newSelected.has(candidate.id)) {
      newSelected.delete(candidate.id);
    } else {
      newSelected.add(candidate.id);
    }
    setSelected(newSelected);
  };

  const handleDeselectAll = () => {
    setSelected(new Set());
  };

  const handleDeselectOne = (candidate: Candidate) => {
    const newSelected = new Set(selected);
    newSelected.delete(candidate.id);
    setSelected(newSelected);
  };

  const getStatusColor = (status: Candidate['status']) => {
    switch (status) {
      case 'Promoted':
        return COLORS.TEXT.BLACK_PRIMARY;
      case 'Not Ready':
        return COLORS.PRIMARY.RED;
      default:
        return COLORS.TEXT.BLACK_PRIMARY;
    }
  };

  // Define columns for DataGrid
  const columns: ColumnDef<Candidate>[] = [
    {
      name: 'Member name',
      field: 'name',
      width: 300,
      align: 'left',
      formatter: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 1 }}>
          <Avatar src={row.avatar} sx={{ width: 40, height: 40 }} />
          <Box>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                color: '#212636',
                lineHeight: 1.57,
              }}
            >
              {row.name}
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: '#667085',
                lineHeight: 1.57,
              }}
            >
              {row.description}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      name: 'Rank System',
      field: 'rankSystem',
      formatter: (row) => (
        <Typography sx={{ fontSize: '16px', color: COLORS.TEXT.BLACK_PRIMARY }}>
          {row.rankSystem}
        </Typography>
      ),
    },
    {
      name: 'Rank',
      field: 'currentRank',
      formatter: (row) => (
        <Typography sx={{ fontSize: '16px', color: COLORS.TEXT.BLACK_PRIMARY }}>
          {row.currentRank}
        </Typography>
      ),
    },
    {
      name: 'Next Rank',
      field: 'nextRank',
      formatter: (row) => (
        <Typography sx={{ fontSize: '16px', color: COLORS.TEXT.BLACK_PRIMARY }}>
          {row.nextRank}
        </Typography>
      ),
    },
    {
      name: 'Testing Criteria',
      field: 'testingCriteria',
      formatter: (row) => (
        <Typography
          sx={{
            fontSize: '16px',
            color: getStatusColor(row.testingCriteria as Candidate['status']),
            textDecoration:
              row.testingCriteria === 'Not Ready' ? 'underline' : 'none',
          }}
        >
          {row.testingCriteria}
        </Typography>
      ),
    },
    {
      name: 'Status',
      field: 'status',
      formatter: (row) => (
        <Typography
          sx={{
            fontSize: '16px',
            color: COLORS.TEXT.BLACK_PRIMARY,
            textDecoration: row.status === 'Promoted' ? 'underline' : 'none',
          }}
        >
          {row.status}
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', p: 3, bgcolor: COLORS.BACKGROUND.GRAY_LIGHT }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeft size={16} />}
          sx={{
            color: COLORS.TEXT.GRAY_LIGHT,
            fontSize: '16px',
            fontWeight: 400,
            textTransform: 'none',
            mb: 3,
            p: 1.5,
            border: `1px solid ${COLORS.BORDER.DARK_GRAY}`,
            borderRadius: 2.5,
            bgcolor: COLORS.BACKGROUND.WHITE,
            width: 82,
            height: 35,
          }}
        >
          Back
        </Button>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box />
          <Button
            variant='contained'
            sx={{
              bgcolor: COLORS.PRIMARY.RED,
              color: COLORS.BACKGROUND.WHITE,
              fontSize: '17px',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: 2.5,
              px: 2,
              py: 2,
              height: 50,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: COLORS.BUTTON.PRIMARY_HOVER,
                boxShadow: 'none',
              },
            }}
          >
            Order form
          </Button>
        </Box>
      </Box>

      {/* Testing Information Card */}
      <Box sx={{ mb: 4 }}>
        <InfoCard
          title='Testing Information'
          icon={<Calendar size={24} color={COLORS.TEXT.BLACK_PRIMARY} />}
          rows={[
            {
              left: { label: 'Testing Title', value: 'Testing Name' },
              right: { label: 'Testing Fee', value: '$25' },
            },
            {
              left: { label: 'Testing Date', value: '07/21/2025' },
              right: { label: 'Testing Time', value: '-' },
            },
            {
              left: {
                label: 'Registration Period',
                value: '07/21/2025 - 07/31/2025',
              },
              right: { label: 'Description', value: 'View' },
            },
            {
              left: {
                label: 'Registration Period',
                value: '07/21/2025 - 07/31/2025',
              },
              right: { label: 'Description', value: 'View' },
            },
          ]}
        >
          {/* Certificate Type Row */}
          <DetailRow
            left={{ label: 'Certificate Type', value: '' }}
            right={{ label: '', value: '' }}
          />
          <Box
            sx={{
              borderBottom: '1px solid #dcdfe4',
              px: 3,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              width: '100%',
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 500,
                color: '#8b8b8b',
                letterSpacing: '-0.48px',
                width: 200,
              }}
            >
              Certificate Type
            </Typography>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 34,
                  backgroundImage: 'url(/api/placeholder/44/34)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1.254px solid #f6f6f6',
                }}
              />
              <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>
                Certificate Title
              </Typography>
            </Box>
          </Box>
        </InfoCard>
      </Box>

      {/* Candidates Card */}
      <Card
        sx={{
          borderRadius: 5,
          boxShadow: COLORS.SHADOW.SOFT,
          border: 'none',
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Card Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 3,
              py: 4,
              pb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  bgcolor: COLORS.BACKGROUND.WHITE,
                  borderRadius: '50%',
                  p: 1.5,
                  mr: 2,
                  boxShadow: '0px 3px 14px 0px rgba(0,0,0,0.08)',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Users size={24} color={COLORS.TEXT.BLACK_PRIMARY} />
              </Box>
              <Typography
                variant='h5'
                fontWeight={600}
                sx={{
                  color: COLORS.TEXT.BLACK_PRIMARY,
                  fontSize: '22px',
                }}
              >
                Candidates
              </Typography>
            </Box>

            <Button
              variant='outlined'
              endIcon={<ChevronDown size={16} />}
              sx={{
                color: COLORS.TEXT.BLACK_PRIMARY,
                borderColor: COLORS.BORDER.GRAY_DISABLED,
                fontSize: '17px',
                fontWeight: 400,
                textTransform: 'none',
                borderRadius: 2,
                px: 2,
                py: 1.5,
                height: 48,
              }}
            >
              Actions
            </Button>
          </Box>

          <Box sx={{ px: 4, pb: 4 }}>
            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <FormControl sx={{ minWidth: 255 }}>
                <Select
                  value={rankFilter}
                  onChange={(e) => setRankFilter(e.target.value)}
                  sx={{
                    bgcolor: COLORS.BACKGROUND.WHITE,
                    fontSize: '16px',
                    height: 48,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e3e3e3',
                    },
                  }}
                >
                  <MenuItem value='Rank'>Rank</MenuItem>
                </Select>
              </FormControl>

              <TextField
                placeholder='Search by member name'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Search size={24} color={COLORS.TEXT.GRAY_DISABLED} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: 324,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: COLORS.BACKGROUND.WHITE,
                    fontSize: '16px',
                    height: 48,
                    '& fieldset': {
                      borderColor: '#e3e3e3',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: COLORS.TEXT.GRAY_DISABLED,
                    opacity: 1,
                  },
                }}
              />
            </Box>

            {/* Filter Chips */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {filterOptions.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  onClick={() => setSelectedFilter(option)}
                  sx={{
                    bgcolor: COLORS.BACKGROUND.GRAY_LIGHT,
                    color: COLORS.BACKGROUND.GRAY_CHIP,
                    fontWeight: 600,
                    fontSize: '14px',
                    borderRadius: 7.5,
                    px: 2,
                    py: 1,
                    height: 32,
                    '&:hover': {
                      bgcolor: COLORS.BACKGROUND.GRAY_MEDIUM,
                    },
                  }}
                />
              ))}
            </Box>

            {/* Candidates DataGrid */}
            <Box>
              <DataGrid
                columns={columns}
                rows={candidates}
                selectable
                selected={selected}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                onSelectOne={(_, candidate) => handleSelectOne(candidate)}
                onDeselectOne={(_, candidate) => handleDeselectOne(candidate)}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Delete Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant='outlined'
          sx={{
            color: COLORS.PRIMARY.RED,
            borderColor: COLORS.PRIMARY.RED,
            fontSize: '17px',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2.5,
            px: 5,
            py: 2,
            width: 175,
            height: 50,
            '&:hover': {
              bgcolor: COLORS.BACKGROUND.RED_LIGHT,
              borderColor: COLORS.PRIMARY.RED,
            },
          }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default TestingPage;
