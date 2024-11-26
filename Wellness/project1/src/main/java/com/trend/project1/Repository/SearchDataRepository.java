package com.trend.project1.Repository;

import com.trend.project1.Entity.SearchData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchDataRepository extends JpaRepository<SearchData, Long> {

}
