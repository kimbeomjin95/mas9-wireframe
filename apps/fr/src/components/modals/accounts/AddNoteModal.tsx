import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Stack,
  Chip,
  IconButton,
} from '@mui/material';
import { ResponsiveDialog } from '@mas9/shared-ui';
import { 
  StickyNote, 
  Clock,
  X,
  Calendar,
  Bell
} from 'lucide-react';
import ReminderSetupModal from './ReminderSetupModal';

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (noteData: any) => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [noteType, setNoteType] = useState<'regular' | 'reminder'>('regular');
  const [content, setContent] = useState('');
  const [reminderTime, setReminderTime] = useState<string | null>(null);
  const [reminderSetupOpen, setReminderSetupOpen] = useState(false);

  const handleSave = () => {
    if (!content.trim()) return;

    const noteData = {
      type: noteType,
      content: content.trim(),
      reminderTime: noteType === 'reminder' ? reminderTime : null,
      createdAt: new Date().toLocaleString(),
    };

    onSave(noteData);
    handleClose();
  };

  const handleClose = () => {
    setContent('');
    setNoteType('regular');
    setReminderTime(null);
    onClose();
  };

  const handleReminderSetup = () => {
    setReminderSetupOpen(true);
  };

  const handleReminderSave = (timeData: any) => {
    setReminderTime(timeData.displayText);
    setReminderSetupOpen(false);
  };

  const removeReminder = () => {
    setReminderTime(null);
  };

  return (
    <>
      <ResponsiveDialog
        open={open}
        onClose={handleClose}
        title="Add Note"
      >
        <Box sx={{ p: 3 }}>
          {/* Note Type Selection */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Note Type
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={noteType}
                onChange={(e) => setNoteType(e.target.value as 'regular' | 'reminder')}
              >
                <FormControlLabel
                  value="regular"
                  control={<Radio size="small" />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StickyNote size={18} color="#6b7280" />
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          Regular Note
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Simple note for record keeping
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{ mb: 1, alignItems: 'flex-start' }}
                />
                <FormControlLabel
                  value="reminder"
                  control={<Radio size="small" />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Clock size={18} color="#dc2626" />
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          Reminder
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Note with time-based notification
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Note Content */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Content
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Add your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Box>

          {/* Reminder Settings */}
          {noteType === 'reminder' && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                <Bell size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                Reminder Settings
              </Typography>
              
              {!reminderTime ? (
                <Button
                  variant="outlined"
                  startIcon={<Calendar size={16} />}
                  onClick={handleReminderSetup}
                  sx={{
                    borderColor: '#dc2626',
                    color: '#dc2626',
                    '&:hover': {
                      borderColor: '#b91c1c',
                      backgroundColor: '#fef2f2'
                    },
                    textTransform: 'none'
                  }}
                >
                  Set reminder time
                </Button>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  p: 2,
                  border: '1px solid #e5e7eb',
                  borderRadius: 2,
                  backgroundColor: '#fef3c7'
                }}>
                  <Clock size={16} color="#f59e0b" />
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {reminderTime}
                  </Typography>
                  <IconButton size="small" onClick={removeReminder}>
                    <X size={14} />
                  </IconButton>
                </Box>
              )}
            </Box>
          )}
          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button 
              onClick={handleClose}
              sx={{ 
                color: '#6b7280',
                textTransform: 'none'
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained"
              onClick={handleSave}
              disabled={!content.trim() || (noteType === 'reminder' && !reminderTime)}
              sx={{
                bgcolor: '#dc2626',
                '&:hover': { bgcolor: '#b91c1c' },
                textTransform: 'none',
                fontWeight: 500,
                px: 3
              }}
            >
              Save Note
            </Button>
          </Box>
        </Box>
      </ResponsiveDialog>

      {/* Reminder Setup Modal */}
      {reminderSetupOpen && (
        <ReminderSetupModal
          open={reminderSetupOpen}
          onClose={() => setReminderSetupOpen(false)}
          onSave={handleReminderSave}
        />
      )}
    </>
  );
};

export default AddNoteModal;