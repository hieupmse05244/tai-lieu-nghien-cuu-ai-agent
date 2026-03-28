# Incident Summary Engine

## 1. Goal
Human hiểu failure trong 3 giây.
- Clarity: Loại bỏ noise từ logs rác.
- Actionable: Chỉ ra điểm cần can thiệp manual.

## 2. Input Contract
```json
{
  "event_log": [],
  "current_state": {},
  "task": {}
}
```

## 3. Output Contract (3-second format)
```json
{
  "critical_failure": "PERMISSION_DENIED",
  "phase_at_death": "ACTION_EXECUTION",
  "last_known_good_state": {
    "disk": "OK",
    "network": "CONNECTED"
  },
  "the_loop_breaker": "ACTION_REGISTRY_BLOCK (delete_file)",
  "human_input_required": "Verify sudoers for agent_user"
}
```

## 4. Rules
- Extract last error from event log.
- Map to known patterns (The Loop Crisis, Design Drift).
- Avoid conversational text, follow JSON schema strictly.

## 5. No LLM requirement
Engine này chạy bằng Logic xác định (Rule-based) để đảm bảo tốc độ và độ tin cậy tuyệt đối trong việc báo cáo sự cố.
