import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const apiUrl = process.env.REACT_APP_API_URL;

const LineChart = () => {
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch expense data from API
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(apiUrl + '/api/expenses');
        const data = await response.json();
        setExpenses(data);
        
        // Set default start date to 15 days ago
        const today = new Date();
        const fifteenDaysAgo = new Date(today);
        fifteenDaysAgo.setDate(today.getDate() - 60);
        setStartDate(fifteenDaysAgo);
        setEndDate(today);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };
    fetchExpenses();
  }, []);

  // Handle start date change
  const handleStartDateChange = date => {
    setStartDate(date);
    if (!endDate || date <= endDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  // Handle end date change
  const handleEndDateChange = date => {
    if (!startDate || date >= startDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  };

  // Extracting categories and expenses from the data
  const categories = Array.from(new Set(expenses.map(expense => expense.category)));
  const seriesData = categories.map(category => {
    const data = expenses
      .filter(expense => (!startDate || new Date(expense.expenseDate) >= startDate) && (!endDate || new Date(expense.expenseDate) <= endDate))
      .filter(expense => expense.category === category)
      .map(expense => ({
        x: new Date(expense.expenseDate).getTime(),
        y: expense.amount,
      }));
    return {
      name: category,
      data: data,
    };
  });

  // Options for the brush chart
  const options = {
    chart: {
      id: 'chart1',
      toolbar: {
        autoSelected: 'pan',
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      labels: {
        formatter: val => val.toFixed(2),
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 5,
        opacityFrom: 0.7,
        opacityTo: 4.9,
        stops: [50, 90, 100],
      },
    },
  };

  return (
    <div>
      <h2>Brush Chart with Date Selector</h2>
      <div className="date-picker-container">
        <div className="date-picker">
          <label>Start Date:</label>
          <DatePicker selected={startDate} onChange={handleStartDateChange} selectsStart startDate={startDate} endDate={endDate} />
          <label>   End Date:</label>
          <DatePicker selected={endDate} onChange={handleEndDateChange} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />
        </div>
      </div>
      <Chart options={options} series={seriesData} type="area" height={350} />
    </div>
  );
};

export default LineChart;
