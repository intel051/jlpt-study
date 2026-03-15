# 🎌 JLPT Study — 日本語学習

AI 기반 JLPT 단어 학습 사이트. N1~N4 레벨별 단어 랜덤 생성, 저장, 퀴즈 기능을 제공합니다.

## 📁 프로젝트 구조

```
jlpt-study/
├── api/
│   └── generate.js      # Vercel Serverless Function (API 프록시)
├── public/
│   └── index.html       # 프론트엔드 전체
├── vercel.json          # Vercel 설정
└── README.md
```

## 🚀 Vercel 배포 방법

### 1단계 — 깃허브에 올리기

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jlpt-study.git
git push -u origin main
```

### 2단계 — Vercel 연결

1. [vercel.com](https://vercel.com) 접속 → 로그인
2. **Add New Project** 클릭
3. 깃허브 레포지토리 선택 → **Import**
4. 별도 설정 없이 **Deploy** 클릭

### 3단계 — API 키 환경변수 등록 ⚠️ 필수

Vercel 대시보드에서:

1. 배포된 프로젝트 클릭
2. **Settings** → **Environment Variables**
3. 아래 값 추가:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` |

4. **Save** 후 **Deployments** 탭에서 **Redeploy** 클릭

> API 키는 [console.anthropic.com](https://console.anthropic.com) 에서 발급받을 수 있어요.

## ✨ 기능

- N1 ~ N4 레벨 선택
- AI 단어 랜덤 생성 (한자 · 읽기 · 뜻 · 예문 · 암기 팁)
- 단어 저장 / 삭제 (localStorage)
- 저장 단어 퀴즈 모드
- 라이트 / 다크 모드 토글
- Pretendard JP 웹폰트
