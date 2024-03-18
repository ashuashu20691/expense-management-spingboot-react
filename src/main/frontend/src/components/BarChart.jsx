import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Box, useTheme } from '@mui/material';
const apiUrl = process.env.REACT_APP_API_URL;

const BarChart = () => {
  const [expenseData, setExpenseData] = useState({});
  const theme = useTheme();

  useEffect(() => {
    fetch(apiUrl + '/api/expenses/group-by-month')
      .then(response => response.json())
      .then(data => setExpenseData(data))
      .catch(error => console.error('Error fetching expense data:', error));
  }, []);

  const months = Object.keys(expenseData).sort();
  const categories = [...new Set(months.flatMap(month => expenseData[month].map(entry => entry.category)))].sort();

  const chartWidth = Math.min(1200, categories.length * months.length * 50); // Adjust the max width as needed

  const chartData = {
    options: {
      chart: {
        toolbar: {
          show: false // Hide the chart toolbar
        },
        background: theme.palette.mode === 'dark' ? '#333' : '#fff' // Set background color based on theme
      },
      xaxis: { 
        categories: months,
        labels: {
          style: {
            colors: theme.palette.mode === 'dark' ? '#fff' : '#333' // Set x-axis label color based on theme
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: theme.palette.mode === 'dark' ? '#fff' : '#333' // Set y-axis label color based on theme
          }
        }
      },
      tooltip: {
        theme: theme.palette.mode === 'dark' ? 'dark' : 'light' // Set tooltip theme based on the current theme mode
      },
      colors: categories.map((_, index) => theme.palette.mode === 'dark' ? `hsl(${index * (360 / categories.length)}, 70%, 50%)` : undefined) // Set series colors based on theme
    },
    series: categories.map(category => ({
      name: category,
      data: months.map(month =>
        expenseData[month]?.find(entry => entry.category === category)?.totalExpense || 0
      ),
    })),
  };

  return (
    <Box textAlign="center">
      <h2 style={{ color: theme.palette.mode === 'dark' ? '#fff' : '#333' }}>Monthly Expenses By Category</h2>
      <Chart options={chartData.options} series={chartData.series} type="bar" width={chartWidth} />
    </Box>
  );
};

export default BarChart;
