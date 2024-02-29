    package com.spring.oracle.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.oracle.dto.MonthlyExpenseOverviewDTO;
import com.spring.oracle.model.Expense;
import com.spring.oracle.repository.ExpenseRepository;


    @Service
    public class ExpenseService {
        @Autowired
        private ExpenseRepository expenseRepository;

        
        public List<Expense> getAllExpenses() {
            return expenseRepository.findAll();
        }
        
        public Expense createExpense(Expense expense) {
            return expenseRepository.save(expense);
        }
        
        public Map<String, List<MonthlyExpenseOverviewDTO>> getMonthlyExpenseOverview() {
            List<MonthlyExpenseOverviewDTO> result = expenseRepository.findMonthlyExpensesOverview();
            return result.stream().collect(Collectors.groupingBy(MonthlyExpenseOverviewDTO::getMonth)); 
        }

        public List<MonthlyExpenseOverviewDTO> getCategoryExpenseOverview() {
            List<Object[]> result = expenseRepository.getExpensesByCategory();
            List<MonthlyExpenseOverviewDTO> overviewList = new ArrayList<>();

            for (Object[] row : result) {
                MonthlyExpenseOverviewDTO overview = new MonthlyExpenseOverviewDTO();
                overview.setCategory((String) row[0]);
                overview.setTotalExpense((BigDecimal) row[1]);

                overviewList.add(overview);
            }

            return overviewList;
        }


    }
