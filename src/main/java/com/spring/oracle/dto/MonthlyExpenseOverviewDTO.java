package com.spring.oracle.dto;

import java.math.BigDecimal;

public class MonthlyExpenseOverviewDTO {
    private BigDecimal totalExpense;
    private String category;
    private String month;

    public MonthlyExpenseOverviewDTO() {
    }

    public MonthlyExpenseOverviewDTO(String category, BigDecimal totalExpense, String month) {
        this.month = month;
        this.totalExpense = totalExpense;
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public BigDecimal getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(BigDecimal totalExpense) {
        this.totalExpense = totalExpense;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }


}
