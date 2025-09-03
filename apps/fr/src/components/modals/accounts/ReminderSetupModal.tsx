import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  TextField,
} from '@mui/material';
import { ResponsiveDialog } from '@mas9/shared-ui';
import { 
  X,
  Clock,
  Calendar,
  Bell
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Quick options (Slack-style)
  const quickOptions = [
    { label: 'In 20 minutes', minutes: 20 },
    { label: 'In 1 hour', hours: 1 },
    { label: 'In 3 hours', hours: 3 },
    { label: 'Tomorrow at 9 AM', nextDay: true, time: '09:00' },
    { label: 'Next Monday', nextWeek: true, time: '09:00' },
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
    
    // If selected time has passed today, move to tomorrow
    if (selectedDate < now) {
      const tomorrow = new Date(selectedDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow);
      return;
    }

    const displayText = formatDisplayText(selectedDate);
    
    onSave({
      displayText,
      timestamp: selectedDate
    });
  };

  return (
    <>
      {/* Custom DatePicker Styles */}
      <style jsx global>{`
        .custom-datepicker .react-datepicker {
          font-family: inherit;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .custom-datepicker .react-datepicker--time-only {
          width: 140px;
        }
        
        .custom-datepicker .react-datepicker--time-only .react-datepicker__header {
          display: none;
        }
        
        .custom-datepicker .react-datepicker__header {
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          border-radius: 8px 8px 0 0;
        }
        
        .custom-datepicker .react-datepicker__current-month,
        .custom-datepicker .react-datepicker-time__header {
          color: #374151;
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .custom-datepicker .react-datepicker__day-name,
        .custom-datepicker .react-datepicker__day {
          color: #374151;
          width: 2rem;
          height: 2rem;
          line-height: 2rem;
          margin: 0.1rem;
        }
        
        .custom-datepicker .react-datepicker__day:hover {
          background-color: #fef2f2;
          border-radius: 4px;
        }
        
        .custom-datepicker .react-datepicker__day--selected {
          background-color: #dc2626;
          border-radius: 4px;
        }
        
        .custom-datepicker .react-datepicker__day--today {
          background-color: #fbbf24;
          color: white;
          border-radius: 4px;
        }
        
        .custom-datepicker .react-datepicker__time-container {
          border-left: 1px solid #e5e7eb;
          width: 120px;
        }
        
        .custom-datepicker .react-datepicker__time-list {
          width: 120px;
        }
        
        .custom-datepicker .react-datepicker__time-list-item {
          height: 30px;
          padding: 5px 10px;
          font-size: 0.875rem;
          width: 100px;
          text-align: center;
        }
        
        .custom-datepicker .react-datepicker__time-list-item:hover {
          background-color: #fef2f2;
        }
        
        .custom-datepicker .react-datepicker__time-list-item--selected {
          background-color: #dc2626;
          color: white;
        }
      `}</style>
      
      <ResponsiveDialog
        open={open}
        onClose={onClose}
        title="Reminder"
      >
      <Box sx={{ p: 3 }}>
        {/* Custom Date & Time Selection */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Date & Time
          </Typography>

          {/* Date Picker */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
              Date
            </Typography>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                if (date) {
                  // Preserve the current time when changing date
                  const newDate = new Date(date);
                  newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
                  setSelectedDate(newDate);
                }
              }}
              dateFormat="MM/dd/yyyy"
              customInput={
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  placeholder="Select date"
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                        <Calendar size={16} color="#6b7280" />
                      </Box>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#dc2626',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#dc2626',
                      },
                    },
                    '& .MuiInputBase-input': {
                      cursor: 'pointer',
                    }
                  }}
                />
              }
              popperClassName="custom-datepicker"
              popperPlacement="bottom-start"
              minDate={new Date()}
            />
          </Box>

          {/* Time Picker */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
              Time
            </Typography>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                if (date) setSelectedDate(date);
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              customInput={
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  placeholder="Select time"
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                        <Clock size={16} color="#6b7280" />
                      </Box>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#dc2626',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#dc2626',
                      },
                    },
                    '& .MuiInputBase-input': {
                      cursor: 'pointer',
                    }
                  }}
                />
              }
              popperClassName="custom-datepicker"
              popperPlacement="bottom-start"
            />
          </Box>
        </Box>

        {/* Quick Options */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Quick Options
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {quickOptions.map((option, index) => (
              <Chip
                key={index}
                label={option.label}
                clickable
                onClick={() => handleQuickOption(option)}
                sx={{
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
          </Box>
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
    </>
  );
};

export default ReminderSetupModal;