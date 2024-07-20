// src/components/DataTable.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import DataForm from './DataForm';

const DataTable = ({ data, columns, onAddData, onAddColumn, onDeleteRow, onDeleteColumn, onUpdateData }) => {
  const [newColumn, setNewColumn] = useState('');

  const handleAddColumn = () => {
    if (newColumn) {
      onAddColumn(newColumn);
      setNewColumn('');
    }
  };

  const handleInputChange = (rowId, column, value) => {
    onUpdateData(rowId, column, value);
  };

  return (
    <TableContainer component={Paper}>
      <DataForm columns={columns} onAddData={onAddData} />
      <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
        <TextField
          label="New Column"
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddColumn}>
          Add Column
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>
                {column}
                <IconButton size="small" onClick={() => onDeleteColumn(column)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column}>
                  <TextField
                    value={row[column] || ''}
                    onChange={(e) => handleInputChange(row.id, column, e.target.value)}
                  />
                </TableCell>
              ))}
              <TableCell>
                <IconButton size="small" onClick={() => onDeleteRow(row.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
