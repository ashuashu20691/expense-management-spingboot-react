import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import Header from '../../components/Header';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import ProgressCircle from '../../components/ProgressCircle';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const theme = useTheme();
  const colors = theme.palette.mode === 'dark' ? 
    { primary: '#212121', greenAccent: '#4caf50', grey: '#bdbdbd' } : 
    { primary: '#fafafa', greenAccent: '#4caf50', grey: '#616161' };

  return (
    <Box m="15px">
      <Helmet>
        <title>Dashboard | Expense Management System</title>
      </Helmet>
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
          <Typography variant="h6" color={colors.grey} gutterBottom>Emails Sent</Typography>
          <Box display="flex" alignItems="center">
            <EmailIcon sx={{ color: colors.greenAccent, fontSize: '2rem', marginRight: '10px' }} />
            <Box>
              <Typography variant="h4">12,121</Typography>
              <Typography variant="body2">Progress: 75%</Typography>
            </Box>
          </Box>
        </Box>

        {/* Sales Statistics */}
        <Box bgcolor={colors.primary} p="20px" flex="1" ml="20px">
          <Typography variant="h6" color={colors.grey} gutterBottom>Sales Obtained</Typography>
          <Box display="flex" alignItems="center">
            <PointOfSaleIcon sx={{ color: colors.greenAccent, fontSize: '2rem', marginRight: '10px' }} />
            <Box>
              <Typography variant="h4">52,521</Typography>
              <Typography variant="body2">Progress: 50%</Typography>
            </Box>
          </Box>
        </Box>

        {/* New Clients Statistics */}
        <Box bgcolor={colors.primary} p="20px" flex="1" ml="20px">
          <Typography variant="h6" color={colors.grey} gutterBottom>New Clients</Typography>
          <Box display="flex" alignItems="center">
            <PersonAddIcon sx={{ color: colors.greenAccent, fontSize: '2rem', marginRight: '10px' }} />
            <Box>
              <Typography variant="h4">8,121</Typography>
              <Typography variant="body2">Progress: 21%</Typography>
            </Box>
          </Box>
        </Box>

        {/* Traffic Statistics */}
        <Box bgcolor={colors.primary} p="20px" flex="1" ml="20px">
          <Typography variant="h6" color={colors.grey} gutterBottom>Traffic Occurred</Typography>
          <Box display="flex" alignItems="center">
            <TrafficIcon sx={{ color: colors.greenAccent, fontSize: '2rem', marginRight: '10px' }} />
            <Box>
              <Typography variant="h4">1,312,121</Typography>
              <Typography variant="body2">Progress: 90%</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Revenue Section */}
      <Box mt="20px">
        <Typography variant="h5" color={colors.grey} mb="10px">Revenue Generated</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" p="20px" bgcolor={colors.primary}>
          <Typography variant="h4" fontWeight="bold" color={colors.greenAccent}>₹33,31,700</Typography>
          <Button
            variant="contained"
            color="success"
            startIcon={<DownloadIcon />}
          >
            Download
          </Button>
        </Box>
        <Box height="300px">
        
            <LineChart/>
                  </Box>
      </Box>

      {/* Other Sections (Transactions, Campaign, Sales Quantity, Geography) */}
      {/* Add your components for these sections here */}
    </Box>
  );
};

export default Dashboard;
