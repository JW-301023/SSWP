package com.trend.project1.Controller.post;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final JdbcTemplate jdbcTemplate;

    public NotificationController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 알림 가져오기
    @GetMapping("/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getNotifications(@PathVariable String userId) {
        String sql = "SELECT id, name, content, is_read, created_at FROM notifications WHERE name = ? ORDER BY created_at DESC";
        List<Map<String, Object>> notifications = jdbcTemplate.queryForList(sql, userId);
        return ResponseEntity.ok(notifications);
    }

    // 알림 클릭했을 때 is_read True로 변경
    @PutMapping("/notifications/{id}")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable Long id) {
        String sql = "UPDATE notifications SET is_read = TRUE WHERE id = ?";
        jdbcTemplate.update(sql, id);
        return ResponseEntity.ok("알림 읽음 처리 완료");
    }

}

