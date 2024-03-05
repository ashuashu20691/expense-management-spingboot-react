package com.spring.oracle.controller;


import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.oracle.dto.MonthlyExpenseOverviewDTO;
import com.spring.oracle.model.Expense;
import com.spring.oracle.repository.ExpenseRepository;
import com.spring.oracle.service.ExpenseService;

// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private ExpenseService expenseService;



    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseRepository.findAll();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

   @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
    Optional<Expense> expense = expenseRepository.findById(id);

        if (expense.isPresent()) {
            return new ResponseEntity<>(expense.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Expense> deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
        Optional<Expense> expense = expenseRepository.findById(id);
        if (expense.isPresent()) {
            return new ResponseEntity<>(expense.get(), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }


    @GetMapping("/group-by-category")
    public ResponseEntity<List<MonthlyExpenseOverviewDTO>> getMonthlyExpenseOverview() {
        List<MonthlyExpenseOverviewDTO> expenses = expenseService.getCategoryExpenseOverview();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    @GetMapping("/group-by-month")
    public ResponseEntity<Map<String, List<MonthlyExpenseOverviewDTO>>> getCategoryExpenseOverview() {
        return new ResponseEntity<>(expenseService.getMonthlyExpenseOverview(), HttpStatus.OK);
    }



    @PostMapping
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense) {
        System.out.println(expense.getExpenseDate());
        Expense savedExpense = expenseRepository.save(expense);
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expenseDetails) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        if (optionalExpense.isPresent()) {
            Expense existingExpense = optionalExpense.get();
            existingExpense.setCategory(expenseDetails.getCategory());
            existingExpense.setAmount(expenseDetails.getAmount());
            existingExpense.setExpenseDate(expenseDetails.getExpenseDate());
    
            Expense updatedExpense = expenseRepository.save(existingExpense);
            return new ResponseEntity<>(updatedExpense, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    

    // Add other endpoints as needed (e.g., for updating, deleting, or retrieving by ID)
}
