package com.spring.oracle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.oracle.dto.MonthlyExpenseOverviewDTO;
import com.spring.oracle.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {


    @Query("SELECT e.category, SUM(e.amount) AS totalAmount FROM Expense e GROUP BY e.category")
    List<Object[]> getExpensesByCategory();


    @Query("SELECT new com.spring.oracle.dto.MonthlyExpenseOverviewDTO(e.category, SUM(e.amount), FUNCTION('TO_CHAR', e.expenseDate, 'YYYY-MM') as month) " +
           "FROM Expense e " +
           "GROUP BY FUNCTION('TO_CHAR', e.expenseDate, 'YYYY-MM'), e.category " +
           "ORDER BY month, e.category")
    List<MonthlyExpenseOverviewDTO> findMonthlyExpensesOverview();


}
