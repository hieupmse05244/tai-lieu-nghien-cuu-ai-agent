# Tiêu chuẩn các tệp loại trừ (Ignore Files Standard) - v1.0

Tài liệu này quy định nội dung chuẩn cho các tệp `.gitignore` và `.dockerignore` khi triển khai dự án thử nghiệm trong Agent Factory.

## 1. .gitignore Standard

Mục tiêu: Loại bỏ các tệp không cần thiết, tệp tạm, và thông tin nhạy cảm.

```text
# Dependency directories
node_modules/
jspm_packages/

# Build outputs
dist/
build/
out/
*.core

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
!.env.example

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# OS metadata
.DS_Store
Thumbs.db

# IDEs
.vscode/
.idea/
*.swp
*.swo

# Docker
.docker/
```

## 2. .dockerignore Standard

Mục tiêu: Đảm bảo Docker build context nhẹ và không chứa dữ liệu nhạy cảm hoặc `node_modules` cục bộ.

```text
# Dependencies
node_modules/

# Build artifacts
dist/
build/

# Git
.git
.gitignore

# Environment
.env
.env.*
!.env.example

# Logs
*.log

# Documentation
docs/
README.md

# OS files
.DS_Store

## 3. Agent Runner Specifics

Mục tiêu: Bảo vệ `api_key`, cấu hình nhạy cảm và tệp trạng thái (state) trong thư mục `agents/runner`.

**Nội dung `.gitignore` cho `agents/runner`:**
```text
# Sensitive config
.env
config.json
api_key*

# State and Logs
state.json
*.log
logs/
```

**Nội dung `.dockerignore` cho `agents/runner`:**
```text
.env
api_key*
state.json
logs/
```
```

---
> [!IMPORTANT]
> Mọi dự án thử nghiệm (Experiment) mới phải khởi tạo hai tệp này ngay từ đầu để đảm bảo tính nhất quán.
