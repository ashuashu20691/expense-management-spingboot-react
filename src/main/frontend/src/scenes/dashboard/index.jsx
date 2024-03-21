import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import Header from '../../components/Header';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';
import BarChart from '../../components/BarChart';
import ProgressCircle from '../../components/ProgressCircle';
import { Helmet } from 'react-helmet';
import { MoneyOff } from '@mui/icons-material';
const apiUrl = process.env.REACT_APP_API_URL;


const Dashboard = () => {

  const [lastMonthSpent, setLastMonthSpent] = useState([]);
  const [lastWeekSpent, setLastWeekSpent] = useState([]);
  const [totalSpent, setTotalSpent] = useState([]);
  const [predNextMonthSpent, setPredNextMonthSpent] = useState([]);
  const [deployVersion, setDeployVersion] = useState([]);

  useEffect(() => {
    fetch(apiUrl + '/api/expenses/last-month-expense')
      .then(response => response.json())
      .then(data => setLastMonthSpent(data))
      .catch(error => console.error('Error fetching expense data:', error));

    fetch(apiUrl + '/api/expenses/last-week-expense')
    .then(response => response.json())
    .then(data => setLastWeekSpent(data))
    .catch(error => console.error('Error fetching expense data:', error));

    fetch(apiUrl + '/api/expenses/next-month-pred-expense')
    .then(response => response.json())
    .then(data => setPredNextMonthSpent(data))
    .catch(error => console.error('Error fetching expense data:', error));


    fetch(apiUrl + '/api/expenses/total-expense')
    .then(response => response.json())
    .then(data => setTotalSpent(data))
    .catch(error => console.error('Error fetching expense data:', error));

    fetch(apiUrl + '/api/expenses/deploy-version')
    .then(response => response.text())
    .then(data => setDeployVersion(data))
    .catch(error => console.error('Error fetching expense data:', error));

    }, []);



  const theme = useTheme();
  const colors = theme.palette.mode === 'dark' ? 
    { primary: '#212121', greenAccent: '#4caf50', grey: '#bdbdbd' } : 
    { primary: '#fafafa', greenAccent: '#4caf50', grey: '#616161' };

  return (
    <Box m="15px">
      <Helmet>
        <title>Dashboard | Expense Management System</title>
      </Helmet>
      
      <Box display="flex" justifyContent="flex-end">
        <Typography variant="body2" color={colors.grey}>
          Version: {deployVersion} {/* or {appVersion} if using env variable */}
        </Typography>
      </Box>
      {/* <Header title ="Dashboard" subtitle="Welcome to your dashboard" /> */}
      {/* <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          sx={{
            backgroundColor: colors.primary,
            color: colors.grey,
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '5px 12px',
            borderRadius: '4px',
          }}
          startIcon={<DownloadIcon />}
        >
          Download Reports
        </Button>
      </Box> */}

      {/* Statistics Section */}
      <Box mt="20px" display="flex" justifyContent="space-between">
        {/* Email Statistics */}
        <Box bgcolor={colors.primary} p="20px" flex="1">
          <Typography variant="h6" color={colors.grey} gutterBottom>Last Month Spent</Typography>
          <Box display="flex" alignItems="center">
          <MoneyOff sx={{ color: colors.greenAccent, fontSize: '2rem', marginRight: '10px' }} />
            <Box>
              <Typography variant="h4">{lastMonthSpent}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Sales Statistics */}
        <Box bgcolor={colors.primary} p="20px" flex="1" ml="20px">
          <Typography variant="h6" color={colors.grey} gutterBottom>Predicted Next Month Spent</Typography>
          <Box display="flex" alignItems="center">
          <MoneyOff sx={{ color: colors.greenAccent, fontSize: '2rem', marginRight: '10px' }} />
            <Box>
              <Typography variant="h4">{predNextMonthSpent}</Typography>
            </Box>
          </Box>
        </Box>

        {/* New Clients Statistics */}
        <Box bgcolor={colors.primary} p="20px" flex="1" ml="20px">
          <Typography variant="h6" color={colors.grey} gutterBottom>Last Week Spent</Typography>
          <Box display="flex" alignItems="center">
          <MoneyOff sx={{ color: colors.greenAccent, fontSize: '2rem', marginRight: '10px' }} />
            <Box>
              <Typography variant="h4">{lastWeekSpent}</Typography>
              {/* <Typography variant="body2">Progress: 21%</Typography> */}
            </Box>
          </Box>
        </Box>

        {/* Traffic Statistics */}
        {/* <Box bgcolor={colors.primary} p="20px" flex="1" ml="20px">
          <Typography variant="h6" color={colors.grey} gutterBottom>Traffic Occurred</Typography>
          <Box display="flex" alignItems="center">
            <TrafficIcon sx={{ color: colors.greenAccent, fontSize: '2rem', marginRight: '10px' }} />
            <Box>
              <Typography variant="h4">1,312,121</Typography>
              <Typography variant="body2">Progress: 90%</Typography>
            </Box>
          </Box>
        </Box> */}
      </Box>

      {/* Revenue Section */}
      <Box mt="20px">
        <Typography variant="h5" color={colors.grey} mb="10px">Total Spent</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" p="20px" bgcolor={colors.primary}>
        {/* <MoneyOff sx={{ color: colors.greenAccent, fontSize: '2rem', marginRight: '10px' }} /> */}
          <Typography variant="h4" fontWeight="bold" color={colors.greenAccent}>${totalSpent}</Typography>
          <Button
            variant="contained"
            color="success"
            startIcon={<DownloadIcon />}
          >
            Download
          </Button>
        </Box>
        <Box>
            <PieChart/>        
        </Box>
        <Box>
          <BarChart/>        
        </Box>
        <Box>
            <LineChart/>        
          </Box>
      </Box>

      {/* Other Sections (Transactions, Campaign, Sales Quantity, Geography) */}
      {/* Add your components for these sections here */}
    </Box>
  );
};

export default Dashboard;
