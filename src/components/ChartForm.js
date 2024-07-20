// src/components/ChartForm.js
import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField } from '@mui/material';

const ChartForm = ({ columns, onAddChart }) => {
  const [chartType, setChartType] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');

  const handleAddChart = () => {
    if (chartType && selectedColumn) {
      onAddChart(chartType, selectedColumn);
      setChartType('');
      setSelectedColumn('');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        select
        label="Chart Type"
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
        variant="outlined"
      >
        <MenuItem value="bar">Bar</MenuItem>
        <MenuItem value="line">Line</MenuItem>
        <MenuItem value="pie">Pie</MenuItem>
      </TextField>
      <TextField
        select
        label="Column"
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
        variant="outlined"
      >
        {columns.map((column) => (
          <MenuItem key={column} value={column}>
            {column}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" onClick={handleAddChart}>
        Add Chart
      </Button>
    </Box>
  );
};

export default ChartForm;
