package com.trend.project1.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "search_data")
public class SearchData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String keyword;
    private String month;
    private String gender;
    private String age;
    private float searchRate;

    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDate createdAt;

    public SearchData() {
        this.createdAt = LocalDate.now();
    }

    public SearchData(String keyword, String month, String gender, String age, float searchRate) {
        this.keyword = keyword;
        this.month = month;
        this.gender = gender;
        this.age = age;
        this.searchRate = searchRate;
        this.createdAt = LocalDate.now();
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getKeyword() { return keyword; }
    public void setKeyword(String keyword) { this.keyword = keyword; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }

    public float getSearchRate() { return searchRate; }
    public void setSearchRate(float searchRate) { this.searchRate = searchRate; }

    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }

}
