import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { ResponsiveDialog } from '@mas9/shared-ui';
import { 
  X,
  Clock,
  Calendar,
  Bell
} from 'lucide-react';

interface ReminderSetupModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (timeData: { displayText: string; timestamp: Date }) => void;
}

const ReminderSetupModal: React.FC<ReminderSetupModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedTime, setSelectedTime] = useState('16:00');

  // Quick options (Slack-style)
  const quickOptions = [
    { label: 'In 20 minutes', minutes: 20 },
    { label: 'In 1 hour', hours: 1 },
    { label: 'In 3 hours', hours: 3 },
    { label: 'Tomorrow at 9 AM', nextDay: true, time: '09:00' },
    { label: 'Next Monday', nextWeek: true, time: '09:00' },
  ];

  const dateOptions = [
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'next_week', label: 'Next Week' },
  ];

  const timeOptions = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '18:00', label: '6:00 PM' },
  ];

  const calculateDateTime = (option: any) => {
    const now = new Date();
    let targetDate = new Date();

    if (option.minutes) {
      targetDate = new Date(now.getTime() + option.minutes * 60 * 1000);
    } else if (option.hours) {
      targetDate = new Date(now.getTime() + option.hours * 60 * 60 * 1000);
    } else if (option.nextDay) {
      targetDate.setDate(now.getDate() + 1);
      const [hours, minutes] = option.time.split(':');
      targetDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    } else if (option.nextWeek) {
      // Next Monday
      const daysUntilNextMonday = ((1 + 7 - now.getDay()) % 7) || 7;
      targetDate.setDate(now.getDate() + daysUntilNextMonday);
      const [hours, minutes] = option.time.split(':');
      targetDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    }

    return targetDate;
  };

  const formatDisplayText = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
    
    const timeStr = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    if (isToday) {
      return `Today ${timeStr}`;
    } else if (isTomorrow) {
      return `Tomorrow ${timeStr}`;
    } else {
      return `${date.getMonth() + 1}/${date.getDate()} ${timeStr}`;
    }
  };

  const handleQuickOption = (option: any) => {
    const targetDate = calculateDateTime(option);
    const displayText = formatDisplayText(targetDate);
    
    onSave({
      displayText,
      timestamp: targetDate
    });
  };

  const handleCustomSave = () => {
    const now = new Date();
    let targetDate = new Date();

    // Date calculation
    switch (selectedDate) {
      case 'today':
        targetDate = new Date(now);
        break;
      case 'tomorrow':
        targetDate = new Date(now);
        targetDate.setDate(now.getDate() + 1);
        break;
      case 'next_week':
        targetDate = new Date(now);
        const daysUntilNextMonday = ((1 + 7 - now.getDay()) % 7) || 7;
        targetDate.setDate(now.getDate() + daysUntilNextMonday);
        break;
    }

    // Time setting
    const [hours, minutes] = selectedTime.split(':');
    targetDate.setHours(parseInt(hours || '9'), parseInt(minutes || '0'), 0, 0);

    // If time has passed today, move to tomorrow
    if (selectedDate === 'today' && targetDate < now) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const displayText = formatDisplayText(targetDate);
    
    onSave({
      displayText,
      timestamp: targetDate
    });
  };

  return (
    <ResponsiveDialog
      open={open}
      onClose={onClose}
      title="Reminder"
    >
      <Box sx={{ p: 3 }}>
        {/* Custom Time Selection */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Date & Time
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                displayEmpty
              >
                {dateOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                displayEmpty
              >
                {timeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>

        {/* Quick Options */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Quick Options
          </Typography>
          <Stack spacing={1}>
            {quickOptions.map((option, index) => (
              <Chip
                key={index}
                label={option.label}
                clickable
                onClick={() => handleQuickOption(option)}
                sx={{
                  justifyContent: 'flex-start',
                  border: '1px solid #e5e7eb',
                  backgroundColor: 'white',
                  color: '#374151',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                    borderColor: '#dc2626'
                  },
                  height: 36,
                  fontSize: '0.875rem'
                }}
                icon={<Clock size={14} />}
              />
            ))}
          </Stack>
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
          <Button 
            onClick={onClose}
            sx={{ 
              color: '#6b7280',
              textTransform: 'none'
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleCustomSave}
            sx={{
              bgcolor: '#dc2626',
              '&:hover': { bgcolor: '#b91c1c' },
              textTransform: 'none',
              fontWeight: 500,
              px: 3
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </ResponsiveDialog>
  );
};

export default ReminderSetupModal;