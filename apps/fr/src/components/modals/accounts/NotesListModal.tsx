import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Tabs,
  Tab,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import { IOSSwitch } from '@/components/common/IOSSwitch';
import { ResponsiveDialog } from '@mas9/shared-ui';
import { 
  Plus, 
  MoreHorizontal, 
  StickyNote, 
  Clock,
  Bell,
  Edit3,
  Trash2,
  BellOff
} from 'lucide-react';
import AddNoteModal from './AddNoteModal';
import EditNoteModal from './EditNoteModal';
import ContextMenu from '../../common/ContextMenu';

interface Note {
  id: string;
  type: 'regular' | 'reminder';
  content: string;
  createdAt: string;
  reminderTime?: string;
  isActive?: boolean;
}

interface NotesListModalProps {
  onClose: () => void;
  onConfirm?: (result: any) => void;
  data?: {
    memberName?: string;
    notes?: Note[];
  };
}

const NotesListModal: React.FC<NotesListModalProps> = ({
  onClose,
  onConfirm,
  data,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  // 더미 데이터
  const sampleNotes: Note[] = data?.notes || [
    {
      id: '1',
      type: 'regular',
      content: 'Regular note about member progress and observations.',
      createdAt: '06/19/2025 12:58 AM',
    },
    {
      id: '2',
      type: 'reminder',
      content: 'Call client back regarding membership upgrade',
      createdAt: '06/19/2025 10:30 AM',
      reminderTime: '06/20/2025 09:00 AM',
      isActive: true,
    },
    {
      id: '3',
      type: 'regular',
      content: 'Member showed great improvement in class attendance',
      createdAt: '06/18/2025 03:45 PM',
    },
    {
      id: '4',
      type: 'reminder',
      content: 'Follow up on payment status',
      createdAt: '06/17/2025 11:20 AM',
      reminderTime: '06/21/2025 02:00 PM',
      isActive: true,
    },
  ];

  const filteredNotes = sampleNotes.filter(note => 
    activeTab === 0 ? note.type === 'regular' : note.type === 'reminder'
  );

  const handleAddNote = () => {
    setAddModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setEditModalOpen(true);
    setMenuOpen(null);
  };

  const handleDeleteNote = (noteId: string) => {
    // Delete logic
    console.log('Delete note:', noteId);
    setMenuOpen(null);
  };

  const handleCancelReminder = (noteId: string) => {
    // Reminder cancellation logic (keep note but convert to Regular)
    console.log('Cancel reminder for note:', noteId);
    setMenuOpen(null);
  };

  const handleSaveNote = (noteData: any) => {
    console.log('Save note:', noteData);
    setAddModalOpen(false);
    setEditModalOpen(false);
    setSelectedNote(null);
  };

  const handleClose = () => {
    onClose();
  };

  const toggleMenu = (noteId: string) => {
    setMenuOpen(menuOpen === noteId ? null : noteId);
  };

  return (
    <>
      <ResponsiveDialog
        open={true}
        title="Notes"
        onClose={handleClose}
      >
        <Box sx={{ width: '100%' }}>
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={(_, newValue) => setActiveTab(newValue)}
              sx={{
                px: 3,
                '& .MuiTabs-indicator': {
                  backgroundColor: '#dc2626'
                },
                '& .MuiTab-root': {
                  color: '#6b7280',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&.Mui-selected': {
                    color: '#dc2626'
                  }
                }
              }}
            >
              <Tab 
                icon={<StickyNote size={18} />}
                label="Regular" 
                iconPosition="start"
                sx={{ gap: 1 }}
              />
              <Tab 
                icon={<Clock size={18} />}
                label="Reminder" 
                iconPosition="start"
                sx={{ gap: 1 }}
              />
            </Tabs>
          </Box>

          {/* Notes List */}
          <Box sx={{ p: 3, minHeight: 300, maxHeight: 400, overflow: 'auto' }}>
            {filteredNotes.length === 0 ? (
              <Box sx={{ 
                textAlign: 'center', 
                py: 6,
                color: 'text.secondary'
              }}>
                <StickyNote size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
                <Typography variant="body1">
                  {activeTab === 0 ? 'No regular notes yet' : 'No reminders set'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Click "Add a note" to get started
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {filteredNotes.map((note, index) => (
                  <Box key={note.id}>
                    <Box sx={{
                      position: 'relative',
                      p: 2,
                      border: '1px solid #e5e7eb',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#f9fafb'
                      }
                    }}>
                      {/* Header */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                          {note.type === 'regular' ? (
                            <StickyNote size={16} color="#6b7280" />
                          ) : (
                            <Clock size={16} color="#dc2626" />
                          )}
                          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                            {note.createdAt}
                          </Typography>
                          {note.type === 'reminder' && note.isActive && (
                            <Chip 
                              label="Active"
                              size="small" 
                              color="error"
                              sx={{ 
                                height: 20, 
                                fontSize: '0.7rem',
                                ml: 0.5
                              }}
                            />
                          )}
                        </Box>
                        <IconButton 
                          size="small"
                          onClick={() => toggleMenu(note.id)}
                          sx={{ p: 0.5, ml: 1 }}
                        >
                          <MoreHorizontal size={16} />
                        </IconButton>

                        {/* Context Menu */}
                        <ContextMenu
                          open={menuOpen === note.id}
                          onClose={() => setMenuOpen(null)}
                          items={[
                            {
                              label: 'Edit',
                              icon: <Edit3 size={14} />,
                              onClick: () => handleEditNote(note),
                              color: 'inherit',
                            },
                            ...(note.type === 'reminder' && note.isActive ? [
                              {
                                label: 'Cancel Reminder',
                                icon: <BellOff size={14} />,
                                onClick: () => handleCancelReminder(note.id),
                                color: 'inherit' as const,
                              }
                            ] : []),
                            {
                              label: 'Delete',
                              icon: <Trash2 size={14} />,
                              onClick: () => handleDeleteNote(note.id),
                              color: 'error' as const,
                            },
                          ]}
                          position={{ top: 35, right: 8 }}
                        />
                      </Box>

                      {/* Content */}
                      <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.5 }}>
                        {note.content}
                      </Typography>

                      {/* Reminder Info */}
                      {note.type === 'reminder' && note.reminderTime && (
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            gap: 1,
                            mt: 2,
                            p: 1.5,
                            backgroundColor: note.isActive ? '#ecfdf5' : '#f3f4f6',
                            borderRadius: 2,
                            border: `1px solid ${note.isActive ? '#d1fae5' : '#e5e7eb'}`,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                            {note.isActive ? (
                              <Bell size={14} color="#10b981" />
                            ) : (
                              <BellOff size={14} color="#6b7280" />
                            )}
                            <Typography 
                              variant="caption" 
                              color={note.isActive ? "#065f46" : "#6b7280"}
                            >
                              {note.isActive ? 'Remind at: ' : 'Cancelled: '}{note.reminderTime}
                            </Typography>
                          </Box>
                          
                        </Box>
                      )}
                    </Box>
                    {index < filteredNotes.length - 1 && <Divider />}
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          {/* Add Note Button */}
          <Box sx={{ p: 3, pt: 0 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={handleAddNote}
              sx={{
                bgcolor: '#dc2626',
                '&:hover': { bgcolor: '#b91c1c' },
                textTransform: 'none',
                fontWeight: 500,
                py: 1.5
              }}
            >
              Add a note
            </Button>
          </Box>
        </Box>
      </ResponsiveDialog>

      {/* Add Note Modal */}
      {addModalOpen && (
        <AddNoteModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSave={handleSaveNote}
        />
      )}

      {/* Edit Note Modal */}
      {editModalOpen && selectedNote && (
        <EditNoteModal
          open={editModalOpen}
          note={selectedNote}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveNote}
        />
      )}
    </>
  );
};

export default NotesListModal;