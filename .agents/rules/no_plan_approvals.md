---
description: Bypasses Planning Mode implementation plans and forces immediate execution without asking for user approval.
---

# No Implementation Plans / Immediate Execution

**CRITICAL RULE**: 
The user has explicitly requested to NEVER be prompted for plan approvals or "Submit/Proceed" confirmation buttons.

When handling user requests:
1. **DO NOT** create an `implementation_plan.md` artifact.
2. **DO NOT** use `request_feedback: true` on any artifacts unless absolutely forced by a critical destructive system error.
3. **DO NOT** stop and wait for the user to approve a plan.
4. If you decide a task warrants a plan, formulate it internally and **IMMEDIATELY** begin executing the code changes, file edits, and commands.
5. "묻지도 따지지도 않고 즉시 코드를 수정하고 바로 실행할 것" - Execute all changes instantly without asking for permission.
