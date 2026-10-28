# AWS SAA-C03 Study Guide

A practical, exam-focused study guide for the AWS Certified Solutions Architect – Associate (SAA-C03) exam.

This guide summarizes:
- high-frequency AWS services
- common scenario patterns
- answer elimination logic
- last-minute review notes

> **Disclaimer**: This is an independent, unofficial study resource based on exam preparation and AWS documentation. It is not affiliated with, endorsed by, sponsored by, reviewed by, or provided by Amazon Web Services. Always verify against the [official AWS documentation](https://docs.aws.amazon.com/) and the [SAA-C03 exam guide](https://aws.amazon.com/certification/certified-solutions-architect-associate/).

> **Last reviewed**: April 2026

---

## Sources & References

This guide was compiled from:
- [AWS SAA-C03 Official Exam Guide](https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [AWS Whitepapers](https://aws.amazon.com/whitepapers/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- Official AWS documentation and whitepapers for technical verification
- Independent study notes and original scenario practice patterns

---

## Exam Objective Mapping

This guide maps to the official AWS exam domains:

| Official Domain | Guide Sections | Weight |
|-----------------|---------------|--------|
| **Design Secure Architectures** | 3 (Security), 4 (#2,8,9,12), 7 (Security), 8, 10, 11 | ~30% |
| **Design Resilient Architectures** | 3 (Compute, DB), 4 (#1,5,7), 7 (Compute, DB, Storage), 8, 9 | ~26% |
| **Design High-Performing Architectures** | 3 (Storage, Compute, DB, Networking), 7, 8, 9, 12 | ~24% |
| **Design Cost-Optimized Architectures** | 3 (Cost), 4 (#3,10), 5, 7, 11, 15 | ~20% |

---

> **Table of Contents**
> - [1. Most Frequently Tested Services](#1-most-frequently-tested-services)
> - [2. Most Frequently Tested Domains](#2-most-frequently-tested-domains)
> - [3. Golden Rules: Keyword -> Answer Mapping](#3-golden-rules-keyword---answer-mapping)
> - [4. Most Critical Trick Patterns](#4-most-critical-trick-patterns)
> - [5. Wrong Answer Elimination Patterns](#5-wrong-answer-elimination-patterns)
> - [6. Quick Review Flashcards](#6-quick-review-flashcards)
> - [7. Service Comparison Tables](#7-service-comparison-tables)
> - [8. High-Frequency Confusion Matrix](#8-high-frequency-confusion-matrix)
> - [9. Critical Gotcha Facts](#9-critical-gotcha-facts)
> - [10. Route 53 Routing Policies](#10-route-53-routing-policies)
> - [11. IAM Policy Evaluation & Cross-Account Access](#11-iam-policy-evaluation--cross-account-access)
> - [12. Well-Architected Framework](#12-well-architected-framework)
> - [13. New & Recently Added Services](#13-new--recently-added-services)
> - [14. Common Exam Wording & What They Mean](#14-common-exam-wording--what-they-mean)
> - [15. Architecture Diagrams](#15-architecture-diagrams)
> - [16. Scenario-Based Questions with Explanations](#16-scenario-based-questions-with-explanations)
> - [17. Last-Minute Service Reference](#17-last-minute-service-reference)
> - [18. Exam Day Strategy](#18-exam-day-strategy)
> - [19. Last 24-Hour Revision Checklist](#19-last-24-hour-revision-checklist)

---

## 1. MOST FREQUENTLY TESTED SERVICES

| Rank | Service | Priority |
|------|---------|----------|
| 1 | **Amazon S3** | MUST know |
| 2 | **Amazon EC2** | MUST know |
| 3 | **AWS Lambda** | MUST know |
| 4 | **Amazon RDS / Aurora** | MUST know |
| 5 | **Amazon SQS** | MUST know |
| 6 | **Amazon CloudFront** | MUST know |
| 7 | **VPC / Networking** | MUST know |
| 8 | **Amazon DynamoDB** | Very important |
| 9 | **Amazon SNS** | Very important |
| 10 | **ELB (ALB/NLB/GWLB)** | Very important |
| 11 | **Amazon EFS / FSx** | Important |
| 12 | **AWS KMS** | Important |
| 13 | **Amazon Kinesis** | Important |
| 14 | **AWS Config** | Important |
| 15 | **Route 53** | Important |
| 16 | **IAM / STS** | Important |
| 17 | **CloudWatch** | Important |
| 18 | **AWS Backup** | Important |

---

## 2. MOST FREQUENTLY TESTED DOMAINS

| Domain | Weight | What to Know |
|--------|--------|-------------|
| **Storage (S3, EBS, EFS, FSx)** | ~25% | Lifecycle, storage classes, Object Lock, VPC endpoints |
| **Compute (EC2, Lambda, Fargate)** | ~18% | Purchasing options, Auto Scaling, serverless |
| **Database (RDS, Aurora, DynamoDB)** | ~14% | Multi-AZ vs Read Replica, Aurora Serverless, PITR |
| **Decoupling (SQS, SNS, Kinesis)** | ~13% | Fan-out, FIFO, queue-based scaling |
| **Security (IAM, KMS, WAF, Shield)** | ~11% | Secrets Manager, Object Lock, Shield Advanced |
| **Networking (VPC, Direct Connect)** | ~9% | VPC endpoints, peering, Security Groups |
| **Cost Optimization** | ~8% | Spot/RI/Savings Plans, right-size storage |
| **Migration (DMS, Snowball, DataSync)** | ~5% | Online vs offline migration |

---

## 3. GOLDEN RULES: Keyword -> Answer Mapping

When you see these keywords in an exam question, the answer is typically:

### STORAGE

| When You See This | Answer |
|---|---|
| "Query logs in S3" + "least overhead" | **Amazon Athena** |
| "Access S3 without internet" / "private" | **Gateway VPC Endpoint** (free) |
| "Reduce S3 transfer cost" (from VPC) | **Gateway VPC Endpoint** |
| "Unpredictable/changing access pattern" | **S3 Intelligent-Tiering** |
| "Accessed first 30 days, rarely after" | **S3 Standard -> S3 Standard-IA** (lifecycle) |
| "Never accessed after X days, keep forever" | **S3 Lifecycle -> Glacier Deep Archive** |
| "Nobody can delete, not even root" | **S3 Object Lock - Compliance mode** |
| "Prevent accidental deletion" | **S3 Versioning + MFA Delete** |
| "Multiple EC2 instances share files" (Linux) | **Amazon EFS** |
| "Windows file share / SMB / Active Directory" | **Amazon FSx for Windows File Server** |
| "HPC / high-throughput file system" | **FSx for Lustre** |
| "Speed up global large data upload" | **S3 Transfer Acceleration** |
| "Lowest latency, single AZ, high throughput" | **S3 Express One Zone** |
| "Backup multiple AWS services centrally" | **AWS Backup** |

### COMPUTE

| When You See This | Answer |
|---|---|
| "Least operational overhead" + containers | **ECS on Fargate** |
| "Remote access to EC2" + "least overhead" | **Systems Manager Session Manager** |
| "Patch 1000 EC2 instances" (3rd party) | **Systems Manager Run Command** |
| "Interruptible, stateless workload" | **Spot Instances** |
| "24/7 steady-state production" | **Reserved Instances / Savings Plans** |
| "Guaranteed capacity in specific AZs, short-term" | **On-Demand Capacity Reservation** |
| "Lambda cold start problem" | **Provisioned Concurrency** or **SnapStart** |
| "Kubernetes on AWS, managed control plane" | **Amazon EKS** |

### DATABASE

| When You See This | Answer |
|---|---|
| "Credential/password rotation" + "automatic" | **AWS Secrets Manager** |
| "Read-heavy DB workload" | **Read Replicas** (Aurora Replicas) |
| "MySQL auto-scale reads + HA" | **Aurora + Multi-AZ + Aurora Auto Scaling** |
| "Too many DB connections / Lambda timeout" | **RDS Proxy** |
| "RPO 15 minutes, DynamoDB" | **DynamoDB Point-in-Time Recovery** |
| "Unpredictable/variable DB traffic" | **Aurora Serverless** or **DynamoDB On-Demand** |
| "Clone production DB for testing" | **Aurora Cloning** |
| "Slow EBS inserts" / "storage performance" | **Provisioned IOPS SSD (io1/io2)** |
| "In-memory cache for DynamoDB" | **DAX (DynamoDB Accelerator)** |

### DECOUPLING / MESSAGING

| When You See This | Answer |
|---|---|
| "Message ordering matters" | **SQS FIFO** |
| "1 message -> many consumers (fan-out)" | **SNS -> multiple SQS queues** |
| "Decouple + Auto Scale workers" | **SQS + ASG (scale on queue depth)** |
| "ActiveMQ/RabbitMQ migration" | **Amazon MQ** |
| "Real-time streaming data" | **Kinesis Data Streams** |
| "Duplicate processing from SQS" | **Increase visibility timeout** |

### SECURITY

| When You See This | Answer |
|---|---|
| "Large-scale DDoS protection" | **AWS Shield Advanced** |
| "SQL injection / XSS protection" | **AWS WAF** |
| "Traffic inspection/filtering inside VPC" | **AWS Network Firewall** |
| "3rd party virtual appliance" | **Gateway Load Balancer (GWLB)** |
| "Track configuration changes" | **AWS Config** |
| "Audit API calls" | **AWS CloudTrail** |
| "Detect PII in S3" | **Amazon Macie** |
| "Restrict services org-wide" | **SCP (Service Control Policy)** |
| "Centralize multi-account logging" | **CloudTrail organization trail -> S3** |
| "Anomalous activity detection" | **GuardDuty** |
| "EC2 vulnerability scanning" | **Inspector** |

### NETWORKING

| When You See This | Answer |
|---|---|
| "On-prem -> AWS, low latency, permanent" | **AWS Direct Connect** |
| "Direct Connect + cheap backup" | **Direct Connect (primary) + VPN (backup)** |
| "UDP traffic + global + low latency" | **NLB + Global Accelerator** |
| "Static website + global acceleration" | **S3 + CloudFront** |
| "HTTP -> HTTPS redirect" | **ALB listener rule (redirect)** |
| "Multiple VPCs + on-prem hub" | **Transit Gateway** |
| "Simple VPC-to-VPC connection" | **VPC Peering** |
| "Private access to AWS services" | **VPC Endpoint (Gateway or Interface)** |

### ROUTE 53

| When You See This | Answer |
|---|---|
| "Route to healthy endpoint" | **Failover routing** (active-passive) or **Multi-value answer** (multiple healthy IPs) |
| "Split traffic by weight (A/B test)" | **Weighted routing** |
| "Route to lowest latency region" | **Latency-based routing** |
| "Active-passive failover" | **Failover routing** |
| "Route by user location (country/continent)" | **Geolocation routing** |
| "Route by user location (GPS proximity)" | **Geoproximity routing** |
| "Return multiple IPs, client picks" | **Multi-value answer routing** |

### COST

| When You See This | Answer |
|---|---|
| "Cost analysis graph" | **Cost Explorer** |
| "Find untagged resources" | **AWS Config rules** |
| "RDS not in use, reduce cost" | **Snapshot, terminate, restore when needed** |
| "Set budget alerts" | **AWS Budgets** |
| "Cost anomaly detection" | **AWS Cost Anomaly Detection** |

---

## 4. MOST CRITICAL TRICK PATTERNS

### 1. "Least Operational Overhead" = CHOOSE SERVERLESS
- Athena > EMR
- Fargate > EC2
- Secrets Manager > custom Lambda rotation
- Aurora Serverless > manual scaling

### 2. Config vs CloudTrail
- **Config** = resource configuration STATE (what changed?)
- **CloudTrail** = API call RECORD (who did what?)

### 3. Gateway VPC Endpoint is FREE
- Gateway endpoint for S3 and DynamoDB = free
- Interface endpoint for other services = costs money

### 4. Object Lock Modes
- **Compliance** = NOBODY can delete (including root)
- **Governance** = specially permissioned users can override

### 5. Multi-AZ vs Read Replica
- **Multi-AZ** = High availability (failover), does NOT improve read performance
- **Read Replica** = Read performance, NO failover (except Aurora)

### 6. SNS vs SQS
- 1 producer -> 1 consumer + buffering = **SQS**
- 1 producer -> N consumers = **SNS -> N SQS** (fan-out)
- Ordering required = **SQS FIFO**

### 7. ALB vs NLB
- HTTP/HTTPS, path-based routing, L7 = **ALB**
- TCP/UDP, static IP, extreme performance = **NLB**
- If you see UDP, ALB is automatically wrong

### 8. Shield vs Shield Advanced vs WAF
- Free basic DDoS = **Shield Standard** (enabled by default)
- Advanced DDoS + cost protection + 24/7 support = **Shield Advanced**
- Application layer rules (SQL injection) = **WAF**

### 9. Secrets Manager vs Parameter Store
- Automatic credential rotation = **Secrets Manager**
- Cheap, simple config storage = **Parameter Store**

### 10. S3 Storage Class Transition Order
```
Standard -> Standard-IA (min 30 days) -> Glacier Flexible -> Glacier Deep Archive
         -> Intelligent-Tiering (if pattern is unknown)
         -> One Zone-IA (single AZ sufficient, cheaper)
```
Lifecycle rules can transition directly to a later storage class; the arrows show common cost tiers, not a mandatory sequence.

### 11. CloudFront OAC vs OAI
- **OAI** = legacy, S3 origin only
- **OAC** = new, supports S3 bucket origins, recommended over OAI

### 12. IAM Policy Evaluation Order
1. **Explicit DENY** always wins
2. **Explicit ALLOW**
3. **Implicit DENY** (default)

### 13. Route 53 Health Checks
- Failover routing REQUIRES health checks
- Health checks can be used with most routing policies

---

## 5. WRONG ANSWER ELIMINATION PATTERNS

1. **Over-Engineering trap**: If a simple managed service solves it, options with EC2 + custom scripts are wrong
2. **Protocol mismatch**: UDP = ALB is wrong, SMB = EFS is wrong, NFS = FSx Windows is wrong
3. **"Must not traverse internet"**: Any option using public internet is eliminated
4. **"Highly available"**: Any single-AZ solution is eliminated
5. **"Immediate access"**: Glacier Flexible Retrieval and Deep Archive are eliminated (minutes to hours); Glacier Instant Retrieval still offers millisecond access
6. **Cost question**: Expensive over-provisioned options are eliminated
7. **"Most secure"**: Options with public access or open security groups are eliminated
8. **Cross-account access**: Direct IAM user sharing is wrong — use IAM Roles + STS AssumeRole

---

## 6. QUICK REVIEW FLASHCARDS

| # | Question | Correct | Wrong Trap |
|---|----------|---------|-----------|
| 1 | S3 private access | VPC Gateway Endpoint | NAT Gateway |
| 2 | Credential rotation | Secrets Manager | Parameter Store |
| 3 | Config tracking | AWS Config | CloudTrail |
| 4 | API call audit | CloudTrail | Config |
| 5 | DDoS protection | Shield Advanced | GuardDuty |
| 6 | Traffic inspection | Network Firewall | GuardDuty |
| 7 | 3rd party appliance | Gateway LB | Network LB |
| 8 | Fan-out messaging | SNS -> SQS | SQS alone |
| 9 | Shared file (Linux) | EFS | EBS Multi-Attach |
| 10 | Shared file (Windows) | FSx Windows | EFS |

---

## 7. SERVICE COMPARISON TABLES

### Compute

| Scenario | Use This | Not This |
|----------|----------|----------|
| Interruptible, fault-tolerant batch jobs | **Spot Instances** | On-Demand |
| Steady 24/7 baseline | **Reserved / Savings Plans** | Spot |
| Short-term unpredictable | **On-Demand** | Reserved |
| Flexibility across instance families | **Compute Savings Plans** | EC2 Reserved |
| Containers without managing infra | **ECS on Fargate** | ECS on EC2 |
| Windows licensing / dedicated hardware | **Dedicated Hosts** | Dedicated Instances |
| Managed Kubernetes | **EKS** | Self-managed K8s on EC2 |

### Database

| Scenario | Use This | Not This |
|----------|----------|----------|
| HA/failover (sync replication) | **Multi-AZ** | Read Replicas |
| Read scaling (async replication) | **Read Replicas** | Multi-AZ |
| Auto-scaling replicas, global DBs | **Aurora** | Standard RDS |
| Sporadic/unpredictable DB traffic | **Aurora Serverless** | Aurora Provisioned |
| OS-level access (Oracle/SQL Server) | **RDS Custom** | Standard RDS |
| Lambda hammering DB connections | **RDS Proxy** | Direct connection |
| Sub-ms DynamoDB reads | **DAX** | ElastiCache |

### Storage

| Scenario | Use This | Not This |
|----------|----------|----------|
| Frequent access | **S3 Standard** | S3-IA |
| Infrequent but immediate retrieval | **S3 Standard-IA** | Glacier |
| Unknown/changing access patterns | **S3 Intelligent-Tiering** | Manual lifecycle |
| Archive (minutes-to-hours retrieval OK) | **S3 Glacier Flexible** | Standard-IA |
| Archive (12-hour retrieval OK, cheapest) | **Glacier Deep Archive** | Glacier Flexible |
| Ultra-low latency, single AZ | **S3 Express One Zone** | S3 Standard |

### Networking

| Scenario | Use This | Not This |
|----------|----------|----------|
| HTTP/HTTPS, path routing, L7 | **ALB** | NLB |
| TCP/UDP, extreme performance, static IPs, L4 | **NLB** | ALB |
| Content caching at edge | **CloudFront** | Global Accelerator |
| TCP/UDP optimization, static IPs, no caching | **Global Accelerator** | CloudFront |
| Private access to S3/DynamoDB (free) | **Gateway VPC Endpoint** | Interface Endpoint |
| Private access to other services | **Interface VPC Endpoint** | Gateway Endpoint |
| Many VPCs + on-prem connectivity | **Transit Gateway** | VPC Peering mesh |

### Messaging

| Scenario | Use This | Not This |
|----------|----------|----------|
| Point-to-point decoupling/buffering | **SQS** | SNS |
| Fan-out to multiple subscribers | **SNS -> SQS** | SQS alone |
| Strict ordering + exactly-once | **SQS FIFO** | SQS Standard |
| Higher throughput, best-effort ordering | **SQS Standard** | SQS FIFO |

### Caching

| Scenario | Use This | Not This |
|----------|----------|----------|
| Persistence, replication, sessions | **ElastiCache Redis** | Memcached |
| Simple key-value, multi-threaded | **ElastiCache Memcached** | Redis |
| DynamoDB sub-ms cache | **DAX** | ElastiCache |

### Security

| Scenario | Use This | Not This |
|----------|----------|----------|
| Free basic DDoS protection | **Shield Standard** | Shield Advanced |
| Enhanced DDoS + cost protection + 24/7 SRT | **Shield Advanced** | Shield Standard |
| Resource config tracking/compliance | **AWS Config** | CloudTrail |
| API call logging/auditing | **CloudTrail** | Config |
| Nobody can delete (not even root) | **Object Lock Compliance** | Governance mode |
| Admins can override delete | **Object Lock Governance** | Compliance mode |
| Threat detection (anomalous behavior) | **GuardDuty** | Inspector |
| Vulnerability scanning (EC2/containers) | **Inspector** | GuardDuty |

---

## 8. HIGH-FREQUENCY CONFUSION MATRIX

The most commonly confused service pairs on the exam:

| Confusion Pair | Service A | Service B | How to Tell |
|----------------|-----------|-----------|-------------|
| **Config vs CloudTrail** | Tracks resource **configuration changes** | Tracks **API calls** (who did what) | "What changed?" = Config. "Who called it?" = CloudTrail |
| **SQS vs SNS** | **Queue** (pull-based, 1 consumer) | **Topic** (push-based, many consumers) | Buffering = SQS. Broadcasting = SNS |
| **Aurora vs RDS** | Auto-scaling storage, faster replicas, global DB | Traditional managed DB | "Auto-scale storage" or "fastest failover" = Aurora |
| **Shield vs WAF** | **DDoS** protection (L3/L4) | **Application** rules (L7: SQLi, XSS) | DDoS = Shield. SQL injection = WAF |
| **EFS vs FSx** | Linux, NFS, POSIX | Windows (SMB) or Lustre (HPC) or ONTAP (NetApp) | Linux shared files = EFS. Windows = FSx |
| **GuardDuty vs Inspector** | **Threat detection** (anomalous behavior) | **Vulnerability scanning** (EC2, containers) | "Suspicious activity" = GuardDuty. "CVE/open ports" = Inspector |
| **ALB vs NLB** | Layer 7 (HTTP/HTTPS), path-based | Layer 4 (TCP/UDP), static IP | HTTP/path = ALB. TCP/UDP/static IP = NLB |
| **CloudFront vs Global Accelerator** | **Caches** content at edge | **Optimizes** TCP/UDP routing (no cache) | Static content = CloudFront. Dynamic TCP/UDP = GA |
| **Secrets Manager vs Parameter Store** | Auto **rotation**, costs more | Simple config, **cheaper**, no auto rotation | "Rotate" = Secrets Manager. "Store config" = Parameter Store |
| **Kinesis vs SQS** | **Real-time streaming**, multiple shards, replay | **Queue**, message processing, decoupling | "Streaming/analytics" = Kinesis. "Decouple workers" = SQS |
| **NACL vs Security Group** | **Stateless**, subnet-level, allow + deny | **Stateful**, instance-level, allow only | Subnet rules = NACL. Instance rules = SG |
| **Gateway vs Interface Endpoint** | **Free**, S3/DynamoDB only | **Costs money**, any service | S3/DynamoDB = Gateway. Others = Interface |

---

## 9. CRITICAL GOTCHA FACTS

### S3
- Intelligent-Tiering has **no retrieval fees** (unlike Standard-IA)
- Transfer Acceleration uses CloudFront edge locations (50-500% speed improvement)
- `aws:PrincipalOrgID` condition key grants S3 access to the entire Organization
- S3 Object Lambda transforms data on-the-fly without storing copies
- S3 Event Notifications can trigger Lambda, SQS, SNS
- S3 Cross-Region Replication requires **Versioning enabled** on both buckets
- S3 Lifecycle minimum storage duration: Standard-IA = 30 days, Glacier = 90 days, Deep Archive = 180 days

### Compute
- Lambda payload limits = **6 MB synchronous / 1 MB asynchronous** (use S3 for larger payloads)
- **Spread placement group** = different hardware (HA); **Cluster** = same hardware (low latency)
- Lambda SnapStart = caches initialized state to reduce cold starts for supported runtimes such as Java
- Lambda max execution time = **15 minutes**
- Lambda concurrency limit = 1000 per region (can be increased)

### Database
- RDS automated backup retention max = **35 days** (use AWS Backup for longer)
- Aurora replicas have **minimal replication lag**
- Multi-AZ RDS = RPO < 1 second (synchronous replication)
- Aurora Global Database = cross-region, RPO < 1 second, failover < 1 minute
- DynamoDB **TTL** = automatically delete expired items (no write capacity consumed)

### Networking
- Gateway VPC endpoints are **free**; Interface VPC endpoints **cost money**
- VPC peering: works cross-account/cross-region, but CIDRs **must NOT overlap**
- NACLs are **stateless** (need inbound AND outbound rules); Security Groups are **stateful**
- Transit Gateway supports **transitive routing** (VPC peering does NOT)
- **Session Manager** = no SSH needed (preferred over bastion host)

### EBS
- **io2** supports Multi-Attach (Nitro instances, same AZ only)
- **gp3** allows independent IOPS provisioning
- EBS snapshots are **incremental**
- EBS volumes are **AZ-specific**

### CloudFront
- **Invalidation** = force refresh cached objects (costs money)
- **Lambda@Edge** = run Lambda at edge (heavier, more use cases)
- **CloudFront Functions** = lightweight viewer-level JS at edge (faster; headers, URL rewrites, redirects)

### AWS Backup
- Centralized backup across S3, EBS, RDS, DynamoDB, EFS, FSx, Storage Gateway
- Cross-region and cross-account backup copy

---

## 10. ROUTE 53 ROUTING POLICIES

| Policy | Use Case | Health Check | Example |
|--------|----------|-------------|---------|
| **Simple** | Single resource, basic DNS | Optional | One web server |
| **Weighted** | Traffic splitting, A/B testing | Yes | 80% v1, 20% v2 |
| **Latency-based** | Route to lowest latency region | Yes | US user -> us-east-1 |
| **Failover** | Active-passive DR | Required | Primary + standby |
| **Geolocation** | Route by country/continent | Yes | EU users -> EU endpoint |
| **Geoproximity** | Route by GPS proximity, bias | Yes | Shift traffic gradually |
| **Multi-value answer** | Return multiple IPs, client picks | Yes | Load distribution without ALB |

**Key exam traps:**
- Latency-based = performance, Geolocation = compliance/legal
- Failover requires health check on primary
- Weighted can send 0% to one resource (blue-green deployment)

---

## 11. IAM POLICY EVALUATION & CROSS-ACCOUNT ACCESS

### Policy Evaluation Logic
```
1. Explicit DENY in ANY policy -> DENIED (always wins)
2. Explicit ALLOW in ANY policy -> ALLOWED
3. No explicit ALLOW -> DENIED (implicit deny)
```

### Policy Types (in evaluation order)
1. **SCP** — sets org-wide maximum permissions
2. **Resource-based policy** — attached to the resource (S3 bucket policy)
3. **Identity-based policy** — attached to IAM user/role/group
4. **Permissions boundary** — maximum permissions a role/user can have
5. **Session policy** — max permissions for assumed role session

### Cross-Account Access Pattern
```
Account A user -> AssumeRole -> Account B role -> Access Account B resources
```
- Account B creates a role with **trust policy** allowing Account A
- Account A user calls `sts:AssumeRole` for temporary credentials
- **Never share IAM users across accounts** — always use roles

---

## 12. WELL-ARCHITECTED FRAMEWORK

| Pillar | Key Focus | Exam Keywords |
|--------|-----------|---------------|
| **Operational Excellence** | Run & monitor, automate changes | Runbooks, automation, frequent small changes |
| **Security** | Protect data & systems | Least privilege, encryption, traceability |
| **Reliability** | Recover from failures, scale | Multi-AZ, auto-recovery, backup/restore |
| **Performance Efficiency** | Use resources efficiently | Right-size, serverless, global deployment |
| **Cost Optimization** | Avoid unnecessary costs | Right-size, Spot/RI, managed services |
| **Sustainability** | Minimize environmental impact | Maximize utilization, managed services |

---

## 13. NEW & RECENTLY ADDED SERVICES

| Service | What It Does | Exam Trigger |
|---------|-------------|--------------|
| **S3 Express One Zone** | Single-AZ S3, 10x faster | "lowest latency", "ML training data" |
| **Lambda SnapStart** | Cache Lambda init state | "Java Lambda cold start" |
| **VPC Lattice** | Service-to-service connectivity | "simplify microservice connectivity" |
| **EKS Auto Mode** | Fully managed EKS | "Managed Kubernetes, least overhead" |
| **FSx for NetApp ONTAP** | NetApp-compatible file storage | "NetApp migration", "ONTAP" |
| **AWS Backup** | Centralized backup | "centralized backup policy" |
| **IAM Identity Center** | SSO for AWS accounts | "centralized login", "SSO" |
| **CloudFront Functions** | Lightweight JS at edge | "header manipulation", "faster than Lambda@Edge" |

---

## 14. COMMON EXAM WORDING & WHAT THEY MEAN

AWS uses specific words to signal what they want. Here is what they typically mean:

| Wording | What It Signals | Typical Answer Direction |
|---------|----------------|------------------------|
| **least operational overhead** | Choose managed/serverless | Fargate, Lambda, Aurora Serverless, Athena |
| **most cost-effective** | Minimize cost while meeting requirements | Spot, RI, Savings Plans, right-size, lifecycle |
| **most secure** | Prioritize security over cost/complexity | Private endpoints, encryption, least privilege |
| **highly available** | Must survive AZ failure | Multi-AZ, multiple AZs, auto-recovery |
| **durable** | Data must not be lost | S3 (11 9s), EBS snapshots, backups |
| **scalable** | Handle growing load | Auto Scaling, serverless, DynamoDB, Aurora |
| **decouple** | Break dependencies between components | SQS, SNS, EventBridge |
| **near real-time** | Seconds to minutes latency | Kinesis, DynamoDB Streams, Lambda |
| **fault-tolerant** | System continues on failure | Multi-AZ, Read Replicas, ASG across AZs |
| **disaster recovery** | Region-level failure | Cross-region replication, Pilot Light, Warm Standby |
| **least change to existing** | Minimal refactoring | Lift-and-shift, RDS Custom, EC2 |
| **managed service** | AWS handles operations | RDS, Fargate, Lambda, Aurora |

---

## 15. ARCHITECTURE DIAGRAMS

### Multi-Tier Web Application (HA)
```
                    Internet
                       |
                  [CloudFront]
                       |
                  [ALB - Public Subnets]
                  /          \
         [ASG - Web]      [ASG - Web]  (Private Subnets, 2 AZs)
                  \          /
                  [ALB - Private Subnets]
                  /          \
         [ASG - API]      [ASG - API]  (Private Subnets, 2 AZs)
                  \          /
              [RDS Multi-AZ]  (Private Subnets, 2 AZs)
```

### S3 + CloudFront (Static Website)
```
    Users -> [CloudFront Edge Locations (global cache)]
                    |
              [S3 Bucket (origin)]
                    |
        [OAC - restricts direct S3 access]
```

### SNS -> SQS Fan-Out
```
              [Publisher]
                  |
              [SNS Topic]
             /    |    \
            /     |     \
      [SQS Q1] [SQS Q2] [SQS Q3]
         |        |        |
      [Lambda]  [EC2]   [Lambda]
```

### Direct Connect + VPN Backup
```
  On-Premises
      |
   [DX] ========== AWS Direct Connect (primary, 1/10/100 Gbps)
      |                    |
      |              [Virtual Gateway]
      |                    |
      +---[Site-to-Site VPN] (backup, over internet, max 1.25 Gbps)
```

---

## 16. SCENARIO-BASED QUESTIONS WITH EXPLANATIONS

### Scenario 1: Multi-Tier Web App

**Question**: A company needs a highly available web application with auto-scaling. The database must survive an AZ failure. What is the MOST cost-effective architecture?

**Thinking key**: "highly available" = multi-AZ everywhere. "most cost-effective" = don't over-provision.

**Answer**: ALB in public subnets -> ASG across 2 AZs in private subnets -> RDS Multi-AZ

**Why others are wrong**:
- RDS Read Replica = read scaling, NOT failover
- Single AZ ASG = not highly available
- EC2 without ASG = no auto-scaling

---

### Scenario 2: Disaster Recovery

**Question**: A company needs RPO = 1 hour, RTO = 4 hours. They want the most cost-effective DR solution.

**Thinking key**: RPO/RTO in hours = Pilot Light. "cost-effective" = not active-active.

**Answer**: Pilot Light — backup data to DR region, minimal infra running, scale up on disaster

**Why others are wrong**:
- Backup & Restore = RTO in hours-days (slowest)
- Warm Standby = RTO in minutes (more expensive than needed)
- Multi-Site Active-Active = most expensive, overkill for 4-hour RTO

---

### Scenario 3: Serverless Event Processing

**Question**: When a file is uploaded to S3, it must be processed, results stored, and the user notified. Least operational overhead.

**Thinking key**: "least operational overhead" = serverless throughout. S3 can trigger Lambda directly.

**Answer**: S3 Event -> Lambda -> DynamoDB (results) -> SNS (notification)

**Why others are wrong**:
- S3 -> SQS -> Lambda -> ... = unnecessary complexity (SQS not needed for simple trigger)
- EC2-based processing = not least operational overhead
- Kinesis = overkill for file upload events

---

### Scenario 4: Global Application

**Question**: Users worldwide need low latency for both static and dynamic content.

**Thinking key**: Static = cache it. Dynamic = optimize routing.

**Answer**: CloudFront (static content) + Global Accelerator (dynamic TCP/UDP) + Route 53 (DNS)

**Why others are wrong**:
- CloudFront alone = only caches static, dynamic still slow
- Global Accelerator alone = no caching for static content
- Multiple regional ALBs = no edge optimization

---

### Scenario 5: Database Migration

**Question**: Migrate on-premises Oracle to Aurora with minimal downtime.

**Thinking key**: Heterogeneous migration (Oracle -> Aurora) needs schema conversion + data migration.

**Answer**: AWS SCT (schema conversion) + AWS DMS (data migration with ongoing replication)

**Why others are wrong**:
- DMS alone = cannot convert Oracle schema to Aurora
- Snowball = offline, causes downtime
- DataSync = file-level, not database

---

### Scenario 6: Hybrid Connectivity

**Question**: On-premises data center needs dedicated, high-bandwidth, low-latency connection to AWS with a cheap backup.

**Thinking key**: "dedicated, high-bandwidth" = Direct Connect. "cheap backup" = VPN.

**Answer**: Direct Connect (primary) + Site-to-Site VPN (backup)

**Why others are wrong**:
- VPN alone = max 1.25 Gbps, over internet (not dedicated)
- Direct Connect alone = no backup
- VPC Peering = VPC-to-VPC only, not on-premises

---

### Scenario 7: Security Incident Response

**Question**: Detect unauthorized API calls and automatically respond.

**Thinking key**: Detect API calls = CloudTrail. Auto-respond = EventBridge + Lambda.

**Answer**: CloudTrail -> EventBridge (pattern match) -> Lambda (automated response) + SNS (alert)

**Why others are wrong**:
- GuardDuty = threat detection, not API call logging
- Config = configuration changes, not API calls
- CloudWatch Alarms = metrics-based, not event-pattern-based

---

### Scenario 8: Shared File Storage

**Question**: Multiple Linux EC2 instances need to share files concurrently. Windows instances need SMB shares with Active Directory integration.

**Thinking key**: Linux shared = NFS. Windows + AD = SMB + AD.

**Answer**: Amazon EFS (Linux) + Amazon FSx for Windows File Server (Windows)

**Why others are wrong**:
- EBS Multi-Attach = same AZ only, not designed for general file sharing
- EFS for Windows = EFS is NFS only, not SMB
- S3 = object storage, not a file system (no POSIX)

---

## 17. LAST-MINUTE SERVICE REFERENCE

| Service | What It Does |
|---------|-------------|
| **Athena** | Serverless SQL queries on S3, ad-hoc |
| **Macie** | Scans S3 for PII/sensitive data |
| **GuardDuty** | Threat detection (VPC Flow Logs, DNS, CloudTrail) |
| **Inspector** | EC2/container vulnerability scanning |
| **Rekognition** | Image analysis/moderation |
| **Textract** | Extract text from PDF/images |
| **AppFlow** | SaaS -> S3 data transfer |
| **DataSync** | On-prem -> AWS data transfer (online) |
| **Snowball** | On-prem -> AWS data transfer (offline, large data) |
| **DMS** | Database migration (online, minimum downtime) |
| **Aurora Cloning** | Fast copy of production DB for testing |
| **RDS Proxy** | Lambda -> DB connection management |
| **DAX** | DynamoDB cache (sub-millisecond) |
| **ElastiCache Redis** | Session store, persistence, complex types |
| **ElastiCache Memcached** | Simple cache, multi-threaded |
| **Step Functions** | Workflow orchestration (Lambda, ECS, etc.) |
| **EventBridge** | Event-driven automation, scheduled rules |
| **Lake Formation** | Data lake access control, tag-based |
| **Storage Gateway** | Hybrid storage (File, Volume, Tape) |
| **Global Accelerator** | TCP/UDP global acceleration, static IPs |
| **PrivateLink** | Private VPC access to services |
| **Transit Gateway** | Multi-VPC/on-prem connectivity hub |
| **Organizations + SCP** | Account management + service restrictions |
| **AWS Backup** | Centralized backup across services |
| **IAM Identity Center** | SSO for multiple AWS accounts |
| **Cost Explorer** | Visualize and analyze AWS costs |
| **AWS Budgets** | Set custom cost/usage budgets and alerts |
| **Trusted Advisor** | Best practice checks (cost, security, performance) |
| **CloudFormation** | Infrastructure as Code (templates) |
| **CDK** | Define infra using programming languages |

---

## 18. EXAM DAY STRATEGY

### Time Management
- **65 questions in 130 minutes** = ~2 minutes per question
- Flag difficult questions, move on, come back
- Aim to finish with 15 minutes for review

### Question Approach
1. **Read the LAST sentence first** — know what they are asking before reading the scenario
2. **Identify keywords** — "least overhead", "most cost-effective", "most secure", "highly available"
3. **Eliminate 2 wrong answers** immediately using the patterns in Section 5
4. **Choose between remaining 2** using keyword mappings in Section 3

### Key Decision Framework
```
"least operational overhead" -> Serverless/Managed
"most cost-effective"        -> Spot/RI/Savings Plans/right-size
"most secure"                -> Private endpoints, encryption, least privilege
"highly available"           -> Multi-AZ, multiple AZs, auto-recovery
"lowest latency"             -> CloudFront, Global Accelerator, placement groups
"decouple"                   -> SQS, SNS
"real-time"                  -> Kinesis
"batch"                      -> SQS, Batch, Glue
```

### Common Exam Traps
- **Numbers matter**: "5 TB of data" -> Snowball Edge, not DataSync
- **"Must" vs "Should"**: "Must be highly available" eliminates single-AZ
- **Two correct answers**: One is correct, one is "more correct" — pick the one that best matches the keyword
- **Distractor services**: GuardDuty is NOT for DDoS, Config is NOT for API logging

---

## 19. LAST 24-HOUR REVISION CHECKLIST

Know these before entering the exam:

- [ ] **S3 storage classes** and when to use each (Standard, IA, Intelligent-Tiering, Glacier, Deep Archive)
- [ ] **Object Lock**: Compliance (nobody deletes) vs Governance (override possible)
- [ ] **Gateway vs Interface VPC Endpoint**: Gateway = free (S3, DynamoDB), Interface = costs money
- [ ] **Config vs CloudTrail**: Config = config changes, CloudTrail = API calls
- [ ] **Multi-AZ vs Read Replica**: Multi-AZ = HA, Read Replica = read performance
- [ ] **ALB vs NLB**: ALB = L7 HTTP/HTTPS, NLB = L4 TCP/UDP
- [ ] **Shield vs WAF**: Shield = DDoS, WAF = SQL injection/XSS
- [ ] **Secrets Manager vs Parameter Store**: Rotation = Secrets Manager, cheap config = Parameter Store
- [ ] **SQS vs SNS**: Queue (pull, 1 consumer) vs Topic (push, many consumers)
- [ ] **Kinesis vs SQS**: Streaming/analytics vs decoupling/buffering
- [ ] **NACL vs Security Group**: Stateless/subnet vs stateful/instance
- [ ] **Route 53 policies**: Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, Multi-value
- [ ] **IAM policy evaluation**: Explicit DENY wins, then ALLOW, then implicit DENY
- [ ] **Cross-account access**: Use IAM Roles + STS AssumeRole, never share users
- [ ] **Lambda limits**: 6 MB sync / 1 MB async payload, 15 min max execution, 1000 concurrency
- [ ] **RDS backup retention**: Max 35 days automated
- [ ] **EBS**: Snapshots are incremental, volumes are AZ-specific
- [ ] **CloudFront**: OAC for new setups, Invalidation costs money
- [ ] **Well-Architected 6 pillars**: Operational Excellence, Security, Reliability, Performance, Cost, Sustainability
- [ ] **DR strategies**: Backup & Restore (cheapest) -> Pilot Light -> Warm Standby -> Multi-Site Active-Active (most expensive)

---

> **EXAM STRATEGY**: When you see "least operational overhead" choose serverless. When you see "private access" choose VPC endpoint. When you see "credential rotation" choose Secrets Manager. Eliminate 2 out of 4 choices immediately, then pick from the remaining 2 using these rules.

> **GOOD LUCK!**
