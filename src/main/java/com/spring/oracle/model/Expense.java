package com.spring.oracle.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(length = 255)
    private String category;

    @Column(length = 255)
    private String title;
    
    @Column(length = 255)
    private String description;
    
    @Column(precision = 19, scale = 2)
    private BigDecimal amount;
    
    @Temporal(TemporalType.TIMESTAMP) // Adjust according to your preference
    @JsonFormat(pattern = "yyyy-MM-dd") // Set the date format for JSON serialization
    // @DateTimeFormat(pattern = "yyyy-MM-dd") // Set the date format for request binding

    private Date expenseDate;

    public Expense() {
    }

    public Expense(String category, BigDecimal amount, Date expenseDate) {
        this.category = category;
        this.amount = amount;
        this.expenseDate = expenseDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Date getExpenseDate() {
        return expenseDate;
    }

    public void setExpenseDate(Date expenseDate) {
        this.expenseDate = expenseDate;
    }
}
