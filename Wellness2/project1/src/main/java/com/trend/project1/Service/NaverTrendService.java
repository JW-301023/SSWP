package com.trend.project1.Service;

import com.trend.project1.Entity.SearchData;
import com.trend.project1.Repository.SearchDataRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



@Service
public class NaverTrendService {

    private final RestTemplate restTemplate;
    private final SearchDataRepository searchDataRepository;

    private final String clientId = "7HmT6pDv44qg7u1dtcRP";
    private final String clientSecret = "4vGRA35bsf";

    @Autowired
    public NaverTrendService(RestTemplate restTemplate, SearchDataRepository searchDataRepository) {
        this.restTemplate = restTemplate;
        this.searchDataRepository = searchDataRepository;
    }

    public String getNaverTrend(String keyword) {
        String apiUrl = "https://openapi.naver.com/v1/datalab/search";

        // 1. 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);

        // 2. 요청 본문 설정
        JSONObject requestBody = new JSONObject();
        requestBody.put("startDate", "2024-01-01"); // 시작 날짜
        requestBody.put("endDate", "2024-11-01");  // 종료 날짜
        requestBody.put("timeUnit", "month");   // 시간 단위 설정

        // 성별 및 연령대 필드 추가
        requestBody.put("gender", ""); // 전체 성별 ("", "f", "m")
        requestBody.put("ages", new JSONArray()); // 전체 연령대

        // keywordGroups 배열에 JSON 객체로 추가
        JSONArray keywordGroups = new JSONArray();
        JSONObject keywordObj = new JSONObject();
        keywordObj.put("groupName", "Keyword Group");   // 그룹 이름 설정
        keywordObj.put("keywords", new JSONArray().put(keyword)); // keywords 배열 생성
        keywordGroups.put(keywordObj);

        requestBody.put("keywordGroups", keywordGroups);    // keywordGroups를 최종 본문에 추가

        // HttpEntity를 통해 헤더와 본문을 결합
        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

        // 3. API 요청 보내기
        ResponseEntity<String> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.POST,
                entity,
                String.class
        );

        // ** API 응답 확인 **
        System.out.println("API 응답 데이터"  + response.getBody());

        // 4. 응답 데이터 파싱 및 저장
        JSONObject responseBody = new JSONObject(response.getBody());
        JSONArray results = responseBody.getJSONArray("results");

        for (int i = 0; i < results.length(); i++) {
            JSONObject result = results.getJSONObject(i);
            JSONArray data = result.getJSONArray("data");

            for (int j = 0; j < data.length(); j++) {
                JSONObject monthData = data.getJSONObject(j);
                String month = monthData.getString("period").substring(0, 7);
                float searchRate = monthData.getInt("ratio");

                SearchData monthRawData = new SearchData(keyword, month, "", "", searchRate);

                // ** 월별 데이터 확인 **
                System.out.println("월별 데이터 저장: " + monthRawData);

                // 성별 및 연령대별 검색률 데이터가 있을 경우 추가 저장
                if (monthData.has("gender")) {
                    JSONArray genderData = monthData.getJSONArray("gender");
                    for (int k = 0; k < genderData.length(); k++) {
                        JSONObject genderObj = genderData.getJSONObject(k);
                        String gender = genderObj.getString("name");
                        float genderRate = genderObj.getFloat("ratio");

                        SearchData genderRawData = new SearchData(keyword, month, gender, "", genderRate);
                        searchDataRepository.save(genderRawData);

                        // ** 성별 데이터 확인 **
                        System.out.println("성별 데이터 저장: " + genderRawData);
                    }
                }

                if (monthData.has("ages")) {
                    JSONArray ageData = monthData.getJSONArray("ages");
                    for (int k = 0; k < ageData.length(); k++) {
                        JSONObject ageObj = ageData.getJSONObject(k);
                        String age = ageObj.getString("name");
                        float ageRate = ageObj.getFloat("ratio");

                        SearchData ageRawData = new SearchData(keyword, month, "", age, ageRate);
                        searchDataRepository.save(ageRawData);

                        // ** 연령별 데이터 확인 **
                        System.out.println("연령별 데이터 저장: " + ageRawData);
                    }
                }
            }
        }

        return "데이터 저장 성공.";
    }
    
}
