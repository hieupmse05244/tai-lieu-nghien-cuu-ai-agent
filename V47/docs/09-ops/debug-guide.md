# Debug Guide

## 1. Step 1: Read Summary
- Mở `incident-summary.md` (3 giây).
- Tìm `loop_breaker` và `human_hint`.

## 2. Step 2: Check Event Log
- Đối soát timestamp trong `event-log.md`.
- Tìm nguyên nhân gốc rễ (stdout/stderr).

## 3. Step 3: Identify Source
- Lỗi do Planner (sai logic) hay Runner (sai môi trường)?

## 4. Step 4: Fix
- Manual update `state.json` hoặc fix code trực tiếp.

## 5. Example Case
- **Problem**: Login 404.
- **Trace**: Runner reported 404.
- **Summary**: Missing route in `app.js`.
- **Action**: Manually add `app.post('/login', ...)`.
