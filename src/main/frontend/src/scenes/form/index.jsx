import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

const ExpenseForm = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the expense data
    const expenseData = {
      category,
      amount: parseFloat(amount),
      expenseDate: date,
      description,
    };

    // Send the data to the API
    try {
      const response = await fetch('http://localhost:8080/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });
      // Handle response
      if (response.ok) {
        // Clear form fields
        setAmount('');
        setCategory('');
        setDate('');
        setDescription('');
        setError('');
      } else {
        throw new Error('Failed to add expense');
      }
    } catch (error) {
      setError('Failed to add expense');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            required
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Category"
            required
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            required
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Add Expense
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </form>
  );
};

export default ExpenseForm;
