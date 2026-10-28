// Original unofficial AWS SAA-C03 practice bank. Not affiliated with or endorsed by AWS.
const allExamQuestions = [
  {
    "exam": 1,
    "topic": "Networking",
    "q": "A genomics team runs a preprocessing pipeline on EC2 instances in private subnets. The instances must write result files to an Amazon S3 bucket, and the security team does not want this traffic to depend on internet egress devices. The architects also want the lowest recurring network cost for this path. Which design best fits?",
    "options": [
      "Place a NAT gateway in each Availability Zone and route S3 traffic through it",
      "Create a gateway VPC endpoint for Amazon S3 and update the relevant route tables",
      "Create an interface VPC endpoint for Amazon S3 in each subnet",
      "Attach an internet gateway to the VPC and restrict the bucket with a bucket policy"
    ],
    "correct": 1,
    "explanation": "A gateway VPC endpoint is the native private path from a VPC to Amazon S3 and is the lowest recurring-cost option for this use case. NAT gateways would send the traffic through internet egress infrastructure and add processing charges, while an S3 interface endpoint is only needed for different connectivity boundaries, such as certain on-premises or cross-network patterns. The key decision is that the callers are inside the VPC and only need private access to S3.",
    "keyRule": "Private Amazon S3 access from inside the VPC usually means a gateway endpoint, not NAT.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
      "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Networking",
    "q": "A retailer has an ordering system in a branch data center connected to AWS through Direct Connect. The application must call Amazon DynamoDB privately, and the network team wants the traffic to stay on private connectivity all the way into AWS. Which option should the team choose?",
    "options": [
      "Create a gateway VPC endpoint for DynamoDB",
      "Create an interface VPC endpoint for DynamoDB",
      "Send the traffic through a NAT gateway in a public subnet",
      "Publish DynamoDB access through an Application Load Balancer"
    ],
    "correct": 1,
    "explanation": "Because the callers are reaching AWS from on-premises through a hybrid network, the team needs an interface endpoint for DynamoDB. A gateway endpoint is the low-cost choice for VPC-local access, but it is not the right construct for extending private service access from on-premises networks. NAT is still internet egress, and a load balancer is not how DynamoDB is exposed. The deciding boundary is that the request originates outside the VPC.",
    "keyRule": "If the private path to DynamoDB must extend from on-premises into AWS, use an interface endpoint.",
    "docs": [
      "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/privatelink-interface-endpoints.html",
      "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-ddb.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Networking",
    "q": "A software company runs build workers in private subnets across three Availability Zones. The workers must download package updates from internet repositories every night, and the design must continue working if a single Availability Zone fails. Which architecture is most appropriate?",
    "options": [
      "One NAT gateway in a single public subnet for the whole VPC",
      "One internet gateway per private subnet",
      "One NAT gateway in each Availability Zone, with each private subnet routed to the NAT gateway in the same zone",
      "One gateway VPC endpoint for all internet destinations"
    ],
    "correct": 2,
    "explanation": "NAT gateways provide outbound internet access for private subnets, but they are zonal resources. Using one NAT gateway per Availability Zone preserves egress when one zone fails and avoids cross-AZ dependency for every update flow. A single centralized NAT gateway would create an Availability Zone dependency, and gateway endpoints do not provide generic internet access. The requirement is resilient internet egress, not private access to a specific AWS service.",
    "keyRule": "Private subnets needing resilient internet egress should use NAT gateways per Availability Zone.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html",
      "https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Networking",
    "q": "A SaaS company wants to let customers consume a billing API that runs on EC2 instances in the provider VPC. Customer VPC CIDR ranges often overlap with each other, and the provider wants customers to reach only that API, not the rest of the provider network. Which AWS design should be used?",
    "options": [
      "Create VPC peering connections to every customer VPC",
      "Expose the API through an endpoint service powered by AWS PrivateLink",
      "Attach all customer VPCs to one shared transit gateway",
      "Publish the API on the public internet behind an internet-facing Application Load Balancer"
    ],
    "correct": 1,
    "explanation": "AWS PrivateLink is designed for private, service-specific exposure from a provider VPC to consumer VPCs. It works well when consumer CIDR ranges overlap because it does not require full routed connectivity the way VPC peering or Transit Gateway attachments do. A public ALB would violate the private-only requirement. The deciding factor is that the provider wants to share one private service, not merge networks.",
    "keyRule": "Private service publication to many consumers with overlapping CIDRs points to AWS PrivateLink.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Networking",
    "q": "An enterprise has 30 application VPCs, separate inspection VPCs, and two on-premises data centers. The network team wants a single regional routing hub so they can avoid maintaining a growing mesh of peering links and can segment traffic with central route tables. Which AWS service best fits?",
    "options": [
      "Create full-mesh VPC peering among all VPCs and terminate the data centers with VPNs",
      "Use AWS Transit Gateway as the central routing hub",
      "Deploy AWS Client VPN for all network segments",
      "Use one interface endpoint in each VPC"
    ],
    "correct": 1,
    "explanation": "AWS Transit Gateway is the scalable hub-and-spoke construct for connecting many VPCs and on-premises networks through centralized routing. It reduces the operational burden of a peering mesh and supports route-table-based segmentation. Client VPN is for end users, not network hubs, and interface endpoints are service-specific rather than network-wide connectivity tools. The scope of connectivity here is many networks, not a single service or two-VPC link.",
    "keyRule": "When many VPCs and on-premises networks need one routing hub, choose AWS Transit Gateway.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-centralized-router.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Networking",
    "q": "A company keeps its shared CI tooling in one VPC and its internal developer portal in another VPC in the same Region. The VPC CIDR ranges do not overlap, only these two VPCs need to communicate, and the architects want the simplest private routing option. Which design is the best fit?",
    "options": [
      "Create a VPC peering connection between the two VPCs",
      "Attach both VPCs to a new transit gateway",
      "Expose the developer portal through AWS PrivateLink",
      "Route traffic through a NAT gateway"
    ],
    "correct": 0,
    "explanation": "VPC peering is the straightforward option when only two non-overlapping VPCs need private IP connectivity. Transit Gateway would add unnecessary operational surface for a simple two-VPC relationship, and NAT gateways do not provide private VPC-to-VPC routing. PrivateLink would only make sense if the goal were to expose one specific service rather than allow normal routed communication between both VPCs.",
    "keyRule": "Two non-overlapping VPCs with simple private routing needs are a peering use case.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/peering/invalid-peering-configurations.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Networking",
    "q": "A trading firm wants a dedicated private link from its colocation facility to AWS for market data systems. The network team needs predictable bandwidth, BGP-based routing, and no dependence on internet VPN tunnels for the primary path. Which service should they adopt?",
    "options": [
      "AWS Site-to-Site VPN",
      "AWS Direct Connect",
      "AWS Client VPN",
      "VPC peering"
    ],
    "correct": 1,
    "explanation": "AWS Direct Connect provides dedicated private connectivity from an on-premises location to AWS and supports the hybrid routing model expected here. Site-to-Site VPN is useful but still traverses the internet, so it does not satisfy the dedicated primary-path requirement. Client VPN is for remote end users, and VPC peering does not connect on-premises sites. The deciding requirement is a dedicated private site-to-AWS connection.",
    "keyRule": "Dedicated private hybrid connectivity from a site to AWS means AWS Direct Connect.",
    "docs": [
      "https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithConnections.html",
      "https://docs.aws.amazon.com/directconnect/latest/UserGuide/connection_options.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Networking",
    "q": "A consulting company needs to give contractors secure access to internal dashboards hosted in private subnets. The contractors connect from home networks and travel frequently, and the company wants AWS to manage the remote-access service instead of operating its own VPN servers. Which AWS service is the best match?",
    "options": [
      "AWS Site-to-Site VPN",
      "AWS Client VPN",
      "AWS Transit Gateway",
      "Gateway VPC endpoint"
    ],
    "correct": 1,
    "explanation": "AWS Client VPN is the managed client-based remote-access service for users connecting from arbitrary locations into AWS resources and, if needed, on-premises networks. Site-to-Site VPN is for network-to-network connectivity, not a distributed workforce. Transit Gateway is a routing hub, and gateway endpoints are for private access to specific AWS services from inside a VPC. The access pattern here is remote users, not sites or services.",
    "keyRule": "Remote end users from any location should use AWS Client VPN, not Site-to-Site VPN.",
    "docs": [
      "https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-target.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Networking",
    "q": "A backend service in private subnets must read objects from Amazon S3, write session state to Amazon DynamoDB, and retrieve database credentials from AWS Secrets Manager. The architects want all three calls to stay on private AWS networking and want to minimize recurring endpoint charges. Which design should they implement?",
    "options": [
      "Use interface endpoints for Amazon S3, DynamoDB, and Secrets Manager",
      "Use one NAT gateway for all three services",
      "Use gateway endpoints for Amazon S3 and DynamoDB, plus an interface endpoint for Secrets Manager",
      "Use AWS Direct Connect for the application VPC"
    ],
    "correct": 2,
    "explanation": "Amazon S3 and DynamoDB are the classic gateway endpoint services, so using gateway endpoints for those two minimizes recurring endpoint cost while preserving private connectivity. AWS Secrets Manager requires an interface endpoint when you want private access from the VPC. Using interface endpoints for all three would work but would not be the lowest recurring-cost design, and NAT is still internet egress rather than private service access. The answer boundary is mixed service types with a cost constraint.",
    "keyRule": "For the lowest-cost private mix, use gateway endpoints where available and interface endpoints only where required.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html",
      "https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-ddb.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Networking",
    "q": "A managed service provider must let one consumer VPC reach a single internal HTTPS service. The consumer's CIDR range overlaps with the provider VPC, and the provider does not want to expose general network connectivity between the environments. Which option best satisfies the requirement?",
    "options": [
      "Create a VPC peering connection and exchange routes for the overlapping CIDRs",
      "Expose the service by using AWS PrivateLink",
      "Attach both VPCs to the same transit gateway and share full routing",
      "Route the traffic through a NAT gateway in the provider VPC"
    ],
    "correct": 1,
    "explanation": "AWS PrivateLink is the right fit because it publishes a specific service privately without requiring full network routing between the consumer and provider VPCs. VPC peering is not viable with overlapping CIDR ranges and would still create broader network connectivity than required. A transit gateway would also be broader than needed and does not solve the service-specific exposure requirement by itself. The decision turns on overlapping CIDRs plus least-privilege sharing of one service.",
    "keyRule": "If overlapping VPCs only need one private service, use AWS PrivateLink instead of routed network connectivity.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/peering/invalid-peering-configurations.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Storage",
    "q": "A media platform stores user-generated video clips in Amazon S3. For the first few weeks after upload, access is unpredictable and can spike suddenly. Months later, many objects become cold, but the team still wants automatic cost optimization without writing lifecycle rules for each pattern. Which storage class is the best fit?",
    "options": [
      "S3 Standard-IA",
      "S3 Intelligent-Tiering",
      "S3 One Zone-IA",
      "S3 Glacier Deep Archive"
    ],
    "correct": 1,
    "explanation": "S3 Intelligent-Tiering is designed for objects with changing or unknown access patterns because it automatically moves data between access tiers while preserving immediate retrieval when the object remains in the frequent or infrequent access tiers. Standard-IA assumes you already know the object will be infrequently accessed, and Deep Archive would not support the same immediate usability. The decision boundary is uncertainty in future access behavior, not simply low cost.",
    "keyRule": "Unknown or changing S3 access patterns usually point to S3 Intelligent-Tiering.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html",
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Storage",
    "q": "A training company keeps newly uploaded course recordings in Amazon S3 where they are watched heavily for about 45 days. After that, they are rarely viewed, but the support team must still be able to retrieve a file within a few hours when a customer dispute occurs. What is the most cost-effective design?",
    "options": [
      "Keep everything in S3 Standard permanently",
      "Transition objects from S3 Standard to S3 Glacier Flexible Retrieval with a lifecycle rule",
      "Transition objects to S3 Glacier Deep Archive after 45 days",
      "Store all files in S3 One Zone-IA from day one"
    ],
    "correct": 1,
    "explanation": "S3 Glacier Flexible Retrieval is appropriate when objects become cold after a predictable period and retrieval within minutes to hours is acceptable. A lifecycle rule lets the team keep the frequently accessed early period in S3 Standard and then reduce cost afterward. Deep Archive is optimized for much longer retrieval times, and One Zone-IA would reduce durability because the files are kept in only one Availability Zone. The key boundary is predictable aging plus non-immediate but still practical retrieval.",
    "keyRule": "Known warm-to-cold S3 lifecycle with hours-level retrieval fits Standard then Glacier Flexible Retrieval.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html",
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Storage",
    "q": "A legal archive must retain signed case evidence for seven years. Access is extremely rare, and the team accepts waiting up to 12 hours for retrieval when a file is requested. Which S3 storage class is the best fit?",
    "options": [
      "S3 Standard-IA",
      "S3 Glacier Instant Retrieval",
      "S3 Glacier Deep Archive",
      "S3 Intelligent-Tiering"
    ],
    "correct": 2,
    "explanation": "S3 Glacier Deep Archive is built for very rarely accessed long-term retention where the lowest storage cost is the priority and retrieval times of hours are acceptable. Glacier Instant Retrieval would preserve millisecond access, which is unnecessary here and typically more expensive for storage. Standard-IA and Intelligent-Tiering are both aimed at more active access patterns. The deciding boundary is very cold archival data with long retention and relaxed retrieval time.",
    "keyRule": "Very cold long-term archives with hours-level retrieval tolerance belong in S3 Glacier Deep Archive.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Storage",
    "q": "A healthcare provider stores compliance evidence in Amazon S3 and must guarantee that no administrator, including the root user, can delete the records before the retention period expires. Which feature should be used?",
    "options": [
      "S3 Versioning with MFA Delete",
      "S3 Object Lock Governance mode",
      "S3 Object Lock Compliance mode",
      "S3 Lifecycle expiration rules"
    ],
    "correct": 2,
    "explanation": "S3 Object Lock Compliance mode prevents object deletion or retention reduction by any user, including the root user, until the retention period expires. Governance mode is still useful for controlled retention, but it allows appropriately privileged users to bypass the lock in some circumstances. Versioning and lifecycle rules do not create the same immutable compliance guarantee. The answer boundary is absolute WORM-style retention.",
    "keyRule": "If nobody, including root, may delete the object early, use S3 Object Lock Compliance mode.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Storage",
    "q": "An analytics team stores partitioned Parquet files in Amazon S3 and wants to run ad hoc SQL queries directly against that data without provisioning or managing database servers. Which AWS service is the best fit?",
    "options": [
      "Amazon Redshift",
      "Amazon Athena",
      "AWS Glue DataBrew",
      "Amazon RDS for PostgreSQL"
    ],
    "correct": 1,
    "explanation": "Amazon Athena is a serverless query service that runs SQL directly against data in Amazon S3, making it a strong fit for ad hoc analytics with minimal operational work. Redshift can also analyze data, but it requires a warehouse model and more operational decisions. Glue helps with ETL and cataloging rather than being the direct query engine here. The critical boundary is direct SQL on S3 with minimal infrastructure management.",
    "keyRule": "Ad hoc SQL directly on data in Amazon S3 with minimal ops means Amazon Athena.",
    "docs": [
      "https://docs.aws.amazon.com/athena/latest/ug/querying-athena-tables.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Storage",
    "q": "A semiconductor company must move 250 TB of design archives from an on-premises NAS environment into AWS within 10 days. Its available WAN bandwidth cannot meet the deadline even if fully saturated. Which AWS service is the most realistic choice?",
    "options": [
      "AWS DataSync",
      "Amazon S3 Transfer Acceleration",
      "AWS Snowball Edge",
      "A single Direct Connect hosted connection"
    ],
    "correct": 2,
    "explanation": "AWS Snowball Edge is the right option when the dataset is large enough that the network timeline is the limiting factor. DataSync and Transfer Acceleration still depend on available network bandwidth, and Direct Connect improves private connectivity but does not change the basic transfer math enough for a tight deadline of this size. The deciding factor is that physical transfer is required to hit the deadline.",
    "keyRule": "When large data transfer deadlines break network math, use Snowball Edge.",
    "docs": [
      "https://docs.aws.amazon.com/snowball/latest/developer-guide/using-device.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Storage",
    "q": "A genomics workflow runs on many Linux EC2 instances and needs a shared file system with POSIX semantics, standard NFS access, and regional durability across multiple Availability Zones. Which service is the best fit?",
    "options": [
      "Amazon EBS Multi-Attach",
      "Amazon EFS",
      "Amazon FSx for Windows File Server",
      "Amazon S3"
    ],
    "correct": 1,
    "explanation": "Amazon EFS is the managed NFS file system for Linux workloads that need shared access and POSIX-compatible semantics across multiple instances in multiple Availability Zones. EBS Multi-Attach provides block storage and has a much narrower attachment model, while FSx for Windows targets SMB workloads. S3 is object storage, not a POSIX file system. The boundary is Linux shared file access with regional managed storage.",
    "keyRule": "Shared Linux file storage with POSIX semantics across AZs points to Amazon EFS.",
    "docs": [
      "https://docs.aws.amazon.com/efs/latest/ug/mounting-fs.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Storage",
    "q": "A company is moving a Windows-based content management system to AWS. The application expects an SMB file share and native Microsoft Active Directory integration. Which managed file service best matches those requirements?",
    "options": [
      "Amazon EFS",
      "Amazon FSx for Windows File Server",
      "Amazon S3",
      "Amazon FSx for Lustre"
    ],
    "correct": 1,
    "explanation": "Amazon FSx for Windows File Server is purpose-built for Windows workloads that need SMB, NTFS permissions, and Active Directory integration. EFS is oriented around NFS and Linux-style shared file access, while S3 is object storage rather than a drop-in SMB file share. FSx for Lustre is aimed at high-performance compute workloads rather than Windows application file serving. The key boundary is managed Windows file storage.",
    "keyRule": "Windows workloads needing SMB and Active Directory should use FSx for Windows File Server.",
    "docs": [
      "https://docs.aws.amazon.com/fsx/latest/WindowsGuide/supported-fsx-clients.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Storage",
    "q": "An operations team wants to trigger near-real-time processing whenever new log objects arrive in Amazon S3. The downstream Lambda function can fail transiently, so the team wants durable buffering between S3 notifications and processing. Which architecture should they use?",
    "options": [
      "S3 Event Notifications to Amazon SQS, then Lambda consumes from the queue",
      "S3 Lifecycle transition rules to Lambda",
      "S3 Cross-Region Replication to Lambda",
      "S3 Event Notifications directly to an internet gateway"
    ],
    "correct": 0,
    "explanation": "Sending S3 event notifications to Amazon SQS creates a durable queue between object creation and Lambda processing. That buffering is useful when the consumer fails or must retry, because messages remain in the queue for later processing. Direct S3-to-Lambda invocation can be simpler, but it does not provide the same explicit queue-based retry buffer. The deciding requirement is durable event buffering before processing.",
    "keyRule": "If S3-triggered processing needs durable buffering, put Amazon SQS between S3 and Lambda.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Storage",
    "q": "A company is preparing Amazon S3 Cross-Region Replication for disaster recovery. Before replication can be enabled, what must be configured on both the source and destination buckets?",
    "options": [
      "S3 Transfer Acceleration",
      "S3 Object Lock",
      "S3 Versioning",
      "S3 Inventory"
    ],
    "correct": 2,
    "explanation": "S3 replication depends on versioning, and versioning must be enabled on both the source and destination buckets. Transfer Acceleration, Object Lock, and Inventory can all be useful in other scenarios, but they are not the prerequisite that makes replication function. The answer boundary is the required foundational feature, not an optional enhancement.",
    "keyRule": "S3 replication requires versioning on both buckets.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html",
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Storage",
    "q": "A compliance team needs to discover and classify sensitive personal data stored in Amazon S3 so it can investigate unexpected access patterns. Which AWS service is purpose-built for that job?",
    "options": [
      "Amazon GuardDuty",
      "Amazon Inspector",
      "Amazon Macie",
      "AWS Config"
    ],
    "correct": 2,
    "explanation": "Amazon Macie is designed to discover, classify, and help protect sensitive data in Amazon S3. GuardDuty focuses on threat detection, Inspector on workload vulnerability assessment, and Config on configuration state. The key requirement is content classification in S3, which is Macie’s domain.",
    "keyRule": "Sensitive-data discovery and classification in Amazon S3 means Amazon Macie.",
    "docs": [
      "https://docs.aws.amazon.com/macie/latest/user/discovery-jobs.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Storage",
    "q": "An audit firm needs temporary access to a handful of evidence files in an Amazon S3 bucket. The bucket owner does not want to create IAM users or make the bucket public. Which mechanism is the best fit?",
    "options": [
      "Publish the bucket through S3 website hosting",
      "Generate S3 presigned URLs for the required objects",
      "Enable S3 Transfer Acceleration",
      "Create a new public bucket and copy the files"
    ],
    "correct": 1,
    "explanation": "Presigned URLs allow time-limited access to specific S3 objects without making the bucket public or provisioning long-lived external identities for the simple sharing need. Website hosting or public buckets would unnecessarily expose data more broadly. Transfer Acceleration improves upload/download performance but does not solve authorization. The decision boundary is limited-time, object-level sharing.",
    "keyRule": "Short-lived external access to specific S3 objects is a presigned URL use case.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Storage",
    "q": "A retailer keeps historical invoices for 18 months. They are read only a few times per quarter, but when a file is requested it must open immediately, and the company still wants multi-Availability Zone resilience. Which storage class is the best fit?",
    "options": [
      "S3 Standard-IA",
      "S3 One Zone-IA",
      "S3 Glacier Flexible Retrieval",
      "S3 Glacier Deep Archive"
    ],
    "correct": 0,
    "explanation": "S3 Standard-IA is designed for infrequently accessed data that still needs millisecond retrieval and standard multi-AZ resilience. One Zone-IA would reduce resiliency to a single Availability Zone, while Glacier classes trade away the immediate retrieval requirement. The deciding boundary is infrequent access with immediate use and multi-AZ durability.",
    "keyRule": "Infrequent access plus instant retrieval plus multi-AZ durability usually means S3 Standard-IA.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Storage",
    "q": "A data science team stores regenerated feature files in Amazon S3. The files are not mission-critical because they can be rebuilt from source data, and the team wants to reduce storage cost while preserving millisecond retrieval. Which storage class is the best fit?",
    "options": [
      "S3 Standard",
      "S3 Standard-IA",
      "S3 One Zone-IA",
      "S3 Glacier Instant Retrieval"
    ],
    "correct": 2,
    "explanation": "S3 One Zone-IA trades multi-AZ resilience for lower storage cost and is a better fit when the data is infrequently accessed and can be recreated if needed. Standard-IA provides stronger resilience but at a higher cost profile for this scenario. Glacier Instant Retrieval is intended for archival-style objects rather than actively reusable secondary data sets. The boundary is recreatable data where single-AZ durability is acceptable.",
    "keyRule": "Recreatable infrequently accessed data with instant access can fit S3 One Zone-IA.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Storage",
    "q": "A financial archive is accessed only during quarterly audits, but the audit team expects the files to open immediately when requested. The company wants lower storage cost than S3 Standard for this rarely accessed archive. Which storage class is the best match?",
    "options": [
      "S3 Glacier Instant Retrieval",
      "S3 Glacier Flexible Retrieval",
      "S3 Glacier Deep Archive",
      "S3 One Zone-IA"
    ],
    "correct": 0,
    "explanation": "S3 Glacier Instant Retrieval is for archival data that is rarely retrieved but still needs millisecond access. Glacier Flexible Retrieval and Deep Archive both assume slower retrieval workflows, so they do not fit the immediate-open requirement. One Zone-IA is not positioned as an archive-oriented class and reduces resilience. The critical boundary is archive economics with instant retrieval.",
    "keyRule": "Rarely accessed archive data that still needs millisecond retrieval belongs in S3 Glacier Instant Retrieval.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Storage",
    "q": "A visual effects studio needs a high-performance shared file system for Linux render nodes. The workload is throughput-intensive and the team also wants native integration with an Amazon S3 bucket that stores the source assets. Which service is the best fit?",
    "options": [
      "Amazon EFS",
      "Amazon FSx for Lustre",
      "Amazon FSx for Windows File Server",
      "Amazon S3 Glacier Flexible Retrieval"
    ],
    "correct": 1,
    "explanation": "Amazon FSx for Lustre is optimized for high-performance compute workloads and integrates with Amazon S3, making it a good fit for rendering, analytics, and HPC-style pipelines. EFS is a general-purpose shared file system but not the same high-performance parallel file system. FSx for Windows is aimed at SMB-based Windows workloads. The deciding boundary is HPC-style performance with S3-backed data sets.",
    "keyRule": "High-performance compute file storage with S3 integration usually points to FSx for Lustre.",
    "docs": [
      "https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-fs-linked-data-repo.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Storage",
    "q": "A company has 40 TB of files on an on-premises NFS server and wants to move them to AWS over the network while preserving metadata and minimizing custom scripting. Which service is the best fit?",
    "options": [
      "AWS DataSync",
      "AWS Snowball Edge",
      "Amazon S3 Batch Operations",
      "S3 presigned URLs"
    ],
    "correct": 0,
    "explanation": "AWS DataSync is purpose-built for moving large datasets between on-premises storage and AWS storage services over the network while handling transfer acceleration, validation, and metadata preservation. Snowball Edge is better when bandwidth limits make network transfer impractical, but the question does not establish that constraint here. S3 Batch Operations and presigned URLs solve different problems. The boundary is managed online migration of file data.",
    "keyRule": "Managed network transfer of on-premises file data into AWS is an AWS DataSync use case.",
    "docs": [
      "https://docs.aws.amazon.com/datasync/latest/userguide/how-datasync-works.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Storage",
    "q": "A company already stores 180 TB of historical content in Amazon S3 Standard. It wants to move that content into a lower-cost archival class over time, and the team does not want the transition to consume on-premises or branch-office network bandwidth. Which approach is the most efficient?",
    "options": [
      "Copy the objects back to an on-premises server and re-upload them to the archival class",
      "Use an S3 lifecycle transition rule",
      "Export the data with Snowball Edge and re-import it",
      "Route the transition through S3 Transfer Acceleration"
    ],
    "correct": 1,
    "explanation": "If the data is already in Amazon S3, the cleanest and most efficient way to move it to another S3 storage class is an S3 lifecycle transition rule. That transition occurs inside AWS and does not require external network bandwidth. Snowball and Transfer Acceleration are transfer tools, not the right answer for an in-place storage-class move. The boundary is existing S3-resident data that only needs tiering.",
    "keyRule": "If the data is already in S3 and only the storage class must change, use lifecycle transitions.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Storage",
    "q": "A software vendor collects multi-gigabyte diagnostic bundles from customers worldwide into a single Amazon S3 bucket. Upload performance from distant regions is inconsistent, and the vendor wants an AWS-managed feature to accelerate long-distance transfers. Which option should it use?",
    "options": [
      "Amazon S3 Transfer Acceleration",
      "Amazon Macie",
      "Amazon Athena",
      "S3 Object Lock"
    ],
    "correct": 0,
    "explanation": "S3 Transfer Acceleration is designed to improve transfer performance to an S3 bucket over long geographic distances by using optimized network paths. Macie, Athena, and Object Lock address data classification, analytics, and retention rather than upload performance. The deciding requirement is faster global transfer into S3, not storage governance or query.",
    "keyRule": "Global long-distance uploads into one S3 bucket point to S3 Transfer Acceleration.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Storage",
    "q": "A design firm wants branch office users to keep working with standard file shares while files are ultimately stored durably in AWS. The users expect low-latency local access to recently used files, and the team does not want to rewrite applications for object APIs. Which service is the best fit?",
    "options": [
      "Amazon S3 Glacier Deep Archive",
      "AWS Storage Gateway File Gateway",
      "Amazon FSx for Lustre",
      "Amazon Athena"
    ],
    "correct": 1,
    "explanation": "AWS Storage Gateway File Gateway presents NFS or SMB file shares locally while storing the objects in Amazon S3 and caching active data on premises for low-latency access. That makes it a better fit than asking users to interact directly with object storage. FSx for Lustre is a high-performance file system for compute workloads, not branch file gatewaying. The key boundary is legacy file-share access backed by S3.",
    "keyRule": "If users need local file-share semantics with S3 as the durable backend, use File Gateway.",
    "docs": [
      "https://docs.aws.amazon.com/storagegateway/latest/userguide/file-gateway-concepts.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Storage",
    "q": "A clustered database appliance runs on several EC2 instances in one Availability Zone and needs shared block storage attached to multiple instances at the same time. Which storage feature is designed for that use case?",
    "options": [
      "Amazon EFS",
      "Amazon EBS Multi-Attach",
      "Amazon S3 Standard",
      "Amazon FSx for Windows File Server"
    ],
    "correct": 1,
    "explanation": "Amazon EBS Multi-Attach is the feature for attaching a single provisioned IOPS EBS volume to multiple EC2 instances in the same Availability Zone. EFS is shared file storage rather than shared block storage, and S3 is object storage. FSx for Windows provides SMB file shares, which is also a different access model. The deciding boundary is shared block storage, not shared files.",
    "keyRule": "Shared block storage for multiple EC2 instances in one AZ points to EBS Multi-Attach.",
    "docs": [
      "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Storage",
    "q": "An investigations team must freeze selected Amazon S3 objects immediately because of pending litigation. The hold should remain until the legal team explicitly removes it, regardless of the normal retention schedule. Which S3 capability should be used?",
    "options": [
      "S3 lifecycle expiration",
      "S3 Object Lock legal hold",
      "S3 Intelligent-Tiering archive access tier",
      "S3 Transfer Acceleration"
    ],
    "correct": 1,
    "explanation": "An S3 Object Lock legal hold is specifically intended to prevent deletion of an object until the hold is removed, independent of a time-based retention period. Lifecycle rules do the opposite by automating deletion or transitions. Intelligent-Tiering and Transfer Acceleration are unrelated to legal preservation. The decision boundary is an indefinite hold controlled by legal workflow rather than by a preset retention clock.",
    "keyRule": "If the object must be frozen until someone explicitly releases it, use an S3 Object Lock legal hold.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-managing.html",
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Storage",
    "q": "A manufacturing platform needs one managed file service that can present NFS to Linux applications, SMB to Windows applications, and also provide enterprise data management features such as snapshots and clones. Which AWS service is the best fit?",
    "options": [
      "Amazon EFS",
      "Amazon FSx for NetApp ONTAP",
      "Amazon FSx for Lustre",
      "Amazon S3 Standard"
    ],
    "correct": 1,
    "explanation": "Amazon FSx for NetApp ONTAP supports multiprotocol access patterns and enterprise-style data management features such as snapshots and cloning. EFS is NFS-focused and does not provide the same multiprotocol ONTAP model. FSx for Lustre is targeted at high-performance compute use cases instead. The answer boundary is a managed multiprotocol enterprise file platform.",
    "keyRule": "If one managed file service must serve both NFS and SMB with advanced data management, use FSx for NetApp ONTAP.",
    "docs": [
      "https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/accessing-data.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Storage",
    "q": "A company needs to apply a new tag and invoke an operation across tens of millions of objects already stored in Amazon S3. The team wants a managed bulk mechanism rather than writing custom loops to list and process every key. Which feature should it use?",
    "options": [
      "Amazon S3 Batch Operations",
      "Amazon Athena",
      "Amazon Macie",
      "S3 presigned URLs"
    ],
    "correct": 0,
    "explanation": "Amazon S3 Batch Operations is built for performing large-scale actions across many S3 objects using a managed job model. Athena queries data; Macie classifies sensitive content; presigned URLs share individual objects. The deciding boundary is a managed bulk action across an existing object population.",
    "keyRule": "Managed bulk actions across millions of S3 objects belong to S3 Batch Operations.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Storage",
    "q": "A platform team wants one AWS-native service to define backup policies centrally and protect Amazon EBS volumes, Amazon EFS file systems, and Amazon RDS databases across accounts. Which service is the best fit?",
    "options": [
      "Amazon S3 Inventory",
      "AWS Backup",
      "Amazon Macie",
      "AWS DataSync"
    ],
    "correct": 1,
    "explanation": "AWS Backup is the centralized managed service for defining backup plans and applying them across supported AWS services, including EBS, EFS, and RDS. S3 Inventory reports object metadata, Macie classifies S3 content, and DataSync moves data. The key requirement is centralized policy-based backup management across multiple AWS storage services.",
    "keyRule": "Centralized policy-based backups across multiple AWS storage services point to AWS Backup.",
    "docs": [
      "https://docs.aws.amazon.com/aws-backup/latest/devguide/creating-a-backup-plan.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Database",
    "q": "A merchandising application uses Amazon RDS for MySQL for transactional writes. A separate reporting team runs heavy read-only queries that slow down the checkout path, but the company does not want to change database engines. Which design is the best fit?",
    "options": [
      "Enable Multi-AZ on the DB instance",
      "Create one or more read replicas and send reporting traffic there",
      "Add a NAT gateway to the database subnet",
      "Move the reporting queries into Amazon S3 Glacier Flexible Retrieval"
    ],
    "correct": 1,
    "explanation": "Read replicas are used to offload read-heavy workloads from the primary relational database instance. Multi-AZ improves availability and failover but does not serve the same role for scaling read traffic in the standard RDS instance deployment model. The deciding boundary is read scaling for reporting without changing engines.",
    "keyRule": "Read-heavy reporting on RDS usually means read replicas, not Multi-AZ.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Database",
    "q": "A payment service stores orders in Amazon RDS for PostgreSQL. The architects need automatic failover to a standby instance in another Availability Zone, but the application does not need extra read capacity. Which feature should they choose?",
    "options": [
      "Read replicas",
      "Amazon Redshift",
      "Multi-AZ deployment",
      "Amazon ElastiCache"
    ],
    "correct": 2,
    "explanation": "A Multi-AZ deployment is the high-availability feature for a relational database that needs synchronous standby failover in another Availability Zone. Read replicas are for offloading reads, not for the same standby failover objective. Redshift and ElastiCache solve different analytics and caching problems. The decision boundary is high availability without a read-scaling requirement.",
    "keyRule": "HA failover for RDS without read scaling points to Multi-AZ.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Database",
    "q": "An API tier built with AWS Lambda opens large numbers of short-lived connections to an Amazon RDS for MySQL database. During sudden traffic spikes, the database spends too much time handling connection churn. Which AWS service is designed to help with this problem?",
    "options": [
      "Amazon RDS Proxy",
      "Amazon DynamoDB global tables",
      "AWS Schema Conversion Tool",
      "Amazon Neptune"
    ],
    "correct": 0,
    "explanation": "Amazon RDS Proxy pools and shares database connections, which is especially useful when highly elastic compute such as Lambda creates bursts of connection requests. Global tables, SCT, and Neptune address different database problems. The answer boundary is connection management for a relational database, not engine conversion or graph traversal.",
    "keyRule": "Bursting Lambda-to-RDS connection churn points to Amazon RDS Proxy.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Database",
    "q": "A gaming leaderboard stores player state in Amazon DynamoDB. The application needs microsecond-level latency for hot, eventually consistent reads during peak match activity. Which service is the best fit?",
    "options": [
      "Amazon Aurora reader endpoint",
      "DynamoDB Accelerator (DAX)",
      "Amazon RDS Proxy",
      "AWS Database Migration Service"
    ],
    "correct": 1,
    "explanation": "DynamoDB Accelerator (DAX) is the in-memory cache that is API-compatible with DynamoDB and is built to reduce read latency from single-digit milliseconds to microseconds for suitable eventually consistent workloads. Aurora reader endpoints and RDS Proxy are relational features, and DMS is a migration tool. The key boundary is microsecond read acceleration for DynamoDB.",
    "keyRule": "Microsecond eventually consistent reads on DynamoDB point to DAX.",
    "docs": [
      "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html",
      "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Database",
    "q": "A ticketing platform expects sudden, unpredictable traffic spikes during product launches. The developers want a serverless NoSQL database that can absorb large demand changes without capacity planning. Which service configuration is the best fit?",
    "options": [
      "Amazon RDS for PostgreSQL with read replicas",
      "Amazon DynamoDB on-demand mode",
      "Amazon Redshift Serverless",
      "Amazon DocumentDB"
    ],
    "correct": 1,
    "explanation": "DynamoDB on-demand mode is intended for workloads with unpredictable traffic because it removes throughput capacity planning and scales automatically with demand. RDS with replicas is still relational infrastructure, Redshift is an analytics warehouse, and DocumentDB is a document database. The decision boundary is serverless key-value/document-style access with unpredictable request volume.",
    "keyRule": "Unpredictable NoSQL traffic without capacity planning points to DynamoDB on-demand.",
    "docs": [
      "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/on-demand-capacity-mode.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Database",
    "q": "A QA team needs a full copy of a 20 TB Amazon Aurora database for testing. The copy must be created quickly and with minimal extra storage at the moment of creation. Which Aurora feature best fits?",
    "options": [
      "Snapshot export to Amazon S3",
      "Aurora cloning",
      "Read replica promotion",
      "AWS DMS full load"
    ],
    "correct": 1,
    "explanation": "Aurora cloning uses a copy-on-write model so a new cluster can be created quickly while initially sharing the same underlying data pages. That is much faster and more space-efficient than making a full physical copy up front. A promoted read replica is not the same as creating an independent test copy from a clone. The deciding boundary is rapid full-environment cloning with minimal initial storage overhead.",
    "keyRule": "Fast full Aurora copies with copy-on-write behavior mean Aurora cloning.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Database",
    "q": "An application uses Amazon Aurora MySQL with several replicas. The developers want one endpoint that automatically distributes read-only sessions across available replicas. Which Aurora feature should they use?",
    "options": [
      "Writer endpoint",
      "Reader endpoint",
      "RDS Proxy endpoint",
      "Custom VPC endpoint"
    ],
    "correct": 1,
    "explanation": "The Aurora reader endpoint balances read-only connections across Aurora replicas, which reduces read load on the writer instance. The writer endpoint is for write traffic to the primary instance. RDS Proxy can still be useful in some designs, but it is not the native Aurora feature that answers this exact read distribution requirement. The boundary is built-in Aurora read balancing.",
    "keyRule": "Single endpoint for Aurora read traffic means the reader endpoint.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Endpoints.Reader.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Database",
    "q": "A global commerce platform needs one relational database with a primary Region for writes, fast local reads in other Regions, and a recovery strategy for a full-Region outage. Which Aurora feature is the best fit?",
    "options": [
      "Aurora Global Database",
      "Aurora cloning",
      "Multi-AZ DB instance deployment",
      "RDS storage autoscaling"
    ],
    "correct": 0,
    "explanation": "Aurora Global Database is designed for multi-Region relational deployments with one primary Region and one or more secondary Regions that can provide local reads and improve disaster recovery posture. Multi-AZ covers Availability Zone failover inside a Region, not multi-Region read locality and failover. Cloning and storage autoscaling solve unrelated problems. The key boundary is global relational reads plus Region-level resilience.",
    "keyRule": "Multi-Region Aurora with local reads and Region DR means Aurora Global Database.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Database",
    "q": "A SaaS team wants a MySQL-compatible relational database for highly variable tenant traffic. The database should scale capacity automatically and bill based on actual usage rather than a fixed instance size. Which option is the best fit?",
    "options": [
      "Amazon Aurora Serverless v2",
      "Amazon RDS Multi-AZ",
      "Amazon Redshift Serverless",
      "Amazon ElastiCache Serverless"
    ],
    "correct": 0,
    "explanation": "Aurora Serverless v2 is the autoscaling Aurora deployment option for variable relational workloads and is charged based on consumed capacity rather than a fixed provisioned size. Standard RDS Multi-AZ is a high-availability deployment pattern, not an on-demand autoscaling relational capacity model. Redshift and ElastiCache solve analytics and caching problems instead. The boundary is variable relational demand with Aurora compatibility.",
    "keyRule": "Variable relational demand with Aurora compatibility points to Aurora Serverless v2.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html",
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Database",
    "q": "A BI team needs to run complex SQL analytics across several terabytes of historical sales data with a warehouse-style schema. The workload is analytical, not transactional, and the team wants a managed columnar data warehouse. Which service is the best fit?",
    "options": [
      "Amazon DynamoDB",
      "Amazon Aurora PostgreSQL",
      "Amazon Redshift",
      "Amazon Neptune"
    ],
    "correct": 2,
    "explanation": "Amazon Redshift is the managed data warehouse service for large-scale SQL analytics. DynamoDB is NoSQL, Aurora is a transactional relational database, and Neptune is for graph data. The deciding factor is warehouse-style analytics over large datasets rather than OLTP processing.",
    "keyRule": "Petabyte-scale SQL analytics and warehousing point to Amazon Redshift.",
    "docs": [
      "https://docs.aws.amazon.com/redshift/latest/dg/c_high_level_system_architecture.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Migration",
    "q": "A company plans to move an Oracle database to Aurora PostgreSQL. Before any data migration starts, the architects want an assessment of schema conversion complexity and an automated way to convert as much schema as possible. Which AWS tool should they run first?",
    "options": [
      "AWS Database Migration Service",
      "AWS Schema Conversion Tool",
      "Amazon RDS Proxy",
      "Amazon Redshift Spectrum"
    ],
    "correct": 1,
    "explanation": "AWS Schema Conversion Tool is the tool for assessing and converting schema when moving between heterogeneous database engines. DMS handles data movement and ongoing replication, but schema conversion analysis is the first step here. RDS Proxy and Redshift Spectrum solve entirely different problems. The boundary is schema assessment and conversion before data movement.",
    "keyRule": "Heterogeneous schema conversion analysis starts with AWS SCT.",
    "docs": [
      "https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Converting.Convert.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Migration",
    "q": "A production PostgreSQL database must be migrated to Amazon Aurora PostgreSQL with minimal downtime. The initial bulk data load can happen before cutover, but ongoing changes must continue to replicate until the final switch. Which AWS DMS capability is required?",
    "options": [
      "RDS read replica creation",
      "Change data capture (CDC)",
      "Aurora cloning",
      "DynamoDB point-in-time recovery"
    ],
    "correct": 1,
    "explanation": "Change data capture (CDC) in AWS DMS is the feature that keeps ongoing source changes flowing to the target during a low-downtime migration. Read replicas and Aurora cloning are not generic migration mechanisms across engines or environments. PITR is for recovery, not live migration. The answer boundary is continuous replication of changes after the initial load.",
    "keyRule": "Low-downtime database migration after full load requires DMS CDC.",
    "docs": [
      "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Database",
    "q": "A mobile game needs a globally distributed NoSQL database where players in North America and Europe can both read and write locally. The data must replicate automatically across Regions. Which feature is the best fit?",
    "options": [
      "DynamoDB global tables",
      "RDS Multi-AZ",
      "Aurora Global Database",
      "Amazon Redshift data sharing"
    ],
    "correct": 0,
    "explanation": "DynamoDB global tables provide multi-Region, multi-active replication with local read and write capability in each replica Region. RDS Multi-AZ is regional high availability, and Aurora Global Database uses a primary Region with read-only secondary Regions in the normal design. Redshift data sharing is for analytics. The decision boundary is multi-active global NoSQL writes.",
    "keyRule": "Multi-Region multi-active writes on NoSQL data point to DynamoDB global tables.",
    "docs": [
      "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Database",
    "q": "An operations engineer accidentally deletes several items from a DynamoDB table. The team wants the ability to restore the table to its state from a few hours earlier without having to manage backup jobs manually. Which feature should be enabled?",
    "options": [
      "DynamoDB point-in-time recovery",
      "DynamoDB global tables",
      "Amazon RDS automated backups",
      "DynamoDB Accelerator (DAX)"
    ],
    "correct": 0,
    "explanation": "DynamoDB point-in-time recovery provides continuous backups and lets you restore to any second within the recovery window without managing a manual backup schedule. Global tables replicate writes but are not the recovery control for this requirement. DAX is a cache, and RDS backups are not part of DynamoDB. The key boundary is managed continuous table recovery.",
    "keyRule": "Restore a DynamoDB table to an earlier second by enabling PITR.",
    "docs": [
      "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Point-in-time-recovery.html",
      "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/pointintimerecovery_restores.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Database",
    "q": "A development team uses MongoDB-compatible drivers and stores flexible JSON-like application documents. It wants a fully managed AWS database that preserves that programming model without redesigning the application into tables. Which service is the best fit?",
    "options": [
      "Amazon DocumentDB (with MongoDB compatibility)",
      "Amazon Neptune",
      "Amazon RDS for SQL Server",
      "Amazon Redshift"
    ],
    "correct": 0,
    "explanation": "Amazon DocumentDB is the managed AWS document database service designed for MongoDB-compatible application patterns. Neptune is for graph workloads, RDS for SQL Server is relational, and Redshift is a warehouse. The key boundary is flexible document storage with MongoDB compatibility.",
    "keyRule": "Managed MongoDB-compatible document workloads point to Amazon DocumentDB.",
    "docs": [
      "https://docs.aws.amazon.com/documentdb/latest/developerguide/mongo-apis.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Database",
    "q": "A fraud detection platform needs to model complex relationships among accounts, devices, merchants, and transactions. The queries must traverse many connected edges efficiently. Which AWS database service is the best fit?",
    "options": [
      "Amazon Neptune",
      "Amazon Aurora MySQL",
      "Amazon DynamoDB",
      "Amazon ElastiCache"
    ],
    "correct": 0,
    "explanation": "Amazon Neptune is the graph database service for highly connected data and relationship traversal. Aurora and DynamoDB can store the data, but they are not purpose-built for efficient graph traversal across billions of relationships. ElastiCache is an in-memory cache, not the system of record here. The answer boundary is graph-shaped data and relationship-centric queries.",
    "keyRule": "Highly connected relationship queries point to Amazon Neptune.",
    "docs": [
      "https://docs.aws.amazon.com/neptune/latest/userguide/intro.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Database",
    "q": "A self-managed application is moved onto Amazon RDS for PostgreSQL. The engine must stay the same, but the team wants the storage volume to grow automatically when free space gets low. Which RDS capability should be enabled?",
    "options": [
      "Read replicas",
      "RDS storage autoscaling",
      "Aurora Global Database",
      "DynamoDB on-demand mode"
    ],
    "correct": 1,
    "explanation": "RDS storage autoscaling increases allocated storage automatically when an RDS instance is running low on free space. Read replicas scale reads, Aurora Global Database is a multi-Region Aurora feature, and DynamoDB on-demand is a NoSQL throughput mode. The boundary is automatic storage growth on a standard RDS instance.",
    "keyRule": "Automatic storage growth on an RDS instance means RDS storage autoscaling.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Database",
    "q": "An e-commerce site needs a fully managed in-memory layer to cache hot catalog data and reduce read load on its primary database. The cache should improve response time for frequently requested items but is not the system of record. Which AWS service is the best fit?",
    "options": [
      "Amazon ElastiCache",
      "Amazon Neptune",
      "Amazon Redshift",
      "AWS Schema Conversion Tool"
    ],
    "correct": 0,
    "explanation": "Amazon ElastiCache is the managed in-memory caching service used to speed up frequently accessed data and reduce load on the primary database. Neptune, Redshift, and SCT address graph storage, warehousing, and schema conversion instead. The deciding requirement is a managed cache, not a primary database engine.",
    "keyRule": "If the requirement is a managed in-memory cache in front of a database, use Amazon ElastiCache.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/elasticache-use-cases.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Database",
    "q": "A SaaS vendor needs a PostgreSQL-compatible managed database with automatic storage growth, built-in replication, and capacity for large relational datasets well beyond the limits of a typical single RDS instance. Which service is the best fit?",
    "options": [
      "Amazon Aurora PostgreSQL-Compatible Edition",
      "Amazon DynamoDB",
      "Amazon ElastiCache",
      "Amazon Neptune"
    ],
    "correct": 0,
    "explanation": "Aurora PostgreSQL is the managed PostgreSQL-compatible service with a shared storage architecture, automatic storage growth, and large-scale relational capabilities. DynamoDB is NoSQL, ElastiCache is caching, and Neptune is graph. The key boundary is PostgreSQL compatibility plus Aurora-style scaling characteristics.",
    "keyRule": "Large-scale PostgreSQL-compatible managed relational workloads point to Aurora PostgreSQL.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Performance.html#Aurora.Managing.Performance.StorageScaling"
    ]
  },
  {
    "exam": 4,
    "topic": "Database",
    "q": "A company has a licensed Oracle workload with stored procedures and vendor certification requirements that depend on staying on Oracle. It wants AWS to manage backups, patching, and infrastructure. Which service is the best fit?",
    "options": [
      "Amazon RDS for Oracle",
      "Amazon Aurora MySQL",
      "AWS Database Migration Service",
      "Amazon DocumentDB"
    ],
    "correct": 0,
    "explanation": "Amazon RDS for Oracle is the managed Oracle database option when the workload must remain on Oracle. Aurora MySQL changes engines, DMS is a migration service rather than the target runtime, and DocumentDB is document-oriented. The answer boundary is managed Oracle without engine change.",
    "keyRule": "If the workload must remain Oracle but be managed by AWS, use Amazon RDS for Oracle.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Oracle.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Database",
    "q": "A team restores a DynamoDB table by using point-in-time recovery after accidental deletion. What is the behavior of the restore operation?",
    "options": [
      "It rewinds the existing table in place",
      "It restores the data into a new table",
      "It restores only to the latest backup, not a selected time",
      "It requires DAX to be enabled first"
    ],
    "correct": 1,
    "explanation": "DynamoDB point-in-time recovery restores data to a new table rather than rewinding the source table in place. That distinction matters for operational planning, IAM permissions, and cutover. DAX is unrelated, and the whole point of PITR is selecting a previous point in time. The boundary is restore semantics, not just recovery availability.",
    "keyRule": "DynamoDB PITR restores into a new table, not the existing one.",
    "docs": [
      "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/pointintimerecovery_restores.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Database",
    "q": "A MySQL-compatible workload needs regional high availability and also wants readable standby instances for read traffic in the same Region, using the newer Amazon RDS deployment model rather than classic single-standby Multi-AZ. Which option best fits?",
    "options": [
      "Multi-AZ DB cluster deployment for Amazon RDS",
      "Single-standby Multi-AZ DB instance deployment",
      "Read replicas only",
      "Aurora Global Database"
    ],
    "correct": 0,
    "explanation": "A Multi-AZ DB cluster deployment for Amazon RDS provides a writer plus readable standbys across three Availability Zones, combining high availability with additional read capacity. The classic single-standby Multi-AZ DB instance deployment provides failover but not the same readable-standby model. Read replicas alone are not the same HA deployment pattern. The answer boundary is the newer RDS Multi-AZ cluster model with readable standbys.",
    "keyRule": "RDS HA plus readable standbys in three AZs points to a Multi-AZ DB cluster deployment.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html",
      "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Database",
    "q": "A startup stores user sessions in a relational database, but the read workload is simple key-based retrieval and the data is short-lived. The team wants to reduce latency and avoid using the relational database as the primary session store. Which option is the best fit?",
    "options": [
      "Keep sessions only in Amazon RDS Multi-AZ",
      "Use Amazon ElastiCache as the session store/cache layer",
      "Use AWS SCT to convert the schema",
      "Use Amazon Redshift Serverless"
    ],
    "correct": 1,
    "explanation": "Session data with simple access patterns and low-latency needs is a typical fit for an in-memory cache such as Amazon ElastiCache. Keeping that workload in the primary relational store creates unnecessary overhead. AWS SCT and Redshift solve migration and analytics problems instead. The decision boundary is ephemeral, latency-sensitive session state rather than durable relational transactions.",
    "keyRule": "Latency-sensitive session state is usually better in ElastiCache than in the primary relational database.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/elasticache-use-cases.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Database",
    "q": "A finance team runs warehouse-style analytics only a few times per day. They want the simplicity of a managed analytics service without keeping a provisioned data warehouse running all day when idle. Which AWS option is the best fit?",
    "options": [
      "Amazon Redshift Serverless",
      "Amazon RDS Proxy",
      "Amazon Neptune",
      "DynamoDB on-demand mode"
    ],
    "correct": 0,
    "explanation": "Amazon Redshift Serverless is intended for analytics workloads that benefit from managed warehouse capacity without the overhead of maintaining provisioned clusters all the time. RDS Proxy, Neptune, and DynamoDB on-demand solve connection pooling, graph storage, and NoSQL request scaling. The key boundary is intermittent analytical warehousing.",
    "keyRule": "Intermittent SQL warehouse workloads point to Amazon Redshift Serverless.",
    "docs": [
      "https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-workgroup-create.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Migration",
    "q": "A team is migrating a self-managed PostgreSQL database to Amazon RDS for PostgreSQL. Because the source and target use the same engine family, the team wants AWS-managed migration tooling rather than schema conversion for a different engine. Which AWS capability is the best fit?",
    "options": [
      "AWS Schema Conversion Tool only",
      "AWS DMS homogeneous data migration",
      "Amazon Neptune bulk loader",
      "Aurora cloning"
    ],
    "correct": 1,
    "explanation": "For same-engine PostgreSQL migrations, AWS DMS homogeneous data migration is designed to handle the move with AWS-managed migration workflows. SCT is most valuable when schema conversion between different engines is required, which is not the main need here. Neptune and Aurora cloning are unrelated. The boundary is same-engine migration rather than heterogeneous conversion.",
    "keyRule": "Same-engine PostgreSQL migration points to AWS DMS homogeneous migration, not SCT-led schema conversion.",
    "docs": [
      "https://docs.aws.amazon.com/dms/latest/userguide/dm-migrating-data-postgresql.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Security",
    "q": "A team runs workloads on Amazon EC2 and wants applications to call AWS APIs without storing long-term access keys on the instances. Which IAM approach is the best fit?",
    "options": [
      "Create one shared IAM user and copy its access keys to every instance",
      "Attach an IAM role to the EC2 instances by using an instance profile",
      "Store root account access keys in AWS Systems Manager Parameter Store",
      "Generate access keys for each developer and reuse them on the instances"
    ],
    "correct": 1,
    "explanation": "An IAM role attached through an instance profile gives EC2 instances temporary credentials automatically, which avoids distributing long-term access keys. Shared IAM users and root keys create unnecessary credential risk. The key boundary is machine-to-AWS API access without embedded static credentials.",
    "keyRule": "EC2 workloads should use IAM roles, not long-term access keys.",
    "docs": [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html",
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Security",
    "q": "A finance account must let analysts in a separate analytics account read specific cost reports, but the finance team does not want to create duplicate IAM users in the finance account. Which design is the best fit?",
    "options": [
      "Create IAM users in both accounts and synchronize passwords manually",
      "Allow the analytics users to assume a role in the finance account",
      "Share the finance account root credentials with the analytics team",
      "Use a NAT gateway to forward identity traffic between the accounts"
    ],
    "correct": 1,
    "explanation": "Cross-account role assumption is the standard IAM pattern when users in one AWS account need controlled access to resources in another account. It avoids duplicating identities and keeps permissions centralized in the target account. Root credential sharing and duplicate users are both weaker security patterns. The deciding boundary is controlled cross-account access.",
    "keyRule": "Cross-account access for users should usually be implemented with AssumeRole.",
    "docs": [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html",
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Security",
    "q": "An organization wants to make sure member accounts can never disable Amazon GuardDuty, even if an account administrator creates an overly permissive IAM policy locally. Which control should be used?",
    "options": [
      "A permissions boundary on each IAM user",
      "An AWS Organizations service control policy (SCP)",
      "A bucket policy on the GuardDuty service",
      "An EC2 security group"
    ],
    "correct": 1,
    "explanation": "An SCP sets the maximum available permissions for principals in member accounts and is the right organization-wide guardrail when local admins must not be able to bypass the restriction. A permissions boundary is useful within one account, but it does not provide the same organization-level maximum-permission control. The key boundary is org-wide preventive control across accounts.",
    "keyRule": "If the restriction must apply across member accounts regardless of local IAM policies, use an SCP.",
    "docs": [
      "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Security",
    "q": "A platform team delegates IAM role creation to application teams, but it must guarantee that any permissions those teams grant remain inside an approved ceiling. Which IAM feature is designed for that requirement?",
    "options": [
      "Permissions boundaries",
      "Resource-based policies only",
      "AWS WAF web ACLs",
      "Route tables"
    ],
    "correct": 0,
    "explanation": "Permissions boundaries define the maximum permissions an IAM principal can receive, even if identity policies try to grant more. That makes them useful for delegated administration scenarios where teams can create roles but must remain within a preapproved limit. Resource policies and WAF do not solve the same principal permission ceiling problem. The boundary is delegated IAM administration with a hard cap.",
    "keyRule": "Delegated IAM creation with a maximum permission ceiling points to permissions boundaries.",
    "docs": [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Security",
    "q": "A security team wants to identify S3 buckets and KMS keys that are reachable from outside the organization because of resource policies or grants. Which AWS service is purpose-built to analyze that type of external access?",
    "options": [
      "AWS IAM Access Analyzer",
      "Amazon Inspector",
      "AWS Shield Advanced",
      "Amazon Redshift"
    ],
    "correct": 0,
    "explanation": "IAM Access Analyzer evaluates resource policies and related access paths to identify resources that can be accessed from outside a trusted zone such as the organization or account. Inspector focuses on vulnerability findings for compute resources and images, while Shield Advanced is DDoS protection. The deciding boundary is policy-based external access analysis.",
    "keyRule": "To find externally reachable resources from policies, use IAM Access Analyzer.",
    "docs": [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-resources.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Security",
    "q": "A service must encrypt large files before storing them. The team wants to minimize calls to AWS KMS while still protecting each data object with a unique data key. Which AWS KMS pattern is the best fit?",
    "options": [
      "Envelope encryption",
      "A single hard-coded application key",
      "Client-side gzip compression",
      "S3 Transfer Acceleration"
    ],
    "correct": 0,
    "explanation": "Envelope encryption uses KMS-protected data keys so applications can encrypt large amounts of data efficiently while KMS protects the master key material. Hard-coded keys and unrelated transfer features do not solve the same cryptographic design problem. The key boundary is scalable encryption of large data while limiting direct KMS use on every byte.",
    "keyRule": "For efficient large-scale encryption with KMS-protected keys, use envelope encryption.",
    "docs": [
      "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html",
      "https://docs.aws.amazon.com/kms/latest/developerguide/data-keys.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Security",
    "q": "An application stores database credentials in AWS and needs those credentials rotated automatically on a schedule. Which AWS service is the best fit?",
    "options": [
      "AWS Secrets Manager",
      "AWS Systems Manager Parameter Store standard parameters",
      "Amazon S3 Inventory",
      "Amazon Athena"
    ],
    "correct": 0,
    "explanation": "AWS Secrets Manager is designed for storing, retrieving, and rotating secrets such as database credentials. Parameter Store can store values, but automatic secret rotation is a core Secrets Manager capability. S3 Inventory and Athena are unrelated. The answer boundary is secret lifecycle management with rotation.",
    "keyRule": "If the requirement includes managed secret rotation, choose AWS Secrets Manager.",
    "docs": [
      "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html",
      "https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Security",
    "q": "A security baseline requires database credentials to rotate every 30 days, and the compliance team wants proof that the secret is actually configured for periodic rotation. Which AWS service can continuously evaluate that requirement by using managed rules?",
    "options": [
      "AWS Config",
      "Amazon GuardDuty",
      "Amazon Neptune",
      "Amazon Redshift"
    ],
    "correct": 0,
    "explanation": "AWS Config can evaluate resource compliance by using managed or custom rules, including checks related to Secrets Manager rotation settings. GuardDuty is for threat detection, not configuration compliance evaluation. The key boundary is continuous compliance assessment against a security rule.",
    "keyRule": "For compliance evaluation of configuration rules such as secret rotation, use AWS Config.",
    "docs": [
      "https://docs.aws.amazon.com/secretsmanager/latest/userguide/find-secrets-not-rotating.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Security",
    "q": "An operations team needs browser-based access to EC2 instances for troubleshooting. The security team does not want inbound SSH open to the internet or SSH key distribution. Which AWS feature is the best fit?",
    "options": [
      "AWS Systems Manager Session Manager",
      "AWS Client VPN only",
      "Amazon Inspector",
      "Amazon Macie"
    ],
    "correct": 0,
    "explanation": "Systems Manager Session Manager provides shell access to managed instances without opening inbound SSH ports or distributing SSH keys. Client VPN solves network access for users, not instance-session management by itself. Inspector and Macie are unrelated. The answer boundary is administrative session access without SSH exposure.",
    "keyRule": "No inbound SSH and no key distribution for EC2 administration points to Session Manager.",
    "docs": [
      "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Security",
    "q": "A public web application is receiving SQL injection probes and cross-site scripting attempts. The team wants a managed service that can filter these HTTP-layer attacks before they reach the application. Which service should they use?",
    "options": [
      "AWS WAF",
      "AWS Shield Advanced only",
      "Amazon GuardDuty",
      "Amazon Route 53 Resolver"
    ],
    "correct": 0,
    "explanation": "AWS WAF is designed for Layer 7 filtering of web requests and includes protections for attacks such as SQL injection and cross-site scripting. Shield Advanced focuses on broader DDoS protection, not fine-grained web request inspection rules. GuardDuty detects threats but does not sit inline to filter web traffic. The boundary is HTTP request filtering.",
    "keyRule": "SQLi and XSS filtering at the web layer points to AWS WAF.",
    "docs": [
      "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Security",
    "q": "A company wants additional protection and expert support for large-scale DDoS attacks against its internet-facing applications running behind CloudFront and Application Load Balancers. Which AWS service tier is the best fit?",
    "options": [
      "AWS Shield Standard",
      "AWS Shield Advanced",
      "Amazon Inspector",
      "AWS Secrets Manager"
    ],
    "correct": 1,
    "explanation": "AWS Shield Advanced adds additional DDoS protections, visibility, and access to the AWS DDoS Response Team beyond the baseline protections of Shield Standard. Inspector and Secrets Manager solve vulnerability and secret-management problems instead. The key boundary is advanced managed DDoS protection with expert response support.",
    "keyRule": "For enhanced DDoS protection and response support, choose AWS Shield Advanced.",
    "docs": [
      "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-advanced-summary.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Security",
    "q": "A security operations center wants one managed service to aggregate and normalize security findings from multiple AWS security services and partner products in a central place. Which service is the best fit?",
    "options": [
      "AWS Security Hub",
      "AWS Config",
      "Amazon ElastiCache",
      "Amazon Aurora"
    ],
    "correct": 0,
    "explanation": "AWS Security Hub aggregates and normalizes security findings from integrated AWS and partner services so teams can work from a central findings view. AWS Config provides configuration state and compliance tracking, which is different from a findings hub. The deciding boundary is multi-source security finding aggregation.",
    "keyRule": "If you need a central findings hub across AWS security tools, use AWS Security Hub.",
    "docs": [
      "https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Security",
    "q": "A cloud security team wants managed threat detection that analyzes AWS logs and telemetry to identify suspicious behaviors such as credential misuse, unusual API activity, and potential compromise. Which service should it enable?",
    "options": [
      "Amazon GuardDuty",
      "AWS IAM Identity Center",
      "Amazon Neptune",
      "AWS Backup"
    ],
    "correct": 0,
    "explanation": "Amazon GuardDuty is the threat-detection service that analyzes AWS signal sources and generates findings about suspicious activity. IAM Identity Center manages workforce access, Neptune is a graph database, and Backup handles recovery policies. The key boundary is managed threat detection, not identity provisioning or storage protection.",
    "keyRule": "Managed AWS threat detection for suspicious activity points to GuardDuty.",
    "docs": [
      "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Security",
    "q": "A platform team wants a managed service that continuously scans Amazon EC2 instances and container images in Amazon ECR for software vulnerabilities. Which service is the best fit?",
    "options": [
      "Amazon Inspector",
      "Amazon Macie",
      "AWS Organizations",
      "AWS Client VPN"
    ],
    "correct": 0,
    "explanation": "Amazon Inspector is the managed vulnerability management service for workloads such as EC2 instances and container images in ECR. Macie classifies S3 data, Organizations manages accounts, and Client VPN provides remote access. The deciding boundary is vulnerability scanning for compute assets and images.",
    "keyRule": "Vulnerability scanning for EC2 and ECR points to Amazon Inspector.",
    "docs": [
      "https://docs.aws.amazon.com/inspector/latest/user/scanning-resources.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Security",
    "q": "A company wants an authoritative record of who called AWS APIs, when the calls happened, and from which source. Which service should it rely on?",
    "options": [
      "AWS CloudTrail",
      "AWS WAF",
      "Amazon ElastiCache",
      "AWS Snowball Edge"
    ],
    "correct": 0,
    "explanation": "AWS CloudTrail records API activity for governance, auditing, and operational investigation. WAF filters web traffic, ElastiCache is a cache, and Snowball is a transfer appliance. The key boundary is auditable API event history across AWS activity.",
    "keyRule": "Use CloudTrail when the requirement is auditing AWS API activity and account-level event history.",
    "docs": [
      "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Security",
    "q": "An application stores files in Amazon S3 and the compliance team requires the encryption key to be customer controlled, with audit visibility into key usage. Which S3 encryption choice is the best fit?",
    "options": [
      "SSE-S3",
      "SSE-KMS with a customer managed KMS key",
      "Client-side compression",
      "S3 Transfer Acceleration"
    ],
    "correct": 1,
    "explanation": "SSE-KMS with a customer managed KMS key gives the customer control over the key policy and visibility into key usage through AWS services such as CloudTrail. SSE-S3 is still server-side encryption, but it does not give the same KMS key management and auditing model. The boundary is customer-controlled key governance for S3 encryption.",
    "keyRule": "Customer-controlled audit-capable key management for S3 encryption points to SSE-KMS with a customer managed key.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html",
      "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Security",
    "q": "A company with many AWS accounts wants its workforce to sign in through a central access portal and use assigned permission sets instead of maintaining separate IAM users in each account. Which AWS service is the best fit?",
    "options": [
      "AWS IAM Identity Center",
      "AWS Organizations SCPs",
      "Amazon GuardDuty",
      "Amazon Redshift"
    ],
    "correct": 0,
    "explanation": "IAM Identity Center is the workforce access service for centralized sign-in and account/application access using permission sets. SCPs are organization guardrails, not a workforce sign-in portal or assignment model. GuardDuty and Redshift solve unrelated problems. The deciding boundary is centralized workforce access management across accounts.",
    "keyRule": "Central workforce sign-in and account assignments across AWS accounts point to IAM Identity Center.",
    "docs": [
      "https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Security",
    "q": "A customer-facing web and mobile application needs user sign-up, sign-in, and token-based authentication managed by AWS instead of building a custom identity system from scratch. Which service is the best fit?",
    "options": [
      "Amazon Cognito",
      "AWS IAM Identity Center",
      "AWS Organizations",
      "Amazon Inspector"
    ],
    "correct": 0,
    "explanation": "Amazon Cognito is the AWS service for customer identity, authentication flows, and token issuance for applications. IAM Identity Center is geared toward workforce access rather than end-user app identity. Organizations and Inspector are unrelated. The key boundary is customer application authentication, not employee access.",
    "keyRule": "End-user sign-up and sign-in for applications point to Amazon Cognito.",
    "docs": [
      "https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Security",
    "q": "A root account is currently protected only by a strong password. Which additional control is most important to reduce the risk of account takeover?",
    "options": [
      "Enable multi-factor authentication for the root user",
      "Create more IAM users",
      "Add an internet gateway to the management VPC",
      "Deploy Amazon Neptune"
    ],
    "correct": 0,
    "explanation": "Enabling MFA for the root user is a foundational security best practice because the root account has unrestricted authority. Creating more IAM users or unrelated infrastructure changes does not materially address root-account takeover risk. The key boundary is protecting the most privileged identity.",
    "keyRule": "Protect the AWS account root user with MFA and avoid using it for routine administrative tasks.",
    "docs": [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/enable-mfa-for-root.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Security",
    "q": "An API service needs one web-facing control plane action that can decrypt stored values with AWS KMS but must not be allowed to administer keys, rotate key policies, or schedule deletion. What is the right IAM approach?",
    "options": [
      "Grant the service kms:* on all keys",
      "Grant only the specific KMS usage permissions the service needs",
      "Use an SCP to deny every KMS action in the account",
      "Share the root account credentials with the service"
    ],
    "correct": 1,
    "explanation": "Following least privilege means granting only the specific KMS actions required, such as decrypt or generate data key operations, rather than broad administrative permissions. An SCP that denies all KMS actions would break the use case entirely, and root credential sharing is unacceptable. The boundary is operational use of a key without key administration.",
    "keyRule": "KMS consumers should receive only the key-usage actions they need, not administrative wildcards.",
    "docs": [
      "https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html",
      "https://docs.aws.amazon.com/kms/latest/developerguide/least-privilege.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Security",
    "q": "A security engineer wants to know whenever an S3 bucket becomes public because of a configuration change. The team needs continuous evaluation of resource configuration state against a rule. Which service is the best fit?",
    "options": [
      "AWS Config",
      "Amazon GuardDuty",
      "AWS Shield Advanced",
      "Amazon ElastiCache"
    ],
    "correct": 0,
    "explanation": "AWS Config is the service for tracking resource configuration state and evaluating it against rules over time. GuardDuty can produce security findings, including findings related to risky S3 exposure, but it is not the configuration-compliance rule engine requested in the scenario. Shield Advanced and ElastiCache are unrelated to S3 public-access compliance tracking. The boundary is continuous resource configuration evaluation against a rule.",
    "keyRule": "Continuous evaluation of resource configuration against compliance rules means AWS Config.",
    "docs": [
      "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Security",
    "q": "A company uses AWS Organizations and wants to stop member accounts from launching expensive GPU instance families, even if local admins attempt to grant that permission with IAM policies. Which control should be used?",
    "options": [
      "A service control policy",
      "A presigned URL",
      "A route table",
      "An S3 lifecycle rule"
    ],
    "correct": 0,
    "explanation": "An SCP sets the maximum permissions that can be used in member accounts, so it is the correct preventive control when local admins must not be able to override the restriction. The other options are unrelated. The key boundary is an organization-level deny that overrides local IAM attempts to allow an action.",
    "keyRule": "Organization-wide preventive limits on allowed actions belong in SCPs.",
    "docs": [
      "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Security",
    "q": "A company must store API tokens that applications retrieve at runtime. The security architect wants automatic encryption, controlled retrieval permissions, and optional managed rotation. Which AWS service is the best fit?",
    "options": [
      "AWS Secrets Manager",
      "Amazon S3 Batch Operations",
      "Amazon Athena",
      "AWS Snowball Edge"
    ],
    "correct": 0,
    "explanation": "Secrets Manager is designed for storing and retrieving secrets with IAM-controlled access and optional rotation support. The other services solve analytics, bulk object operations, and data transfer. The deciding boundary is secret storage and lifecycle management for runtime credentials.",
    "keyRule": "Runtime secret storage with optional rotation points to AWS Secrets Manager.",
    "docs": [
      "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Security",
    "q": "A cloud team wants a managed service that can show a consolidated view of which security controls and findings are failing across accounts and Regions, rather than checking each AWS security service separately. Which service is the best fit?",
    "options": [
      "AWS Security Hub",
      "AWS KMS",
      "Amazon Neptune",
      "AWS DataSync"
    ],
    "correct": 0,
    "explanation": "AWS Security Hub centralizes and normalizes findings and security posture information from multiple integrated services. AWS KMS is for key management, Neptune is a graph database, and DataSync is a transfer service. The boundary is centralized security posture and findings management.",
    "keyRule": "Centralized cross-service security findings and posture belong in Security Hub.",
    "docs": [
      "https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Security",
    "q": "A company wants a detective control that highlights EC2 instances potentially communicating with known malicious IP addresses and domains. Which AWS service is the best fit?",
    "options": [
      "Amazon GuardDuty",
      "AWS WAF",
      "AWS Organizations",
      "Amazon Redshift"
    ],
    "correct": 0,
    "explanation": "Amazon GuardDuty analyzes AWS telemetry and threat intelligence to generate findings about potentially compromised resources and suspicious communications. WAF is an inline web filter, Organizations manages accounts, and Redshift is a warehouse. The key boundary is managed threat detection for suspicious resource behavior.",
    "keyRule": "Threat findings about suspicious EC2 communication patterns point to GuardDuty.",
    "docs": [
      "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Compute",
    "q": "A team is packaging a stateless API into containers and wants AWS to run the service without managing EC2 worker nodes or patching cluster hosts. Which compute option is the best fit?",
    "options": [
      "Amazon ECS on AWS Fargate",
      "Amazon ECS on self-managed EC2 only",
      "Amazon Neptune",
      "Amazon Redshift"
    ],
    "correct": 0,
    "explanation": "Amazon ECS on AWS Fargate lets the team run containers without managing server fleets. ECS on EC2 requires instance management for the cluster capacity, which is exactly what the team wants to avoid. Neptune and Redshift are unrelated data services. The boundary is managed container execution without host management.",
    "keyRule": "If you want containers without managing servers, use Fargate.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Compute",
    "q": "A platform team wants to run long-lived containerized services with fine-grained control over underlying EC2 instance types, daemon agents, and host-level tuning. Which ECS capacity model best fits?",
    "options": [
      "Amazon ECS on EC2",
      "AWS Lambda",
      "AWS App Runner",
      "Amazon Cognito"
    ],
    "correct": 0,
    "explanation": "Amazon ECS on EC2 is the right model when the team wants control over the underlying instance fleet and host configuration. Fargate and App Runner abstract away that layer, which is not what the team wants here. Lambda is event-driven function compute rather than host-managed container services. The key boundary is host-level control.",
    "keyRule": "If you need host-level control for containers, choose ECS on EC2 rather than Fargate.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Serverless",
    "q": "A small team has source code for a web API and wants the fastest path to deploy it as a managed web service directly from source or container image, with minimal infrastructure decisions. Which AWS service is the best fit?",
    "options": [
      "AWS App Runner",
      "Amazon ECS on EC2",
      "Amazon Neptune",
      "Amazon RDS Proxy"
    ],
    "correct": 0,
    "explanation": "AWS App Runner is purpose-built for quickly deploying web apps and APIs directly from source code or container images with very little infrastructure management. ECS on EC2 requires more operational choices around clusters and capacity. Neptune and RDS Proxy solve unrelated problems. The deciding boundary is simplest managed web-service deployment path.",
    "keyRule": "For the simplest managed deployment of a web app or API from code or image, use App Runner.",
    "docs": [
      "https://docs.aws.amazon.com/apprunner/latest/dg/service-source-code.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Serverless",
    "q": "A company has an event-driven image resize task that runs for a few seconds per request and should incur no charge when idle. The code does not need custom container orchestration. Which compute service is the best fit?",
    "options": [
      "AWS Lambda",
      "Amazon ECS on EC2",
      "Amazon EC2 Auto Scaling group",
      "AWS Direct Connect"
    ],
    "correct": 0,
    "explanation": "AWS Lambda is the natural fit for short-lived event-driven functions that should scale automatically and incur no execution cost when idle. ECS on EC2 and Auto Scaling groups involve always-on infrastructure decisions that are unnecessary for this use case. Direct Connect is networking, not compute. The boundary is short-lived event-driven code with idle-free operations.",
    "keyRule": "Short event-driven code with no idle server management points to Lambda.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-concepts.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Serverless",
    "q": "A latency-sensitive checkout API uses AWS Lambda and occasionally suffers from cold-start outliers during bursts. The team wants pre-initialized environments ready to serve requests immediately. Which Lambda feature should it configure?",
    "options": [
      "Provisioned concurrency",
      "Dead-letter queues",
      "Reserved concurrency only",
      "S3 Transfer Acceleration"
    ],
    "correct": 0,
    "explanation": "Provisioned concurrency keeps Lambda execution environments initialized and ready for low-latency responses, which directly addresses cold-start sensitivity for interactive workloads. Reserved concurrency caps and reserves concurrency but does not pre-initialize environments. The key boundary is pre-initialized execution capacity for latency-sensitive traffic.",
    "keyRule": "If Lambda needs pre-initialized environments for low latency, use provisioned concurrency.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Serverless",
    "q": "A Java-based AWS Lambda function has heavy initialization code and the team wants to reduce startup latency on published versions without keeping execution environments permanently pre-warmed. Which feature is the best fit?",
    "options": [
      "Lambda SnapStart",
      "Lambda destinations",
      "RDS Proxy",
      "AWS Batch"
    ],
    "correct": 0,
    "explanation": "Lambda SnapStart reduces startup latency by snapshotting the initialized execution environment for published versions, which is especially useful for runtimes with expensive initialization. RDS Proxy addresses database connections, while Batch is for batch computing. The deciding boundary is initialization-latency reduction for published Lambda versions.",
    "keyRule": "Heavy Lambda initialization on supported runtimes points to SnapStart.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/snapstart-activate.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Serverless",
    "q": "A workflow coordinates several AWS Lambda functions, includes branching logic, retries, and waits between steps, and the team wants the orchestration state managed by AWS. Which service is the best fit?",
    "options": [
      "AWS Step Functions",
      "Amazon SQS only",
      "Amazon EBS Multi-Attach",
      "Amazon FSx for Lustre"
    ],
    "correct": 0,
    "explanation": "AWS Step Functions is the orchestration service for stateful workflows with branching, retries, waits, and service integrations. SQS is messaging, but it does not provide the same visual state-machine execution model. The other services are storage products. The key boundary is managed workflow orchestration with state.",
    "keyRule": "Stateful orchestration across steps points to Step Functions.",
    "docs": [
      "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-workflows.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Compute",
    "q": "A genomics research group submits large queues of containerized simulation jobs that can run for hours. They want a managed service built for queueing, scheduling, and scaling batch compute resources. Which service is the best fit?",
    "options": [
      "AWS Batch",
      "Amazon ECS service with a fixed desired task count",
      "Amazon EventBridge Scheduler launching individual container tasks",
      "Amazon SQS with an Auto Scaling group of self-managed EC2 workers"
    ],
    "correct": 0,
    "explanation": "AWS Batch is the managed batch-computing service for queued compute-intensive jobs and can provision the right underlying compute resources automatically. An ECS service with fixed desired count is better for continuously running services than queued batch jobs, EventBridge Scheduler is time-based scheduling rather than batch queue management, and SQS with self-managed EC2 workers adds custom fleet operations. The boundary is managed scheduled batch computing rather than request-driven service hosting or custom worker fleets.",
    "keyRule": "Queued compute-intensive batch workloads point to AWS Batch.",
    "docs": [
      "https://docs.aws.amazon.com/batch/latest/userguide/job_queues.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Compute",
    "q": "A web application can tolerate interruptions because its instances are stateless and backed by an Auto Scaling group. The team wants to lower EC2 cost aggressively. Which purchasing option is the best fit for the interruptible portion of the fleet?",
    "options": [
      "Spot Instances",
      "Dedicated Hosts",
      "On-Demand Capacity Reservations",
      "A 1-year partial upfront RI only"
    ],
    "correct": 0,
    "explanation": "Spot Instances are ideal for fault-tolerant, interruptible workloads that can handle capacity reclamation. Dedicated Hosts and Capacity Reservations are about isolation or guaranteed capacity rather than lowest-cost interruptible execution. The key boundary is tolerance for interruption in exchange for lower price.",
    "keyRule": "Interruptible and fault-tolerant EC2 capacity points to Spot.",
    "docs": [
      "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html",
      "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-best-practices.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Compute",
    "q": "A company runs a steady baseline of Amazon EC2, AWS Fargate, and AWS Lambda usage, and it wants one savings commitment model that can apply across all three. Which purchasing option is the best fit?",
    "options": [
      "Compute Savings Plans",
      "Standard Reserved Instances for one EC2 family",
      "Spot Instances",
      "Dedicated Hosts"
    ],
    "correct": 0,
    "explanation": "Compute Savings Plans are the flexible commitment model that can apply across eligible EC2, Fargate, and Lambda usage. Standard EC2 reservations are narrower and do not cover all three service types. Spot and Dedicated Hosts are different purchasing models with different goals. The deciding boundary is cross-service compute savings flexibility.",
    "keyRule": "If the savings commitment must span EC2, Fargate, and Lambda, choose Compute Savings Plans.",
    "docs": [
      "https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html",
      "https://docs.aws.amazon.com/cost-management/latest/userguide/manage-sp.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Compute",
    "q": "A team runs variable EC2 web traffic and wants one Auto Scaling group that can combine On-Demand and Spot capacity with multiple instance types for better availability and cost optimization. Which design is the best fit?",
    "options": [
      "A mixed instances Auto Scaling group",
      "One fixed single-instance-type On-Demand group only",
      "An S3 lifecycle rule",
      "A DynamoDB global table"
    ],
    "correct": 0,
    "explanation": "A mixed instances Auto Scaling group is specifically designed to combine multiple instance types and purchase options such as On-Demand and Spot in one scaling group. The other options do not address fleet-level compute capacity diversification. The key boundary is cost-aware resilient scaling across instance types and purchase models.",
    "keyRule": "If one ASG should mix Spot and On-Demand across instance types, use a mixed instances policy.",
    "docs": [
      "https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-mixed-instances-groups.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Compute",
    "q": "A development team wants the simplest path to deploy a conventional web application written in a supported language while still letting AWS provision instances, load balancing, health checks, and scaling. Which service is the best fit?",
    "options": [
      "AWS Elastic Beanstalk",
      "Amazon ECS on EC2 only",
      "Amazon Neptune",
      "AWS Snowball Edge"
    ],
    "correct": 0,
    "explanation": "Elastic Beanstalk is the managed application platform for supported web application stacks and abstracts much of the infrastructure provisioning and scaling work. ECS on EC2 is more container-centric and operationally involved. Neptune and Snowball solve unrelated problems. The deciding boundary is rapid deployment of a traditional web app with managed infrastructure automation.",
    "keyRule": "Supported web apps with minimal platform management point to Elastic Beanstalk.",
    "docs": [
      "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Compute",
    "q": "A microservice runs in containers and the team wants to expose it publicly with a managed load balancer while each task has its own elastic network interface and isolation boundary. Which container launch model best fits?",
    "options": [
      "Amazon ECS with AWS Fargate",
      "Amazon EC2 Spot Fleet without containers",
      "AWS Lambda function URLs only",
      "Amazon DocumentDB"
    ],
    "correct": 0,
    "explanation": "AWS Fargate tasks in ECS provide task-level isolation and own ENIs, making them a strong fit for managed containerized microservices behind a load balancer. Spot Fleet without containers is not the same application model, and Lambda function URLs do not solve the same container-service requirement. The key boundary is managed container service isolation.",
    "keyRule": "Managed isolated ECS tasks without server management point to Fargate.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Serverless",
    "q": "A Lambda function processes messages from Amazon SQS. Some messages in a batch may fail while others succeed, and the team wants to avoid retrying messages that already completed successfully. What design principle is most important here?",
    "options": [
      "Implement partial batch response handling",
      "Move the queue to Amazon S3",
      "Use Amazon Neptune for retries",
      "Enable S3 Transfer Acceleration"
    ],
    "correct": 0,
    "explanation": "When Lambda processes SQS batches, partial batch response handling lets the function report only failed records so successfully processed messages are not retried unnecessarily. The other options are unrelated. The key boundary is correct per-record retry behavior inside batched queue processing.",
    "keyRule": "Lambda with SQS should use partial batch response logic when some records can succeed and others fail.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Compute",
    "q": "An internal service runs continuously all year on a fixed EC2 instance family in one Region, and the team does not expect to change that footprint. Which pricing model generally provides the deepest discount among flexible long-term options for that narrow EC2 commitment?",
    "options": [
      "EC2 Instance Savings Plans",
      "On-Demand only",
      "Spot Instances for the entire mandatory baseline",
      "AWS Direct Connect"
    ],
    "correct": 0,
    "explanation": "EC2 Instance Savings Plans are optimized for savings within a chosen EC2 instance family in a Region and are less flexible than Compute Savings Plans, which is part of why they can provide deeper savings for that narrower commitment. Spot is not appropriate for a mandatory always-on baseline. The answer boundary is fixed EC2 family commitment rather than broad compute portability.",
    "keyRule": "If the workload is fixed to one EC2 family and Region, EC2 Instance Savings Plans are the narrower high-savings fit.",
    "docs": [
      "https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html",
      "https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-ris.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Compute",
    "q": "A data-processing platform needs containers with GPU access and custom AMIs. The team also wants to keep using the Amazon ECS control plane. Which compute option is the best fit?",
    "options": [
      "Amazon ECS on EC2",
      "AWS Fargate",
      "AWS App Runner",
      "AWS Lambda"
    ],
    "correct": 0,
    "explanation": "ECS on EC2 is the right fit when workloads need host-level capabilities such as custom AMIs or specialized instance types including GPU-backed instances. Fargate deliberately abstracts away host management and is not the answer for every host-specific requirement. App Runner and Lambda are even higher-level abstractions. The key boundary is host-specific container requirements.",
    "keyRule": "If the container workload needs custom AMIs or GPUs, prefer ECS on EC2 over Fargate.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Serverless",
    "q": "A workflow has to coordinate manual approvals, long-running waits, and multiple service calls, and the team needs an auditable execution history. Which Step Functions workflow type characteristic is the best fit?",
    "options": [
      "Standard workflow for long-running auditable orchestration",
      "Use only EventBridge schedule rules",
      "An EBS volume for workflow history",
      "A NAT gateway with health checks"
    ],
    "correct": 0,
    "explanation": "Step Functions Standard workflows are intended for long-running, auditable orchestrations with execution history and visual debugging. EventBridge schedules can trigger jobs, but they do not replace stateful workflow execution. The other options are unrelated. The boundary is long-running orchestrated process control with auditability.",
    "keyRule": "Long-running, auditable orchestration points to Step Functions Standard workflows.",
    "docs": [
      "https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Compute",
    "q": "A team needs to deploy a containerized API from an existing container image and wants automatic build/deploy integration and fully managed operations, but does not need Kubernetes-level control. Which service is the best fit?",
    "options": [
      "AWS App Runner",
      "Amazon EKS on EC2",
      "Amazon FSx for Lustre",
      "Amazon Neptune"
    ],
    "correct": 0,
    "explanation": "App Runner is specifically intended to deploy and run containerized web applications and APIs directly from source code or container images with minimal operational burden. EKS gives far more control and complexity than the scenario needs. The other services are unrelated. The answer boundary is fully managed containerized web service deployment.",
    "keyRule": "Containerized web apps from code or image with minimal ops point to App Runner.",
    "docs": [
      "https://docs.aws.amazon.com/apprunner/latest/dg/service-source-image.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Compute",
    "q": "A company wants to run asynchronous worker code from an Amazon SQS queue in a Beanstalk-managed environment instead of exposing a public web tier. Which Elastic Beanstalk environment type best fits?",
    "options": [
      "Worker environment",
      "Web server environment only",
      "Single EBS volume",
      "Transit Gateway attachment"
    ],
    "correct": 0,
    "explanation": "Elastic Beanstalk worker environments are specifically designed to process messages from an Amazon SQS queue. A web server environment is for HTTP-facing application tiers. The other options are unrelated infrastructure constructs. The key boundary is queue-driven background processing in Beanstalk.",
    "keyRule": "Queue-driven background work in Beanstalk points to a worker environment.",
    "docs": [
      "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-tiers.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Compute",
    "q": "A company needs the absolute simplest way to run a small request-driven function with no container packaging and no server fleet to manage. Which service is the best fit?",
    "options": [
      "AWS Lambda",
      "AWS App Runner service",
      "Amazon ECS task on AWS Fargate behind an Application Load Balancer",
      "AWS Step Functions Standard workflow"
    ],
    "correct": 0,
    "explanation": "Lambda is the simplest request-driven compute service for code functions when the team does not want to package and operate containers or servers. App Runner and ECS on Fargate are better fits for containerized web services, and Step Functions orchestrates workflows rather than running a single code function by itself. The key boundary is minimal operational overhead for direct function execution.",
    "keyRule": "If you just need serverless code execution, choose Lambda.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-concepts.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Compute",
    "q": "A mixed EC2 fleet has a fixed 24/7 baseline that cannot be interrupted and an elastic overflow tier that is fault tolerant. Which purchasing model combination is the most appropriate?",
    "options": [
      "Savings Plans or reserved-style commitment for the baseline plus Spot for the elastic tier",
      "Spot for both baseline and overflow",
      "On-Demand only for every instance",
      "Dedicated Hosts for the overflow tier only"
    ],
    "correct": 0,
    "explanation": "A steady mandatory baseline is a good candidate for committed pricing such as Savings Plans or reserved-style savings, while the interruptible overflow tier is a good candidate for Spot. Using Spot for the mandatory baseline creates availability risk, and On-Demand only misses a clear cost-optimization opportunity. The key boundary is separating noninterruptible baseline from flexible burst capacity.",
    "keyRule": "Use committed pricing for the baseline and Spot for fault-tolerant overflow.",
    "docs": [
      "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html",
      "https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-ris.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Compute",
    "q": "A team wants a container platform with full Kubernetes APIs and ecosystem compatibility, but it does not want to self-manage the Kubernetes control plane. Which AWS service is the best fit?",
    "options": [
      "Amazon EKS",
      "Amazon ECS",
      "AWS Lambda",
      "AWS App Runner"
    ],
    "correct": 0,
    "explanation": "Amazon EKS provides managed Kubernetes control plane capability for teams that need Kubernetes APIs and compatibility. ECS and App Runner are container services but are not Kubernetes control planes. Lambda is event-driven function compute. The deciding boundary is managed Kubernetes, not just managed containers.",
    "keyRule": "If the requirement is Kubernetes compatibility, choose Amazon EKS.",
    "docs": [
      "https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-concepts.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Compute",
    "q": "An EKS platform team wants to run selected pods without managing node groups, while still using Kubernetes scheduling semantics in the cluster. Which option is the best fit?",
    "options": [
      "Run those pods on AWS Fargate for Amazon EKS",
      "Use Karpenter to provision EC2 nodes for those pods",
      "Use an EKS managed node group with Cluster Autoscaler",
      "Run the workload as standalone AWS Batch jobs outside the cluster"
    ],
    "correct": 0,
    "explanation": "AWS Fargate for Amazon EKS lets selected pods run without self-managed nodes while remaining part of the EKS cluster model. Karpenter and managed node groups can automate or simplify EC2 node capacity, but the pods still run on nodes. AWS Batch moves the workload outside normal Kubernetes pod scheduling. The key boundary is node-less pod execution inside EKS.",
    "keyRule": "Selected Kubernetes pods without node management point to Fargate for EKS.",
    "docs": [
      "https://docs.aws.amazon.com/eks/latest/userguide/fargate.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Serverless",
    "q": "A product team wants to publish a simple HTTPS endpoint backed by Lambda but does not need the full feature set of Amazon API Gateway for this specific use case. Which feature could satisfy that direct invocation pattern?",
    "options": [
      "Lambda function URL",
      "An EBS snapshot",
      "AWS Snowball Edge",
      "Amazon FSx for ONTAP"
    ],
    "correct": 0,
    "explanation": "A Lambda function URL provides a direct HTTPS endpoint to invoke a Lambda function and is suitable when the use case does not require the broader feature set of API Gateway. The other options are unrelated storage and transfer features. The key boundary is a simple direct HTTPS endpoint for a Lambda function.",
    "keyRule": "For a simple direct HTTPS endpoint to a Lambda function, a function URL can fit.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Compute",
    "q": "A company needs to expose an HTTP service running on multiple ECS tasks and wants traffic sent only to healthy tasks based on application-level health probes. Which component should it use?",
    "options": [
      "Application Load Balancer target group health checks",
      "A DynamoDB global table",
      "A KMS key policy",
      "An S3 lifecycle rule"
    ],
    "correct": 0,
    "explanation": "An Application Load Balancer uses target groups and health checks to route requests only to healthy registered targets. The other options do not provide HTTP traffic distribution or application health awareness. The boundary is application-level request routing to healthy service tasks.",
    "keyRule": "HTTP routing only to healthy service targets points to an ALB target group with health checks.",
    "docs": [
      "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Decoupling",
    "q": "An order platform publishes one event when a purchase completes. The billing, loyalty, and fraud services must all receive the event, but each service only cares about a subset of order types. Which design is the best fit?",
    "options": [
      "Amazon SNS topic with subscription filter policies",
      "Single Amazon SQS queue shared by all consumers",
      "One NAT gateway per consumer",
      "Amazon EBS Multi-Attach"
    ],
    "correct": 0,
    "explanation": "Amazon SNS provides fan-out to multiple subscribers, and subscription filter policies let each downstream consumer receive only the events it needs. A single shared SQS queue would distribute messages among consumers instead of sending each message to all of them. The key boundary is one-to-many delivery with per-subscriber filtering.",
    "keyRule": "One event to many consumers with per-subscriber filtering points to SNS with filter policies.",
    "docs": [
      "https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html",
      "https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Decoupling",
    "q": "A payment workflow must preserve the exact order of updates for each transaction and must avoid introducing duplicate queue entries when producers retry sends. Which Amazon SQS queue type is the best fit?",
    "options": [
      "Standard queue",
      "FIFO queue",
      "Dead-letter queue",
      "Delay queue only"
    ],
    "correct": 1,
    "explanation": "An SQS FIFO queue is designed for ordered processing with deduplication capabilities, which fits transaction-by-transaction ordering requirements. Standard queues prioritize scale and best-effort ordering instead. A dead-letter queue is a failure-handling pattern, not the primary queue type for ordered processing. The boundary is ordered, deduplicated messaging.",
    "keyRule": "If message order and deduplication matter, choose SQS FIFO.",
    "docs": [
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-exactly-once-processing.html",
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Decoupling",
    "q": "A worker occasionally needs several minutes to process a message from Amazon SQS. The same message sometimes becomes visible again before processing finishes, causing another worker to start it. Which queue setting should be adjusted first?",
    "options": [
      "Visibility timeout",
      "Message retention period",
      "Delay seconds",
      "Long polling wait time"
    ],
    "correct": 0,
    "explanation": "The visibility timeout controls how long a received message stays hidden from other consumers while it is being processed. If it is too short, another worker can receive the same message before the first one finishes. Retention, delay, and long polling settings solve different queue behaviors. The boundary is duplicate concurrent processing due to early re-visibility.",
    "keyRule": "If SQS messages reappear before processing completes, increase visibility timeout.",
    "docs": [
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Decoupling",
    "q": "A queue-based processing system has occasional poison messages that repeatedly fail and block clean throughput. The team wants those bad messages isolated automatically after repeated receive attempts. Which SQS feature should be configured?",
    "options": [
      "Dead-letter queue",
      "Long polling",
      "Message timer",
      "SNS filter policy"
    ],
    "correct": 0,
    "explanation": "A dead-letter queue captures messages that repeatedly fail processing so the main queue can continue moving healthy work. Long polling reduces empty receives but does not isolate poison messages. Message timers delay delivery rather than separating failures. The key boundary is isolating repeatedly failing messages.",
    "keyRule": "To isolate repeatedly failing SQS messages, use a dead-letter queue.",
    "docs": [
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Decoupling",
    "q": "A fleet of pollers checks an Amazon SQS queue and often receives empty responses, driving up API call volume and cost. Which SQS feature should the team enable?",
    "options": [
      "Long polling",
      "A FIFO queue",
      "A Route 53 health check",
      "An SCP"
    ],
    "correct": 0,
    "explanation": "Long polling lets SQS wait briefly for messages before returning a response, which reduces empty responses and unnecessary polling cost. FIFO changes ordering semantics, not polling efficiency. The other options are unrelated. The key boundary is reducing empty receives from SQS consumers.",
    "keyRule": "If SQS polling is producing many empty receives, enable long polling.",
    "docs": [
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Decoupling",
    "q": "A telemetry platform ingests ordered events and must let several independent applications read the same stream at the same time with low latency. Which service is the best fit?",
    "options": [
      "Amazon Kinesis Data Streams",
      "Amazon SQS standard queue",
      "Amazon SNS topic only",
      "AWS Storage Gateway File Gateway"
    ],
    "correct": 0,
    "explanation": "Kinesis Data Streams is designed for ordered streaming data with multiple consumers reading the same shard data. An SQS queue distributes messages to consumers rather than letting all of them independently read the same stream. SNS is pub/sub but not the same replayable ordered stream model. The boundary is shared low-latency stream consumption.",
    "keyRule": "If multiple consumers must independently read the same ordered stream, choose Kinesis Data Streams.",
    "docs": [
      "https://docs.aws.amazon.com/streams/latest/dev/enhanced-consumers.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Decoupling",
    "q": "A security team wants to route AWS service events to multiple targets by matching event patterns, without building custom polling code or point-to-point integrations. Which AWS service is the best fit?",
    "options": [
      "Amazon EventBridge",
      "Amazon SQS FIFO",
      "Amazon EBS",
      "Amazon FSx for Lustre"
    ],
    "correct": 0,
    "explanation": "EventBridge is the event routing service for matching events against patterns and sending them to one or more targets. SQS is a queue, but it does not provide native event-pattern routing across producers and targets. The storage services are unrelated. The deciding boundary is event-pattern-based routing.",
    "keyRule": "Pattern-based routing of AWS events to targets points to EventBridge.",
    "docs": [
      "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html",
      "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Decoupling",
    "q": "Two internal services are tightly coupled through synchronous HTTP calls. The team wants the producer to hand work off quickly while the consumer processes at its own pace, even during consumer slowdowns. Which AWS service is the simplest decoupling fit?",
    "options": [
      "Amazon SQS",
      "Amazon Route 53 latency routing",
      "AWS WAF",
      "AWS KMS"
    ],
    "correct": 0,
    "explanation": "Amazon SQS decouples producers from consumers by buffering work in a queue so the producer does not depend on the consumer’s immediate availability. Route 53, WAF, and KMS do not provide asynchronous workload buffering. The key boundary is simple asynchronous decoupling with backpressure tolerance.",
    "keyRule": "If one service should hand work off asynchronously and let another process later, use SQS.",
    "docs": [
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-queue-types.html"
    ]
  },
  {
    "exam": 2,
    "topic": "High Availability & Resilience",
    "q": "A company runs a primary application endpoint and wants DNS to fail over to a standby endpoint only when the primary becomes unhealthy. Which Route 53 routing policy is the best fit?",
    "options": [
      "Failover routing",
      "Simple routing",
      "Geolocation routing",
      "Multivalue answer routing only"
    ],
    "correct": 0,
    "explanation": "Route 53 failover routing is the policy designed for active-passive behavior with primary and secondary records. Simple routing does not incorporate health-based primary/standby logic. The boundary is explicit active-passive DNS failover.",
    "keyRule": "Primary/secondary DNS failover in Route 53 means failover routing.",
    "docs": [
      "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html",
      "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html"
    ]
  },
  {
    "exam": 2,
    "topic": "High Availability & Resilience",
    "q": "A global SaaS application has healthy endpoints in multiple Regions and wants DNS responses to direct users to the Region with the lowest network latency. Which Route 53 routing policy is the best fit?",
    "options": [
      "Latency routing",
      "Failover routing",
      "Simple routing",
      "IP-based routing"
    ],
    "correct": 0,
    "explanation": "Route 53 latency routing is designed to send users to the AWS Region that provides the lowest measured latency. Failover routing is for primary/secondary recovery, not active latency optimization. The key boundary is latency-based global distribution.",
    "keyRule": "If global users should go to the lowest-latency Region, use Route 53 latency routing.",
    "docs": [
      "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html",
      "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html"
    ]
  },
  {
    "exam": 3,
    "topic": "High Availability & Resilience",
    "q": "A gaming platform needs fixed anycast IP addresses for client allowlists and wants fast traffic redirection to the nearest healthy regional endpoint during outages. Which AWS service is the best fit?",
    "options": [
      "AWS Global Accelerator",
      "Amazon Route 53 failover routing only",
      "Amazon SQS",
      "AWS Secrets Manager"
    ],
    "correct": 0,
    "explanation": "AWS Global Accelerator provides static anycast IP addresses and routes traffic over the AWS global network to healthy endpoints, making it a strong fit for low-latency failover with fixed client-facing IPs. Route 53 is DNS-based and does not provide the same static anycast IP model. The boundary is fixed global entry points with health-aware routing.",
    "keyRule": "Static global anycast IPs with fast regional failover point to AWS Global Accelerator.",
    "docs": [
      "https://docs.aws.amazon.com/global-accelerator/latest/dg/about-accelerators.html"
    ]
  },
  {
    "exam": 3,
    "topic": "High Availability & Resilience",
    "q": "A public web tier runs on EC2 and must remain available if one Availability Zone fails. The team wants requests distributed across instances in multiple AZs and unhealthy instances replaced automatically. Which design is the best fit?",
    "options": [
      "Application Load Balancer with an Auto Scaling group spanning multiple AZs",
      "One EC2 instance with a larger EBS volume",
      "A single NAT gateway in one AZ",
      "Amazon Athena with S3"
    ],
    "correct": 0,
    "explanation": "An ALB distributes traffic across healthy targets, and an Auto Scaling group spanning multiple Availability Zones can replace unhealthy instances and preserve capacity during an AZ failure. A single instance and unrelated services do not meet the resilience requirement. The key boundary is multi-AZ web-tier resilience with automated replacement.",
    "keyRule": "Multi-AZ web resilience on EC2 points to ALB plus Auto Scaling across AZs.",
    "docs": [
      "https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-health-checks.html"
    ]
  },
  {
    "exam": 3,
    "topic": "High Availability & Resilience",
    "q": "An EC2 Auto Scaling group is behind an Application Load Balancer. The team wants instances replaced automatically when they stop passing application health checks even if the EC2 system status is still healthy. What should be enabled?",
    "options": [
      "Elastic Load Balancing health checks for the Auto Scaling group",
      "A dead-letter queue",
      "S3 versioning",
      "DynamoDB PITR"
    ],
    "correct": 0,
    "explanation": "By enabling ELB health checks for the Auto Scaling group, Auto Scaling can consider application-level target health from the load balancer when deciding to replace instances. EC2 status checks alone do not capture every app-level failure. The other options are unrelated. The key boundary is application-aware instance replacement.",
    "keyRule": "If Auto Scaling should replace instances based on load balancer health, enable ELB health checks.",
    "docs": [
      "https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-add-elb-healthcheck.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Architecture",
    "q": "A microservices platform wants producers to emit internal business events once and let multiple downstream teams add consumers later without changing the producer code each time. Which integration style is the best fit?",
    "options": [
      "Event-driven architecture with EventBridge",
      "Direct point-to-point HTTP calls for each consumer",
      "A shared root account access key",
      "One monolithic relational database"
    ],
    "correct": 0,
    "explanation": "An event-driven architecture using EventBridge decouples producers from consumers so new downstream targets can be added with routing rules instead of modifying the producer for every new subscriber. Direct point-to-point calls create tight coupling. The key boundary is extensible internal event routing.",
    "keyRule": "If producers should stay unaware of future consumers, use an event-driven routing model.",
    "docs": [
      "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Decoupling",
    "q": "A trading workflow requires ordered fan-out of messages to multiple downstream systems, and all subscribers must preserve ordering for a given message group. Which messaging combination is the best fit?",
    "options": [
      "SNS FIFO topic with SQS FIFO subscriptions",
      "SNS standard topic with SQS standard queues",
      "One shared standard SQS queue",
      "AWS Batch"
    ],
    "correct": 0,
    "explanation": "SNS FIFO with SQS FIFO subscribers preserves ordering and supports fan-out for workloads that need ordered delivery semantics across subscribers. Standard SNS/SQS does not provide the same ordering guarantees. The boundary is ordered pub/sub fan-out.",
    "keyRule": "Ordered fan-out to multiple subscribers points to SNS FIFO with SQS FIFO subscriptions.",
    "docs": [
      "https://docs.aws.amazon.com/sns/latest/dg/fifo-topic-message-ordering.html",
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Compute",
    "q": "An Auto Scaling group of workers consumes messages from an SQS queue. The team wants scaling to reflect how much unprocessed work is waiting. Which metric is the most direct input?",
    "options": [
      "ApproximateNumberOfMessagesVisible",
      "CPU utilization of one worker",
      "ALB target response time",
      "EBS burst balance"
    ],
    "correct": 0,
    "explanation": "ApproximateNumberOfMessagesVisible is the SQS metric that most directly represents visible backlog waiting to be processed. CPU can still matter, but it is not the direct signal of queue depth. The key boundary is backlog-based worker scaling.",
    "keyRule": "Queue-worker scaling should use SQS backlog metrics such as ApproximateNumberOfMessagesVisible.",
    "docs": [
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-available-cloudwatch-metrics.html",
      "https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Decoupling",
    "q": "A team needs exactly one consumer group to process each message, but also wants to allow the consumer fleet to scale horizontally without producers being aware of worker count. Which service is the best fit?",
    "options": [
      "Amazon SQS",
      "Amazon SNS topic",
      "AWS Global Accelerator",
      "Route 53 latency routing"
    ],
    "correct": 0,
    "explanation": "Amazon SQS gives one-consumer-group queue semantics while allowing many workers to poll the queue horizontally. SNS is fan-out pub/sub where all subscribers receive the message. The key boundary is one logical work queue with scalable consumers.",
    "keyRule": "If each message should be processed by one consumer fleet, use SQS rather than SNS fan-out.",
    "docs": [
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-queue-types.html"
    ]
  },
  {
    "exam": 4,
    "topic": "High Availability & Resilience",
    "q": "A company wants Route 53 to stop returning a record when the endpoint is unhealthy, but all healthy records of the same name should continue serving traffic. Which failover style is this closest to?",
    "options": [
      "Active-active using health checks",
      "Active-passive with one primary only",
      "No health checks at all",
      "A dead-letter queue pattern"
    ],
    "correct": 0,
    "explanation": "Route 53 active-active behavior with health checks lets multiple healthy records serve traffic and removes unhealthy ones from responses. Active-passive is the primary/secondary standby model instead. The key boundary is all healthy endpoints being active rather than one designated standby pair.",
    "keyRule": "Multiple healthy DNS endpoints serving together with health checks is active-active failover.",
    "docs": [
      "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Architecture",
    "q": "A globally distributed application needs a content delivery layer that caches static content near users and can reduce origin load during traffic spikes. Which AWS service is the best fit?",
    "options": [
      "Amazon CloudFront",
      "Amazon SQS",
      "AWS Batch",
      "AWS KMS"
    ],
    "correct": 0,
    "explanation": "Amazon CloudFront caches content at edge locations close to users, reducing origin load and improving latency for static or cacheable content. SQS, Batch, and KMS solve messaging, batch compute, and key management problems. The boundary is edge caching and content delivery.",
    "keyRule": "Global edge caching and origin offload point to CloudFront.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Networking",
    "q": "A company needs a load balancer for a TCP-based service and the clients must be able to allowlist static IP addresses exposed by the service entry point. Which Elastic Load Balancing option is the best fit?",
    "options": [
      "Network Load Balancer",
      "Application Load Balancer",
      "Gateway Load Balancer",
      "Classic Load Balancer for path routing"
    ],
    "correct": 0,
    "explanation": "A Network Load Balancer is the Layer 4 load balancer option and provides static IP addresses, which makes it suitable when clients need allowlisting and the protocol is TCP or UDP. An Application Load Balancer focuses on HTTP/HTTPS and does not expose the same static IP model. The key boundary is Layer 4 traffic with static IP requirements.",
    "keyRule": "TCP/UDP services needing static IPs point to a Network Load Balancer.",
    "docs": [
      "https://docs.aws.amazon.com/elasticloadbalancing/latest/network/network-load-balancers.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Architecture",
    "q": "A company has several HTTP microservices and wants one entry point that can route requests based on hostnames and URL paths to different backends. Which load balancer is the best fit?",
    "options": [
      "Application Load Balancer",
      "Network Load Balancer",
      "A single NAT gateway",
      "Amazon SQS FIFO"
    ],
    "correct": 0,
    "explanation": "An Application Load Balancer is the right choice for HTTP/HTTPS traffic that needs host-based or path-based routing across multiple services. A Network Load Balancer is Layer 4 and does not provide the same application-layer routing logic. The key boundary is content-aware web routing.",
    "keyRule": "Host- and path-based HTTP routing points to an Application Load Balancer.",
    "docs": [
      "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-rules.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Decoupling",
    "q": "An analytics pipeline needs a replayable ordered event stream so several applications can process the same data independently at different speeds. Which service is a better fit than SQS?",
    "options": [
      "Amazon Kinesis Data Streams",
      "Amazon SQS standard queue",
      "AWS WAF",
      "AWS Secrets Manager"
    ],
    "correct": 0,
    "explanation": "Kinesis Data Streams is built for replayable streaming consumption with multiple applications reading the same shard data independently. SQS is a queue that distributes messages for processing rather than a shared ordered stream. The key boundary is replayable shared streaming.",
    "keyRule": "Replayable ordered stream consumption by multiple apps points to Kinesis Data Streams.",
    "docs": [
      "https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Decoupling",
    "q": "A producer should publish an event once and then forget about it, while downstream systems can subscribe or unsubscribe over time without any producer-side reconfiguration. Which service is the best fit?",
    "options": [
      "Amazon SNS topic",
      "One shared SQS queue",
      "AWS Global Accelerator",
      "Amazon EBS volume"
    ],
    "correct": 0,
    "explanation": "An SNS topic is the right pub/sub abstraction when producers should remain unaware of which consumers currently subscribe. A shared SQS queue is one work queue, not a decoupled subscription model for multiple independent consumers. The key boundary is producer-blind publish/subscribe.",
    "keyRule": "If publishers should not know or manage subscribers, use SNS.",
    "docs": [
      "https://docs.aws.amazon.com/sns/latest/dg/sns-sqs-as-subscriber.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Decoupling",
    "q": "A company wants failed messages from an SQS source queue to move automatically into a separate queue only after a configurable number of receive attempts. Which setting controls that threshold?",
    "options": [
      "maxReceiveCount in the redrive policy",
      "Visibility timeout",
      "Message retention period",
      "Delivery delay"
    ],
    "correct": 0,
    "explanation": "The redrive policy uses maxReceiveCount to determine how many times a message can be received before SQS moves it to the dead-letter queue. Visibility timeout and retention period affect different behaviors. The key boundary is the failure-count threshold for DLQ movement.",
    "keyRule": "The DLQ move threshold in SQS is controlled by maxReceiveCount.",
    "docs": [
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html",
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue.html"
    ]
  },
  {
    "exam": 5,
    "topic": "High Availability & Resilience",
    "q": "A company uses Route 53 health checks with failover records. The team wants to understand what happens if every endpoint in a failover set is considered unhealthy. Which statement is the most accurate?",
    "options": [
      "Route 53 can still return records as a last-resort behavior instead of returning no answer",
      "Route 53 permanently deletes the records",
      "Route 53 converts the records into latency routing automatically",
      "The hosted zone becomes read-only"
    ],
    "correct": 0,
    "explanation": "Route 53 includes protective logic to avoid making some failover situations worse and can treat all records as healthy as a last-resort behavior rather than returning no answer at all. The other options are not how Route 53 failover works. The key boundary is DNS behavior during total-health-check failure scenarios.",
    "keyRule": "If all failover endpoints are unhealthy, Route 53 can still return records as a last resort.",
    "docs": [
      "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-problems.html",
      "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Security",
    "q": "A software company stores release packages in an Amazon S3 bucket and wants customers to download them through Amazon CloudFront. The bucket must not be directly reachable from the internet, and the team wants the AWS-recommended approach for new designs. Which option is the best fit?",
    "options": [
      "Use a CloudFront distribution with origin access control (OAC) for the S3 origin",
      "Make the bucket public and rely on CloudFront caching for scale",
      "Use an origin access identity (OAI) because it is the preferred modern method",
      "Place the files on an EC2 instance behind an Application Load Balancer"
    ],
    "correct": 0,
    "explanation": "Origin access control is the current AWS-recommended way to restrict access to an S3 origin behind CloudFront. It lets CloudFront send authenticated requests to S3 while keeping the bucket from being directly exposed. Making the bucket public defeats the requirement, and OAI is the legacy approach that AWS no longer recommends for new designs.",
    "keyRule": "For private S3 content behind CloudFront, use OAC as the preferred access-control mechanism.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Security",
    "q": "A licensing service grants a customer access to one installer file for 15 minutes after purchase. The client is a custom downloader that does not use browser cookies. Which approach should the architects choose?",
    "options": [
      "CloudFront signed URL",
      "CloudFront signed cookie",
      "CloudFront geographic restriction",
      "CloudFront response headers policy"
    ],
    "correct": 0,
    "explanation": "A signed URL is designed for granting temporary access to an individual object, and it works well for clients that do not rely on cookies. Signed cookies are better when access should cover multiple files without changing each URL. Geographic restriction and response headers policies solve different problems.",
    "keyRule": "Use signed URLs when access is granted to one object and the client should not depend on cookies.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-choosing-signed-urls-cookies.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Security",
    "q": "A subscription video portal serves thousands of segment files for each paid title through CloudFront. After login, a viewer should be able to access the full set of files for a short period without rewriting every media URL. Which option is best?",
    "options": [
      "CloudFront signed cookies",
      "CloudFront signed URLs for each segment file",
      "AWS WAF rate-based rules",
      "CloudFront price class"
    ],
    "correct": 0,
    "explanation": "Signed cookies let CloudFront authorize access to multiple restricted files while leaving the existing URLs unchanged, which fits video packages and subscriber areas. Signed URLs would require generating or managing a separate signed URL for each object. WAF and price class do not provide per-viewer private-content access control.",
    "keyRule": "Use signed cookies when one authorization decision should cover many files without changing their URLs.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-choosing-signed-urls-cookies.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Security",
    "q": "A media company can distribute one catalog globally except for a few titles that must be restricted at the city level in some countries. The team currently uses one CloudFront distribution for all titles. Which design best meets the requirement?",
    "options": [
      "Use a third-party geolocation service with CloudFront signed URLs or cookies for the restricted titles",
      "Use CloudFront geographic restrictions because they support city-level allow lists inside one distribution",
      "Use only an origin request policy to forward the viewer IP address to the origin",
      "Use CloudFront standard logs to block requests after they occur"
    ],
    "correct": 0,
    "explanation": "CloudFront geographic restrictions operate at the country level for an entire distribution. When restrictions apply only to a subset of files or need finer granularity such as city-level control, AWS documentation points to combining CloudFront with a third-party geolocation service and private-content controls. Forwarding headers or analyzing logs does not enforce the restriction by itself.",
    "keyRule": "If geo restrictions must be finer than country-level or apply to only some files, CloudFront native geo restriction is not enough.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/georestrictions.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Networking",
    "q": "A multilingual website uses the same path for every article and selects language through a `lang` query string. The origin returns identical content except for the language variant. The team wants CloudFront to cache a separate copy per language without adding unnecessary cache fragmentation. What should they do?",
    "options": [
      "Use a cache policy that includes only the `lang` query string in the cache key",
      "Use an origin request policy to forward every query string while leaving the cache key unchanged",
      "Forward all headers, all cookies, and all query strings to maximize cache correctness",
      "Disable caching so each request always reaches the origin"
    ],
    "correct": 0,
    "explanation": "A cache policy controls which viewer request values become part of the cache key. Including only the `lang` query string creates distinct cached objects per language while avoiding unnecessary fragmentation from unrelated values. An origin request policy affects what reaches the origin but does not by itself create separate cached variants.",
    "keyRule": "Use a cache policy to include only the minimal request values that must vary the cache.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-key-understand-cache-policy.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-the-cache-key.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Networking",
    "q": "An application serves the same image assets to all users through CloudFront, but the origin must still receive an `Authorization` header on cache misses for access checks. The team does not want that header to create separate cache entries. Which configuration is best?",
    "options": [
      "Attach an origin request policy that forwards the `Authorization` header without adding it to the cache key",
      "Attach a cache policy that includes the `Authorization` header in the cache key",
      "Disable caching for the cache behavior",
      "Use signed cookies instead of any forwarding policy"
    ],
    "correct": 0,
    "explanation": "An origin request policy controls what CloudFront sends to the origin without automatically making those values part of the cache key. That fits the case where the origin needs the header but cached objects should remain shared. Putting the header into the cache policy would fragment the cache by token or user.",
    "keyRule": "When the origin needs request data but the cache should not vary on it, use an origin request policy.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-request-understand-origin-request-policy.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-key-understand-cache-policy.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Networking",
    "q": "A storefront shows one of four region-specific landing pages based on a cookie named `country`. The marketing team wants CloudFront to cache one version per country value instead of forwarding every request to the origin. Which approach is best?",
    "options": [
      "Configure CloudFront to cache based on the `country` cookie value",
      "Use only a response headers policy",
      "Enable CloudFront Origin Shield",
      "Use signed URLs for the landing pages"
    ],
    "correct": 0,
    "explanation": "CloudFront can cache separate object variants based on selected cookie values. Caching on the specific `country` cookie gives one cache entry per region variant and avoids sending every request to the origin. Response headers policies, Origin Shield, and signed URLs do not create cookie-based cache variants.",
    "keyRule": "If viewer content should vary by cookie, include the necessary cookie in CloudFront caching behavior.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Cookies.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-the-cache-key.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Networking",
    "q": "A global marketing site needs to normalize incoming URLs and add a small viewer header at extremely high request rates. The logic is simple, must run with very low latency, and does not need network access or the request body. Which service is the best fit?",
    "options": [
      "CloudFront Functions",
      "Lambda@Edge",
      "Amazon API Gateway",
      "AWS Step Functions"
    ],
    "correct": 0,
    "explanation": "CloudFront Functions is designed for lightweight, latency-sensitive request and response manipulation at very high scale. The scenario does not need request-body inspection, filesystem access, or network calls, so Lambda@Edge would be heavier than necessary. API Gateway and Step Functions are unrelated to CDN edge customization.",
    "keyRule": "Use CloudFront Functions for lightweight viewer request or response logic at massive scale.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-choosing.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Compute",
    "q": "An edge customization must inspect the HTTP request body and call an external authorization service before the origin request proceeds. Which option best fits this requirement?",
    "options": [
      "Lambda@Edge",
      "CloudFront Functions",
      "CloudFront response headers policy",
      "CloudFront standard logging"
    ],
    "correct": 0,
    "explanation": "Lambda@Edge supports heavier processing and can access the request body and external services, which CloudFront Functions cannot do. CloudFront Functions is for lightweight header and URL logic without network or body access. Response headers policies and logging do not execute custom authorization logic.",
    "keyRule": "If edge logic needs request-body access or network calls, choose Lambda@Edge instead of CloudFront Functions.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-choosing.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Architecture",
    "q": "A retail company deploys new JavaScript bundles several times per day through CloudFront. The team wants users to receive new assets quickly without constantly issuing large invalidations. Which practice is the best fit?",
    "options": [
      "Publish new files with versioned names and update application references",
      "Invalidate `/*` after every deployment",
      "Set the CloudFront error caching TTL to zero",
      "Use signed cookies for JavaScript files"
    ],
    "correct": 0,
    "explanation": "AWS recommends versioned file names for updated content because they give immediate control over what viewers request and avoid repeated invalidation operations. Invalidating everything on every release is less efficient and can add cost or operational noise. Error caching and signed cookies do not solve deployment refresh for public static assets.",
    "keyRule": "For frequently updated cached assets, prefer versioned file names over broad invalidations.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/UpdatingExistingObjects.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/invalidation-specifying-objects.html"
    ]
  },
  {
    "exam": 1,
    "topic": "High Availability & Resilience",
    "q": "A web application uses CloudFront in front of a custom origin. The team wants a friendly 503 page when the origin is unhealthy, and that page must still be available if the primary origin is down. What should they do?",
    "options": [
      "Store custom error pages in a separate location or origin that CloudFront can still access",
      "Keep the custom error page on the same origin as the application so configuration stays simple",
      "Use an origin request policy to retry the request automatically until it succeeds",
      "Disable caching of all 5xx responses globally"
    ],
    "correct": 0,
    "explanation": "CloudFront can return custom error pages, but AWS recommends keeping those pages in a location separate from the main origin. If the application origin itself is failing, CloudFront still needs a healthy place to retrieve the custom error content. The other options do not ensure the fallback page remains reachable.",
    "keyRule": "If custom error pages must survive an origin outage, store them separately from the primary origin.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages-procedure.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages-different-locations.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesErrorPages.html"
    ]
  },
  {
    "exam": 2,
    "topic": "High Availability & Resilience",
    "q": "A newly fixed origin continues to show old 503 errors for too long because CloudFront cached the error response. The architects want CloudFront to retry the origin sooner after a failure is resolved. Which setting should they adjust?",
    "options": [
      "Lower the Error Caching Minimum TTL for the relevant status code",
      "Increase the default object TTL in the cache policy",
      "Switch from CloudFront to Global Accelerator",
      "Enable CloudFront geographic restrictions"
    ],
    "correct": 0,
    "explanation": "CloudFront caches some error responses, and the Error Caching Minimum TTL controls how long those errors remain cached. Reducing that value shortens the period that viewers continue to see stale error responses after the origin has recovered. Default object TTL, Global Accelerator, and geo restrictions do not target cached error behavior.",
    "keyRule": "To make CloudFront stop serving cached errors sooner, reduce the error caching TTL for that status code.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/custom-error-pages-expiration.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesErrorPages.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Architecture",
    "q": "An origin receives large spikes of repeated requests for the same objects from many CloudFront edge locations, and the team wants an extra caching layer that reduces origin load and can improve cache hit ratio. Which feature is the best fit?",
    "options": [
      "CloudFront Origin Shield",
      "CloudFront signed cookies",
      "CloudFront field-level encryption",
      "CloudFront standard logging"
    ],
    "correct": 0,
    "explanation": "Origin Shield adds an additional centralized caching layer in front of the origin. AWS documents it as a way to reduce origin load and improve cache hit ratio when many edges request the same objects. The other options address access control, encryption, or observability instead of origin offload.",
    "keyRule": "Use Origin Shield when you need an extra CloudFront caching layer to protect the origin.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Networking",
    "q": "An operations team wants CloudFront access records delivered within seconds so a streaming analytics pipeline can react to traffic anomalies in near real time. Which option should they use?",
    "options": [
      "CloudFront real-time logs delivered to Kinesis Data Streams",
      "CloudFront standard logs written to Amazon S3 once per hour",
      "AWS Config rules for the distribution",
      "Amazon S3 server access logging on the origin bucket"
    ],
    "correct": 0,
    "explanation": "CloudFront real-time logs are the feature designed for near-real-time request visibility, and they deliver records to Kinesis Data Streams. Standard logs are delayed and better for historical analysis, while Config and S3 access logging do not provide per-request CloudFront telemetry within seconds.",
    "keyRule": "If CloudFront request analytics must arrive within seconds, use real-time logs with Kinesis Data Streams.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Networking",
    "q": "A team wants CloudFront request history for troubleshooting and periodic reporting, but it does not need second-by-second delivery and wants the simpler lower-overhead option. What is the best fit?",
    "options": [
      "Enable CloudFront standard logging",
      "Enable CloudFront real-time logs to a Kinesis stream",
      "Use CloudFront Functions to write custom logs",
      "Rely on Route 53 query logging"
    ],
    "correct": 0,
    "explanation": "Standard logging is the appropriate CloudFront feature for historical access logs when near-real-time delivery is not required. Real-time logs are built for live pipelines and add Kinesis integration and extra operational overhead. CloudFront Functions and Route 53 query logs do not replace CloudFront access logs.",
    "keyRule": "Use standard logging for historical CloudFront request analysis when near-real-time delivery is unnecessary.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/standard-logging.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/standard-logs-reference.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Networking",
    "q": "A company serves JavaScript and CSS through CloudFront and wants faster page delivery with lower transfer volume. The team is already using modern cache policies. Which change is most appropriate?",
    "options": [
      "Enable CloudFront automatic compression with gzip and Brotli in the cache behavior",
      "Create an origin request policy that forwards all headers",
      "Invalidate the files more often",
      "Use field-level encryption on the static assets"
    ],
    "correct": 0,
    "explanation": "CloudFront can automatically compress eligible objects and, with cache policies, support gzip and Brotli for faster delivery and lower transfer size. Forwarding more headers does not improve payload size, invalidations do not reduce transfer volume, and field-level encryption is unrelated to static asset compression.",
    "keyRule": "Enable CloudFront compression for compressible content when you want smaller viewer payloads and faster delivery.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-key-understand-cache-policy.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Security",
    "q": "A security team wants every viewer response from CloudFront to include HSTS and several common security headers without modifying the origin application. Which feature should the architects use?",
    "options": [
      "Attach a response headers policy to the cache behavior",
      "Use an origin request policy",
      "Turn on standard logging",
      "Use CloudFront signed URLs"
    ],
    "correct": 0,
    "explanation": "A response headers policy adds or removes HTTP headers in the responses that CloudFront sends to viewers, including common security headers. This avoids changing the origin application for a header-only requirement. Origin request policies affect requests to the origin, not viewer response headers.",
    "keyRule": "Use a response headers policy when CloudFront should add security or CORS headers to viewer responses.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/modifying-response-headers.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-response-headers-policies.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Security",
    "q": "A payment form is delivered through CloudFront, and the business wants specific sensitive POST fields encrypted at the edge so that only authorized backend components can decrypt them. Which CloudFront capability fits this requirement?",
    "options": [
      "Field-level encryption",
      "Signed cookies",
      "Origin Shield",
      "Price class"
    ],
    "correct": 0,
    "explanation": "CloudFront field-level encryption is built for encrypting selected data fields close to the viewer and keeping them encrypted through the application path until authorized components decrypt them. Signed cookies, Origin Shield, and price class do not encrypt form fields.",
    "keyRule": "Use field-level encryption when specific request fields must be encrypted at the CloudFront edge.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/field-level-encryption.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Architecture",
    "q": "A platform team wants to test a new CloudFront cache configuration with a small percentage of real production traffic before promoting it to everyone. Which approach is the best fit?",
    "options": [
      "Use CloudFront continuous deployment with a staging distribution",
      "Create a second DNS record and manually ask users to test it",
      "Use standard logging to compare deployments after a full cutover",
      "Use CloudFront geographic restrictions to route 5% of users"
    ],
    "correct": 0,
    "explanation": "CloudFront continuous deployment is specifically designed to send a subset of real production traffic to a staging distribution so changes can be validated before promotion. The other options either require manual testing or misuse unrelated features.",
    "keyRule": "When a CDN configuration should be tested on a subset of live traffic, use CloudFront continuous deployment.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/continuous-deployment.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-continuous-deployment.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Architecture",
    "q": "A company stores replicated static assets in multiple AWS Regions behind an S3 Multi-Region Access Point and wants to keep using CloudFront with private origin access. Which design best matches AWS guidance?",
    "options": [
      "Use the S3 Multi-Region Access Point as the CloudFront origin and protect it with origin access control",
      "Replace CloudFront with a direct public S3 Multi-Region Access Point URL",
      "Use an origin access identity because OAC is not supported with Multi-Region Access Points",
      "Expose each regional bucket publicly and use client-side logic to choose one"
    ],
    "correct": 0,
    "explanation": "CloudFront supports S3 Multi-Region Access Point origins and can protect them with origin access control. That keeps the global origin private while preserving CloudFront features. The other options either make the origin public or use the wrong legacy access mechanism.",
    "keyRule": "For private CloudFront access to an S3 Multi-Region Access Point, use OAC with the MRAP origin.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3-mrap.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Architecture",
    "q": "A team wants CloudFront in front of an Amazon S3 website endpoint and also wants the origin locked down with origin access control so users cannot bypass CloudFront. Which change is required?",
    "options": [
      "Use the S3 bucket REST endpoint as the origin instead of the website endpoint so OAC can be used",
      "Keep the website endpoint and attach OAC directly because website endpoints fully support OAC",
      "Use signed cookies on the website endpoint because they replace OAC",
      "Move the website to Amazon EFS because CloudFront cannot work with S3"
    ],
    "correct": 0,
    "explanation": "AWS documents that OAC applies to S3 bucket origins, not S3 website endpoints. Website endpoints are treated as custom origins, so if the design requires private CloudFront-to-S3 access with OAC, the origin must be the bucket REST endpoint rather than the website endpoint. The other choices do not satisfy that boundary.",
    "keyRule": "If you need OAC with S3 and CloudFront, use an S3 bucket origin, not an S3 website endpoint.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Security",
    "q": "A workload uploads objects through CloudFront to an Amazon S3 origin and also uses SSE-KMS on the bucket. The architects are reviewing whether to keep a legacy origin access identity or change it. Which choice is the best fit?",
    "options": [
      "Move to origin access control because it supports SSE-KMS and dynamic methods such as PUT and DELETE",
      "Keep origin access identity because it is the preferred option for dynamic S3 requests",
      "Make the bucket public because CloudFront adds enough protection by itself",
      "Use CloudFront geographic restrictions to secure the upload path"
    ],
    "correct": 0,
    "explanation": "Origin access control is the recommended mechanism for modern S3 origins and supports scenarios that OAI does not, including SSE-KMS and dynamic methods like PUT and DELETE. Keeping OAI would leave the design on a legacy path that AWS explicitly documents as more limited. Public access and geo restriction do not solve the origin-authentication requirement.",
    "keyRule": "If a CloudFront-to-S3 design needs SSE-KMS or dynamic methods, prefer OAC over legacy OAI.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Networking",
    "q": "A distributor must block access to all content in a short list of countries, and the same restriction applies to the entire CloudFront distribution. Which feature is the simplest fit?",
    "options": [
      "CloudFront geographic restrictions",
      "CloudFront signed URLs",
      "A response headers policy",
      "An origin request policy"
    ],
    "correct": 0,
    "explanation": "CloudFront geographic restrictions are meant for country-level allow or deny lists that apply to an entire distribution. This is exactly the requirement described. Signed URLs, response headers policies, and origin request policies solve different access or request-handling problems.",
    "keyRule": "Use CloudFront geographic restrictions when the rule is country-level and applies to the entire distribution.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/georestrictions.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Security",
    "q": "A members portal serves a protected documentation library made of many HTML, CSS, image, and PDF files through CloudFront. After authentication, users should browse the library without the application generating a new signed link for every asset request. Which option is best?",
    "options": [
      "CloudFront signed cookies",
      "CloudFront signed URLs for every object",
      "CloudFront standard logging",
      "CloudFront Origin Shield"
    ],
    "correct": 0,
    "explanation": "Signed cookies allow the application to grant access to a collection of restricted files while keeping the underlying URLs unchanged. That is a better fit for a browsable library than signing every asset URL individually. Logging and Origin Shield do not provide private-content authorization.",
    "keyRule": "When users should access many protected files after one authorization step, signed cookies are the better fit.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-choosing-signed-urls-cookies.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Networking",
    "q": "A global site serves localized content from the same path and determines the variant from the `Accept-Language` header. The team wants CloudFront to cache separate objects for different language headers, but only for that one header. What should they configure?",
    "options": [
      "A cache policy that includes the `Accept-Language` header in the cache key",
      "An origin request policy that forwards all viewer headers",
      "A response headers policy that adds `Accept-Language` to responses",
      "CloudFront geographic restrictions"
    ],
    "correct": 0,
    "explanation": "Because the content variant depends on a request header, CloudFront must include that specific header in the cache key. A cache policy is the mechanism that controls header-based cache variation. An origin request policy can forward headers to the origin, but it does not by itself create separate cached objects.",
    "keyRule": "If content varies by a viewer header, include only that header in the CloudFront cache policy.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-key-understand-cache-policy.html",
      "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-the-cache-key.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Operations",
    "q": "A payments API publishes a custom CloudWatch metric named `CheckoutErrors`. The operations team wants an alert when the metric exceeds a fixed threshold for several consecutive evaluation periods. Which feature should they configure?",
    "options": [
      "Amazon CloudWatch metric alarm",
      "AWS Config managed rule",
      "AWS Cost Explorer report",
      "AWS Systems Manager Patch Manager"
    ],
    "correct": 0,
    "explanation": "A CloudWatch metric alarm is designed to watch a metric and change state when the metric breaches a threshold for the configured evaluation periods. AWS Config evaluates resource configuration, Cost Explorer analyzes spending, and Patch Manager automates patching. The boundary is threshold-based alerting on a metric.",
    "keyRule": "Use a CloudWatch metric alarm when a metric crossing a threshold should trigger an alert.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Operations",
    "q": "A web team has separate alarms for latency, 5xx errors, and unhealthy targets. They want to page the on-call engineer only when a combination of conditions indicates a real service incident, reducing duplicate notifications from individual alarms. What should they use?",
    "options": [
      "CloudWatch composite alarm",
      "CloudWatch dashboard only",
      "AWS CloudTrail Lake query",
      "AWS Budgets alert"
    ],
    "correct": 0,
    "explanation": "A CloudWatch composite alarm evaluates the states of other alarms using Boolean logic, which fits a higher-level health signal and reduces alarm noise. A dashboard visualizes data but does not page by itself, CloudTrail Lake queries API events, and Budgets alerts on cost thresholds.",
    "keyRule": "Use composite alarms to combine multiple alarm states into one higher-level alert.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-combining.html",
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Operations",
    "q": "An application writes `PAYMENT_DECLINED` messages to CloudWatch Logs. The team wants to count those log events as a CloudWatch metric and alarm when the count rises quickly. Which feature is the best fit?",
    "options": [
      "CloudWatch Logs metric filter",
      "AWS X-Ray trace map",
      "AWS Config custom rule",
      "Service Quotas"
    ],
    "correct": 0,
    "explanation": "A CloudWatch Logs metric filter extracts matching log events and publishes metric data that can then be alarmed on. X-Ray traces request paths, Config evaluates resource configuration, and Service Quotas tracks limits. The boundary is converting a log pattern into a metric.",
    "keyRule": "Use a metric filter when a log pattern should become a CloudWatch metric for alerting.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html",
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Operations",
    "q": "An operations manager wants a single visual page showing CPU, latency, error-rate, and queue-depth widgets for several production services. The page is for human review, not automated alerting. Which CloudWatch capability should be used?",
    "options": [
      "CloudWatch dashboard",
      "CloudWatch composite alarm",
      "AWS Config aggregator",
      "AWS Cost and Usage Report"
    ],
    "correct": 0,
    "explanation": "CloudWatch dashboards provide customizable visual pages for metrics and alarms across resources. Composite alarms are for alert logic, Config aggregators centralize compliance data, and Cost and Usage Reports are billing exports. The need here is human-facing operational visualization.",
    "keyRule": "Use CloudWatch dashboards for shared operational visualization of metrics and alarms.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Operations",
    "q": "A company wants to continuously test a public checkout workflow from outside the application by loading a page and checking that critical steps succeed. The check should run on a schedule and alert on failure. Which service feature fits best?",
    "options": [
      "CloudWatch Synthetics canary",
      "AWS Config managed rule",
      "VPC Flow Logs",
      "AWS Trusted Advisor"
    ],
    "correct": 0,
    "explanation": "CloudWatch Synthetics canaries run scripted checks on a schedule to monitor endpoints and user flows from the outside. Config evaluates resource settings, VPC Flow Logs capture network metadata, and Trusted Advisor provides best-practice checks. The boundary is synthetic end-user monitoring.",
    "keyRule": "Use CloudWatch Synthetics when scheduled external checks should validate an endpoint or user flow.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Operations",
    "q": "A microservices application has intermittent latency spikes. The team needs to see request traces across services and identify where time is spent in each downstream call. Which service is the best fit?",
    "options": [
      "AWS X-Ray",
      "AWS Budgets",
      "AWS Config",
      "Amazon Route 53 Resolver query logging"
    ],
    "correct": 0,
    "explanation": "AWS X-Ray is built for tracing requests through distributed applications and analyzing latency across service calls. Budgets handles spend alerts, Config handles resource compliance, and Route 53 Resolver query logging records DNS queries. The boundary is distributed request tracing.",
    "keyRule": "Use AWS X-Ray when you need end-to-end traces and latency breakdowns across services.",
    "docs": [
      "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Governance",
    "q": "A security team wants to continuously evaluate whether EBS volumes are encrypted and whether security groups violate approved rules. They prefer predefined checks that can be customized instead of writing Lambda code. Which AWS service should they use?",
    "options": [
      "AWS Config managed rules",
      "Amazon GuardDuty threat findings",
      "AWS CloudTrail event history",
      "Amazon CloudWatch Logs Insights"
    ],
    "correct": 0,
    "explanation": "AWS Config managed rules are predefined, customizable rules that evaluate whether resources comply with desired configuration settings. GuardDuty detects threats, CloudTrail records API calls, and Logs Insights queries logs. The requirement is continuous configuration compliance evaluation.",
    "keyRule": "Use AWS Config managed rules for predefined resource configuration compliance checks.",
    "docs": [
      "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_use-managed-rules.html",
      "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Governance",
    "q": "A central cloud governance account needs to view AWS Config compliance and resource configuration data from many member accounts and Regions. Which feature should be configured?",
    "options": [
      "AWS Config aggregator",
      "CloudWatch composite alarm",
      "AWS Budgets report",
      "Systems Manager Session Manager"
    ],
    "correct": 0,
    "explanation": "An AWS Config aggregator collects configuration and compliance data from multiple accounts and Regions into an aggregator account. Composite alarms combine alarm states, Budgets handles cost thresholds, and Session Manager provides instance access. The boundary is centralized Config visibility.",
    "keyRule": "Use an AWS Config aggregator to centralize Config data across accounts and Regions.",
    "docs": [
      "https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Operations",
    "q": "Administrators need shell access to private EC2 instances for troubleshooting, but security policy forbids inbound SSH ports, long-lived SSH keys, and bastion hosts. Which AWS capability should they use?",
    "options": [
      "AWS Systems Manager Session Manager",
      "Amazon EC2 key pairs with a public bastion",
      "VPC peering",
      "AWS CloudTrail Lake"
    ],
    "correct": 0,
    "explanation": "Session Manager provides managed interactive access to instances through Systems Manager without opening inbound ports, maintaining bastions, or managing SSH keys. A bastion violates the stated requirement, and VPC peering or CloudTrail Lake do not provide shell access.",
    "keyRule": "Use Session Manager for managed instance access without inbound SSH or bastion hosts.",
    "docs": [
      "https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Operations",
    "q": "A fleet of EC2 instances must be scanned for missing operating system security updates and patched according to approved baselines. The team wants a managed AWS operations tool for this. Which service should they choose?",
    "options": [
      "AWS Systems Manager Patch Manager",
      "AWS Config aggregator",
      "Amazon Inspector only",
      "AWS Cost Explorer"
    ],
    "correct": 0,
    "explanation": "Patch Manager automates scanning and installing approved patches on managed nodes and reports patch compliance against baselines. Inspector finds vulnerabilities, but Patch Manager is the operational patching tool. Config aggregators and Cost Explorer solve different problems.",
    "keyRule": "Use Systems Manager Patch Manager for managed patch scanning, installation, and compliance.",
    "docs": [
      "https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Operations",
    "q": "An operations team repeatedly performs the same remediation steps after a known alarm: stop an instance, create a snapshot, update a tag, and restart it. They want an auditable AWS-managed runbook instead of manual console work. What should they use?",
    "options": [
      "AWS Systems Manager Automation",
      "CloudWatch dashboard",
      "AWS Cost and Usage Report",
      "Amazon Macie"
    ],
    "correct": 0,
    "explanation": "Systems Manager Automation runs predefined or custom runbooks for repeatable operational tasks and remediation workflows. A dashboard only visualizes data, CUR exports billing data, and Macie discovers sensitive S3 data. The boundary is repeatable automated operations.",
    "keyRule": "Use Systems Manager Automation for repeatable, auditable operational runbooks.",
    "docs": [
      "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Cost Optimization",
    "q": "A finance team wants an alert when forecasted monthly AWS spend is likely to exceed a fixed dollar amount. They do not need detailed line-item export, only budget tracking and notifications. Which service should they use?",
    "options": [
      "AWS Budgets",
      "AWS Cost and Usage Reports",
      "AWS Compute Optimizer",
      "AWS Config"
    ],
    "correct": 0,
    "explanation": "AWS Budgets is designed to track cost or usage against budgeted thresholds and send alerts, including forecasted spend alerts. CUR is detailed billing export, Compute Optimizer provides rightsizing recommendations, and Config evaluates resource compliance.",
    "keyRule": "Use AWS Budgets for cost or usage thresholds and forecast-based budget alerts.",
    "docs": [
      "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Cost Optimization",
    "q": "A product owner wants to investigate which services drove higher spend over the last few months and view forecasted costs through an interactive console. Which tool is the best fit?",
    "options": [
      "AWS Cost Explorer",
      "AWS Budgets only",
      "AWS Config managed rules",
      "AWS Systems Manager Patch Manager"
    ],
    "correct": 0,
    "explanation": "Cost Explorer provides interactive cost and usage analysis, historical trends, and forecasts. Budgets is mainly for thresholds and notifications, Config evaluates resource settings, and Patch Manager handles patching. The boundary is exploratory cost analysis.",
    "keyRule": "Use Cost Explorer to analyze historical cost trends and forecasts interactively.",
    "docs": [
      "https://docs.aws.amazon.com/cost-management/latest/userguide/ce-filtering.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Cost Optimization",
    "q": "A data engineering team needs the most detailed AWS billing dataset delivered to Amazon S3 so they can query line items with Athena and join the data to internal chargeback tables. Which option is best?",
    "options": [
      "AWS Cost and Usage Reports",
      "AWS Budgets notification",
      "CloudWatch metric alarm",
      "AWS Trusted Advisor check"
    ],
    "correct": 0,
    "explanation": "AWS Cost and Usage Reports provide detailed billing and usage data that can be delivered to S3 for analysis with services such as Athena. Budgets alerts on thresholds, CloudWatch alarms watch metrics, and Trusted Advisor provides recommendations rather than the full line-item dataset.",
    "keyRule": "Use Cost and Usage Reports when detailed billing line items must be exported for analysis.",
    "docs": [
      "https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Cost Optimization",
    "q": "A company wants recommendations to right-size underutilized EC2 instances and identify more efficient compute configurations based on utilization metrics. Which AWS service should it use?",
    "options": [
      "AWS Compute Optimizer",
      "AWS Budgets",
      "AWS Config",
      "Amazon Macie"
    ],
    "correct": 0,
    "explanation": "AWS Compute Optimizer analyzes resource configuration and utilization metrics to generate rightsizing and optimization recommendations. Budgets tracks spend thresholds, Config evaluates compliance, and Macie classifies sensitive S3 data. The boundary is resource rightsizing advice.",
    "keyRule": "Use Compute Optimizer for rightsizing recommendations based on utilization.",
    "docs": [
      "https://docs.aws.amazon.com/compute-optimizer/latest/ug/view-ec2-recommendations.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Cost Optimization",
    "q": "An account team wants a broad best-practice review that can flag cost-optimization opportunities, service limit risks, security checks, and fault-tolerance recommendations. Which service should they consult?",
    "options": [
      "AWS Trusted Advisor",
      "AWS X-Ray",
      "CloudWatch Logs metric filters",
      "AWS Systems Manager Patch Manager"
    ],
    "correct": 0,
    "explanation": "Trusted Advisor provides best-practice checks across categories such as cost optimization, security, fault tolerance, performance, and service limits. X-Ray traces requests, metric filters turn logs into metrics, and Patch Manager handles patches. The boundary is broad best-practice recommendations.",
    "keyRule": "Use Trusted Advisor for broad account-level best-practice checks and recommendations.",
    "docs": [
      "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Cost Optimization",
    "q": "A workload launch may exceed the default limit for a specific AWS resource. The team wants to view the quota, create alarms for usage where supported, and request an increase through AWS. Which service should they use?",
    "options": [
      "Service Quotas",
      "AWS Budgets",
      "AWS Config aggregator",
      "Amazon CloudFront"
    ],
    "correct": 0,
    "explanation": "Service Quotas is the AWS service for viewing and managing quotas and requesting quota increases. Budgets handles spend thresholds, Config aggregators centralize compliance data, and CloudFront is a CDN. The boundary is quota visibility and increase requests.",
    "keyRule": "Use Service Quotas to view, monitor, and request increases for AWS service quotas.",
    "docs": [
      "https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Operations",
    "q": "An operations center wants notifications about AWS service events and planned changes that affect resources in its own accounts. Which service provides account-specific service health information?",
    "options": [
      "AWS Health",
      "Amazon CloudWatch Synthetics",
      "AWS Cost Explorer",
      "AWS Config managed rules"
    ],
    "correct": 0,
    "explanation": "AWS Health provides visibility into service events and planned changes that can affect your AWS accounts and resources. Synthetics monitors endpoints, Cost Explorer analyzes spending, and Config evaluates resource configuration. The boundary is account-specific AWS service health.",
    "keyRule": "Use AWS Health for AWS service events that are relevant to your accounts and resources.",
    "docs": [
      "https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Operations",
    "q": "A platform team wants to encourage consistent tag keys and allowed tag values across accounts in AWS Organizations. The control should help standardize tagging, not analyze network traffic or costs. Which feature is the best fit?",
    "options": [
      "AWS Organizations tag policies",
      "VPC Flow Logs",
      "AWS Cost Explorer",
      "CloudWatch composite alarms"
    ],
    "correct": 0,
    "explanation": "Tag policies in AWS Organizations help standardize tags across accounts by defining allowed tag keys and values. VPC Flow Logs capture traffic metadata, Cost Explorer analyzes costs, and composite alarms combine alarm states. The boundary is organization-wide tag standardization.",
    "keyRule": "Use tag policies to standardize tag keys and values across AWS Organizations accounts.",
    "docs": [
      "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Governance",
    "q": "A team running Amazon ECS and Amazon EKS wants container-level metrics and logs such as CPU, memory, and task or pod performance inside CloudWatch. Which feature should they enable?",
    "options": [
      "CloudWatch Container Insights",
      "AWS Config managed rules",
      "AWS Budgets",
      "CloudTrail Lake"
    ],
    "correct": 0,
    "explanation": "CloudWatch Container Insights collects, aggregates, and summarizes metrics and logs from containerized applications and microservices on ECS and EKS. Config, Budgets, and CloudTrail Lake do not provide container performance telemetry. The boundary is container observability.",
    "keyRule": "Use CloudWatch Container Insights for ECS and EKS container metrics and logs.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Operations",
    "q": "Network engineers need metadata about accepted and rejected IP traffic for subnets and network interfaces to troubleshoot connectivity. They do not need full packet payload capture. Which feature should they enable?",
    "options": [
      "VPC Flow Logs",
      "AWS X-Ray",
      "CloudWatch Synthetics",
      "AWS Cost and Usage Reports"
    ],
    "correct": 0,
    "explanation": "VPC Flow Logs capture metadata about IP traffic to and from VPC resources such as network interfaces, subnets, and VPCs. They do not capture full packet payloads. X-Ray traces applications, Synthetics checks endpoints, and CUR exports billing data.",
    "keyRule": "Use VPC Flow Logs for network traffic metadata, not packet payload capture.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Networking",
    "q": "A security analyst wants to run SQL-style queries over years of recorded AWS API activity without building a separate log analytics pipeline. Which CloudTrail feature is the best fit?",
    "options": [
      "AWS CloudTrail Lake",
      "CloudWatch dashboard",
      "AWS Config aggregator",
      "AWS Compute Optimizer"
    ],
    "correct": 0,
    "explanation": "CloudTrail Lake is designed for storing, querying, and analyzing CloudTrail events using SQL-based queries. Dashboards visualize metrics, Config aggregators centralize configuration compliance, and Compute Optimizer gives rightsizing recommendations. The boundary is queryable CloudTrail event history.",
    "keyRule": "Use CloudTrail Lake when historical CloudTrail events need SQL-based querying and analysis.",
    "docs": [
      "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Security",
    "q": "A maintenance task must run every night to invoke a Lambda function that checks for expired temporary files. The team wants a managed schedule rather than a cron process on an EC2 instance. Which service should be used?",
    "options": [
      "Amazon EventBridge scheduled rule",
      "AWS Config managed rule",
      "AWS Budgets",
      "Amazon GuardDuty"
    ],
    "correct": 0,
    "explanation": "An EventBridge scheduled rule can invoke targets such as Lambda functions on a rate or cron schedule. Config evaluates resource compliance, Budgets tracks spend, and GuardDuty detects threats. The boundary is managed event scheduling.",
    "keyRule": "Use EventBridge scheduled rules for managed cron-style invocation of AWS targets.",
    "docs": [
      "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Operations",
    "q": "An application team wants CloudWatch to automatically analyze common problems for a .NET and SQL Server application and surface detected issues without building every dashboard and alarm manually. Which feature is the best fit?",
    "options": [
      "CloudWatch Application Insights",
      "AWS Cost Explorer",
      "Service Quotas",
      "AWS Systems Manager Session Manager"
    ],
    "correct": 0,
    "explanation": "CloudWatch Application Insights helps monitor applications and detect common problems by setting up relevant metrics, logs, alarms, and dashboards for supported workloads. Cost Explorer, Service Quotas, and Session Manager address cost analysis, quota management, and instance access. The boundary is application-aware operational monitoring.",
    "keyRule": "Use CloudWatch Application Insights for assisted monitoring and problem detection for supported applications.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch-application-insights.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Operations",
    "q": "A cloud operations lead wants a single shared page for the current health of several services, including selected alarms and key graphs, so on-call engineers can quickly assess production status. Which option is most appropriate?",
    "options": [
      "Create a CloudWatch dashboard with the relevant widgets",
      "Create an AWS Budget for each service",
      "Enable VPC Flow Logs on every subnet",
      "Use AWS Config managed rules only"
    ],
    "correct": 0,
    "explanation": "A CloudWatch dashboard is the right tool for a shared operational view with widgets for graphs, metrics, and alarms. Budgets handles cost thresholds, VPC Flow Logs capture network metadata, and Config rules evaluate compliance rather than presenting service health in one page.",
    "keyRule": "Use CloudWatch dashboards when operators need a shared visual health page.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html",
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Migration",
    "q": "A company wants to rehost 300 on-premises virtual machines to Amazon EC2 with minimal changes. The team needs continuous replication, non-disruptive testing, and a controlled cutover window. Which AWS service is the best fit?",
    "options": [
      "AWS Application Migration Service",
      "AWS DataSync",
      "AWS Database Migration Service",
      "AWS Transfer Family"
    ],
    "correct": 0,
    "explanation": "AWS Application Migration Service is built for lift-and-shift server migrations and continuously replicates source servers so they can be launched for testing and cutover on AWS. DataSync moves file or object data, DMS migrates database data, and Transfer Family handles protocol-based file transfers. The boundary is full server rehosting to EC2.",
    "keyRule": "Use AWS Application Migration Service for large-scale lift-and-shift server rehosting to EC2.",
    "docs": [
      "https://docs.aws.amazon.com/mgn/latest/ug/replication-settings-template.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Migration",
    "q": "A migration team is configuring how replicated source servers should use staging resources, encryption, security groups, and replication server settings before cutover. Which AWS Application Migration Service setting area controls this?",
    "options": [
      "Replication settings and replication template",
      "CloudFront cache policy",
      "DMS table mapping rules only",
      "AWS Budgets cost filter"
    ],
    "correct": 0,
    "explanation": "Application Migration Service replication settings define how source servers replicate into the AWS account, including replication server configuration, EBS settings, security groups, routing, and tags. DMS table mappings apply to database tasks, and CloudFront or Budgets settings are unrelated. The boundary is MGN replication behavior.",
    "keyRule": "Use MGN replication settings when controlling how source servers replicate into AWS.",
    "docs": [
      "https://docs.aws.amazon.com/mgn/latest/ug/settings.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Migration",
    "q": "After initial replication completes, a team needs to launch test instances and later launch cutover instances for each migrated source server. Which AWS Application Migration Service configuration is used for those launched EC2 instances?",
    "options": [
      "Launch settings and the EC2 launch template",
      "AWS Config managed rules",
      "DataSync task options",
      "CloudWatch Logs metric filters"
    ],
    "correct": 0,
    "explanation": "MGN launch settings, including the EC2 launch template, determine how test and cutover instances are launched for each source server. DataSync tasks move data, Config rules evaluate compliance, and metric filters extract log metrics. The boundary is the EC2 instance configuration used during MGN test and cutover.",
    "keyRule": "Use MGN launch settings to control test and cutover instance launch behavior.",
    "docs": [
      "https://docs.aws.amazon.com/mgn/latest/ug/launch-settings.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Migration",
    "q": "An on-premises PostgreSQL database must move to Amazon RDS for PostgreSQL. The engine stays the same, and the team wants a managed migration path that can use native database tools. Which option fits best?",
    "options": [
      "AWS DMS homogeneous data migration",
      "AWS SCT with a full engine conversion project",
      "AWS Application Migration Service",
      "AWS Snowball Edge only"
    ],
    "correct": 0,
    "explanation": "AWS DMS homogeneous data migrations are designed for moving data from a source database to the equivalent engine on Amazon RDS, Aurora, or DocumentDB. AWS SCT is mainly needed when schemas must be converted across engines, MGN rehosts servers, and Snowball alone is not a database migration workflow.",
    "keyRule": "Use AWS DMS homogeneous data migration when source and target database engines are equivalent.",
    "docs": [
      "https://docs.aws.amazon.com/dms/latest/userguide/data-migrations.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Migration",
    "q": "A company is moving an Oracle database to Amazon Aurora PostgreSQL. The schema, stored procedures, and data types must be converted before data migration. Which combination is most appropriate?",
    "options": [
      "AWS Schema Conversion Tool for schema conversion and AWS DMS for data migration",
      "AWS DataSync for schema conversion and AWS Backup for data migration",
      "AWS Application Migration Service for table conversion",
      "AWS Transfer Family for database replication"
    ],
    "correct": 0,
    "explanation": "A heterogeneous database migration requires schema and code conversion before data is migrated. AWS SCT handles schema conversion, while AWS DMS migrates the data and can support ongoing replication. DataSync, MGN, and Transfer Family do not convert relational schemas between database engines.",
    "keyRule": "For heterogeneous database migration, pair AWS SCT for schema conversion with AWS DMS for data movement.",
    "docs": [
      "https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-oracle-database/heterogeneous-migration.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Migration",
    "q": "A database migration has completed its initial full load, but the application must keep running on the source database until the final cutover. The target should stay synchronized with ongoing source changes. Which capability should be used?",
    "options": [
      "AWS DMS change data capture",
      "AWS Snowball Edge import job",
      "CloudFront invalidation",
      "AWS Config remediation"
    ],
    "correct": 0,
    "explanation": "AWS DMS change data capture replicates ongoing source database changes after or during a full load, helping keep the target synchronized until cutover. Snowball transfers data offline, while CloudFront and Config features do not replicate database changes. The boundary is ongoing database change replication.",
    "keyRule": "Use AWS DMS CDC to keep a target database synchronized until cutover.",
    "docs": [
      "https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Migration",
    "q": "A company has 40 TB of active files on an on-premises NFS share and wants to transfer them over the network into Amazon S3 with integrity validation and acceleration. The data can move online over existing connectivity. Which service should it use?",
    "options": [
      "AWS DataSync",
      "AWS Snowball Edge",
      "AWS Application Migration Service",
      "AWS Transfer Family server endpoint"
    ],
    "correct": 0,
    "explanation": "AWS DataSync is a managed high-speed service for transferring file or object data between on-premises storage and AWS storage services such as S3, EFS, and FSx. Snowball is better when network transfer is impractical, MGN rehosts servers, and Transfer Family is for managed protocol endpoints.",
    "keyRule": "Use DataSync for online file or object transfer between on-premises storage and AWS storage.",
    "docs": [
      "https://docs.aws.amazon.com/datasync/latest/userguide/how-datasync-works.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Migration",
    "q": "A research lab must move 500 TB of data to Amazon S3, but its internet connection is too slow to complete the transfer in the allowed window. Shipping an appliance is acceptable. Which AWS option is best?",
    "options": [
      "AWS Snowball Edge import job",
      "AWS DataSync over the internet",
      "AWS Application Migration Service",
      "AWS DMS Serverless"
    ],
    "correct": 0,
    "explanation": "Snowball Edge is designed for physical device-based data transfer when network transfer is too slow or unavailable, and it can import large datasets into AWS. DataSync relies on network connectivity, MGN is for server migration, and DMS is for databases. The boundary is large offline data transfer.",
    "keyRule": "Use Snowball Edge when large data transfer over the network is impractical.",
    "docs": [
      "https://docs.aws.amazon.com/snowball/latest/developer-guide/how-it-works.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Migration",
    "q": "Before planning migration waves, an enterprise wants to collect on-premises server configuration, utilization, and dependency data and group discovered servers into applications. Which AWS service helps with this discovery phase?",
    "options": [
      "AWS Application Discovery Service",
      "AWS Application Migration Service only",
      "AWS Transfer Family",
      "Amazon CloudFront"
    ],
    "correct": 0,
    "explanation": "AWS Application Discovery Service collects usage and configuration data from on-premises servers and databases and integrates with Migration Hub for planning. MGN performs server migration, Transfer Family handles file-transfer protocols, and CloudFront is a CDN. The boundary is migration discovery and planning data.",
    "keyRule": "Use Application Discovery Service to collect inventory and dependency data before migration planning.",
    "docs": [
      "https://docs.aws.amazon.com/application-discovery/latest/userguide/discovery-agent.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Migration",
    "q": "A program manager wants a single place to track migration status across applications and tools after discovery data has been collected. Which AWS service provides this central migration tracking view?",
    "options": [
      "AWS Migration Hub",
      "AWS Config aggregator",
      "AWS Cost Explorer",
      "Amazon GuardDuty"
    ],
    "correct": 0,
    "explanation": "AWS Migration Hub provides a central location to track migration progress across applications and supported migration tools. Config aggregators centralize compliance state, Cost Explorer analyzes spend, and GuardDuty reports threats. The boundary is migration portfolio tracking.",
    "keyRule": "Use Migration Hub to track migration progress across applications and tools.",
    "docs": [
      "https://docs.aws.amazon.com/migrationhub/latest/ug/tracking-migrations.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Migration",
    "q": "A team wants predefined workflows to orchestrate the steps for rehosting applications and validating migration readiness, instead of manually coordinating every migration task. Which service is the best fit?",
    "options": [
      "AWS Migration Hub Orchestrator",
      "AWS Cost and Usage Reports",
      "Amazon Route 53 Resolver",
      "AWS WAF"
    ],
    "correct": 0,
    "explanation": "Migration Hub Orchestrator provides predefined workflow templates and automation for migration steps such as readiness validation, provisioning, migration, and cutover. Cost reports, Resolver, and WAF do not orchestrate application migration workflows.",
    "keyRule": "Use Migration Hub Orchestrator when migration steps should be automated through predefined workflows.",
    "docs": [
      "https://docs.aws.amazon.com/migrationhub-orchestrator/latest/userguide/creating-workflow.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Migration",
    "q": "A company has partners that already send files through SFTP. It wants to keep the partners’ SFTP clients and land files directly in Amazon S3 without managing SFTP servers. Which service should be used?",
    "options": [
      "AWS Transfer Family",
      "AWS DataSync",
      "AWS Snowball Edge",
      "AWS DMS"
    ],
    "correct": 0,
    "explanation": "AWS Transfer Family provides fully managed SFTP, FTPS, FTP, and AS2 endpoints backed by AWS storage such as Amazon S3 and EFS. DataSync transfers data between storage locations, Snowball handles offline transfer, and DMS migrates databases. The boundary is managed SFTP-compatible file transfer into AWS storage.",
    "keyRule": "Use AWS Transfer Family to preserve SFTP workflows while storing files in S3 or EFS.",
    "docs": [
      "https://docs.aws.amazon.com/transfer/latest/userguide/create-server-sftp.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Migration",
    "q": "A workflow must automatically retrieve files from an external partner-owned SFTP server into Amazon S3 and also send processed files back to that remote server. Which AWS Transfer Family feature fits this need?",
    "options": [
      "SFTP connector",
      "SFTP server endpoint only",
      "AWS Storage Gateway file share",
      "AWS Application Migration Service"
    ],
    "correct": 0,
    "explanation": "AWS Transfer Family SFTP connectors connect to remote SFTP servers and can send files from S3 or retrieve files into S3. A Transfer Family server endpoint accepts client connections into AWS, which is a different direction of integration. Storage Gateway and MGN solve different hybrid problems.",
    "keyRule": "Use Transfer Family SFTP connectors for managed transfers to or from external SFTP servers.",
    "docs": [
      "https://docs.aws.amazon.com/transfer/latest/userguide/create-server-sftp.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Hybrid",
    "q": "An on-premises analytics application must keep using an SMB file share, but the company wants the files stored durably as objects in Amazon S3. Which AWS service pattern is the best fit?",
    "options": [
      "Amazon S3 File Gateway",
      "AWS DataSync one-time transfer",
      "AWS Database Migration Service",
      "AWS Application Discovery Service"
    ],
    "correct": 0,
    "explanation": "Amazon S3 File Gateway provides file protocol access for on-premises applications while storing data as objects in S3. DataSync is better for transfer jobs rather than an ongoing file-share interface, and DMS or Application Discovery do not provide file shares.",
    "keyRule": "Use S3 File Gateway for ongoing on-premises file access backed by Amazon S3.",
    "docs": [
      "https://docs.aws.amazon.com/storagegateway/latest/userguide/file-gateway-concepts.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Hybrid",
    "q": "A legacy on-premises application needs low-latency block storage locally, but snapshots should be stored in AWS for durability and recovery. Which Storage Gateway type should be considered?",
    "options": [
      "Volume Gateway",
      "Tape Gateway",
      "AWS Transfer Family",
      "AWS DMS"
    ],
    "correct": 0,
    "explanation": "Volume Gateway presents block storage volumes to on-premises applications and stores volume data or snapshots in AWS, depending on mode. Tape Gateway replaces tape libraries, Transfer Family handles file-transfer protocols, and DMS migrates databases. The boundary is hybrid block storage.",
    "keyRule": "Use Volume Gateway when on-premises applications need block storage integrated with AWS-backed snapshots.",
    "docs": [
      "https://docs.aws.amazon.com/storagegateway/latest/vgw/VolumeGatewayConcepts.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Migration",
    "q": "A backup team wants to replace physical tape infrastructure with a virtual tape library that integrates with existing backup software and stores virtual tapes in AWS. Which option is best?",
    "options": [
      "AWS Storage Gateway Tape Gateway",
      "AWS Snowball Edge",
      "AWS DataSync",
      "AWS Transfer Family"
    ],
    "correct": 0,
    "explanation": "Tape Gateway provides a virtual tape library interface for existing backup applications while storing virtual tapes in AWS. Snowball is a transfer device, DataSync moves files or objects, and Transfer Family provides protocol endpoints. The boundary is replacing tape backup infrastructure.",
    "keyRule": "Use Tape Gateway to replace physical tape libraries with AWS-backed virtual tapes.",
    "docs": [
      "https://docs.aws.amazon.com/storagegateway/latest/tgw/CreatingTapes.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Hybrid",
    "q": "A company needs consistent private connectivity from its data center to AWS with dedicated bandwidth and more predictable network performance than an internet VPN. Which service should it use?",
    "options": [
      "AWS Direct Connect",
      "AWS Site-to-Site VPN",
      "Amazon CloudFront",
      "AWS DataSync"
    ],
    "correct": 0,
    "explanation": "AWS Direct Connect provides dedicated network connections between on-premises environments and AWS, which fits predictable private connectivity and bandwidth needs. Site-to-Site VPN is encrypted over internet paths, CloudFront is content delivery, and DataSync is a transfer service.",
    "keyRule": "Use Direct Connect when dedicated private connectivity to AWS is required.",
    "docs": [
      "https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithConnections.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Hybrid",
    "q": "A small branch office needs encrypted connectivity to a VPC quickly and can use its existing internet connection. Dedicated private circuits are not required. Which option is the best fit?",
    "options": [
      "AWS Site-to-Site VPN",
      "AWS Direct Connect only",
      "AWS Snowball Edge",
      "AWS Migration Hub"
    ],
    "correct": 0,
    "explanation": "AWS Site-to-Site VPN creates encrypted tunnels between an on-premises network and a VPC over internet connectivity. Direct Connect is for dedicated private circuits, Snowball is for device-based transfer, and Migration Hub tracks migrations. The boundary is encrypted hybrid connectivity without a dedicated circuit.",
    "keyRule": "Use Site-to-Site VPN for encrypted VPC connectivity over an existing internet path.",
    "docs": [
      "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Hybrid",
    "q": "A global company has one AWS Direct Connect connection and wants to reach VPCs in multiple Regions through a central construct instead of building separate private virtual interfaces to each VPC. Which feature helps with this design?",
    "options": [
      "AWS Direct Connect gateway",
      "AWS Transit Gateway Network Manager",
      "AWS Storage Gateway",
      "Amazon Route 53 health checks"
    ],
    "correct": 0,
    "explanation": "A Direct Connect gateway lets you connect a Direct Connect connection to VPCs in multiple Regions through private virtual interfaces and virtual private gateways or transit gateways. Storage Gateway and Route 53 do not extend Direct Connect connectivity, and Network Manager is not the core attachment construct here.",
    "keyRule": "Use Direct Connect gateway to connect Direct Connect to VPCs across Regions.",
    "docs": [
      "https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways-intro.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Hybrid",
    "q": "An on-premises application must resolve private DNS names for resources in a VPC, and VPC workloads must also resolve selected on-premises domains. Which AWS service feature should the architects use?",
    "options": [
      "Amazon Route 53 Resolver endpoints and rules",
      "CloudFront signed cookies",
      "AWS Budgets",
      "AWS Database Migration Service"
    ],
    "correct": 0,
    "explanation": "Route 53 Resolver supports hybrid DNS by using inbound and outbound endpoints with forwarding rules between on-premises networks and VPCs. CloudFront, Budgets, and DMS do not provide hybrid DNS resolution. The boundary is DNS query forwarding between VPC and on-premises environments.",
    "keyRule": "Use Route 53 Resolver endpoints and rules for hybrid DNS resolution.",
    "docs": [
      "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Migration",
    "q": "A storage team is setting up DataSync to read from an on-premises SMB server. They ask what component runs in their environment to access the source storage for the transfer. What should they deploy?",
    "options": [
      "AWS DataSync agent",
      "AWS Application Migration Service replication server only",
      "AWS Transfer Family user",
      "CloudFront Function"
    ],
    "correct": 0,
    "explanation": "For on-premises storage transfers, DataSync uses an agent deployed in the storage environment to read from or write to the source or destination. MGN replication servers, Transfer Family users, and CloudFront Functions do not provide DataSync access to on-premises SMB storage.",
    "keyRule": "Deploy a DataSync agent when DataSync must access on-premises storage.",
    "docs": [
      "https://docs.aws.amazon.com/datasync/latest/userguide/how-datasync-works.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Migration",
    "q": "A factory has intermittent connectivity but needs to collect sensor data locally, run limited edge processing, and later ship accumulated data to AWS. Which AWS Snow Family option best matches this pattern?",
    "options": [
      "AWS Snowball Edge",
      "AWS DataSync online transfer",
      "AWS Database Migration Service",
      "AWS Transfer Family SFTP server"
    ],
    "correct": 0,
    "explanation": "Snowball Edge devices include local storage and compute capabilities and can transfer data to AWS by shipping the device. This fits disconnected or bandwidth-constrained edge locations. DataSync requires network transfer, DMS is for databases, and Transfer Family handles file-transfer protocols.",
    "keyRule": "Use Snowball Edge when local edge compute/storage and offline transfer are required.",
    "docs": [
      "https://docs.aws.amazon.com/snowball/latest/developer-guide/how-it-works.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Migration",
    "q": "A team plans to move an entire database server operating system and application stack to EC2 with little change. They are considering AWS DMS because a database is involved. Which service is the better fit for the full server move?",
    "options": [
      "AWS Application Migration Service",
      "AWS Database Migration Service",
      "AWS Schema Conversion Tool",
      "AWS Cost Explorer"
    ],
    "correct": 0,
    "explanation": "AWS Application Migration Service rehosts whole source servers to EC2, including the operating system and application stack. AWS DMS migrates database data, not the full server environment, and SCT converts schemas. The boundary is server rehosting rather than database-only migration.",
    "keyRule": "Use MGN for whole-server rehosting; use DMS when the task is database data migration.",
    "docs": [
      "https://docs.aws.amazon.com/mgn/latest/ug/launching-test-and-cutover-instances.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Hybrid",
    "q": "A file share must remain available to on-premises users every day while transparently using AWS storage as the durable backend. The team is not doing a one-time migration copy. Which service is the best fit?",
    "options": [
      "AWS Storage Gateway",
      "AWS DataSync",
      "AWS Snowball Edge",
      "AWS Application Discovery Service"
    ],
    "correct": 0,
    "explanation": "Storage Gateway provides ongoing hybrid access patterns such as file, volume, or tape gateways backed by AWS storage. DataSync is optimized for transfer tasks rather than serving as a persistent file-share interface. Snowball and Application Discovery solve offline transfer and planning.",
    "keyRule": "Use Storage Gateway for ongoing hybrid storage access, not one-time transfer jobs.",
    "docs": [
      "https://docs.aws.amazon.com/storagegateway/latest/userguide/file-gateway-concepts.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Hybrid",
    "q": "A hybrid application in a VPC must call services by private on-premises DNS names, and on-premises clients must resolve private hosted zone records in AWS. The team wants managed DNS forwarding rather than custom DNS proxy instances. What should they use?",
    "options": [
      "Route 53 Resolver inbound and outbound endpoints",
      "AWS Direct Connect gateway only",
      "AWS Transfer Family",
      "AWS Config aggregator"
    ],
    "correct": 0,
    "explanation": "Route 53 Resolver inbound and outbound endpoints provide managed DNS forwarding between VPCs and on-premises networks. Direct Connect can provide connectivity but does not by itself implement DNS forwarding. Transfer Family and Config aggregators solve unrelated needs.",
    "keyRule": "Use Route 53 Resolver endpoints for managed hybrid DNS forwarding.",
    "docs": [
      "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Serverless",
    "q": "An order-processing system places work messages in Amazon SQS. A Lambda function should poll the queue, receive messages in batches, and delete messages only after successful processing. Which Lambda feature should be configured?",
    "options": [
      "Lambda event source mapping for Amazon SQS",
      "Lambda function URL",
      "API Gateway WebSocket API",
      "EventBridge scheduled rule"
    ],
    "correct": 0,
    "explanation": "A Lambda event source mapping polls supported queue and stream sources such as SQS and invokes the function with batches of records. With SQS, successful processing lets Lambda delete messages from the queue. Function URLs and API Gateway expose HTTP endpoints, while EventBridge schedules time-based invocations.",
    "keyRule": "Use a Lambda event source mapping when Lambda should poll SQS and process messages in batches.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Serverless",
    "q": "A financial application processes records from a Kinesis data stream. The team wants Lambda to process records from each shard while preserving per-shard ordering. Which integration pattern fits best?",
    "options": [
      "Lambda event source mapping for Kinesis Data Streams",
      "API Gateway REST API invoking Lambda",
      "EventBridge scheduled rule invoking Lambda",
      "Lambda function URL behind CloudFront"
    ],
    "correct": 0,
    "explanation": "Lambda event source mappings support stream sources such as Kinesis and process records by shard, preserving ordering within a shard. API Gateway and function URLs are HTTP entry points, and scheduled rules do not read stream shards. The boundary is stream polling with ordered shard processing.",
    "keyRule": "Use a Lambda event source mapping for ordered processing from Kinesis or DynamoDB streams.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Serverless",
    "q": "A DynamoDB stream contains several event types, but a Lambda consumer should run only for item inserts that match a specific attribute pattern. The team wants to avoid invoking the function for irrelevant records. Which feature should they use?",
    "options": [
      "Lambda event filtering on the event source mapping",
      "A CloudFront cache policy",
      "Reserved concurrency only",
      "API Gateway request validation"
    ],
    "correct": 0,
    "explanation": "Lambda event filtering lets an event source mapping discard records that do not match a filter pattern before invoking the function. Reserved concurrency controls capacity, not event selection. CloudFront and API Gateway features do not filter DynamoDB stream records.",
    "keyRule": "Use Lambda event filtering to reduce invocations from stream or queue sources before function execution.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventfiltering.html",
      "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Serverless",
    "q": "A Lambda function is invoked asynchronously after image uploads. If processing fails after retries, the team wants a reliable record sent to another service for later remediation. Which feature should be configured?",
    "options": [
      "Lambda asynchronous invocation destination or dead-letter handling",
      "API Gateway usage plan",
      "CloudWatch dashboard only",
      "Step Functions Express workflow type"
    ],
    "correct": 0,
    "explanation": "For asynchronous Lambda invocations, AWS supports destinations and failure handling so records can be sent to another target after processing succeeds or fails. API Gateway usage plans and dashboards do not retain failed async events, and merely choosing Express workflow does not configure Lambda async failure capture.",
    "keyRule": "Use Lambda async destinations or failure handling when failed asynchronous events must be retained.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Serverless",
    "q": "A Lambda function reads from an SQS queue, but the downstream database can safely handle only a limited number of concurrent writers. Which configuration should cap the function concurrency to protect the database?",
    "options": [
      "Reserved concurrency on the Lambda function",
      "CloudFront Origin Shield",
      "API Gateway WebSocket route selection",
      "AWS Cost Explorer forecast"
    ],
    "correct": 0,
    "explanation": "Reserved concurrency sets both a reservation and a maximum concurrency for a Lambda function, which can cap how many instances run at the same time. That protects downstream systems from too many concurrent writes. The other options do not control Lambda concurrency.",
    "keyRule": "Use reserved concurrency when a Lambda function needs a hard concurrency cap.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-scaling.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Serverless",
    "q": "A startup needs a low-cost HTTPS API in front of Lambda functions. It only needs basic REST-style routing, JWT authorization, and CORS support, and does not require advanced REST API features. Which API Gateway type is usually the best fit?",
    "options": [
      "API Gateway HTTP API",
      "API Gateway REST API",
      "API Gateway WebSocket API",
      "AWS AppSync GraphQL API"
    ],
    "correct": 0,
    "explanation": "HTTP APIs are designed for lower-cost, lower-latency RESTful APIs with a simpler feature set and support for Lambda integrations, JWT authorization, and CORS. REST APIs support more advanced API Gateway features, while WebSocket APIs and AppSync solve different communication models.",
    "keyRule": "Use HTTP APIs for simple, cost-effective RESTful APIs when advanced REST API features are unnecessary.",
    "docs": [
      "https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Serverless",
    "q": "A public API requires API keys, usage plans, request validation, and mature API Gateway REST features. The team accepts the additional feature surface and cost. Which API Gateway type should it choose?",
    "options": [
      "API Gateway REST API",
      "API Gateway HTTP API",
      "API Gateway WebSocket API",
      "Lambda function URL only"
    ],
    "correct": 0,
    "explanation": "REST APIs provide the mature API Gateway feature set, including capabilities such as API keys, usage plans, request validation, and extensive request/response controls. HTTP APIs are simpler and lower cost but have fewer features. WebSocket APIs are for bidirectional messaging.",
    "keyRule": "Choose REST APIs when advanced API Gateway REST features such as API keys and usage plans are required.",
    "docs": [
      "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Serverless",
    "q": "A live collaboration app needs clients to keep persistent connections open so the backend can push updates to users without waiting for a new HTTP request. Which API type is the best fit?",
    "options": [
      "API Gateway WebSocket API",
      "API Gateway REST API",
      "API Gateway HTTP API",
      "CloudWatch Synthetics canary"
    ],
    "correct": 0,
    "explanation": "API Gateway WebSocket APIs support bidirectional communication over persistent connections, allowing backends to send callback messages to connected clients. REST and HTTP APIs are request/response models, and Synthetics is for monitoring.",
    "keyRule": "Use WebSocket APIs when clients and backend need bidirectional real-time communication.",
    "docs": [
      "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Serverless",
    "q": "A loan approval workflow can run for several days, must be auditable, and should not rerun non-idempotent payment-related tasks unless explicitly retried. Which Step Functions workflow type is best?",
    "options": [
      "Step Functions Standard Workflow",
      "Step Functions Express Workflow",
      "Lambda asynchronous invocation only",
      "EventBridge Pipes"
    ],
    "correct": 0,
    "explanation": "Standard Workflows are intended for long-running, durable, auditable workflows and provide exactly-once workflow execution unless retries are configured. Express Workflows are for high-volume short-duration workloads and have different execution semantics. Lambda alone does not provide durable workflow state.",
    "keyRule": "Use Step Functions Standard for long-running, auditable, durable workflows with non-idempotent steps.",
    "docs": [
      "https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Serverless",
    "q": "A telemetry platform needs to run a very high volume of short-lived serverless workflows for IoT events. Individual workflow executions finish quickly and the workload is designed to tolerate at-least-once processing. Which Step Functions type is the best fit?",
    "options": [
      "Step Functions Express Workflow",
      "Step Functions Standard Workflow",
      "API Gateway REST API",
      "AWS Migration Hub Orchestrator"
    ],
    "correct": 0,
    "explanation": "Express Workflows are designed for high-event-rate, short-duration workloads and use at-least-once semantics for asynchronous executions. Standard Workflows are better for long-running durable workflows with detailed audit history. The boundary is high-volume short workflow execution.",
    "keyRule": "Use Step Functions Express for high-volume short workflows that can tolerate its execution semantics.",
    "docs": [
      "https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Architecture",
    "q": "A human approval step must pause an order workflow until an external system calls back with a task token. The workflow should continue only after that callback is received. Which AWS service pattern is the best fit?",
    "options": [
      "Step Functions callback with task token",
      "Lambda reserved concurrency",
      "EventBridge scheduled rule",
      "API Gateway HTTP API only"
    ],
    "correct": 0,
    "explanation": "Step Functions supports callback patterns where a task waits for an external callback with a task token before the state machine continues. Lambda concurrency and EventBridge schedules do not provide durable wait-for-callback workflow state. API Gateway might receive the callback, but Step Functions provides the workflow pattern.",
    "keyRule": "Use Step Functions callback with task token when a workflow must wait for an external approval or response.",
    "docs": [
      "https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Architecture",
    "q": "A workflow coordinates several AWS service calls and currently uses Lambda functions only to call downstream AWS APIs and pass results to the next step. The team wants to reduce glue code where possible. Which Step Functions capability should it use?",
    "options": [
      "Step Functions service integrations",
      "Lambda function URLs",
      "CloudFront Functions",
      "AWS Transfer Family"
    ],
    "correct": 0,
    "explanation": "Step Functions service integrations can call supported AWS services directly from workflow states, reducing Lambda glue code for orchestration. Function URLs expose Lambda over HTTP, CloudFront Functions run at the edge, and Transfer Family handles file transfers.",
    "keyRule": "Use Step Functions service integrations to orchestrate AWS service calls without unnecessary Lambda glue.",
    "docs": [
      "https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Architecture",
    "q": "Several independent services publish business events, and many consumers need to subscribe based on event patterns. New consumers should be added without changing the publishers. Which EventBridge construct is the best fit?",
    "options": [
      "EventBridge event bus with rules",
      "EventBridge Pipe from one source to one target",
      "API Gateway REST API",
      "Lambda provisioned concurrency"
    ],
    "correct": 0,
    "explanation": "An EventBridge event bus supports event-driven routing where many producers publish events and rules route matching events to multiple targets. EventBridge Pipes are point-to-point integrations from one source to one target. API Gateway and Lambda concurrency do not provide many-to-many event routing.",
    "keyRule": "Use an EventBridge event bus and rules for many-to-many event routing.",
    "docs": [
      "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html",
      "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Architecture",
    "q": "An SQS queue should send only high-priority messages to a Step Functions workflow after calling a Lambda function to enrich each message. The team wants a managed point-to-point integration without writing a custom poller. Which feature should they use?",
    "options": [
      "Amazon EventBridge Pipes",
      "EventBridge event bus only",
      "API Gateway WebSocket API",
      "CloudWatch dashboard"
    ],
    "correct": 0,
    "explanation": "EventBridge Pipes connects one supported source to one target with optional filtering and enrichment. That matches a point-to-point SQS-to-Step-Functions integration with Lambda enrichment. Event buses are better for many-to-many routing, and API Gateway or dashboards do not poll SQS.",
    "keyRule": "Use EventBridge Pipes for point-to-point source-to-target integrations with filtering and enrichment.",
    "docs": [
      "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-pipes.html",
      "https://docs.aws.amazon.com/eventbridge/latest/userguide/pipes-concepts.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Architecture",
    "q": "A cleanup Lambda function must run every night at 02:00 UTC. The team wants a managed serverless schedule and no EC2 cron host. What should it configure?",
    "options": [
      "Amazon EventBridge scheduled rule",
      "API Gateway HTTP API",
      "Lambda event source mapping for SQS",
      "AWS Config managed rule"
    ],
    "correct": 0,
    "explanation": "EventBridge scheduled rules can invoke targets such as Lambda functions on a cron or rate expression. API Gateway handles client requests, event source mappings poll queues or streams, and Config rules evaluate resource configuration. The boundary is managed time-based invocation.",
    "keyRule": "Use EventBridge scheduled rules for managed cron-style serverless jobs.",
    "docs": [
      "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Decoupling",
    "q": "A Lambda function consuming from SQS occasionally processes messages slowly. The team wants Lambda to scale pollers but keep maximum concurrency under control for this queue source. Which area should they configure?",
    "options": [
      "Lambda SQS event source scaling and function concurrency controls",
      "CloudFront response headers policy",
      "API Gateway usage plans only",
      "AWS DataSync task options"
    ],
    "correct": 0,
    "explanation": "Lambda integrates with SQS through an event source mapping and has scaling behavior for SQS pollers; function concurrency controls can limit total concurrent executions. API Gateway usage plans and CloudFront or DataSync settings do not control SQS-to-Lambda processing scale.",
    "keyRule": "Use SQS event source mapping scaling plus Lambda concurrency controls for queue-driven Lambda workloads.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-scaling.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Decoupling",
    "q": "A Lambda consumer reads messages from an SQS queue, but poison messages should not be retried forever and block useful work. Which queue-side pattern should be configured?",
    "options": [
      "Amazon SQS dead-letter queue",
      "API Gateway request validator",
      "Lambda provisioned concurrency",
      "CloudWatch dashboard"
    ],
    "correct": 0,
    "explanation": "An SQS dead-letter queue receives messages that cannot be processed successfully after the configured receive count, allowing operators to inspect failures without endlessly retrying them. Provisioned concurrency affects cold starts, and API Gateway or dashboards do not isolate poison messages.",
    "keyRule": "Use an SQS dead-letter queue to isolate messages that repeatedly fail processing.",
    "docs": [
      "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Serverless",
    "q": "A Lambda function needs to connect to a private Amazon RDS database in private subnets. The function should not expose the database publicly. Which Lambda configuration is required?",
    "options": [
      "Configure the Lambda function for VPC access to the private subnets",
      "Use a Lambda function URL for database access",
      "Put the database behind CloudFront",
      "Use an EventBridge scheduled rule only"
    ],
    "correct": 0,
    "explanation": "Configuring Lambda for VPC access lets the function connect to private resources such as RDS instances in private subnets. Function URLs expose HTTP access to the function, not private database connectivity. CloudFront and schedules do not provide VPC network attachment.",
    "keyRule": "Configure Lambda VPC access when a function must reach private VPC resources.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Serverless",
    "q": "A Lambda-based image processor needs several gigabytes of temporary working space during invocation, but the output is stored in S3 after processing. Which Lambda setting should be adjusted?",
    "options": [
      "Ephemeral storage size for `/tmp`",
      "Reserved concurrency only",
      "API Gateway stage cache",
      "EventBridge event bus archive"
    ],
    "correct": 0,
    "explanation": "Lambda lets you configure ephemeral storage for the `/tmp` directory when a function needs more temporary local disk space during invocation. Reserved concurrency controls scale, API Gateway cache affects API responses, and EventBridge archives store events.",
    "keyRule": "Increase Lambda ephemeral storage when the function needs more temporary local `/tmp` space.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/configuration-ephemeral-storage.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Serverless",
    "q": "A team wants to define Lambda functions, API Gateway routes, and event sources in a concise infrastructure-as-code format built specifically for serverless applications. Which framework should it use?",
    "options": [
      "AWS Serverless Application Model (AWS SAM)",
      "AWS Schema Conversion Tool",
      "AWS Migration Hub",
      "Amazon Macie"
    ],
    "correct": 0,
    "explanation": "AWS SAM is an open-source framework and template specification for defining serverless applications such as Lambda functions, APIs, and event source mappings. SCT converts database schemas, Migration Hub tracks migrations, and Macie classifies S3 data.",
    "keyRule": "Use AWS SAM to define and deploy serverless application resources with concise IaC syntax.",
    "docs": [
      "https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Serverless",
    "q": "A mobile app needs a managed GraphQL API that can integrate with DynamoDB and Lambda and support real-time data updates to clients. Which AWS service is the best fit?",
    "options": [
      "AWS AppSync",
      "API Gateway REST API",
      "AWS Step Functions Standard Workflow",
      "Amazon SQS"
    ],
    "correct": 0,
    "explanation": "AWS AppSync is a managed GraphQL service that can connect to data sources such as DynamoDB and Lambda and supports real-time application patterns. API Gateway REST APIs are request/response APIs, Step Functions orchestrates workflows, and SQS queues messages.",
    "keyRule": "Use AppSync for managed GraphQL APIs and real-time data synchronization patterns.",
    "docs": [
      "https://docs.aws.amazon.com/appsync/latest/devguide/designing-a-graphql-api.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Serverless",
    "q": "A DynamoDB table should trigger processing whenever items change, and the processor must receive the ordered stream records for each partition key. Which integration should be used?",
    "options": [
      "DynamoDB Streams with Lambda",
      "API Gateway HTTP API with Lambda",
      "EventBridge scheduled rule",
      "CloudFront Function"
    ],
    "correct": 0,
    "explanation": "DynamoDB Streams can capture table item changes and invoke Lambda for stream processing. API Gateway handles HTTP requests, scheduled rules run on time intervals, and CloudFront Functions run at the edge. The boundary is table-change stream processing.",
    "keyRule": "Use DynamoDB Streams with Lambda for reacting to DynamoDB item changes.",
    "docs": [
      "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Serverless",
    "q": "A Lambda function processes records from Kinesis and should handle several records per invocation to improve efficiency. Which setting area controls batch size and batching window for the stream source?",
    "options": [
      "Lambda event source mapping settings",
      "API Gateway route selection expression",
      "Step Functions workflow type",
      "CloudWatch composite alarm rule"
    ],
    "correct": 0,
    "explanation": "Lambda event source mapping settings control how Lambda reads from stream sources, including batch size and batching behavior. API Gateway routes, Step Functions workflow type, and CloudWatch alarm rules do not control Kinesis record batching into Lambda.",
    "keyRule": "Configure event source mapping batch settings for Lambda stream consumers.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Serverless",
    "q": "A Lambda function is invoked asynchronously by an application. The team wants to send successful results to one target and failed events to another target for later analysis. Which feature is most direct?",
    "options": [
      "Lambda destinations for asynchronous invocation",
      "SQS visibility timeout only",
      "API Gateway usage plan",
      "CloudFront signed cookies"
    ],
    "correct": 0,
    "explanation": "Lambda destinations can route the result of asynchronous invocations to different targets on success or failure. SQS visibility timeout applies to queue message processing, and API Gateway or CloudFront settings do not route async Lambda outcomes.",
    "keyRule": "Use Lambda destinations to route asynchronous invocation success and failure outcomes.",
    "docs": [
      "https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html",
      "https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Architecture",
    "q": "A workflow processes payment steps where duplicate execution could charge a customer twice. The workflow may run for hours and requires detailed execution history for audit. Which workflow type is the safest default?",
    "options": [
      "Step Functions Standard Workflow",
      "Step Functions Express Workflow",
      "EventBridge Pipe",
      "Lambda asynchronous invocation only"
    ],
    "correct": 0,
    "explanation": "Standard Workflows provide durable, auditable execution history and exactly-once workflow execution unless retries are explicitly configured, making them safer for non-idempotent payment steps. Express Workflows are optimized for high-rate short workloads and have different execution guarantees. Pipes and async Lambda do not provide the same workflow guarantees.",
    "keyRule": "Use Standard Workflows for long-running auditable workflows with non-idempotent steps.",
    "docs": [
      "https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html"
    ]
  },
  {
    "exam": 1,
    "topic": "High Availability & Resilience",
    "q": "A business continuity team is documenting disaster recovery requirements. They need to define the maximum acceptable downtime and the maximum acceptable data loss after a disaster. Which pair of objectives captures these requirements?",
    "options": [
      "RTO for downtime and RPO for data loss",
      "MTU for downtime and TTL for data loss",
      "IAM policy and security group",
      "CPU utilization and request latency"
    ],
    "correct": 0,
    "explanation": "Recovery Time Objective defines the maximum acceptable delay before service is restored, while Recovery Point Objective defines the maximum acceptable data loss measured from the last recovery point. Network and security settings do not express disaster recovery targets. The boundary is DR objective definition.",
    "keyRule": "Use RTO for maximum downtime and RPO for maximum data loss.",
    "docs": [
      "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/disaster-recovery-dr-objectives.html",
      "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html"
    ]
  },
  {
    "exam": 2,
    "topic": "High Availability & Resilience",
    "q": "A low-priority internal reporting system can tolerate several hours of data loss and a full day to restore service after a Regional disaster. The company wants the lowest-cost DR strategy. Which strategy best matches?",
    "options": [
      "Backup and restore",
      "Warm standby",
      "Active-active multi-Region",
      "Multi-AZ only in one Region"
    ],
    "correct": 0,
    "explanation": "Backup and restore is the lowest-cost DR strategy in the Well-Architected guidance and fits workloads with relaxed RTO and RPO. Warm standby and active-active reduce recovery time but cost more, while Multi-AZ alone does not address Region-level disaster recovery.",
    "keyRule": "Use backup and restore when DR objectives are relaxed and cost is the main constraint.",
    "docs": [
      "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_disaster_recovery.html",
      "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/disaster-recovery-dr-objectives.html"
    ]
  },
  {
    "exam": 3,
    "topic": "High Availability & Resilience",
    "q": "A customer portal needs core infrastructure and replicated data already present in a recovery Region, but the application fleet can be scaled up during recovery. The company wants better RTO than backup and restore without running the full stack at all times. Which DR strategy fits?",
    "options": [
      "Pilot light",
      "Backup and restore only",
      "Active-active multi-Region",
      "Single-AZ standby"
    ],
    "correct": 0,
    "explanation": "Pilot light keeps the critical core of the workload and replicated data available in the recovery Region, then scales the rest during recovery. Backup and restore is slower, active-active runs full capacity in multiple Regions, and single-AZ standby is not a Regional DR strategy.",
    "keyRule": "Use pilot light when core systems and data stay ready but full capacity is launched during recovery.",
    "docs": [
      "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_disaster_recovery.html"
    ]
  },
  {
    "exam": 4,
    "topic": "High Availability & Resilience",
    "q": "An ecommerce platform needs a recovery Region that already runs a scaled-down but complete copy of the application. During disaster recovery, the team will scale it up to production capacity. Which strategy is this?",
    "options": [
      "Warm standby",
      "Backup and restore",
      "Pilot light with only data replication",
      "Single-Region Multi-AZ"
    ],
    "correct": 0,
    "explanation": "Warm standby runs a functional but reduced-capacity copy of the workload in another Region, allowing faster recovery by scaling up. Pilot light usually keeps only core components ready, and backup and restore requires rebuilding more of the environment. Multi-AZ is intra-Region availability.",
    "keyRule": "Warm standby keeps a scaled-down complete environment ready in the recovery Region.",
    "docs": [
      "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_disaster_recovery.html"
    ]
  },
  {
    "exam": 5,
    "topic": "High Availability & Resilience",
    "q": "A global application must serve users from multiple Regions at the same time and continue operating if one Region fails, with the lowest practical RTO. The company accepts the highest cost and operational complexity. Which DR strategy fits?",
    "options": [
      "Active-active multi-Region",
      "Backup and restore",
      "Pilot light",
      "Single-Region Multi-AZ"
    ],
    "correct": 0,
    "explanation": "Active-active multi-Region runs the workload in more than one Region simultaneously and offers the lowest recovery time, but with the highest cost and complexity. Backup and restore, pilot light, and single-Region Multi-AZ do not meet simultaneous multi-Region operation.",
    "keyRule": "Use active-active multi-Region when the lowest RTO is required and cost/complexity are acceptable.",
    "docs": [
      "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_disaster_recovery.html"
    ]
  },
  {
    "exam": 1,
    "topic": "High Availability & Resilience",
    "q": "A compliance policy requires backups of supported AWS resources to be automatically copied to a second AWS Region. The team wants a managed backup service rather than custom snapshot scripts. Which service capability should they use?",
    "options": [
      "AWS Backup cross-Region copy",
      "Amazon Route 53 failover routing",
      "Amazon CloudFront origin failover",
      "AWS DMS change data capture"
    ],
    "correct": 0,
    "explanation": "AWS Backup can copy backups to another Region on demand or as part of a scheduled backup plan. Route 53 and CloudFront are traffic-layer features, and DMS CDC is for database migration replication. The boundary is managed backup copy across Regions.",
    "keyRule": "Use AWS Backup cross-Region copy for managed backup copies in another Region.",
    "docs": [
      "https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html"
    ]
  },
  {
    "exam": 2,
    "topic": "High Availability & Resilience",
    "q": "A security team wants backup copies stored in a separate AWS account in the same organization so accidental deletion or compromise in the source account is less likely to remove all recovery points. Which AWS Backup feature fits?",
    "options": [
      "Cross-account backup copy",
      "Route 53 ARC zonal shift",
      "RDS Multi-AZ deployment",
      "CloudWatch composite alarm"
    ],
    "correct": 0,
    "explanation": "AWS Backup supports copying backups to another AWS account in the organization, which helps isolate recovery points from the source account. Zonal shift moves traffic away from an AZ, RDS Multi-AZ is database availability, and alarms do not isolate backups.",
    "keyRule": "Use AWS Backup cross-account copy to isolate recovery points in another account.",
    "docs": [
      "https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html"
    ]
  },
  {
    "exam": 3,
    "topic": "High Availability & Resilience",
    "q": "A company wants disaster recovery for on-premises servers by continuously replicating them to AWS and launching recovery instances on EC2 during failover. Which AWS service is designed for this?",
    "options": [
      "AWS Elastic Disaster Recovery",
      "AWS Backup only",
      "AWS DataSync",
      "AWS Database Migration Service"
    ],
    "correct": 0,
    "explanation": "AWS Elastic Disaster Recovery continuously replicates source servers and can launch recovery instances in AWS during a failover. AWS Backup protects supported resources, DataSync transfers files, and DMS migrates database data. The boundary is server-level disaster recovery to EC2.",
    "keyRule": "Use AWS Elastic Disaster Recovery for continuous server replication and EC2 recovery launch.",
    "docs": [
      "https://docs.aws.amazon.com/drs/latest/userguide/failback-preparing-failover.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Architecture",
    "q": "A disaster recovery team wants to test recovery of protected servers without disrupting production traffic. They also want to validate launch settings and recovery procedures before an actual event. What should they run?",
    "options": [
      "AWS Elastic Disaster Recovery drill instances",
      "A production failover without testing",
      "CloudFront invalidation",
      "AWS Budgets forecast"
    ],
    "correct": 0,
    "explanation": "Elastic Disaster Recovery supports launching drill instances so teams can test recovery without affecting production. Running an untested production failover is risky, and CloudFront or Budgets features are unrelated to server recovery validation.",
    "keyRule": "Use DRS drills to validate recovery procedures without interrupting production.",
    "docs": [
      "https://docs.aws.amazon.com/drs/latest/userguide/preparing-failover.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Architecture",
    "q": "An Application Load Balancer-backed service is experiencing a bad deployment in one Availability Zone. The team wants to temporarily move traffic away from that impaired AZ while keeping the service in the same Region. Which capability should be used?",
    "options": [
      "Amazon Application Recovery Controller zonal shift",
      "Route 53 latency routing",
      "AWS Backup cross-Region copy",
      "Aurora Global Database failover"
    ],
    "correct": 0,
    "explanation": "ARC zonal shift temporarily moves traffic for supported resources away from an impaired Availability Zone to healthy AZs in the same Region. Route 53 latency routing is DNS-based global routing, backups protect data, and Aurora Global Database is database DR.",
    "keyRule": "Use ARC zonal shift for temporary recovery from a single-AZ impairment.",
    "docs": [
      "https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.html"
    ]
  },
  {
    "exam": 1,
    "topic": "High Availability & Resilience",
    "q": "A multi-Region application uses Route 53 records to direct traffic to active and standby cells. Operators need highly reliable manual switches to control which cell receives traffic during recovery. Which ARC capability fits?",
    "options": [
      "Routing controls integrated with Route 53 health checks",
      "CloudWatch dashboards only",
      "AWS Backup vault lock",
      "S3 Lifecycle rules"
    ],
    "correct": 0,
    "explanation": "ARC routing controls are highly reliable on/off switches that can be integrated with Route 53 health checks to reroute traffic between cells such as Regions or AZs. Dashboards and backup features do not provide recovery traffic controls.",
    "keyRule": "Use ARC routing controls when operators need reliable manual traffic failover switches.",
    "docs": [
      "https://docs.aws.amazon.com/r53recovery/latest/dg/routing-control.html"
    ]
  },
  {
    "exam": 2,
    "topic": "High Availability & Resilience",
    "q": "Before a Region failover, a team wants ongoing checks that compare whether required resources in each recovery cell are ready and similarly configured. Which ARC capability addresses recovery readiness?",
    "options": [
      "ARC readiness checks",
      "CloudFront real-time logs",
      "AWS WAF managed rules",
      "AWS Cost Explorer"
    ],
    "correct": 0,
    "explanation": "ARC readiness checks audit resource sets and help determine whether application cells are ready for recovery. Logs, WAF, and cost analysis do not evaluate recovery readiness across cells. The boundary is validating failover readiness.",
    "keyRule": "Use ARC readiness checks to monitor whether recovery resources are ready for failover.",
    "docs": [
      "https://docs.aws.amazon.com/r53recovery/latest/dg/recovery-readiness.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Architecture",
    "q": "A globally distributed application uses Aurora PostgreSQL and needs low-latency reads in multiple Regions plus faster recovery from a Region-wide database outage. Writes normally go to one primary Region. Which database feature is the best fit?",
    "options": [
      "Amazon Aurora Global Database",
      "RDS Multi-AZ deployment only",
      "DynamoDB global tables",
      "AWS Backup cross-account copy"
    ],
    "correct": 0,
    "explanation": "Aurora Global Database spans multiple Regions with one primary Region for writes and read-only secondary Regions for low-latency reads and disaster recovery. RDS Multi-AZ is regional, DynamoDB global tables are for DynamoDB, and backups are slower recovery.",
    "keyRule": "Use Aurora Global Database for Aurora multi-Region reads and faster Regional database recovery.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Architecture",
    "q": "A team uses Aurora Global Database and wants application write connections to follow the current primary Region after a managed switchover or failover without changing connection strings manually. Which endpoint should they use?",
    "options": [
      "Aurora Global Database writer endpoint",
      "An individual reader endpoint in each secondary Region",
      "A CloudFront distribution endpoint",
      "An S3 Multi-Region Access Point alias"
    ],
    "correct": 0,
    "explanation": "Aurora Global Database provides a writer endpoint that automatically points to the current primary DB cluster after supported switchover or failover operations. Reader endpoints are for reads, and CloudFront or S3 aliases do not route database writes.",
    "keyRule": "Use the Aurora Global Database writer endpoint for write connections that follow the current primary Region.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-connecting.html",
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html"
    ]
  },
  {
    "exam": 5,
    "topic": "High Availability & Resilience",
    "q": "A team wants to improve availability of an Amazon RDS database against instance or Availability Zone failure inside one Region. They do not need cross-Region disaster recovery. Which feature should they use?",
    "options": [
      "RDS Multi-AZ deployment",
      "Aurora Global Database",
      "AWS Snowball Edge",
      "Route 53 weighted routing"
    ],
    "correct": 0,
    "explanation": "RDS Multi-AZ deployments provide high availability and failover within a Region by maintaining standby capacity in a different Availability Zone. Aurora Global Database is cross-Region, Snowball is for data transfer, and weighted routing is not database HA.",
    "keyRule": "Use RDS Multi-AZ for in-Region database high availability across Availability Zones.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html"
    ]
  },
  {
    "exam": 1,
    "topic": "High Availability & Resilience",
    "q": "A serverless application stores global user preferences in DynamoDB and requires low-latency reads and writes in several Regions. Which data feature is the best fit?",
    "options": [
      "DynamoDB global tables",
      "Aurora read replicas",
      "S3 Cross-Region Replication",
      "RDS Multi-AZ"
    ],
    "correct": 0,
    "explanation": "DynamoDB global tables provide multi-Region, active-active replication for DynamoDB tables, allowing local reads and writes in multiple Regions. Aurora replicas and RDS Multi-AZ are relational features, and S3 replication is for objects.",
    "keyRule": "Use DynamoDB global tables for multi-Region active-active DynamoDB access.",
    "docs": [
      "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Architecture",
    "q": "A company stores compliance documents in Amazon S3 and wants new objects copied automatically to a bucket in another Region. The goal is object-level replication, not full application failover. What should it configure?",
    "options": [
      "Amazon S3 Replication",
      "AWS Elastic Disaster Recovery",
      "RDS Multi-AZ",
      "Route 53 ARC routing controls"
    ],
    "correct": 0,
    "explanation": "S3 Replication automatically copies objects from one bucket to another bucket in the same or different Region. Elastic Disaster Recovery protects servers, RDS Multi-AZ protects databases inside a Region, and ARC controls traffic failover.",
    "keyRule": "Use S3 Replication for automatic object copies to another bucket or Region.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html"
    ]
  },
  {
    "exam": 3,
    "topic": "High Availability & Resilience",
    "q": "A simple active-passive website has a primary endpoint and a secondary endpoint. DNS should send users to the secondary endpoint only when health checks show the primary is unhealthy. Which Route 53 routing policy should be used?",
    "options": [
      "Failover routing policy",
      "Weighted routing policy",
      "Geoproximity routing policy",
      "Multivalue answer routing only"
    ],
    "correct": 0,
    "explanation": "Route 53 failover routing is designed for active-passive DNS failover using health checks to route to the secondary endpoint when the primary is unhealthy. Weighted and geoproximity routing solve traffic distribution and location bias, not basic active-passive failover.",
    "keyRule": "Use Route 53 failover routing for active-passive DNS failover.",
    "docs": [
      "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Architecture",
    "q": "A stateless web tier should remain available if one Availability Zone fails. The team wants instances distributed across multiple AZs and replacement capacity launched automatically. Which design is most appropriate?",
    "options": [
      "Application Load Balancer with an Auto Scaling group spanning multiple Availability Zones",
      "Single EC2 instance with larger instance size",
      "One NAT gateway shared by all private subnets",
      "S3 Lifecycle transition policy"
    ],
    "correct": 0,
    "explanation": "An Application Load Balancer across enabled AZs with an Auto Scaling group spanning multiple AZs is the standard resilient pattern for stateless web tiers. A single larger instance is still a single point of failure, and NAT or lifecycle settings do not provide web-tier HA.",
    "keyRule": "Use ALB plus Auto Scaling across multiple AZs for resilient stateless web tiers.",
    "docs": [
      "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html"
    ]
  },
  {
    "exam": 5,
    "topic": "High Availability & Resilience",
    "q": "A service behind an Application Load Balancer plans to use ARC zonal shift during an AZ impairment. What must the team consider before shifting traffic away from one AZ?",
    "options": [
      "The remaining AZs must have enough capacity to absorb the shifted traffic",
      "Zonal shift automatically creates new subnets in another Region",
      "Zonal shift permanently disables the impaired Availability Zone",
      "AWS Backup must restore all EC2 instances first"
    ],
    "correct": 0,
    "explanation": "ARC zonal shift moves traffic away from one AZ to the remaining healthy AZs, so the application must be pre-scaled or able to scale enough to handle the extra load. It does not create subnets, permanently disable AZs, or restore instances from backup.",
    "keyRule": "Before using zonal shift, ensure remaining AZs have enough capacity for shifted traffic.",
    "docs": [
      "https://docs.aws.amazon.com/r53recovery/latest/dg/route53-arc-best-practices.zonal-shifts.html",
      "https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.html"
    ]
  },
  {
    "exam": 1,
    "topic": "High Availability & Resilience",
    "q": "A workload is highly available across three Availability Zones in one Region. Leadership asks whether this alone satisfies a requirement to survive complete Region loss. What is the correct assessment?",
    "options": [
      "No; Multi-AZ improves Regional availability but a separate multi-Region DR strategy is needed for Region loss",
      "Yes; using three AZs always protects against Region-wide disasters",
      "Yes; Route 53 automatically recreates the workload in another Region",
      "No; Multi-AZ is useful only for storage services"
    ],
    "correct": 0,
    "explanation": "Multi-AZ architecture improves availability against AZ-level or component failures inside a Region, but it does not by itself provide recovery from a full Region outage. Region-level DR requires a strategy such as backup and restore, pilot light, warm standby, or active-active across Regions.",
    "keyRule": "Multi-AZ is not the same as multi-Region disaster recovery.",
    "docs": [
      "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html",
      "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_disaster_recovery.html"
    ]
  },
  {
    "exam": 2,
    "topic": "High Availability & Resilience",
    "q": "A team wants to use ARC zonal shift for recovery from an impaired Availability Zone. The application currently runs at just enough capacity across all AZs and cannot scale quickly. What is the main risk?",
    "options": [
      "The healthy AZs may not have enough capacity after traffic is shifted",
      "Route 53 health checks will stop working globally",
      "AWS Backup will delete cross-Region copies",
      "DynamoDB global tables will become single-Region"
    ],
    "correct": 0,
    "explanation": "Zonal shift removes traffic from one AZ, so the remaining AZs must carry the additional load. AWS recommends capacity planning and pre-scaling for this reason. The other options are unrelated effects.",
    "keyRule": "Zonal shift requires enough healthy-AZ capacity to absorb shifted traffic.",
    "docs": [
      "https://docs.aws.amazon.com/r53recovery/latest/dg/route53-arc-best-practices.zonal-shifts.html",
      "https://docs.aws.amazon.com/r53recovery/latest/dg/arc-zonal-shift.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Architecture",
    "q": "A team relies only on DNS failover for disaster recovery. The application stack, data replication, and capacity in the secondary Region are not tested. What is the key problem with this plan?",
    "options": [
      "DNS failover can route traffic, but it does not prove the recovery Region is ready to serve the application",
      "DNS failover is never useful for DR",
      "Route 53 failover automatically replicates all databases",
      "AWS WAF must be disabled before failover"
    ],
    "correct": 0,
    "explanation": "Route 53 failover can direct traffic based on health checks, but recovery also depends on application deployment, data, capacity, and readiness in the target Region. DNS routing alone cannot guarantee application recovery. The boundary is traffic routing versus end-to-end DR readiness.",
    "keyRule": "DNS failover is only one part of DR; the recovery environment must be ready and tested.",
    "docs": [
      "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html",
      "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Architecture",
    "q": "After using AWS Elastic Disaster Recovery to launch recovery instances in AWS, a company later wants to return workloads to the original source environment after it is repaired. Which DRS process is involved?",
    "options": [
      "Failback",
      "S3 replication",
      "CloudFront origin failover",
      "DynamoDB point-in-time recovery"
    ],
    "correct": 0,
    "explanation": "Elastic Disaster Recovery failback is the process of restoring workloads from recovery instances back to the original or source environment after a failover. S3 replication, CloudFront failover, and DynamoDB restore do not return recovered servers to the source site.",
    "keyRule": "Use DRS failback to return workloads to the source environment after recovery.",
    "docs": [
      "https://docs.aws.amazon.com/drs/latest/userguide/failback-preparing-failover.html"
    ]
  },
  {
    "exam": 5,
    "topic": "High Availability & Resilience",
    "q": "A company wants object data in Amazon S3 to be available in another Region for compliance and recovery planning. It also needs a separate backup plan for supported resources such as EBS and RDS. Which statement is most accurate?",
    "options": [
      "Use S3 Replication for object replication and AWS Backup for managed backup plans across supported services",
      "Use Route 53 failover routing to replicate S3 objects and EBS volumes",
      "Use RDS Multi-AZ for all S3 and EBS recovery needs",
      "Use ARC zonal shift to copy data between Regions"
    ],
    "correct": 0,
    "explanation": "S3 Replication handles object-level replication between buckets, while AWS Backup manages backup plans and copies for supported AWS resources such as EBS and RDS. DNS failover, RDS Multi-AZ, and ARC zonal shift do not replicate object and backup data across services.",
    "keyRule": "Use service-specific replication for S3 objects and AWS Backup for managed backups of supported resources.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html",
      "https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Governance",
    "q": "A central security team wants to prevent member accounts from disabling CloudTrail, even if an administrator in a member account attaches an overly permissive IAM policy. Which control should they use?",
    "options": [
      "AWS Organizations service control policy",
      "IAM user inline policy in each account",
      "Security group egress rule",
      "AWS Cost Category"
    ],
    "correct": 0,
    "explanation": "A service control policy sets the maximum available permissions for accounts in an AWS Organization, so it can prevent actions even when local IAM policies would otherwise allow them. IAM policies inside each account are easier for local administrators to bypass if they can edit permissions. Security groups and Cost Categories do not govern API permissions.",
    "keyRule": "Use SCPs for organization-wide maximum permission guardrails across member accounts.",
    "docs": [
      "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Governance",
    "q": "A company is building a landing zone and wants managed preventive and detective controls applied at the OU level for enrolled accounts. Which AWS service is designed for this governance model?",
    "options": [
      "AWS Control Tower controls",
      "AWS Compute Optimizer",
      "Amazon GuardDuty only",
      "AWS Cost and Usage Reports"
    ],
    "correct": 0,
    "explanation": "AWS Control Tower provides controls for governing accounts and OUs in a landing zone, including preventive, detective, and proactive controls. Compute Optimizer makes rightsizing recommendations, GuardDuty detects threats, and CUR exports billing data. The boundary is landing-zone governance.",
    "keyRule": "Use AWS Control Tower controls for managed landing-zone governance across OUs and accounts.",
    "docs": [
      "https://docs.aws.amazon.com/controltower/latest/controlreference/controls.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Governance",
    "q": "A network account owns shared subnets, and application accounts in the same AWS Organization need to launch EC2 instances into those centrally managed subnets. Which AWS feature enables this model?",
    "options": [
      "VPC subnet sharing through AWS RAM",
      "VPC peering between every application account",
      "AWS Transfer Family",
      "CloudFront signed cookies"
    ],
    "correct": 0,
    "explanation": "VPC subnet sharing lets a VPC owner share subnets with participant accounts in the same organization, allowing those accounts to place supported resources into the shared subnets. VPC peering connects VPCs but does not let accounts launch resources into the same subnet.",
    "keyRule": "Use VPC subnet sharing when multiple accounts should deploy resources into centrally managed subnets.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Governance",
    "q": "A platform team wants to share a supported resource, such as a subnet or license configuration, with several AWS accounts in an OU without copying the resource into each account. Which service should they use?",
    "options": [
      "AWS Resource Access Manager",
      "AWS Backup",
      "AWS Systems Manager Patch Manager",
      "Amazon Macie"
    ],
    "correct": 0,
    "explanation": "AWS RAM securely shares supported resources across AWS accounts, OUs, or an organization. It does not duplicate the resource; consuming accounts receive access according to the resource share and their permissions. Backup, Patch Manager, and Macie solve unrelated problems.",
    "keyRule": "Use AWS RAM to share supported AWS resources across accounts or OUs.",
    "docs": [
      "https://docs.aws.amazon.com/ram/latest/userguide/working-with-sharing-create.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Governance",
    "q": "A company uses licensed Microsoft and Oracle software across accounts and wants to track BYOL usage, set license rules, and reduce the risk of overusing entitlements. Which AWS service is the best fit?",
    "options": [
      "AWS License Manager",
      "AWS Cost Explorer",
      "AWS Config aggregator only",
      "Amazon Inspector"
    ],
    "correct": 0,
    "explanation": "AWS License Manager helps manage software licenses across accounts and Regions, including BYOL tracking and license rule enforcement. Cost Explorer analyzes spend, Config aggregates compliance data, and Inspector scans for vulnerabilities. The boundary is license compliance and usage tracking.",
    "keyRule": "Use AWS License Manager for license tracking and BYOL governance across AWS environments.",
    "docs": [
      "https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Cost Optimization",
    "q": "A company has steady compute usage across EC2, Fargate, and Lambda and wants flexible discounts without committing to a specific EC2 instance family, size, or Region. Which pricing model best fits?",
    "options": [
      "Compute Savings Plans",
      "EC2 Reserved Instances for one instance family",
      "Spot Instances only",
      "AWS Budgets"
    ],
    "correct": 0,
    "explanation": "Compute Savings Plans provide discounted compute pricing in exchange for a dollar-per-hour commitment and can apply across EC2 instance families, sizes, Regions, operating systems, Fargate, and Lambda. EC2 Reserved Instances are less flexible, Spot is spare capacity, and Budgets only alerts on spend.",
    "keyRule": "Use Compute Savings Plans for flexible compute discounts across EC2, Fargate, and Lambda.",
    "docs": [
      "https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Cost Optimization",
    "q": "A team wants a billing discount for a known EC2 workload and also needs a capacity reservation in one specific Availability Zone. Which purchase option can provide both when scoped correctly?",
    "options": [
      "Zonal EC2 Reserved Instance",
      "Compute Savings Plan",
      "AWS Budget",
      "Cost Category"
    ],
    "correct": 0,
    "explanation": "An EC2 Reserved Instance purchased for a specific Availability Zone can provide a capacity reservation as well as a billing discount. Compute Savings Plans provide flexible discounts but do not reserve specific capacity. Budgets and Cost Categories do not reserve compute capacity.",
    "keyRule": "Use a zonal EC2 Reserved Instance when both discount and AZ-specific capacity reservation are required.",
    "docs": [
      "https://docs.aws.amazon.com/whitepapers/latest/cost-optimization-reservation-models/amazon-ec2-reserved-instances.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Cost Optimization",
    "q": "A finance team wants automated alerts when AWS spend suddenly deviates from normal historical patterns, without manually setting a fixed budget threshold for every account. Which feature is the best fit?",
    "options": [
      "AWS Cost Anomaly Detection",
      "AWS Cost Categories",
      "EC2 Reserved Instances",
      "AWS License Manager"
    ],
    "correct": 0,
    "explanation": "AWS Cost Anomaly Detection uses monitors and alert subscriptions to identify unusual cost patterns automatically. Cost Categories group costs, RIs provide discounts, and License Manager tracks software entitlements. The boundary is anomaly-based cost alerting.",
    "keyRule": "Use Cost Anomaly Detection for automated alerts on unusual spending patterns.",
    "docs": [
      "https://docs.aws.amazon.com/cost-management/latest/userguide/getting-started-ad.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Cost Optimization",
    "q": "A company wants to map AWS charges into internal business units using rules based on linked accounts, tags, services, and Regions. Which billing feature should it configure?",
    "options": [
      "AWS Cost Categories",
      "AWS Budgets",
      "Savings Plans recommendations",
      "AWS CloudTrail Lake"
    ],
    "correct": 0,
    "explanation": "AWS Cost Categories let organizations define rules that group AWS costs into meaningful business categories such as teams, products, or business units. Budgets alerts on thresholds, Savings Plans reduce eligible usage cost, and CloudTrail Lake queries API events.",
    "keyRule": "Use Cost Categories to allocate and group AWS costs by internal business rules.",
    "docs": [
      "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-cost-categories.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Cost Optimization",
    "q": "A company bought Savings Plans in its management account and has sharing enabled in consolidated billing. How are the benefits applied across eligible usage?",
    "options": [
      "Savings Plans apply automatically to eligible usage and can apply across accounts when sharing is enabled",
      "Savings Plans reserve EC2 capacity in each Availability Zone",
      "Savings Plans apply only to the exact EC2 instance ID used when purchased",
      "Savings Plans require manual attachment to every Lambda function"
    ],
    "correct": 0,
    "explanation": "Savings Plans apply automatically to eligible usage, and in a consolidated billing family they can apply across accounts when sharing is enabled. They are billing commitments, not capacity reservations, and are not attached to individual functions or instances.",
    "keyRule": "Savings Plans are automatic billing discounts for eligible usage, not capacity reservations.",
    "docs": [
      "https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-applying.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Cost Optimization",
    "q": "A platform team wants recommendations for a Savings Plans hourly commitment based on historical usage and existing coverage. Where should they look?",
    "options": [
      "Savings Plans recommendations in AWS Cost Management",
      "AWS Config managed rules",
      "VPC Flow Logs",
      "AWS License Manager inventory"
    ],
    "correct": 0,
    "explanation": "AWS provides Savings Plans recommendations based on historical usage to help estimate an appropriate commitment and potential savings. Config, Flow Logs, and License Manager do not calculate Savings Plans commitments.",
    "keyRule": "Use Savings Plans recommendations to evaluate commitment levels based on past usage.",
    "docs": [
      "https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Governance",
    "q": "A central platform team wants to standardize tag keys and allowed values across accounts in AWS Organizations. The goal is tag governance, not cost grouping after charges are generated. Which policy type fits?",
    "options": [
      "AWS Organizations tag policy",
      "AWS Cost Category",
      "IAM permissions boundary",
      "CloudWatch dashboard"
    ],
    "correct": 0,
    "explanation": "Tag policies help standardize tag keys and values across AWS Organizations accounts. Cost Categories group charges for billing analysis but do not enforce or standardize resource tag values. IAM boundaries and dashboards solve different problems.",
    "keyRule": "Use tag policies for organization-wide tag standardization.",
    "docs": [
      "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Governance",
    "q": "A security team says an SCP should grant developers access to Amazon S3 in member accounts. What is the correct response?",
    "options": [
      "SCPs do not grant permissions; they set maximum available permissions",
      "SCPs grant permissions only to root users",
      "SCPs replace all IAM policies in member accounts",
      "SCPs are used only for billing alerts"
    ],
    "correct": 0,
    "explanation": "SCPs do not grant permissions. They define the maximum permissions available to accounts in an organization, and identities still need IAM permissions or resource policies that allow the action. The other statements misunderstand SCP behavior.",
    "keyRule": "SCPs constrain permissions but do not grant them.",
    "docs": [
      "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Networking",
    "q": "A company has dozens of VPCs and several VPN attachments that need centralized routing with route tables and segmentation. Full mesh VPC peering is becoming unmanageable. Which service should be used?",
    "options": [
      "AWS Transit Gateway",
      "AWS PrivateLink endpoint service",
      "AWS RAM only",
      "Amazon Route 53 Resolver"
    ],
    "correct": 0,
    "explanation": "AWS Transit Gateway acts as a central router for VPC and VPN attachments and supports route tables for segmentation. PrivateLink exposes services privately but does not provide general VPC-to-VPC routing. RAM can share resources, and Resolver handles DNS.",
    "keyRule": "Use Transit Gateway for centralized hub-and-spoke routing across many VPCs and hybrid attachments.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-centralized-router.html",
      "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Networking",
    "q": "A SaaS provider wants customers in other VPCs to access its service privately without opening inbound internet access or requiring VPC peering with every customer. The provider can place the service behind a Network Load Balancer. Which AWS feature fits?",
    "options": [
      "AWS PrivateLink endpoint service",
      "AWS Transit Gateway peering",
      "Route 53 public hosted zone",
      "VPC Flow Logs"
    ],
    "correct": 0,
    "explanation": "A PrivateLink endpoint service lets a provider expose a service privately to consumers through interface endpoints, commonly using a Network Load Balancer. Transit Gateway is for routing networks, Route 53 public zones expose DNS publicly, and Flow Logs are observability.",
    "keyRule": "Use PrivateLink endpoint services to expose provider services privately to consumer VPCs.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html",
      "https://docs.aws.amazon.com/whitepapers/latest/aws-privatelink/how-does-aws-privatelink-work.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Networking",
    "q": "A large organization frequently creates VPCs in multiple accounts and Regions. It wants centralized planning, allocation, and monitoring of CIDR blocks to avoid overlapping address space. Which AWS feature is the best fit?",
    "options": [
      "Amazon VPC IP Address Manager",
      "AWS Cost Categories",
      "AWS Backup vault lock",
      "CloudFront origin groups"
    ],
    "correct": 0,
    "explanation": "Amazon VPC IPAM helps plan, allocate, track, and monitor IP address space across AWS workloads, accounts, and Regions. Cost Categories, Backup, and CloudFront origin groups do not manage CIDR allocation. The boundary is centralized IP address management.",
    "keyRule": "Use VPC IPAM to manage and monitor IP address space across accounts and Regions.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html",
      "https://docs.aws.amazon.com/vpc/latest/ipam/how-it-works-ipam.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Networking",
    "q": "A networking team needs to allocate VPC CIDR blocks automatically from preapproved pools that reflect Region and environment boundaries. Which VPC IPAM concept is directly involved?",
    "options": [
      "IPAM pools and allocations",
      "CloudWatch composite alarms",
      "Savings Plans commitments",
      "AWS License Manager rules"
    ],
    "correct": 0,
    "explanation": "IPAM pools organize contiguous CIDR ranges, and allocations assign CIDRs from pools to resources such as VPCs. The other options do not allocate network address ranges. The boundary is controlled VPC CIDR provisioning.",
    "keyRule": "Use IPAM pools and allocations to assign VPC CIDRs from governed address ranges.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/ipam/how-it-works-ipam.html",
      "https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Networking",
    "q": "A Transit Gateway has production and shared-services VPC attachments. The network team wants production VPCs to reach shared services but not other production VPCs. Which Transit Gateway feature supports this segmentation?",
    "options": [
      "Separate transit gateway route tables with selective association and propagation",
      "One security group attached to the transit gateway",
      "CloudFront geographic restrictions",
      "AWS Budgets action"
    ],
    "correct": 0,
    "explanation": "Transit Gateway route tables can be associated with attachments and selectively receive propagated or static routes, enabling segmentation between groups of VPCs. Security groups do not attach to transit gateways, and CloudFront or Budgets features are unrelated.",
    "keyRule": "Use Transit Gateway route tables to segment routing between attachments.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html",
      "https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-centralized-router.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Networking",
    "q": "A networking account owns a VPC and wants application accounts to deploy resources into selected subnets, but application teams should not modify the VPC route tables or shared network infrastructure. Which pattern is appropriate?",
    "options": [
      "VPC sharing with participant accounts",
      "VPC peering from every application account",
      "Public subnets in each application account",
      "AWS Transfer Family"
    ],
    "correct": 0,
    "explanation": "With VPC sharing, the owner account shares subnets with participant accounts, and participants can create supported resources in shared subnets without owning the VPC infrastructure. Peering creates separate VPCs and does not provide shared subnet placement.",
    "keyRule": "Use VPC sharing when a central network account owns subnets used by participant accounts.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Networking",
    "q": "A company uses Direct Connect and wants private connectivity to VPCs in multiple Regions through a central construct instead of creating separate connections everywhere. Which feature helps with this?",
    "options": [
      "Direct Connect gateway",
      "Transit Gateway route table only",
      "PrivateLink endpoint service",
      "Cost Category"
    ],
    "correct": 0,
    "explanation": "A Direct Connect gateway enables a Direct Connect connection to connect to VPCs in multiple Regions through supported attachments. Transit Gateway route tables segment routing but are not the Direct Connect multi-Region construct. PrivateLink exposes services privately, and Cost Categories organize spend.",
    "keyRule": "Use Direct Connect gateway for multi-Region VPC connectivity through Direct Connect.",
    "docs": [
      "https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways-intro.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Architecture",
    "q": "A central networking team must choose between PrivateLink and Transit Gateway. The requirement is that consumers privately access one provider service, not route freely to the provider VPC network. Which option is more appropriate?",
    "options": [
      "AWS PrivateLink",
      "AWS Transit Gateway",
      "VPC peering mesh",
      "Route 53 Resolver inbound endpoint only"
    ],
    "correct": 0,
    "explanation": "PrivateLink provides private access to a specific service through interface endpoints without exposing broad network connectivity to the provider VPC. Transit Gateway and peering are broader network routing constructs. Resolver endpoints handle DNS forwarding, not service exposure.",
    "keyRule": "Use PrivateLink for private service access when broad network routing is not desired.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html",
      "https://docs.aws.amazon.com/whitepapers/latest/aws-privatelink/how-does-aws-privatelink-work.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Governance",
    "q": "A shared resource is created in one account and shared with an OU using AWS RAM. Which statement about permissions is accurate?",
    "options": [
      "The consuming account still needs IAM permissions for principals to use the shared resource",
      "AWS RAM automatically grants administrator access in every consuming account",
      "The resource is copied into every participant account",
      "The sharing account loses ownership of the resource"
    ],
    "correct": 0,
    "explanation": "AWS RAM grants access to the shared resource, but permissions that apply to roles and users in the consuming account still govern what principals can do. The resource is not copied and ownership remains with the resource owner.",
    "keyRule": "RAM sharing grants resource access, but consuming principals still need appropriate IAM permissions.",
    "docs": [
      "https://docs.aws.amazon.com/ram/latest/userguide/working-with-shared.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Cost Optimization",
    "q": "A company wants to reduce cost for stable Amazon RDS usage with a one-year or three-year commitment. The team is evaluating reservation-style discounts for database capacity. Which option should it consider?",
    "options": [
      "Reserved DB instances or eligible Database Savings Plans depending on flexibility needs",
      "S3 Lifecycle rules",
      "AWS WAF managed rules",
      "Route 53 Resolver rules"
    ],
    "correct": 0,
    "explanation": "RDS supports reserved DB instances, and Database Savings Plans can apply to supported database services with more flexibility. S3 Lifecycle, WAF, and Resolver rules solve storage lifecycle, security filtering, and DNS forwarding rather than database cost commitments.",
    "keyRule": "Use reservation or database savings commitment models for stable database usage.",
    "docs": [
      "https://docs.aws.amazon.com/savingsplans/latest/userguide/plan-types.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Governance",
    "q": "A multi-account organization wants to share a subnet only with accounts inside the organization and avoid invitation workflows for those accounts. What prerequisite improves this AWS RAM sharing experience?",
    "options": [
      "Enable sharing with AWS Organizations in AWS RAM",
      "Create a public hosted zone",
      "Disable all SCPs",
      "Purchase a Compute Savings Plan"
    ],
    "correct": 0,
    "explanation": "When sharing with accounts in the same organization, enabling AWS RAM sharing with AWS Organizations lets principals in the organization access shares without invitation workflows. Hosted zones, SCPs, and Savings Plans do not enable organization-integrated RAM sharing.",
    "keyRule": "Enable AWS RAM sharing with AWS Organizations for seamless intra-organization resource sharing.",
    "docs": [
      "https://docs.aws.amazon.com/ram/latest/userguide/working-with-sharing-create.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Networking",
    "q": "A company wants to track public and private IP address utilization trends and identify inefficient address use across AWS and on-premises networks. Which service capability should it use?",
    "options": [
      "VPC IPAM tracking and monitoring",
      "CloudTrail event history",
      "AWS Budgets alert",
      "AWS Transfer Family connector"
    ],
    "correct": 0,
    "explanation": "VPC IPAM provides visibility into IP address allocations, utilization, and usage trends across AWS and on-premises address space. CloudTrail records API events, Budgets alerts on cost, and Transfer Family handles file transfer. The boundary is IP address usage tracking.",
    "keyRule": "Use VPC IPAM to track and monitor IP address utilization across environments.",
    "docs": [
      "https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html",
      "https://docs.aws.amazon.com/vpc/latest/ipam/how-it-works-ipam.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Analytics",
    "q": "A data team stores compressed access logs in Amazon S3 and wants analysts to run SQL queries directly against the files without provisioning a data warehouse cluster. Which service is the best fit?",
    "options": [
      "Amazon Athena",
      "Amazon RDS Proxy",
      "Amazon ElastiCache",
      "AWS Application Migration Service"
    ],
    "correct": 0,
    "explanation": "Amazon Athena is a serverless interactive query service for analyzing data in Amazon S3 using SQL. RDS Proxy pools database connections, ElastiCache is an in-memory cache, and MGN rehosts servers. The boundary is ad hoc SQL over S3 data without managing query infrastructure.",
    "keyRule": "Use Athena for serverless SQL queries over data stored in S3.",
    "docs": [
      "https://docs.aws.amazon.com/athena/latest/ug/querying-athena-tables.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Analytics",
    "q": "A data lake contains new CSV and Parquet datasets in S3. The analytics team wants schema metadata discovered automatically and registered so Athena can query the data. What should they use?",
    "options": [
      "AWS Glue crawler and Data Catalog",
      "Amazon OpenSearch Service",
      "AWS Transfer Family",
      "Amazon MQ"
    ],
    "correct": 0,
    "explanation": "AWS Glue crawlers can discover datasets and populate the AWS Glue Data Catalog with table metadata that Athena can use. OpenSearch is for search and log analytics, Transfer Family handles file transfer, and Amazon MQ is a message broker.",
    "keyRule": "Use Glue crawlers and the Data Catalog to discover and register S3 data lake schemas.",
    "docs": [
      "https://docs.aws.amazon.com/glue/latest/dg/populate-catalog-methods.html",
      "https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Analytics",
    "q": "An application emits clickstream events continuously, and the team wants a managed service to deliver the stream to Amazon S3 with buffering and minimal custom consumer code. Which service should be used?",
    "options": [
      "Amazon Data Firehose",
      "Amazon Athena",
      "AWS Glue Data Catalog only",
      "Amazon EFS"
    ],
    "correct": 0,
    "explanation": "Amazon Data Firehose is a managed service for delivering streaming data to destinations such as Amazon S3, with buffering and delivery management. Athena queries stored data, Glue Catalog stores metadata, and EFS is a file system.",
    "keyRule": "Use Data Firehose for managed delivery of streaming data to destinations such as S3.",
    "docs": [
      "https://docs.aws.amazon.com/firehose/latest/dev/create-destination.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Analytics",
    "q": "A big data team needs managed Hadoop and Spark clusters for large-scale ETL jobs and wants control over cluster runtime frameworks. Which AWS service fits best?",
    "options": [
      "Amazon EMR",
      "Amazon Athena only",
      "Amazon QuickSight",
      "AWS Cost Categories"
    ],
    "correct": 0,
    "explanation": "Amazon EMR provides managed big data clusters for frameworks such as Apache Spark and Hadoop. Athena is serverless SQL, QuickSight is BI visualization, and Cost Categories groups billing data. The boundary is managed distributed processing frameworks.",
    "keyRule": "Use EMR when the workload needs managed Spark, Hadoop, or similar big data clusters.",
    "docs": [
      "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-instances-guidelines.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Analytics",
    "q": "A support team needs near-real-time search across application logs, text fields, and operational events, including full-text search and dashboards. Which managed service is the best fit?",
    "options": [
      "Amazon OpenSearch Service",
      "Amazon S3 Glacier Deep Archive",
      "AWS DMS",
      "AWS Backup"
    ],
    "correct": 0,
    "explanation": "Amazon OpenSearch Service is managed OpenSearch for search, log analytics, and real-time application monitoring use cases. Glacier Deep Archive is archival storage, DMS migrates databases, and Backup manages backups. The boundary is search and analytics indexing.",
    "keyRule": "Use OpenSearch Service for managed full-text search and log analytics.",
    "docs": [
      "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/createupdatedomains.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Analytics",
    "q": "Business users need managed dashboards and visualizations over AWS and external data sources without operating BI servers. Which service should they use?",
    "options": [
      "Amazon QuickSight",
      "Amazon EMR",
      "Amazon MQ",
      "Amazon FSx for Lustre"
    ],
    "correct": 0,
    "explanation": "Amazon QuickSight is AWS managed business intelligence for dashboards, visualizations, and analysis. EMR runs big data frameworks, MQ is a broker, and FSx for Lustre is a high-performance file system.",
    "keyRule": "Use QuickSight for managed BI dashboards and visual analytics.",
    "docs": [
      "https://docs.aws.amazon.com/quicksight/latest/user/working-with-dashboards.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Analytics",
    "q": "A company wants centralized fine-grained permissions for a data lake so teams can govern table and column access across analytics services. Which service is most appropriate?",
    "options": [
      "AWS Lake Formation",
      "Amazon EC2 Auto Scaling",
      "AWS Application Discovery Service",
      "Amazon CloudFront"
    ],
    "correct": 0,
    "explanation": "AWS Lake Formation helps build, secure, and manage data lakes, including centralized permissions for data access. Auto Scaling manages compute capacity, Discovery Service gathers migration inventory, and CloudFront delivers content.",
    "keyRule": "Use Lake Formation for centralized data lake governance and fine-grained access control.",
    "docs": [
      "https://docs.aws.amazon.com/lake-formation/latest/dg/lf-permissions-reference.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Analytics",
    "q": "A team needs to catalog data sources so Athena, Glue jobs, and other analytics services can share table definitions. Which component provides this central metadata repository?",
    "options": [
      "AWS Glue Data Catalog",
      "Amazon RDS Proxy",
      "Amazon VPC IPAM",
      "AWS License Manager"
    ],
    "correct": 0,
    "explanation": "The AWS Glue Data Catalog is a central metadata repository for databases, tables, schemas, and locations used by analytics services such as Athena and Glue. RDS Proxy, IPAM, and License Manager solve unrelated database connection, IP, and license needs.",
    "keyRule": "Use the Glue Data Catalog as the shared metadata repository for analytics datasets.",
    "docs": [
      "https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Performance",
    "q": "A high-read web application uses an RDS database and repeatedly fetches the same product catalog data. The team wants to reduce database load and improve read latency with an in-memory layer. Which service is the best fit?",
    "options": [
      "Amazon ElastiCache",
      "Amazon S3 Glacier Instant Retrieval",
      "AWS DataSync",
      "Amazon Macie"
    ],
    "correct": 0,
    "explanation": "Amazon ElastiCache provides managed in-memory caching, which is appropriate for frequently read data that can be cached to reduce database load and latency. Glacier is storage, DataSync transfers data, and Macie classifies S3 data.",
    "keyRule": "Use ElastiCache to add a managed in-memory cache for repeated low-latency reads.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/elasticache-use-cases.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Performance",
    "q": "A Lambda-heavy application opens many short-lived connections to an RDS database during traffic spikes. The database is at risk of connection exhaustion. Which service should be added?",
    "options": [
      "Amazon RDS Proxy",
      "Amazon Aurora Global Database",
      "Amazon Athena",
      "AWS Transfer Family"
    ],
    "correct": 0,
    "explanation": "RDS Proxy pools and shares database connections, helping applications scale during bursts without overwhelming the database with new connections. Aurora Global Database is multi-Region DR/read scaling, Athena queries S3, and Transfer Family handles file protocols.",
    "keyRule": "Use RDS Proxy to pool database connections and protect RDS from connection storms.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html",
      "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.howitworks.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Performance",
    "q": "A relational workload has unpredictable traffic spikes and idle periods. The team wants Aurora compatibility and automatic database capacity scaling without choosing fixed DB instance classes. Which option fits?",
    "options": [
      "Aurora Serverless v2",
      "RDS Multi-AZ only",
      "Amazon Redshift provisioned cluster",
      "DynamoDB global table"
    ],
    "correct": 0,
    "explanation": "Aurora Serverless v2 automatically scales Aurora database capacity within configured limits and is designed for variable workloads. RDS Multi-AZ provides availability, Redshift is a warehouse, and DynamoDB global tables are NoSQL multi-Region replication.",
    "keyRule": "Use Aurora Serverless v2 for Aurora workloads with variable demand and automatic capacity scaling.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html",
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.how-it-works.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Performance",
    "q": "A compute job needs a high-performance shared file system integrated with S3 datasets for machine learning training. Which managed file system is the best fit?",
    "options": [
      "Amazon FSx for Lustre",
      "Amazon EFS Standard",
      "Amazon S3 Glacier Deep Archive",
      "AWS Backup vault"
    ],
    "correct": 0,
    "explanation": "Amazon FSx for Lustre is designed for high-performance workloads such as machine learning, HPC, and media processing and can integrate with S3 data. EFS is general-purpose shared NFS, while Glacier and Backup do not provide high-performance file access.",
    "keyRule": "Use FSx for Lustre for high-performance shared file systems tied to compute-intensive workloads.",
    "docs": [
      "https://docs.aws.amazon.com/fsx/latest/LustreGuide/create-fs-linked-data-repo.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Performance",
    "q": "An application uses Amazon EFS and must support many parallel clients with bursty throughput demands. The team needs to understand EFS throughput and performance choices before selecting a mode. Which documentation area is most relevant?",
    "options": [
      "Amazon EFS performance and throughput modes",
      "AWS Cost Categories",
      "Route 53 failover routing",
      "AWS DMS task settings"
    ],
    "correct": 0,
    "explanation": "Amazon EFS performance documentation explains throughput and performance behavior for different workload patterns. Cost Categories, Route 53, and DMS address billing grouping, DNS failover, and database migration rather than EFS file system performance.",
    "keyRule": "Review EFS performance and throughput modes when tuning shared file-system workloads.",
    "docs": [
      "https://docs.aws.amazon.com/efs/latest/ug/performance.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Cost Optimization",
    "q": "A batch-processing workload can checkpoint progress and tolerate interruptions. The team wants to reduce EC2 compute cost significantly. Which capacity option should it consider?",
    "options": [
      "Amazon EC2 Spot Instances",
      "On-Demand Instances only",
      "Zonal Reserved Instances for every job",
      "RDS Proxy"
    ],
    "correct": 0,
    "explanation": "Spot Instances let you use spare EC2 capacity at lower prices and are well suited for fault-tolerant, flexible, or interruptible workloads. On-Demand is simpler but more expensive, zonal RIs reserve capacity for steady usage, and RDS Proxy is unrelated.",
    "keyRule": "Use Spot Instances for fault-tolerant workloads that can handle interruption.",
    "docs": [
      "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Cost Optimization",
    "q": "A stateless web application has predictable daily traffic patterns and needs EC2 capacity to scale before the morning peak arrives. Which service capability helps automate this?",
    "options": [
      "EC2 Auto Scaling scheduled or predictive scaling",
      "AWS Backup cross-account copy",
      "Amazon Macie discovery",
      "AWS Transfer Family SFTP connector"
    ],
    "correct": 0,
    "explanation": "EC2 Auto Scaling can adjust capacity to meet demand, including planned or forecasted demand patterns depending on configuration. Backup, Macie, and Transfer Family do not scale compute fleets.",
    "keyRule": "Use EC2 Auto Scaling policies to adjust stateless fleet capacity for changing demand.",
    "docs": [
      "https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-scheduled-scaling.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Compute",
    "q": "A genomics pipeline runs thousands of independent container jobs and needs managed scheduling across compute environments without building a custom scheduler. Which AWS service fits best?",
    "options": [
      "AWS Batch",
      "Amazon MQ",
      "Amazon QuickSight",
      "AWS License Manager"
    ],
    "correct": 0,
    "explanation": "AWS Batch is designed to run batch computing workloads by managing job queues, scheduling, and compute environments. MQ is a broker, QuickSight is BI, and License Manager tracks licenses.",
    "keyRule": "Use AWS Batch for managed scheduling and execution of batch compute jobs.",
    "docs": [
      "https://docs.aws.amazon.com/batch/latest/userguide/job_queues.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Compute",
    "q": "A workload uses open-source Apache Kafka clients and needs a managed Kafka-compatible streaming platform. The team does not want to operate brokers itself. Which service should it choose?",
    "options": [
      "Amazon Managed Streaming for Apache Kafka",
      "Amazon SQS FIFO",
      "Amazon EventBridge Pipes",
      "Amazon MQ"
    ],
    "correct": 0,
    "explanation": "Amazon MSK is a managed service for Apache Kafka-compatible streaming, allowing Kafka clients and applications to run without self-managing broker infrastructure. SQS FIFO and EventBridge solve different messaging patterns, and Amazon MQ is for traditional brokers.",
    "keyRule": "Use Amazon MSK when Kafka compatibility is required without self-managing Kafka brokers.",
    "docs": [
      "https://docs.aws.amazon.com/msk/latest/developerguide/create-cluster.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Decoupling",
    "q": "A company has existing enterprise applications that require a managed message broker compatible with ActiveMQ or RabbitMQ protocols. Which AWS service is the best fit?",
    "options": [
      "Amazon MQ",
      "Amazon MSK",
      "Amazon SQS",
      "Amazon EventBridge"
    ],
    "correct": 0,
    "explanation": "Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ compatibility. MSK is for Kafka, SQS is a managed queue with its own API, and EventBridge is event routing. The boundary is traditional broker protocol compatibility.",
    "keyRule": "Use Amazon MQ when applications require ActiveMQ or RabbitMQ compatibility.",
    "docs": [
      "https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/amazon-mq-broker-architecture.html",
      "https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/broker-engine.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Database",
    "q": "A fraud platform needs to store and query highly connected entities such as accounts, devices, transactions, and relationships between them. Which database service is best suited?",
    "options": [
      "Amazon Neptune",
      "Amazon Redshift",
      "Amazon ElastiCache",
      "Amazon S3"
    ],
    "correct": 0,
    "explanation": "Amazon Neptune is a managed graph database service designed for highly connected data and relationship queries. Redshift is a data warehouse, ElastiCache is an in-memory cache, and S3 is object storage.",
    "keyRule": "Use Neptune for graph workloads centered on relationships between entities.",
    "docs": [
      "https://docs.aws.amazon.com/neptune/latest/userguide/intro.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Database",
    "q": "A monitoring platform stores billions of timestamped sensor measurements and frequently queries recent time windows and aggregations. Which purpose-built database is the best fit?",
    "options": [
      "Amazon Timestream",
      "Amazon Neptune",
      "Amazon DocumentDB",
      "Amazon MQ"
    ],
    "correct": 0,
    "explanation": "Amazon Timestream is purpose-built for time-series data, including storage and queries over timestamped measurements. Neptune is graph, DocumentDB is document-oriented, and MQ is messaging. The boundary is time-series data and time-window analytics.",
    "keyRule": "Use Timestream for time-series data such as sensor or telemetry measurements.",
    "docs": [
      "https://docs.aws.amazon.com/timestream/latest/developerguide/key-concepts.html",
      "https://docs.aws.amazon.com/timestream/latest/developerguide/ts-limits.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Database",
    "q": "A serverless application uses Aurora PostgreSQL and experiences sudden connection spikes from many Lambda invocations. The main bottleneck is database connection management, not CPU. Which component should be added?",
    "options": [
      "Amazon RDS Proxy",
      "Aurora Global Database",
      "DynamoDB Accelerator",
      "Amazon OpenSearch Service"
    ],
    "correct": 0,
    "explanation": "RDS Proxy pools and reuses database connections, which directly addresses connection spikes from serverless applications. Aurora Global Database is cross-Region, DAX is for DynamoDB reads, and OpenSearch is for search.",
    "keyRule": "Use RDS Proxy when connection pooling is the primary relational database scaling issue.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Database",
    "q": "A new relational SaaS product has unknown tenant growth and unpredictable usage. The team wants Aurora with capacity that scales in fine-grained increments instead of provisioning for peak. Which option should it select?",
    "options": [
      "Aurora Serverless v2",
      "RDS read replica only",
      "Amazon Redshift Serverless",
      "Amazon ElastiCache"
    ],
    "correct": 0,
    "explanation": "Aurora Serverless v2 scales Aurora capacity automatically based on workload demand and avoids choosing fixed instance capacity up front. Read replicas scale reads, Redshift Serverless is analytics warehousing, and ElastiCache is caching.",
    "keyRule": "Choose Aurora Serverless v2 for unpredictable Aurora relational capacity needs.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Database",
    "q": "An application needs low-latency repeated reads of session-like data but can rebuild the data from the primary database if the cache is lost. Which service is appropriate?",
    "options": [
      "Amazon ElastiCache",
      "Amazon RDS Multi-AZ",
      "Amazon S3 Glacier Flexible Retrieval",
      "AWS Backup"
    ],
    "correct": 0,
    "explanation": "ElastiCache is appropriate for ephemeral in-memory cache data that improves latency and reduces load on the primary database. Multi-AZ and Backup protect durable databases, while Glacier is archival storage.",
    "keyRule": "Use ElastiCache for rebuildable hot data that benefits from in-memory access.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/elasticache-use-cases.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Analytics",
    "q": "A security team wants to analyze large volumes of JSON logs in S3 using SQL and pay per query without loading the logs into a managed cluster first. Which service is best?",
    "options": [
      "Amazon Athena",
      "Amazon OpenSearch Service",
      "Amazon EMR with a long-running cluster",
      "Amazon QuickSight only"
    ],
    "correct": 0,
    "explanation": "Athena can query structured and semi-structured data in S3 with SQL without provisioning a cluster. OpenSearch requires indexing, EMR uses clusters, and QuickSight visualizes data rather than serving as the query engine.",
    "keyRule": "Use Athena for pay-per-query SQL analysis directly over logs in S3.",
    "docs": [
      "https://docs.aws.amazon.com/athena/latest/ug/querying-athena-tables.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Architecture",
    "q": "A team is reviewing a workload against AWS best practices across operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability. Which framework provides this structured review model?",
    "options": [
      "AWS Well-Architected Framework",
      "AWS Schema Conversion Tool",
      "Amazon VPC IPAM",
      "AWS Transfer Family"
    ],
    "correct": 0,
    "explanation": "The AWS Well-Architected Framework organizes architecture review around pillars including operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability. SCT, IPAM, and Transfer Family solve specific migration, networking, and file-transfer problems.",
    "keyRule": "Use the Well-Architected Framework to structure broad architecture best-practice reviews.",
    "docs": [
      "https://docs.aws.amazon.com/wellarchitected/latest/framework/performance-efficiency.html",
      "https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-optimization.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Security",
    "q": "A company wants employees to access multiple AWS accounts through a central access portal using their corporate identity provider. The team wants to assign account permissions to groups from one place. Which AWS service is the best fit?",
    "options": [
      "AWS IAM Identity Center",
      "IAM access keys for every employee",
      "Amazon Cognito user pools",
      "AWS Secrets Manager"
    ],
    "correct": 0,
    "explanation": "IAM Identity Center is designed for centralized workforce access to AWS accounts and applications, including permission assignments for users and groups. IAM access keys are long-term credentials and do not provide a central access portal, while Cognito is for application users.",
    "keyRule": "Use IAM Identity Center for centralized workforce access to multiple AWS accounts.",
    "docs": [
      "https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Security",
    "q": "A developer says an IAM role should be used by an EC2 instance so the application can call AWS APIs without storing access keys on disk. Which IAM concept supports this design?",
    "options": [
      "Temporary credentials from an IAM role",
      "Long-term IAM user access keys embedded in the AMI",
      "A public S3 bucket policy",
      "A CloudFront signed cookie"
    ],
    "correct": 0,
    "explanation": "IAM roles provide temporary credentials to trusted AWS services such as EC2, removing the need to store long-term access keys on instances. Embedding access keys in AMIs creates credential leakage risk. Bucket policies and signed cookies do not provide instance credentials.",
    "keyRule": "Use IAM roles and temporary credentials for AWS API access from EC2 instances.",
    "docs": [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Governance",
    "q": "An audit team wants evidence that backup plans meet requirements such as encryption, backup frequency, and retention period. Which AWS Backup feature is designed for this compliance reporting?",
    "options": [
      "AWS Backup Audit Manager",
      "AWS Config aggregator only",
      "CloudWatch Contributor Insights",
      "AWS Cost Categories"
    ],
    "correct": 0,
    "explanation": "AWS Backup Audit Manager audits backup policies against defined controls and can generate reports for backup compliance requirements. Config aggregators centralize configuration data, Contributor Insights analyzes log contributors, and Cost Categories group charges.",
    "keyRule": "Use AWS Backup Audit Manager for backup compliance controls and audit reports.",
    "docs": [
      "https://docs.aws.amazon.com/aws-backup/latest/devguide/aws-backup-audit-manager.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Operations",
    "q": "An operations team wants to analyze CloudWatch Logs and identify the top client IP addresses causing the most errors in near real time. Which CloudWatch feature should they use?",
    "options": [
      "CloudWatch Contributor Insights",
      "CloudWatch dashboard only",
      "AWS Backup Audit Manager",
      "AWS License Manager"
    ],
    "correct": 0,
    "explanation": "CloudWatch Contributor Insights analyzes high-cardinality log data and can identify top contributors such as IP addresses, URLs, or hosts. Dashboards visualize data but do not perform contributor analysis by themselves. Backup Audit Manager and License Manager solve different governance needs.",
    "keyRule": "Use Contributor Insights to find top contributors in log data such as noisy IPs or URLs.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContributorInsights.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Operations",
    "q": "A support organization needs persistent cloud-based desktops for remote employees and wants AWS to manage desktop provisioning instead of shipping physical machines. Which service should it use?",
    "options": [
      "Amazon WorkSpaces Personal",
      "Amazon EC2 Auto Scaling",
      "AWS AppSync",
      "AWS Batch"
    ],
    "correct": 0,
    "explanation": "Amazon WorkSpaces provides managed virtual cloud desktops, and WorkSpaces Personal is appropriate for persistent desktops assigned to individual users. Auto Scaling manages EC2 fleets, AppSync is GraphQL, and Batch runs jobs.",
    "keyRule": "Use Amazon WorkSpaces for managed cloud desktops for end users.",
    "docs": [
      "https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Governance",
    "q": "A regulated organization wants a governed multi-account landing zone with account enrollment and standardized controls. Which AWS service provides this landing-zone governance experience?",
    "options": [
      "AWS Control Tower",
      "AWS DataSync",
      "Amazon OpenSearch Service",
      "AWS Lambda function URL"
    ],
    "correct": 0,
    "explanation": "AWS Control Tower provides a managed landing zone experience with account enrollment and controls for AWS Organizations. DataSync transfers data, OpenSearch supports search analytics, and Lambda function URLs expose functions over HTTPS.",
    "keyRule": "Use AWS Control Tower for governed multi-account landing zones.",
    "docs": [
      "https://docs.aws.amazon.com/controltower/latest/controlreference/controls.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Cost Optimization",
    "q": "A finance team wants AWS to alert them when spending behavior looks unusual compared with historical patterns, even if a fixed monthly budget has not yet been exceeded. Which service feature fits?",
    "options": [
      "AWS Cost Anomaly Detection",
      "AWS Budgets only",
      "AWS Cost Categories only",
      "Amazon CloudWatch Contributor Insights"
    ],
    "correct": 0,
    "explanation": "Cost Anomaly Detection is designed to identify anomalous AWS spending patterns and alert subscribed users. Budgets alerts against defined thresholds, Cost Categories group costs, and Contributor Insights analyzes logs.",
    "keyRule": "Use Cost Anomaly Detection for unusual spend patterns rather than fixed budget thresholds.",
    "docs": [
      "https://docs.aws.amazon.com/cost-management/latest/userguide/getting-started-ad.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Operations",
    "q": "An account owner wants broad recommendations covering cost optimization, security, fault tolerance, performance, and service quota checks. Which AWS service should they review first?",
    "options": [
      "AWS Trusted Advisor",
      "AWS Backup Audit Manager",
      "Amazon QuickSight",
      "AWS Transfer Family"
    ],
    "correct": 0,
    "explanation": "Trusted Advisor provides best-practice checks across categories including cost optimization, security, fault tolerance, performance, and service limits. Backup Audit Manager focuses on backup compliance, QuickSight is BI, and Transfer Family handles file transfers.",
    "keyRule": "Use Trusted Advisor for broad account-level best-practice checks.",
    "docs": [
      "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Compute",
    "q": "A company wants nonpersistent cloud desktops for a training lab where users receive a fresh curated desktop environment and do not keep a personalized machine. Which WorkSpaces option best fits?",
    "options": [
      "WorkSpaces Pools",
      "WorkSpaces Personal",
      "AWS Batch job queue",
      "Amazon AppStream image builder only"
    ],
    "correct": 0,
    "explanation": "WorkSpaces Pools are intended for nonpersistent virtual desktops hosted on ephemeral infrastructure, while WorkSpaces Personal provides persistent desktops assigned to individual users. Batch and AppStream image builders do not directly match this WorkSpaces desktop pool requirement.",
    "keyRule": "Use WorkSpaces Pools for nonpersistent curated cloud desktops.",
    "docs": [
      "https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Architecture",
    "q": "A team completed a production design and wants a structured AWS review across security, reliability, operational excellence, performance efficiency, cost optimization, and sustainability before launch. Which framework should guide the review?",
    "options": [
      "AWS Well-Architected Framework",
      "AWS Schema Conversion Tool",
      "AWS Cost Anomaly Detection",
      "Amazon VPC IPAM"
    ],
    "correct": 0,
    "explanation": "The AWS Well-Architected Framework provides a structured way to evaluate architectures against AWS best-practice pillars. SCT converts schemas, Cost Anomaly Detection watches spend patterns, and IPAM manages IP addresses.",
    "keyRule": "Use the Well-Architected Framework for broad architecture best-practice reviews.",
    "docs": [
      "https://docs.aws.amazon.com/wellarchitected/latest/framework/operational-excellence.html",
      "https://docs.aws.amazon.com/wellarchitected/latest/framework/security.html",
      "https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html"
    ]
  },
  {
    "exam": 1,
    "topic": "Governance",
    "q": "A company already records resource configuration with AWS Config and wants to evaluate whether resources comply with required configuration rules. Which capability should it use?",
    "options": [
      "AWS Config rules",
      "CloudWatch Contributor Insights",
      "Amazon WorkSpaces Pools",
      "AWS Cost Categories"
    ],
    "correct": 0,
    "explanation": "AWS Config rules evaluate resource configurations against desired settings and report compliance. Contributor Insights analyzes logs, WorkSpaces Pools provide desktops, and Cost Categories group charges.",
    "keyRule": "Use AWS Config rules to evaluate resource configuration compliance.",
    "docs": [
      "https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html"
    ]
  },
  {
    "exam": 2,
    "topic": "Cost Optimization",
    "q": "A company wants to group spend into internal product lines for reporting, using rules based on accounts, services, tags, and dimensions. Which AWS billing feature should it use?",
    "options": [
      "AWS Cost Categories",
      "AWS Cost Anomaly Detection",
      "AWS Backup Audit Manager",
      "AWS RAM"
    ],
    "correct": 0,
    "explanation": "Cost Categories let organizations define rule-based groupings of AWS charges for internal reporting. Cost Anomaly Detection finds unusual spend, Backup Audit Manager audits backups, and RAM shares resources.",
    "keyRule": "Use Cost Categories to map AWS charges into business-defined reporting groups.",
    "docs": [
      "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/manage-cost-categories.html"
    ]
  },
  {
    "exam": 3,
    "topic": "Architecture",
    "q": "A platform team needs to share supported AWS resources with other accounts while keeping ownership in the provider account. Which service provides this cross-account sharing capability?",
    "options": [
      "AWS Resource Access Manager",
      "AWS IAM Identity Center",
      "Amazon WorkSpaces",
      "CloudWatch Contributor Insights"
    ],
    "correct": 0,
    "explanation": "AWS Resource Access Manager lets you share supported AWS resources with other accounts, OUs, or an organization while ownership remains with the resource owner. Identity Center manages workforce access, WorkSpaces provides desktops, and Contributor Insights analyzes logs.",
    "keyRule": "Use AWS RAM for cross-account sharing of supported AWS resources.",
    "docs": [
      "https://docs.aws.amazon.com/ram/latest/userguide/working-with-sharing-create.html"
    ]
  },
  {
    "exam": 4,
    "topic": "Security",
    "q": "A company wants centralized workforce sign-in to AWS accounts, but workload applications running on EC2 still need AWS API permissions without human sign-in. Which combination is correct?",
    "options": [
      "IAM Identity Center for workforce access and IAM roles for workloads",
      "IAM users with long-term keys for both workforce and workloads",
      "Cost Categories for workforce access and SCPs for application credentials",
      "CloudFront signed URLs for AWS account access"
    ],
    "correct": 0,
    "explanation": "IAM Identity Center centralizes workforce access to AWS accounts and applications, while IAM roles provide temporary credentials for workloads such as EC2 applications. Long-term keys increase risk, and the other options do not provide these identity functions.",
    "keyRule": "Use IAM Identity Center for people and IAM roles for workloads.",
    "docs": [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html"
    ]
  },
  {
    "exam": 5,
    "topic": "Operations",
    "q": "A team wants to find the top talkers in VPC Flow Logs and identify which source IPs are contributing most to traffic volume. Which CloudWatch capability is designed for this high-cardinality analysis?",
    "options": [
      "CloudWatch Contributor Insights",
      "CloudWatch alarm on average CPU",
      "AWS Trusted Advisor",
      "AWS Control Tower"
    ],
    "correct": 0,
    "explanation": "CloudWatch Contributor Insights analyzes high-cardinality log data and can identify top contributors such as source IPs in VPC Flow Logs. A basic CPU alarm, Trusted Advisor, and Control Tower do not perform top-contributor log analysis.",
    "keyRule": "Use Contributor Insights to rank top contributors in high-cardinality logs.",
    "docs": [
      "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContributorInsights.html"
    ]
  }
];

if (typeof module !== 'undefined') {
  module.exports = allExamQuestions;
}

if (typeof window !== 'undefined') {
  window.allExamQuestions = allExamQuestions;
}
