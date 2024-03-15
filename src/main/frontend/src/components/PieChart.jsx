import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
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
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
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
                  return `${label}: ${value} (${percentage}%)`;
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
    <div>
      <canvas ref={chartRef} width={400} height={300}></canvas>
    </div>
  );
};

export default PieChart;
