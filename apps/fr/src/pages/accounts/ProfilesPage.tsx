import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  MenuItem,
  Paper,
  IconButton,
  Avatar,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  ChevronDown,
  X,
  MoreHorizontal,
  Info,
} from 'lucide-react';
import { DataGrid, ColumnDef } from '@mas9/shared-ui';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  tag: string;
  membership: string;
  expirationDate: string;
  rank: string;
  status: 'Active' | 'Inactive';
  avatar: string;
}

const ProfilesPage: React.FC = () => {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [membershipFilter, setMembershipFilter] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [rankFilter, setRankFilter] = useState<string>('');
  const [expirationDateFilter, setExpirationDateFilter] = useState<string>('');


  // 피그마 데이터와 일치하는 샘플 데이터
  const profiles: UserProfile[] = [
    {
      id: 1,
      name: 'Jonathan Kensington-Smythe',
      email: 'jonathan@example.com',
      tag: 'TagTheTagTheTag T',
      membership: 'SUB Auto Renewal Membership 001',
      expirationDate: 'MM/DD/YYYY',
      rank: 'Regular',
      status: 'Active',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Jonathan Kensington-Smythe',
      email: 'jonathan2@example.com',
      tag: 'TagTheTagTheTag T',
      membership: 'SUB Auto Renewal Membership 001',
      expirationDate: 'MM/DD/YYYY',
      rank: 'Regular',
      status: 'Active',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Jonathan Kensington-Smythe',
      email: 'jonathan3@example.com',
      tag: 'TagTheTagTheTag T',
      membership: 'SUB Auto Renewal Membership 001',
      expirationDate: 'MM/DD/YYYY',
      rank: 'Regular',
      status: 'Active',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      name: 'Jonathan Kensington-Smythe',
      email: 'jonathan4@example.com',
      tag: 'TagTheTagTheTag T',
      membership: 'SUB Auto Renewal Membership 001',
      expirationDate: 'MM/DD/YYYY',
      rank: 'Regular',
      status: 'Active',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 5,
      name: 'Jonathan Kensington-Smythe',
      email: 'jonathan5@example.com',
      tag: 'TagTheTagTheTag T',
      membership: 'SUB Auto Renewal Membership 001',
      expirationDate: 'MM/DD/YYYY',
      rank: 'Regular',
      status: 'Active',
      avatar: '/api/placeholder/40/40'
    },
  ];

  // 활성 필터들
  const activeFilterTags = [
    'Active',
    'SUB Auto Renewal Membership 001', 
    'White',
    'MM/DD/YYYY - MM/DD/YYYY',
    'SUB Auto Renewal Membership 001',
    'SUB Auto Renewal Membership 001',
    'White',
    '+10'
  ];

  // 필터링된 데이터
  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const matchesSearch = 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [profiles, searchTerm]);

  const columns: ColumnDef<UserProfile>[] = [
    {
      name: 'Name',
      field: 'name',
      align: 'left',
      formatter: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={row.avatar} sx={{ width: 32, height: 32 }}>
            {row.name.charAt(0)}
          </Avatar>
          <Typography variant="body2" fontWeight={500}>
            {row.name}
          </Typography>
        </Box>
      ),
    },
    {
      name: 'Tag',
      field: 'tag',
      align: 'left',
      formatter: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {row.tag}
          </Typography>
          <Typography variant="body2" color="primary" fontWeight={500}>
            +1
          </Typography>
        </Box>
      ),
    },
    {
      name: '',
      field: 'membership',
      align: 'left',
      formatter: (row) => (
        <Typography variant="body2">
          {row.membership}
        </Typography>
      ),
    },
    {
      name: '',
      field: 'expirationDate',
      align: 'left',
      formatter: (row) => (
        <Typography variant="body2">
          {row.expirationDate}
        </Typography>
      ),
    },
    {
      name: '',
      field: 'rank',
      align: 'left',
      formatter: (row) => (
        <Typography variant="body2">
          {row.rank}
        </Typography>
      ),
    },
    {
      name: '',
      field: 'status',
      align: 'left',
      formatter: (row) => (
        <Typography variant="body2" color="success.main">
          {row.status}
        </Typography>
      ),
    },
    {
      name: 'Payment Info',
      align: 'right',
      formatter: () => (
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <Info size={16} />
        </IconButton>
      ),
    },
  ];

  const handleSelectAll = () => {
    setSelected(new Set(filteredProfiles.map((p) => p.id)));
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

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setMembershipFilter('');
    setTagFilter('');
    setRankFilter('');
    setExpirationDateFilter('');
  };


  return (
    <>
          {/* Search Bar - 피그마와 정확히 일치 */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by member name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} color="#9ca3af" />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 400,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#e5e7eb',
              },
              '&:hover fieldset': {
                borderColor: '#d1d5db',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              },
            },
          }}
        />
      </Box>

      {/* Filter Dropdowns - 피그마와 정확히 일치 */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 2,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <TextField
          select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 120 }}
          size="small"
          label="Status"
          InputProps={{
            endAdornment: <ChevronDown size={16} />
          }}
          SelectProps={{
            displayEmpty: true,
            renderValue: (value: unknown) => (value as string) || 'Status'
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        <TextField
          select
          value={membershipFilter}
          onChange={(e) => setMembershipFilter(e.target.value)}
          sx={{ minWidth: 140 }}
          size="small"
          label="Membership"
          SelectProps={{
            displayEmpty: true,
            renderValue: (value: unknown) => (value as string) || 'Membership'
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="SUB">SUB Auto Renewal</MenuItem>
        </TextField>

        <TextField
          select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          sx={{ minWidth: 100 }}
          size="small"
          label="Tag"
          SelectProps={{
            displayEmpty: true,
            renderValue: (value: unknown) => (value as string) || 'Tag'
          }}
        >
          <MenuItem value="">All</MenuItem>
        </TextField>

        <TextField
          select
          value={rankFilter}
          onChange={(e) => setRankFilter(e.target.value)}
          sx={{ minWidth: 100 }}
          size="small"
          label="Rank"
          SelectProps={{
            displayEmpty: true,
            renderValue: (value: unknown) => (value as string) || 'Rank'
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Regular">Regular</MenuItem>
        </TextField>

        <TextField
          select
          value={expirationDateFilter}
          onChange={(e) => setExpirationDateFilter(e.target.value)}
          sx={{ minWidth: 160 }}
          size="small"
          label="Expiration Date"
          SelectProps={{
            displayEmpty: true,
            renderValue: (value: unknown) => (value as string) || 'Expiration Date'
          }}
        >
          <MenuItem value="">All</MenuItem>
        </TextField>

        <Button
          variant="outlined"
          size="small"
          startIcon={<MoreHorizontal size={16} />}
          sx={{ 
            color: '#374151',
            borderColor: '#d1d5db',
            textTransform: 'none'
          }}
        >
          More Filters
          <Chip 
            label="1" 
            size="small" 
            sx={{ 
              ml: 1, 
              height: 18, 
              bgcolor: '#3b82f6', 
              color: 'white',
              fontSize: '0.75rem'
            }} 
          />
        </Button>
      </Box>

      {/* Active Filter Tags - 피그마와 정확히 일치 */}
      <Box sx={{ 
        display: 'flex', 
        gap: 1, 
        mb: 3,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {activeFilterTags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            size="small"
            onDelete={() => {}}
            deleteIcon={<X size={14} />}
            sx={{
              bgcolor: '#f3f4f6',
              color: '#374151',
              border: '1px solid #e5e7eb',
              '& .MuiChip-deleteIcon': {
                color: '#6b7280'
              }
            }}
          />
        ))}
        <Button
          variant="text"
          size="small"
          onClick={clearAllFilters}
          sx={{ 
            color: '#6b7280',
            textDecoration: 'underline',
            textTransform: 'none',
            minWidth: 'auto',
            p: 0
          }}
        >
          Clear All
        </Button>
      </Box>

      {/* Total Count - 피그마와 정확히 일치 */}
      <Typography variant="body2" fontWeight={500} sx={{ mb: 2, color: '#1f2937' }}>
        Total: {filteredProfiles.length}
      </Typography>

      {/* Data Table - DataGrid 유지 */}
      <Paper 
        elevation={0} 
        sx={{ 
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <DataGrid
          columns={columns}
          rows={filteredProfiles}
          count={filteredProfiles.length}
          selectable
          selected={selected}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onSelectOne={handleSelectOne}
          onDeselectOne={handleDeselectOne}
          onClick={handleRowClick}
          hover
        />
      </Paper>

          {/* Floating Action Button - 피그마 우하단 */}
          <Box sx={{ 
            position: 'fixed', 
            bottom: 24, 
            right: 24 
          }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#dc2626',
                '&:hover': { bgcolor: '#b91c1c' },
                borderRadius: '50%',
                width: 56,
                height: 56,
                minWidth: 'auto',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
              }}
            >
              +
            </Button>
          </Box>
    </>
  );
};

export default ProfilesPage;