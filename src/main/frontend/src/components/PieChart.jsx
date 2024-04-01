import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Box } from '@mui/material';
const apiUrl = process.env.REACT_APP_API_URL;

const PieChart = () => {
  const chartRef = useRef(null);
  const [data, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + '/api/expenses/group-by-category');
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    fetchData();
  }, []); // Fetch data only once when the component mounts

  useEffect(() => {
    // Only create the chart if data is available
    if (data.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy previous chart instance if it exists
      if (chartRef.current.chart !== undefined) {
        chartRef.current.chart.destroy();
      }

      // Create new chart instance
      const newChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map(expense => expense.category),
          datasets: [{
            label: 'Expense Amount',
            data: data.map(expense => expense.totalExpense),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
            ],
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 2,
          }],
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                }
              }
            }
          }
        },
      });

      // Update the chart reference
      chartRef.current.chart = newChart;
    }
  }, [data]);

  return (
    <Box textAlign="center">
      <h2>Expenses By Category</h2>
      <div style={{ width: '600px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas ref={chartRef} width={600} height={600}></canvas>
      </div>
    </Box>
  );
  
  
};

export default PieChart;
