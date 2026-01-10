# **Data Engineering Zero to Hero**

## **Course Overview**

This intensive 3-month program transforms absolute beginners into job-ready data engineers through hands-on projects and industry-relevant skills. Each week includes theory, practice exercises, and real-world applications.

---

## **MODULE 1: Python for Data Engineering (2 Weeks)**

### **Week 1: Python Fundamentals & Setup**

**Learning Objectives:**

* Set up development environment  
* Understand basic programming concepts  
* Write and execute Python scripts

**Topics:**

* Installing Python 3.12, VS Code, and Git  
* Variables, data types (int, float, string, boolean)  
* Basic operators and expressions  
* Input/output operations  
* Comments and code documentation

**Hands-on Exercises:**

1. Install Python and create your first "Hello, Data World\!" script  
2. Build a simple calculator that performs basic arithmetic  
3. Create a program that takes user input and formats output  
4. Temperature converter (Celsius to Fahrenheit)  
5. Mini project: Personal budget tracker (basic version)

**Daily Practice:** 2 coding challenges on HackerRank/LeetCode (easy level)

---

### **Week 2: Control Flow & Data Structures**

**Learning Objectives:**

* Master conditional logic and loops  
* Work with Python's core data structures  
* Understand when to use each data structure

**Topics:**

* If/elif/else statements  
* For and while loops, break/continue  
* Lists, tuples, sets, and dictionaries  
* List comprehensions  
* String manipulation methods

**Hands-on Exercises:**

1. Grade calculator with conditional logic  
2. Build a to-do list application using lists  
3. Word frequency counter using dictionaries  
4. Data cleaning script: remove duplicates from a list  
5. Nested data structures: process JSON-like data  
6. Mini project: Student management system (add, update, delete, search)

**Daily Practice:** 3 coding challenges focusing on data structures

---

### **Week 3: Functions, Modules & File Handling**

**Learning Objectives:**

* Write reusable, modular code  
* Handle file operations  
* Work with CSV and JSON files

**Topics:**

* Function definition, parameters, return values  
* \*args and \*\*kwargs  
* Lambda functions  
* Built-in modules (os, sys, datetime, json)  
* File I/O operations (read, write, append)  
* CSV and JSON handling  
* Error handling (try/except)

**Hands-on Exercises:**

1. Create utility functions library  
2. Read and parse CSV files (sales data)  
3. Convert CSV to JSON and vice versa  
4. Log file analyzer: extract specific patterns  
5. Build a file organizer that sorts files by extension  
6. Mini project: ETL script that reads CSV, transforms data, writes to JSON

**Real-world Practice:**

* Download publicly available datasets (Kaggle)  
* Clean and transform messy data files  
* Create data validation functions

---

### **Week 4: Object-Oriented Programming & Advanced Python**

**Learning Objectives:**

* Understand OOP principles  
* Work with Python libraries for data  
* Master virtual environments and packages

**Topics:**

* Classes and objects  
* Inheritance and polymorphism  
* Working with APIs (requests library)  
* Virtual environments (venv)  
* Package management (pip)  
* Introduction to Pandas for data manipulation  
* Introduction to NumPy for numerical operations

**Hands-on Exercises:**

1. Create a DataProcessor class with methods for cleaning data  
2. Build an API client to fetch data from public APIs  
3. Use Pandas to read, filter, and aggregate data  
4. Create a data pipeline using OOP principles  
5. Work with datetime operations for time-series data  
6. Mini project: Data extraction tool that pulls data from API, cleans it, and saves locally

**Capstone Exercise:** Build a complete Python ETL pipeline:

* Extract data from multiple CSV files  
* Transform using Pandas (cleaning, aggregation)  
* Load to JSON with proper error handling  
* Create modular, well-documented code

---

## **MODULE 2: SQL & Database Fundamentals (1 Week)**

### **Week 5: SQL Basics & Data Retrieval**

**Learning Objectives:**

* Understand relational database concepts  
* Write basic SQL queries  
* Set up PostgreSQL locally

**Topics:**

* Relational database concepts (tables, rows, columns)  
* Installing PostgreSQL and pgAdmin  
* Data types in SQL  
* SELECT statements  
* WHERE clause and filtering  
* ORDER BY and LIMIT  
* Basic aggregate functions (COUNT, SUM, AVG, MIN, MAX)  
* GROUP BY and HAVING

**Hands-on Exercises:**

1. Install PostgreSQL and create your first database  
2. Create tables for an e-commerce scenario (users, products, orders)  
3. Write 20+ SELECT queries with increasing complexity  
4. Sales analysis: calculate total revenue by product  
5. Customer segmentation using aggregations  
6. Mini project: Build and query a library management database

**Practice Dataset:** Use provided sample e-commerce database

---

### **Week 6: Advanced SQL & Data Manipulation**

**Learning Objectives:**

* Perform complex queries with joins  
* Manipulate data using DML statements  
* Understand database constraints

**Topics:**

* INSERT, UPDATE, DELETE operations  
* INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN  
* Self joins and cross joins  
* Subqueries (scalar, row, table)  
* Common Table Expressions (CTEs)  
* CASE statements  
* Primary keys, foreign keys, constraints  
* Indexes and query optimization basics

**Hands-on Exercises:**

1. Join multiple tables to create comprehensive reports  
2. Use CTEs to simplify complex queries  
3. Write queries to find top customers by revenue  
4. Data cleaning: identify and fix data quality issues  
5. Create a customer lifetime value calculation query  
6. Build a product recommendation query based on purchase history  
7. Mini project: Sales analytics dashboard queries (top products, customer trends, revenue over time)

**Real-world Scenarios:**

* Analyze sample retail database  
* Write queries for business questions  
* Optimize slow-running queries

---

### **Week 7: Window Functions & Database Design**

**Learning Objectives:**

* Master advanced analytical functions  
* Design normalized databases  
* Understand database performance

**Topics:**

* Window functions (ROW\_NUMBER, RANK, DENSE\_RANK)  
* LAG and LEAD functions  
* Running totals and moving averages  
* Database normalization (1NF, 2NF, 3NF)  
* Entity-Relationship Diagrams (ERDs)  
* Transactions (BEGIN, COMMIT, ROLLBACK)  
* Query performance and EXPLAIN plans  
* Views and materialized views

**Hands-on Exercises:**

1. Calculate running totals for sales over time  
2. Rank products by sales within categories  
3. Design a normalized database for a ride-sharing app  
4. Create ERD for an online learning platform  
5. Implement transactions for data consistency  
6. Optimize queries using indexes  
7. Mini project: Design and implement a complete database for a social media application

**Capstone Exercise:** Complete SQL project:

* Design schema for a business domain (provided scenario)  
* Implement database with proper constraints  
* Load sample data (100K+ rows)  
* Write 15+ analytical queries  
* Create views for common reports  
* Document your schema and queries

---

## **MODULE 3: Data Engineering & ELT Tools (4 Weeks)**

### **Week 8: Data Engineering Fundamentals**

**Learning Objectives:**

* Understand data engineering concepts  
* Learn data pipeline architectures  
* Introduction to data warehousing

**Topics:**

* What is data engineering vs. data science  
* ETL vs. ELT paradigms  
* Data pipeline architecture patterns  
* Batch vs. streaming processing  
* Data warehouse concepts (facts, dimensions)  
* Star schema and snowflake schema  
* Data lakes vs. data warehouses  
* Data quality and validation

**Hands-on Exercises:**

1. Design a batch data pipeline on paper  
2. Create a star schema for an e-commerce business  
3. Build a Python script for data quality checks  
4. Implement a simple ETL pipeline with Python  
5. Mini project: Design end-to-end data architecture for a startup

**Tools Introduction:**

* Docker basics for containerization  
* Setting up local data engineering environment

---

### **Week 9: Apache Airflow \- Workflow Orchestration**

**Learning Objectives:**

* Set up and configure Airflow  
* Create and schedule DAGs  
* Implement data pipelines with Airflow

**Topics:**

* Airflow architecture (scheduler, executor, webserver)  
* Installing Airflow with Docker  
* DAG concepts and structure  
* Operators (Python, Bash, SQL)  
* Task dependencies and relationships  
* XComs for task communication  
* Scheduling with cron expressions  
* Monitoring and alerting

**Hands-on Exercises:**

1. Install Airflow using Docker Compose  
2. Create your first DAG with 3 tasks  
3. Build a pipeline that extracts data from API daily  
4. Implement error handling and retries  
5. Create a data validation task using PythonOperator  
6. Schedule multiple dependent pipelines  
7. Mini project: Daily ETL pipeline that extracts from PostgreSQL, transforms with Pandas, loads to another table

**Real-world Application:**

* Build a pipeline that monitors a data source  
* Implement data freshness checks  
* Create email alerts for pipeline failures

---

### **Week 10: dbt (Data Build Tool)**

**Learning Objectives:**

* Transform data using dbt  
* Implement data modeling best practices  
* Test and document data models

**Topics:**

* dbt Core installation and setup  
* dbt project structure  
* Models (SELECT statements as tables/views)  
* Sources and refs  
* Materialization strategies (table, view, incremental)  
* Jinja templating in dbt  
* Tests (unique, not\_null, accepted\_values, relationships)  
* Documentation and data lineage  
* dbt packages and macros

**Hands-on Exercises:**

1. Set up dbt Core with PostgreSQL  
2. Create staging models for raw data  
3. Build fact and dimension tables using dbt  
4. Implement incremental models for large datasets  
5. Write custom tests for data quality  
6. Create documentation with descriptions  
7. Build reusable macros for common transformations  
8. Mini project: Complete dbt project with staging, intermediate, and mart layers

---

### **Week 11: Modern Data Stack & Integration**

**Learning Objectives:**

* Integrate multiple data tools  
* Understand the modern data stack  
* Work with data ingestion tools

**Topics:**

* Modern data stack overview  
* Introduction to Airbyte for data ingestion  
* Setting up Airbyte with Docker  
* Creating source and destination connectors  
* Connecting Airflow with dbt  
* Orchestrating dbt runs with Airflow  
* Introduction to data catalogs  
* Data versioning concepts

**Hands-on Exercises:**

1. Install Airbyte locally  
2. Set up connectors: PostgreSQL to PostgreSQL  
3. Configure API source (e.g., GitHub API) to database  
4. Create Airflow DAG that triggers dbt runs  
5. Build end-to-end pipeline: Airbyte → dbt → validation  
6. Implement data quality monitoring  
7. Mini project: Complete ELT pipeline with Airbyte (extract), dbt (transform), and Airflow (orchestrate)

**Integration Project:**

* Extract data from 2+ sources using Airbyte  
* Transform using dbt models  
* Orchestrate with Airflow  
* Add data quality tests  
* Create documentation

---

## **MODULE 4: Cloud & AWS for Data Engineering (4 Weeks)**

### **Week 12: Cloud Computing & AWS Fundamentals**

**Learning Objectives:**

* Understand cloud computing concepts  
* Navigate AWS console  
* Set up AWS account and basic services

**Topics:**

* Cloud computing models (IaaS, PaaS, SaaS)  
* AWS account creation and free tier  
* IAM (Identity and Access Management)  
* AWS regions and availability zones  
* AWS CLI installation and configuration  
* Basic security best practices  
* Cost management and billing alerts

**Hands-on Exercises:**

1. Create AWS account with free tier  
2. Set up MFA for root account  
3. Create IAM users and roles  
4. Install and configure AWS CLI  
5. Set up billing alerts  
6. Create your first EC2 instance  
7. Mini project: Set up secure AWS environment with proper IAM policies

**Important:** Always use free tier eligible resources

---

### **Week 13: AWS Storage & Compute Services**

**Learning Objectives:**

* Store data in AWS S3  
* Process data using AWS compute services  
* Understand AWS database offerings

**Topics:**

* Amazon S3 (buckets, objects, storage classes)  
* S3 bucket policies and lifecycle rules  
* Amazon EC2 for compute workloads  
* AWS Lambda for serverless computing  
* Amazon RDS (PostgreSQL/MySQL)  
* Introduction to Amazon Redshift  
* VPC basics for networking

**Hands-on Exercises:**

1. Create S3 buckets and organize data with prefixes  
2. Upload and download files using AWS CLI  
3. Set up S3 lifecycle policies  
4. Launch EC2 instance and run Python scripts  
5. Create AWS Lambda function to process S3 files  
6. Set up RDS PostgreSQL instance  
7. Connect to RDS from local machine  
8. Mini project: Lambda function triggered by S3 upload that processes CSV and loads to RDS

**Architecture Pattern:** S3 (landing zone) → Lambda (processing) → RDS (storage)

---

### **Week 14: AWS Data Services & Analytics**

**Learning Objectives:**

* Build data lakes on AWS  
* Use AWS analytics services  
* Implement data cataloging

**Topics:**

* AWS Glue for ETL  
* AWS Glue Data Catalog  
* AWS Glue Crawlers  
* Amazon Athena for querying S3 data  
* AWS Glue Studio for visual ETL  
* Partitioning strategies in S3  
* Query optimization in Athena  
* Introduction to Amazon Kinesis (streaming)

**Hands-on Exercises:**

1. Set up AWS Glue Data Catalog  
2. Create Glue Crawler to catalog S3 data  
3. Write Glue ETL job using Python (PySpark)  
4. Query S3 data using Athena  
5. Implement partitioning in S3 for performance  
6. Create external tables in Athena  
7. Build Glue workflow with multiple jobs  
8. Mini project: Data lake pipeline \- raw data in S3 → Glue ETL → transformed data → query with Athena

**Cost Optimization:**

* Use Athena for ad-hoc queries  
* Partition data appropriately  
* Compress files for storage savings

---

### **Week 15: AWS Data Pipeline Architecture**

**Learning Objectives:**

* Design production-grade pipelines  
* Implement monitoring and alerting  
* Deploy Airflow on AWS

**Topics:**

* MWAA (Managed Workflows for Apache Airflow)  
* CloudWatch for monitoring and logs  
* SNS for notifications  
* EventBridge for event-driven architectures  
* Infrastructure as Code with CloudFormation basics  
* Best practices for production pipelines  
* Disaster recovery and backup strategies  
* CI/CD for data pipelines

**Hands-on Exercises:**

1. Set up CloudWatch alarms for AWS resources  
2. Create SNS topics for pipeline alerts  
3. Deploy simple Airflow DAG on MWAA  
4. Implement pipeline that moves data: RDS → S3 → Glue → Athena  
5. Set up logging and monitoring  
6. Create EventBridge rule to trigger Lambda  
7. Mini project: Production pipeline with monitoring, error handling, and notifications

**End-to-End AWS Project:**

* Design complete data pipeline architecture  
* Implement using multiple AWS services  
* Add comprehensive monitoring  
* Document architecture with diagrams  
* Estimate costs for production scale

---

## **MODULE 5: Capstone Project (4 Weeks)**

### **Week 16: Project Planning & Design**

**Capstone Project: Build a Complete Data Platform**

**Project Scenario:** You're building a data platform for an e-commerce company that needs to:

* Ingest data from multiple sources (PostgreSQL transactional DB, REST API, CSV files)  
* Transform and model data for analytics  
* Make data available for business intelligence  
* Ensure data quality and reliability  
* Run on AWS cloud infrastructure

**Week 16 Deliverables:**

1. **Architecture Diagram**  
   * Source systems  
   * Data flow  
   * AWS services used  
   * Data models  
2. **Technical Design Document**  
   * Data sources description  
   * Ingestion strategy (Airbyte connectors)  
   * Transformation logic (dbt models)  
   * Orchestration plan (Airflow DAGs)  
   * AWS infrastructure setup  
   * Monitoring and alerting strategy  
3. **Database Schema Design**  
   * Star schema design  
   * Fact and dimension tables  
   * ERD diagram  
4. **Project Repository Setup**  
   * GitHub repository with README  
   * Folder structure  
   * Documentation templates

**Hands-on Tasks:**

* Create project architecture diagram (use draw.io or Lucidchart)  
* Design database schema for analytics layer  
* Set up GitHub repository  
* Write project documentation  
* Plan sprint tasks for next 3 weeks

---

### **Week 17: Implementation \- Part 1 (Data Ingestion & Infrastructure)**

**Focus:** Build the foundation of your data platform

**Tasks:**

1. **AWS Infrastructure Setup**  
   * Create S3 buckets (raw, processed, analytics layers)  
   * Set up RDS PostgreSQL as data warehouse  
   * Configure IAM roles and policies  
   * Set up networking (security groups)  
   * Configure CloudWatch logging  
2. **Data Source Setup**  
   * Create sample transactional database locally  
   * Generate realistic sample data (orders, customers, products)  
   * Set up mock REST API (use Flask or FastAPI)  
   * Prepare CSV files for batch ingestion  
3. **Data Ingestion with Airbyte**  
   * Deploy Airbyte on EC2 or locally  
   * Configure PostgreSQL source connector  
   * Configure API source connector  
   * Configure S3 destination for raw data  
   * Set up sync schedules  
   * Test and validate data ingestion

**Deliverables:**

* AWS infrastructure is provisioned  
* 3 data sources are ingesting data to S3  
* Raw data is landing in organized S3 structure  
* Documentation of setup process

**Code Structure:**

/infrastructure

  \- aws\_setup.md

  \- security\_configs.json

/data\_sources

  \- generate\_sample\_data.py

  \- mock\_api.py

/airbyte

  \- connector\_configs/

---

### **Week 18: Implementation \- Part 2 (Transformation & Modeling)**

**Focus:** Transform raw data into analytics-ready models

**Tasks:**

1. **dbt Project Setup**  
   * Initialize dbt project connected to RDS  
   * Configure profiles.yml  
   * Set up staging models (one per source)  
   * Implement data cleaning in staging layer  
2. **Data Modeling**  
   * Create intermediate models  
   * Build fact tables (fact\_orders, fact\_order\_items)  
   * Build dimension tables (dim\_customers, dim\_products, dim\_dates)  
   * Implement slowly changing dimensions (SCD Type 2\) for one dimension  
   * Use incremental models where appropriate  
3. **Data Quality & Testing**  
   * Write schema tests (unique, not\_null)  
   * Create custom data quality tests  
   * Add relationships tests between tables  
   * Implement dbt docs  
4. **Orchestration with Airflow**  
   * Set up Airflow (local or MWAA)  
   * Create DAG for full pipeline orchestration  
   * Add task dependencies  
   * Implement data quality checks between steps  
   * Add error notifications

**Deliverables:**

* dbt project with 15+ models  
* Comprehensive testing suite  
* Airflow DAG orchestrating end-to-end pipeline  
* Data lineage documentation

**dbt Structure:**

/models

  /staging

    \- stg\_orders.sql

    \- stg\_customers.sql

    \- stg\_products.sql

  /intermediate

    \- int\_order\_items\_joined.sql

  /marts

    /core

      \- fact\_orders.sql

      \- dim\_customers.sql

      \- dim\_products.sql

      \- dim\_dates.sql

---

### **Week 19: Implementation \- Part 3 (Analytics & Presentation)**

**Focus:** Make data accessible and create analytics layer

**Tasks:**

1. **AWS Glue & Athena Setup**  
   * Create Glue Crawlers for transformed data  
   * Set up Glue Data Catalog  
   * Configure Athena for querying  
   * Optimize queries with partitioning  
2. **Analytics Views & Queries**  
   * Create analytical SQL queries for business questions:  
     * Monthly revenue trends  
     * Top performing products  
     * Customer lifetime value  
     * Cohort analysis  
     * Product affinity analysis  
   * Create materialized views for common queries  
   * Document query patterns  
3. **Monitoring & Alerting**  
   * Set up CloudWatch dashboards  
   * Create alarms for pipeline failures  
   * Implement data freshness checks  
   * Set up SNS notifications  
   * Create pipeline health monitoring  
4. **Documentation & Testing**  
   * Complete README with setup instructions  
   * Add architecture diagrams  
   * Document all components  
   * Write user guide for running pipelines  
   * Create video walkthrough (optional)

**Deliverables:**

* Analytics layer accessible via Athena  
* 10+ business intelligence queries  
* Monitoring dashboard  
* Complete project documentation  
* Deployed and running pipeline

---

### **Week 20: Project Finalization & Presentation**

**Focus:** Polish, optimize, and present your work

**Tasks:**

1. **Code Quality & Optimization**  
   * Refactor code for clarity  
   * Add comprehensive comments  
   * Optimize slow-running queries  
   * Improve error handling  
   * Add logging throughout pipeline  
2. **Testing & Validation**  
   * End-to-end pipeline testing  
   * Data quality validation  
   * Performance testing  
   * Failure scenario testing  
   * Cost optimization review  
3. **Project Presentation Preparation**  
   * Create presentation slides (15-20 slides)  
   * Prepare live demo  
   * Document lessons learned  
   * Create project showcase on GitHub  
   * Prepare technical Q\&A  
4. **Portfolio Enhancement**  
   * Polish GitHub README with:  
     * Project overview  
     * Architecture diagram  
     * Technologies used  
     * Setup instructions  
     * Screenshots/demo GIFs  
     * Challenges and solutions  
   * Update LinkedIn with project  
   * Add to personal portfolio website

**Final Deliverables:**

1. **Complete GitHub Repository** with:  
   * Clean, documented code  
   * Architecture diagrams  
   * Setup and deployment instructions  
   * Sample data and scripts  
   * Video demo or screenshots  
2. **Technical Presentation** covering:  
   * Business problem and solution  
   * Architecture overview  
   * Technical implementation details  
   * Challenges faced and solutions  
   * Data pipeline demo  
   * Monitoring and data quality measures  
   * Future enhancements  
3. **Documentation Package**:  
   * System architecture document  
   * Data model documentation  
   * API documentation  
   * Deployment guide  
   * Operational runbook

**Presentation Structure (20 minutes):**

1. Introduction (2 min) \- Problem statement  
2. Architecture Overview (3 min) \- Visual walkthrough  
3. Technical Implementation (8 min) \- Deep dive into each component  
4. Live Demo (5 min) \- Show pipeline in action  
5. Q\&A (2 min)

---

## **Additional Resources & Support**

### **Weekly Structure**

Each week follows this pattern:

* **Monday-Tuesday:** Theory and concepts (2-3 hours)  
* **Wednesday-Thursday:** Hands-on exercises (3-4 hours)  
* **Friday:** Mini project work (3-4 hours)  
* **Weekend:** Practice and review (2-3 hours)

**Total weekly commitment:** 15-20 hours

### **Community & Support**

* **Daily Office Hours:** Live Q\&A sessions  
* **Slack Community:** Peer support and discussions  
* **Code Reviews:** Weekly code review sessions  
* **Mentor Sessions:** 1-on-1 monthly check-ins

### **Assessment & Certification**

* **Weekly Quizzes:** Short assessments (10 questions)  
* **Module Projects:** Graded mini-projects  
* **Capstone Evaluation:** Final project presentation  
* **Certificate:** Upon successful completion

### **Career Preparation (Ongoing)**

* Resume building for data engineering roles  
* GitHub portfolio optimization  
* Mock interviews  
* Job search strategies  
* Networking tips

### **Recommended Learning Path After Completion**

1. Advanced topics: Spark, Kafka, real-time streaming  
2. Data quality frameworks: Great Expectations  
3. Infrastructure as Code: Terraform  
4. Container orchestration: Kubernetes  
5. Advanced cloud services: Snowflake, Databricks

### **Tools & Technology Versions (2025)**

* Python 3.12+  
* PostgreSQL 16  
* Apache Airflow 2.8+  
* dbt Core 1.7+  
* AWS (latest services)  
* Airbyte latest stable version  
* Docker 24+

---

## **Success Metrics**

By the end of this course, you will:

* ✅ Build ETL/ELT pipelines from scratch  
* ✅ Design and implement data warehouses  
* ✅ Deploy data infrastructure on AWS  
* ✅ Write production-quality Python and SQL  
* ✅ Orchestrate complex workflows with Airflow  
* ✅ Transform data using dbt  
* ✅ Have 1 major capstone project for your portfolio  
* ✅ Be ready for entry-level data engineering interviews

**Job Readiness:** This curriculum prepares you for positions such as:

* Junior Data Engineer  
* ETL Developer  
* Data Pipeline Engineer  
* Analytics Engineer

---

## **Getting Started Checklist**

**Before Week 1:**

* Set up laptop with 8GB+ RAM  
* Create GitHub account  
* Create AWS account (with free tier)  
* Install VS Code  
* Join course Slack community  
* Set up learning schedule

**Required Hardware:**

* Computer with 8GB+ RAM (16GB recommended)  
* Stable internet connection  
* 50GB+ free disk space

