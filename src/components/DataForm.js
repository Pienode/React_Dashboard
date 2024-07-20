// src/components/DataForm.js
import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const DataForm = ({ columns, onAddData }) => {
  const [formData, setFormData] = useState(
    columns.reduce((acc, column) => {
      acc[column] = '';
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddData(formData);
    setFormData(
      columns.reduce((acc, column) => {
        acc[column] = '';
        return acc;
      }, {})
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
      {columns.map((column) => (
        <TextField
          key={column}
          label={column}
          name={column}
          value={formData[column] || ''}
          onChange={handleChange}
        />
      ))}
      <Button type="submit" variant="contained" color="primary">
        Add Data
      </Button>
    </Box>
  );
};

export default DataForm;
