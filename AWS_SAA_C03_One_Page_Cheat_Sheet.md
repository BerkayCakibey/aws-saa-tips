# AWS SAA-C03 One-Page Cheat Sheet

> Print this. Read it 24 hours before the exam.

> **Disclaimer**: This is an independent, unofficial AWS SAA-C03 study resource. It is not affiliated with, endorsed by, sponsored by, reviewed by, or provided by AWS.

---

## KEYWORD -> ANSWER (Memorize These)

| Keyword | Answer | Keyword | Answer |
|---------|--------|---------|--------|
| least operational overhead | Serverless/Managed | credential rotation | Secrets Manager |
| private S3 access | Gateway VPC Endpoint | track config changes | AWS Config |
| query S3 with SQL | Athena | audit API calls | CloudTrail |
| shared files (Linux) | EFS | detect PII in S3 | Macie |
| shared files (Windows) | FSx Windows | DDoS protection | Shield Advanced |
| HPC file system | FSx Lustre | SQL injection/XSS | WAF |
| unpredictable access | Intelligent-Tiering | 3rd party appliance | Gateway LB |
| nobody can delete | Object Lock Compliance | fan-out messaging | SNS -> SQS |
| interruptible workload | Spot Instances | message ordering | SQS FIFO |
| 24/7 production | Reserved/Savings Plans | ActiveMQ/RabbitMQ | Amazon MQ |
| Lambda cold start | SnapStart for Java / Provisioned Concurrency when pre-warmed capacity is required | real-time streaming | Kinesis |
| container, no infra mgmt | ECS Fargate | on-prem -> AWS (dedicated) | Direct Connect |
| read-heavy DB | Read Replicas | UDP + global + low latency | NLB + Global Accelerator |
| too many DB connections | RDS Proxy | cost analysis | Cost Explorer |
| clone DB for testing | Aurora Cloning | budget alerts | AWS Budgets |
| DynamoDB cache | DAX | centralize backup | AWS Backup |

---

## TOP 10 CONFUSION PAIRS

| Pair | A Does | B Does |
|------|--------|--------|
| Config vs CloudTrail | Config STATE changes | API call RECORDS |
| SQS vs SNS | Queue, 1 consumer | Topic, many consumers |
| Multi-AZ vs Read Replica | HA/failover | Read performance |
| Shield vs WAF | DDoS (L3/L4) | SQLi/XSS (L7) |
| ALB vs NLB | L7 HTTP/HTTPS | L4 TCP/UDP |
| Secrets Mgr vs Param Store | Auto rotation | Cheap config |
| GuardDuty vs Inspector | Threat detection | Vulnerability scan |
| CloudFront vs Global Accel | Caches static | Optimizes TCP/UDP |
| Kinesis vs SQS | Streaming/analytics | Decoupling/buffering |
| NACL vs Security Group | Stateless, subnet | Stateful, instance |

---

## ELIMINATION RULES

- "least operational overhead" -> ELIMINATE EC2 + custom scripts
- "highly available" -> ELIMINATE single-AZ solutions
- "immediate access" -> ELIMINATE Glacier Flexible Retrieval (minutes to hours) and Glacier Deep Archive (hours); Glacier Instant Retrieval keeps millisecond access, see [S3 storage classes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html)
- "must not traverse internet" -> ELIMINATE public internet options
- "most cost-effective" -> ELIMINATE over-provisioned options
- UDP in question -> ALB is WRONG
- Cross-account -> IAM user sharing is WRONG (use Roles + STS)

---

## S3 STORAGE CLASSES

Standard -> Standard-IA (30d min) -> Glacier Flexible (90d min) -> Deep Archive (180d min)
-> Intelligent-Tiering (unknown pattern, no retrieval fee) -> One Zone-IA (cheaper, single AZ)

Lifecycle rules can skip tiers; this is a cost-tier reminder, not a required sequence.

---

## KEY NUMBERS

- Lambda: 6 MB sync / 1 MB async payload, 15 min max, 1000 concurrency
- RDS backup retention: max 35 days
- S3 durability: 99.999999999% (11 nines)
- Exam: 65 questions, 130 minutes

---

## DR STRATEGIES (cheapest -> most expensive)

Backup & Restore (hours-days) -> Pilot Light (hours) -> Warm Standby (minutes) -> Multi-Site Active-Active

---

## IAM POLICY EVALUATION

Explicit DENY > Explicit ALLOW > Implicit DENY

---

## ROUTE 53 POLICIES

Simple | Weighted (A/B test) | Latency (performance) | Failover (DR) | Geolocation (compliance) | Geoproximity (GPS + bias) | Multi-value (multiple IPs)

---

## WELL-ARCHITECTED 6 PILLARS

Operational Excellence | Security | Reliability | Performance Efficiency | Cost Optimization | Sustainability
