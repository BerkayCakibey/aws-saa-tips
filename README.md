# AWS SAA-C03 Independent Practice Bank

An original, unofficial practice resource for the AWS Certified Solutions Architect - Associate (SAA-C03) exam.

This repository contains 325 scenario-style practice questions, organized as 5 full mock exams with 65 questions each. The questions were written for this project with AI assistance and reviewed by me; they are not copied from the exam or from other question banks.

**Live site:** [https://berkaycakibey.github.io/aws-saa-tips/](https://berkaycakibey.github.io/aws-saa-tips/)

**Last reviewed:** 2026-04-11

## Contents

| Resource | Description |
| --- | --- |
| [Interactive Quiz](https://berkaycakibey.github.io/aws-saa-tips/) | Start the browser-based quiz interface |
| [Quiz App](https://berkaycakibey.github.io/aws-saa-tips/website/ultimate-quiz.html) | Choose full mock exams or create a custom quiz |
| [Study Guide](https://berkaycakibey.github.io/aws-saa-tips/website/study-guide.html) | Structured SAA-C03 review notes |
| [Cheat Sheet](https://berkaycakibey.github.io/aws-saa-tips/website/cheat-sheet.html) | Last-minute service boundaries and reminders |
| [Website README](https://berkaycakibey.github.io/aws-saa-tips/website/README.html) | Web version of the project overview |

## What Is Included

- 325 original practice questions.
- 5 complete mock exams with 65 questions each.
- Exactly 4 choices per question.
- Exactly 1 best answer per question.
- Scenario-style stems aligned to SAA-C03 study objectives.
- Explanations that teach the decision rule instead of only naming the answer.
- Concise key rules for review.
- Official AWS documentation links for every question.
- Topic filtering by primary category.
- Custom quiz creation by category and question count.
- Review mode for incorrect answers after a quiz attempt.
- Study guide and cheat sheet pages for review before or after quizzes.

## Quiz Modes

### Mock Exam Mode

Use this when you want a full exam-style practice session.

1. Open the quiz.
2. Select one or more of the 5 mock exams.
3. Optionally filter by one topic.
4. Start the quiz.
5. Review score, time spent, exam breakdown, topic breakdown, explanations, and AWS documentation links.

### Create Your Own Quiz

Use this when you want targeted practice from the complete 325-question pool.

1. Open the quiz.
2. Choose `Create Your Own Quiz`.
3. Select one or more categories.
4. Enter the number of questions you want.
5. Start a randomized quiz from the matching pool.

### Review Incorrect Questions

After finishing a quiz, use `Review Incorrect Questions` to immediately retry only the questions you answered incorrectly. The review set is shuffled before it starts.

## Question Bank Status

| Check | Status |
| --- | --- |
| Total accepted questions | 325 |
| Mock exam structure | 5 x 65 |
| Question ID continuity | Q001-Q325 |
| Choices per question | 4 |
| Correct answer per question | 1 |
| Official AWS docs links | Present for every question |
| Generic docs hardening queue | 0 remaining after local audit |
| Live docs URL check | 273 unique URLs checked, 0 failures |
| Website integration | Complete |
| Mobile layout pass | Homepage and quiz passed local browser audit |

## Category Coverage

Each question has one primary category for filtering. Many questions naturally touch more than one AWS service or exam domain, but the primary category keeps filtering predictable.

| Category | Questions |
| --- | ---: |
| Security | 37 |
| Networking | 29 |
| Database | 27 |
| High Availability & Resilience | 26 |
| Architecture | 26 |
| Storage | 25 |
| Serverless | 25 |
| Compute | 22 |
| Migration | 20 |
| Operations | 18 |
| Cost Optimization | 17 |
| Decoupling | 16 |
| Governance | 15 |
| Analytics | 9 |
| Hybrid | 8 |
| Performance | 5 |

The distribution is not perfectly equal by category. That is intentional: SAA-C03 itself is not evenly distributed by service family, and several architecture scenarios span multiple categories.

## Originality And Source Independence

The practice questions are intended to be publishable, source-independent study material.

- They are not official AWS exam questions.
- They are not represented as actual exam questions.
- They are not copied from AWS documentation.
- They are not copied from dumps or third-party banks.
- AWS documentation is used as the factual reference for explanations and citations.
- AWS service names are used only to identify AWS services and link to official documentation.

No automated originality process can provide a legal guarantee, but the local audit found no duplicate/source-overlap blocker in the accepted bank.

## Unofficial AWS Notice

This project is an independent community study resource. It is not affiliated with, endorsed by, sponsored by, reviewed by, or provided by Amazon Web Services.

AWS, Amazon Web Services, and related AWS service names are trademarks of Amazon.com, Inc. or its affiliates. This project uses those names only for nominative reference to the technologies being studied.

For authoritative exam and service information, always use official AWS sources:

- [AWS Certified Solutions Architect - Associate exam guide](https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [AWS Skill Builder](https://explore.skillbuilder.aws/)

## Repository Layout

The published website is intentionally small. The browser app uses the generated question bundle in `website/questions-all.js`; generation and audit artifacts can be kept locally for traceability without being required by normal learners.

### Public Website Files

| File or Directory | Purpose |
| --- | --- |
| `website/questions-all.js` | Browser-ready quiz data generated from the accepted bank |
| `website/ultimate-quiz.html` | Interactive quiz application |
| `index.html` | Landing page |
| `favicon.svg` | Site favicon |
| `website/README.html` | Web version of the project overview |
| `website/study-guide.html` | Web study guide |
| `website/cheat-sheet.html` | Web cheat sheet |
| `AWS_SAA_C03_Study_Guide_EN.md` | Markdown source for the study guide |
| `AWS_SAA_C03_One_Page_Cheat_Sheet.md` | Markdown source for the cheat sheet |
| `README.md` | Project overview |
| `LICENSE` | MIT license |

### Local Audit And Generation Artifacts

The accepted source bank, batch files, status ledgers, audit reports, schemas and policy notes are kept locally under `_project_artifacts/`, which Git ignores. They document how the bank was produced and verified but are not needed to use the website.

Local tooling directories such as `.claude/`, `.opencode/`, `.local/`, and agent instruction files are development-only and should not be published.

## Local Smoke Checks

Recommended checks before publishing or after changes:

1. Open the homepage.
2. Start the quiz.
3. Confirm 325 total questions are available.
4. Start one full mock exam and confirm it contains 65 questions.
5. Start a custom quiz with selected categories and a custom question count.
6. Answer a question and confirm immediate feedback, explanation, key rule, and docs links render.
7. Finish a quiz and confirm score, time, exam breakdown, and topic breakdown render.
8. If you answered any question incorrectly, start `Review Incorrect Questions` and confirm only those questions are retried.
9. Open study guide, cheat sheet, README, GitHub, LinkedIn, and contact links.
10. Check mobile layout at a narrow viewport.

`node scripts/validate-questions.js` checks the question bank (325 questions, 4 options each, a valid answer index, explanation and docs link, no duplicate stems); the `validate` workflow runs it on every push and pull request.

## Contact

If you find a technical mistake, broken link, ambiguous explanation, UI issue, or anything that should be improved, please contact:

- Website: [berkaycakibey.com](https://berkaycakibey.com)
- Email: [hello@berkaycakibey.com](mailto:hello@berkaycakibey.com)
- LinkedIn: [Berkay Cakibey](https://www.linkedin.com/in/berkay-cakibey/)
- GitHub: [BerkayCakibey](https://github.com/BerkayCakibey)

## License

This repository is licensed under the [MIT License](LICENSE).
