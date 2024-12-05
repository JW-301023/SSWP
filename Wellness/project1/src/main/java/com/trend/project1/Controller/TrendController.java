package com.trend.project1.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trend.project1.Service.NaverTrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TrendController {

    @Autowired
    private NaverTrendService naverTrendService;

    private final String flaskUrl = "http://localhost:5000/search_tweets";  // Flask 서버 URL

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

        return ResponseEntity.ok(response);
    }

//    @GetMapping("/get-twitter-tweets")
//    public String getTweets(@RequestParam String keyword) {
//        RestTemplate restTemplate = new RestTemplate();
//        String url = flaskUrl + "?keyword=" + keyword;
//        String response = restTemplate.getForObject(url, String.class);
//        return response;
//    }

    @GetMapping("/related-keywords")
    public ResponseEntity<?> getRelatedKeywords(@RequestParam String keyword) {
        String url = "https://www.google.com/complete/search?q=" + keyword + "&client=gws-wiz-serp";
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        // JSON 파싱 후 연관 검색어 리스트만 추출
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response);
            JsonNode suggestionsNode = root.get(1); // 두 번째 배열에 연관 검색어가 있음
            List<String> relatedKeywords = new ArrayList<>();

            suggestionsNode.forEach(node -> relatedKeywords.add(node.asText()));

            return ResponseEntity.ok(relatedKeywords);  // 단순 리스트 형태로 반환
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error parsing Google autocomplete response");
        }
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return List.of("Home", "Dashboard", "Users", "Report", "Community");
    }

}
