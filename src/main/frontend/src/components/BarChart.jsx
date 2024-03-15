import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
const apiUrl = process.env.REACT_APP_API_URL;

const BarChart = () => {
  const [expenseData, setExpenseData] = useState({});

  useEffect(() => {
    fetch(apiUrl +'/api/expenses/group-by-month')
      .then(response => response.json())
      .then(data => setExpenseData(data))
      .catch(error => console.error('Error fetching expense data:', error));
  }, []);

  const months = Object.keys(expenseData).sort();
  const categories = [...new Set(months.flatMap(month => expenseData[month].map(entry => entry.category)))].sort();

  const chartData = {
    options: {
      xaxis: { categories: months },
    },
    series: categories.map(category => ({
      name: category,
      data: months.map(month =>
        expenseData[month]?.find(entry => entry.category === category)?.totalExpense || 0
      ),
    })),
  };

  return <Chart options={chartData.options} series={chartData.series} type="bar" />;
};

export default BarChart;
