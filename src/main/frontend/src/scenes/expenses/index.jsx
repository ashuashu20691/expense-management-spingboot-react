import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const Expenses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expense data from API
    fetch(apiUrl + '/api/expenses')
      .then(response => response.json())
      .then(data => setExpenses(data))
      .catch(error => console.error('Error fetching expense data:', error));
  }, []);

  const handleDelete = (id) => {
    // Delete expense data
    fetch(apiUrl + `/api/expenses/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Expense deleted successfully');
          // Remove the deleted expense from the state
          setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
        } else {
          console.error('Error deleting expense:', response.status);
        }
      })
      .catch(error => console.error('Error deleting expense:', error));
  };

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'amount', headerName: 'Amount', type: 'number' },
    { field: 'expenseDate', headerName: 'Expense Date', flex: 1 },
    {
      field: 'edit',
      headerName: 'Edit',
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          onClick={() => navigate(`/expenses/edit/${row.id}`)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="15px">
      <Helmet>
        <title>Expenses | Expense Tracker</title>
      </Helmet>
      <Header title="EXPENSES" subtitle="List of Expenses" />
      <Box
        m="30px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={expenses} columns={columns} />
      </Box>
    </Box>
  );
};

export default Expenses;
