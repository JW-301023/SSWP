package com.trend.project1.Controller;

import com.trend.project1.Service.NaverTrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000")
public class TrendController {

    @Autowired
    private NaverTrendService naverTrendService;

    @PostMapping("/trend")
    public ResponseEntity<String> getTrendData(@RequestBody Map<String, Object> requestData) {
//        System.out.println("Request Data:" +  requestData);

        // keywordGroups와 keywords 검증
        List<Map<String, Object>> keywordGroups = (List<Map<String, Object>>) requestData.get("keywordGroups");
        if (keywordGroups == null || keywordGroups.isEmpty() || keywordGroups.get(0).get("keywords") == null) {
            return ResponseEntity.badRequest().body("Invalid keywordGroups or keywords");
        }

        List<String> keywords = (List<String>) keywordGroups.get(0).get("keywords");
        if (keywords == null || keywords.isEmpty() || keywords.stream().anyMatch(String::isEmpty)) {
            return ResponseEntity.badRequest().body("Invalid keywords: cannot be empty strings");
        }


        String response = naverTrendService.fetchNaverTrendData(requestData);
        return ResponseEntity.ok(response); // 응답을 그대로 반환
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return List.of("Home", "Dashboard", "Users", "Report", "Community");
    }

}
