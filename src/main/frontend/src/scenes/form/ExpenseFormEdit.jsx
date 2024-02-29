import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { Helmet } from 'react-helmet';

const ExpenseEdit = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    expenseDate: '',
  });

  useEffect(() => {
    // Fetch expense data for the given id
    fetch(`http://localhost:8080/api/expenses/${id}`)
      .then(response => response.json())
      .then(data => setExpense(data))
      .catch(error => console.error('Error fetching expense data:', error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update expense data
    fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Expense updated successfully:', data);
        navigate.push('/expenses');
      })
      .catch(error => console.error('Error updating expense:', error));
  };

  return (
    <Box m="15px">
      <Helmet>
        <title>Edit Expense | Expense Tracker</title>
      </Helmet>
      <Header title="Edit Expense" />
      <Box
        m="30px 0"
        p="20px"
        borderRadius="8px"
        backgroundColor={colors.primary[400]}
      >
        <form onSubmit={handleSubmit}>
          <Box mb="20px">
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={expense.category}
              onChange={handleChange}
            />
          </Box>
          <Box mb="20px">
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={expense.amount}
              onChange={handleChange}
            />
          </Box>
          <Box mb="20px">
            <TextField
              fullWidth
              label="Expense Date"
              name="expenseDate"
              type="date"
              value={expense.expenseDate}
              onChange={handleChange}
            />
          </Box>
          <Button variant="contained" type="submit">
            Update Expense
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ExpenseEdit;
