import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
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

interface Note {
  id: string;
  type: 'regular' | 'reminder';
  content: string;
  createdAt: string;
  reminderTime?: string;
  isActive?: boolean;
}

interface EditNoteModalProps {
  open: boolean;
  note: Note;
  onClose: () => void;
  onSave: (noteData: any) => void;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  open,
  note,
  onClose,
  onSave,
}) => {
  const [noteType, setNoteType] = useState<'regular' | 'reminder'>(note.type);
  const [content, setContent] = useState(note.content);
  const [reminderTime, setReminderTime] = useState<string | null>(note.reminderTime || null);
  const [reminderSetupOpen, setReminderSetupOpen] = useState(false);

  useEffect(() => {
    setNoteType(note.type);
    setContent(note.content);
    setReminderTime(note.reminderTime || null);
  }, [note]);

  const handleSave = () => {
    if (!content.trim()) return;

    const noteData = {
      id: note.id,
      type: noteType,
      content: content.trim(),
      reminderTime: noteType === 'reminder' ? reminderTime : null,
      createdAt: note.createdAt,
      updatedAt: new Date().toLocaleString(),
    };

    onSave(noteData);
    handleClose();
  };

  const handleClose = () => {
    // Reset to original values
    setContent(note.content);
    setNoteType(note.type);
    setReminderTime(note.reminderTime || null);
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
        title="Edit Note"
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
              placeholder="Edit your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            
            {/* Created Date - moved here */}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Created: {note.createdAt}
            </Typography>
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
                  gap: 1.5,
                  p: 1.5,
                  border: '1px solid #fed7aa',
                  borderRadius: 2,
                  backgroundColor: '#fef3c7'
                }}>
                  <Clock size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      color: '#92400e',
                      fontWeight: 500
                    }}
                  >
                    {reminderTime}
                  </Typography>
                  <Button 
                    size="small"
                    onClick={handleReminderSetup}
                    sx={{ 
                      color: '#f59e0b',
                      textTransform: 'none',
                      minWidth: 'auto',
                      px: 1.5,
                      py: 0.5,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'rgba(245, 158, 11, 0.1)'
                      }
                    }}
                  >
                    Change
                  </Button>
                  <IconButton 
                    size="small" 
                    onClick={removeReminder}
                    sx={{
                      p: 0.5,
                      color: '#92400e',
                      '&:hover': {
                        backgroundColor: 'rgba(146, 64, 14, 0.1)'
                      }
                    }}
                  >
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
              Save Changes
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

export default EditNoteModal;