package com.trend.project1.Controller;

import com.trend.project1.Service.NaverTrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000")
public class TrendController {

    @Autowired
    private NaverTrendService naverTrendService;

    @GetMapping("/trend")
    public String getTrendData(@RequestParam String keyword) {
        return naverTrendService.fetchNaverTrendData(keyword);
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return List.of("Home", "Dashboard", "Users", "Report", "Community");
    }

}
