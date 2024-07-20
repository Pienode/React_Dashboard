// src/components/Calendar.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Button, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const CalendarComponent = ({ events, onAddEvent, onRemoveEvent, onRenameEvent }) => {
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  const handleDateClick = (arg) => {
    setNewEventDate(arg.dateStr);
  };

  const handleAddEvent = () => {
    if (newEventTitle && newEventDate) {
      onAddEvent({ title: newEventTitle, date: newEventDate });
      setNewEventTitle('');
      setNewEventDate('');
    }
  };

  const handleEventRename = (eventId, newTitle) => {
    if (newTitle) {
      onRenameEvent(eventId, newTitle);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Event Title"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
        />
        <TextField
          type="date"
          value={newEventDate}
          onChange={(e) => setNewEventDate(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddEvent}>
          Add Event
        </Button>
      </Box>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventContent={(eventInfo) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {eventInfo.event.title}
            <IconButton
              size="small"
              onClick={() => handleEventRename(eventInfo.event.id, prompt('Enter new title:'))}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onRemoveEvent(eventInfo.event.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      />
    </Box>
  );
};

export default CalendarComponent;
