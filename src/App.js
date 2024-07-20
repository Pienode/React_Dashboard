// src/App.js
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProviderWrapper, ThemeContext } from './ThemeContext';
import DataTable from './components/DataTable';
import ChartComponent from './components/Chart';
import CalendarComponent from './components/Calendar';
import KanbanBoard from './components/KanbanBoard';
import Navigation from './components/Navigation';
import ChartForm from './components/ChartForm';

const App = () => {
  const { toggleTheme } = useContext(ThemeContext);

  const [data, setData] = useState([
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
  ]);

  const [columns, setColumns] = useState(Object.keys(data[0] || {}));
  const [charts, setCharts] = useState([
    {
      id: 1,
      type: 'bar',
      column: 'value',
      data: {
        labels: data.map(row => row.name),
        datasets: [
          {
            label: 'Value',
            data: data.map(row => row.value),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    },
  ]);

  const [events, setEvents] = useState([{ id: '1', title: 'Event 1', date: '2024-07-01' }]);

  const [tasks, setTasks] = useState({
    todo: [{ id: '1', content: 'Task 1' }],
    inProgress: [{ id: '2', content: 'Task 2' }],
    done: [{ id: '3', content: 'Task 3' }],
  });

  const addData = (newData) => {
    const updatedData = [...data, { id: data.length + 1, ...newData }];
    setData(updatedData);
    updateCharts(updatedData);
  };

  const addColumn = (newColumn) => {
    if (newColumn && !columns.includes(newColumn)) {
      setColumns([...columns, newColumn]);
      setData(data.map(row => ({ ...row, [newColumn]: '' })));
    }
  };

  const deleteRow = (rowId) => {
    const updatedData = data.filter(row => row.id !== rowId);
    setData(updatedData);
    updateCharts(updatedData);
  };

  const deleteColumn = (column) => {
    const updatedColumns = columns.filter(col => col !== column);
    setColumns(updatedColumns);
    setData(data.map(row => {
      const updatedRow = { ...row };
      delete updatedRow[column];
      return updatedRow;
    }));
    setCharts(charts.filter(chart => chart.column !== column));
  };

  const updateData = (rowId, column, value) => {
    const updatedData = data.map(row =>
      row.id === rowId ? { ...row, [column]: value } : row
    );
    setData(updatedData);
    updateCharts(updatedData);
  };

  const addChart = (chartType, column) => {
    const newChart = {
      id: charts.length + 1,
      type: chartType,
      column: column,
      data: {
        labels: data.map(row => row.name),
        datasets: [
          {
            label: column.charAt(0).toUpperCase() + column.slice(1),
            data: data.map(row => row[column]),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
    setCharts([...charts, newChart]);
  };

  const deleteChart = (chartId) => {
    setCharts(charts.filter(chart => chart.id !== chartId));
  };

  const updateCharts = (updatedData) => {
    setCharts(charts.map(chart => ({
      ...chart,
      data: {
        ...chart.data,
        labels: updatedData.map(row => row.name),
        datasets: chart.data.datasets.map(dataset => ({
          ...dataset,
          data: updatedData.map(row => row[chart.column]),
        })),
      },
    })));
  };

  const addEvent = (newEvent) => {
    const updatedEvents = [...events, { id: (events.length + 1).toString(), ...newEvent }];
    setEvents(updatedEvents);
  };

  const removeEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const renameEvent = (eventId, newTitle) => {
    const updatedEvents = events.map(event => 
      event.id === eventId ? { ...event, title: newTitle } : event
    );
    setEvents(updatedEvents);
  };

  const handleAddTask = (content, status) => {
    const newTask = {
      id: Date.now().toString(), // Generate unique ID
      content,
    };
    const updatedTasks = {
      ...tasks,
      [status]: [...tasks[status], newTask],
    };
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (status, taskId) => {
    const updatedTasks = {
      ...tasks,
      [status]: tasks[status].filter(task => task.id !== taskId),
    };
    setTasks(updatedTasks);
  };

  return (
    <ThemeProviderWrapper>
      <Router>
        <div>
          <Navigation onToggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Navigate to="/table" replace />} key="default" />
            <Route
              path="/table"
              element={
                <DataTable
                  data={data}
                  columns={columns}
                  onAddData={addData}
                  onAddColumn={addColumn}
                  onDeleteRow={deleteRow}
                  onDeleteColumn={deleteColumn}
                  onUpdateData={updateData}
                />
              }
              key="table"
            />
            <Route
              path="/charts"
              element={
                <>
                  <ChartForm columns={columns} onAddChart={addChart} />
                  {charts.map(chart => (
                    <ChartComponent
                      key={chart.id}
                      data={chart.data}
                      options={chart.options}
                      type={chart.type}
                      onDelete={() => deleteChart(chart.id)}
                    />
                  ))}
                </>
              }
              key="charts"
            />
            <Route
              path="/calendar"
              element={
                <CalendarComponent
                  events={events}
                  onAddEvent={addEvent}
                  onRemoveEvent={removeEvent}
                  onRenameEvent={renameEvent}
                />
              }
              key="calendar"
            />
            <Route
              path="/kanban"
              element={
                <KanbanBoard
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onDeleteTask={handleDeleteTask}
                />
              }
              key="kanban"
            />
          </Routes>
        </div>
      </Router>
    </ThemeProviderWrapper>
  );
};

export default App;
