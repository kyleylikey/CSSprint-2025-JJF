# JJF - Justifiable Judgment Flagging

<p align="center">
  <strong>⚖️ AI-Powered Risk Assessment for Corporate Integrity</strong>
</p>

<p align="center">
  <em>"Empowering human judgment with intelligent risk analysis"</em>
</p>

---

## 🎯 The Problem

Corporate misconduct costs organizations billions annually, but more importantly, it erodes trust, damages cultures, and harms individuals. While many solutions chase technological complexity, the fundamental challenge remains: **how do we efficiently prioritize and assess the risk of reported concerns?**

## 💡 Our Solution: JJF (Justifiable Judgment Flagging)

JJF is an AI-enhanced ethics reporting and monitoring platform that combines the power of intelligent risk scoring with human oversight. Our system makes it easy for employees to report concerns while helping moderators efficiently prioritize and investigate cases.

### 🤖 AI-Powered Risk Scoring Algorithm

Our proprietary risk scoring algorithm evaluates each report based on multiple factors:

| Factor | Description | Weight |
|--------|-------------|--------|
| **Source Type** | Employee reports weighted higher than automated flags | 1.5x for employee reports |
| **Severity Level** | Critical/High severity increases risk score | 10-80 points |
| **Sensitive Departments** | Finance, Executive, HR, Legal flagged higher | +15 points |
| **Event Rarity** | Uncommon event types (corruption, fraud) weighted higher | 3-9 points |
| **Corroboration** | Multiple related reports increase confidence | +5-20 points, +30% confidence |

### Why AI + Human Judgment Wins

| Feature | Our Approach | Why It Works |
|---------|--------------|--------------|
| **Risk Assessment** | AI-calculated risk scores | Objective, consistent prioritization |
| **Source Weighting** | Employee reports > automated flags | Human insight valued higher |
| **Confidence Scoring** | Algorithm provides confidence levels | Transparency in AI decisions |
| **Final Decision** | Human moderators decide | Context and nuance preserved |

## ✨ Core Features

### For Employees
- **📝 Easy Report Submission**: Intuitive forms for reporting various types of concerns
- **🔒 Anonymous Options**: Submit reports without revealing identity
- **📊 Status Tracking**: Know exactly where your report stands
- **📚 Ethics Resources**: Access to company policies and training materials

### For HR Moderators  
- **🤖 AI Risk Scores**: Every report automatically scored for risk level (0-100)
- **📊 Contributing Factors**: Transparent breakdown of why AI assigned each score
- **📥 Centralized Dashboard**: All reports sorted by AI-calculated priority
- **⚡ Priority Flagging**: Critical issues with high risk scores surface immediately
- **📋 Case Management**: Add notes, assign reviewers, track progress
- **🔄 Workflow Actions**: Assign, escalate, resolve, or dismiss with one click

### For Administrators
- **📈 Real-time Analytics**: Track reporting trends and resolution rates
- **👥 User Management**: Control access and permissions
- **⚙️ System Settings**: Configure categories, notifications, and policies

### Automated Detection (QuickBooks Lite Demo)
- **💰 Ledger Monitoring**: Simulated accounting software with tamper detection
- **🚨 Automatic Flagging**: Modifications to ledger entries are automatically reported
- **📉 Lower Weight**: Automated flags receive 0.7x weight vs employee reports

## 🚀 Quick Start

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Employee | `employee@company.com` | `password123` |
| HR Moderator | `moderator@company.com` | `password123` |
| Administrator | `admin@company.com` | `password123` |

### Installation

```bash
# Clone the repository
git clone https://github.com/kyleylikey/CSSprint-2025-JJF.git
cd CSSprint-2025-JJF

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Routing**: React Router v7
- **Build Tool**: Vite
- **Styling**: Modern CSS with responsive design
- **AI Risk Scoring**: Custom algorithm in TypeScript

## 📖 The JJF Risk Scoring Algorithm

### How It Works

```typescript
// Simplified algorithm overview
RiskScore = BaseScore
  + (SeverityWeight × SourceMultiplier)
  + (SensitiveDepartmentBonus)
  + (RarityScore × SourceMultiplier)
  + (CorroborationBonus)

// Source Multiplier
Employee Report: 1.0
Automated Flag: 0.7

// Result
Score: 0-100
Level: low | medium | high | critical
Confidence: 0-100%
```

### Risk Level Thresholds

| Score | Level | Action |
|-------|-------|--------|
| 0-29 | Low | Routine review |
| 30-49 | Medium | Timely investigation |
| 50-69 | High | Urgent attention |
| 70-100 | Critical | Immediate action |

### Why Employee Reports Are Weighted Higher

1. **Context**: Employees understand workplace dynamics
2. **Credibility**: Reporting takes courage and usually indicates genuine concern
3. **Detail**: Human reports include nuanced observations
4. **Accountability**: Named reporters have stake in accuracy

### Why Automated Flags Are Still Valuable

1. **Objectivity**: No personal bias in detection
2. **Consistency**: Same rules applied every time
3. **Speed**: Instant detection of anomalies
4. **Coverage**: Can monitor systems 24/7

## 🔮 Roadmap

- [x] AI-powered risk scoring algorithm
- [x] Automated ledger tampering detection
- [x] Risk factor transparency in moderator view
- [ ] Email notifications for status updates
- [ ] Integration with HR management systems
- [ ] Mobile-responsive PWA
- [ ] Multi-language support
- [ ] Department-level analytics
- [ ] Machine learning model improvements

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>Built for the 2025 CSS Hackathon</strong><br>
  <em>Team JJF - Justifiable Judgment Flagging</em><br>
  <em>Combining AI intelligence with human wisdom</em>
</p>
