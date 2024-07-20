// src/components/KanbanBoard.js
import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Typography } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Delete as DeleteIcon } from '@mui/icons-material';

const KanbanBoard = ({ tasks, onAddTask, onDeleteTask }) => {
  const [newTaskContent, setNewTaskContent] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('todo');

  const handleAddTask = () => {
    if (newTaskContent.trim() !== '') {
      onAddTask(newTaskContent, newTaskStatus);
      setNewTaskContent('');
      setNewTaskStatus('todo');
    }
  };

  const handleDeleteTask = (status, taskId) => {
    onDeleteTask(status, taskId);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="New Task"
          variant="outlined"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
        />
        <TextField
          select
          label="Status"
          variant="outlined"
          value={newTaskStatus}
          onChange={(e) => setNewTaskStatus(e.target.value)}
          SelectProps={{ native: true }}
          sx={{ ml: 2 }}
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          sx={{ ml: 2 }}
        >
          Add Task
        </Button>
      </Box>
      <DragDropContext onDragEnd={() => { /* Handle drag and drop logic */ }}>
        <Droppable droppableId="kanban-board" direction="horizontal">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ display: 'flex', gap: 2 }}
            >
              {['todo', 'inProgress', 'done'].map((status, index) => (
                <Box key={status} sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Typography>
                  {tasks[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            p: 2,
                            mb: 1,
                            border: '1px solid #ddd',
                            borderRadius: 1,
                            backgroundColor: '#fff',
                          }}
                        >
                          {task.content}
                          <IconButton
                            onClick={() => handleDeleteTask(status, task.id)}
                            sx={{ float: 'right' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                </Box>
              ))}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default KanbanBoard;
