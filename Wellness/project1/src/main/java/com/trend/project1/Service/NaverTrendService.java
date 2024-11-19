package com.trend.project1.Service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;




@Service
public class NaverTrendService {

    @Value("${naver.api.client-id}")
    private String clientId;

    @Value("${naver.api.client-secret}")
    private String clientSecret;

    public String fetchNaverTrendData(String keyword) {
        String apiUrl = "https://openapi.naver.com/v1/datalab/search";

        // 요청 데이터 구성
        JSONObject requestBody = new JSONObject();
        requestBody.put("startDate", "2024-01-01"); // 시작 날짜
        requestBody.put("endDate", "2024-11-01");  // 종료 날짜
        requestBody.put("timeUnit", "month");   // 시간 단위 설정
        requestBody.put("keywordGroups", new org.json.JSONArray().put(
                new org.json.JSONObject().put("groupName", "trend").put("keywords", new org.json.JSONArray().put(keyword))
        ));

        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Naver-Client-Id", clientId);
            headers.set("X-Naver-Client-Secret", clientSecret);
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
            return restTemplate.postForObject(apiUrl, entity, String.class);
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to fetch data from Naver API\"}";
        }

    }

}
