// src/components/Chart.js
import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Box, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

ChartJS.register(...registerables);

const ChartComponent = ({ type, data, options, onDelete }) => {
  const ChartType = {
    bar: Bar,
    line: Line,
    pie: Pie,
  }[type];

  return (
    <Box sx={{ position: 'relative', display: 'inline-block', margin: 2 }}>
      <ChartType data={data} options={options} />
      <IconButton
        sx={{ position: 'absolute', top: 0, right: 0 }}
        size="small"
        onClick={onDelete}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ChartComponent;
