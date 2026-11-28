# Hope, Inc. ERP

## Project Overview

Hope, Inc. ERP is a database-driven Enterprise Resource Planning (ERP) system designed to centralize and manage the business operations of Hope, Inc.

The system provides a centralized platform for managing customer information, product records, product pricing, employee information, sales transactions, reports, and user accounts.

It aims to improve the organization of business records, simplify administrative processes, maintain accurate information, and provide controlled access to different system functions through user roles and permissions.

The application follows a client-server architecture, where the frontend communicates with the backend, which handles application requests and database operations.

## Project Objectives

The main objectives of the Hope, Inc. ERP System are:

- To centralize business information in one database-driven application.
- To simplify the management of customer and product records.
- To maintain product prices and historical pricing information.
- To organize employee, job, and department records.
- To manage sales transactions and their corresponding details.
- To provide reports for monitoring and reviewing business information.
- To implement user authentication and role-based access control.
- To improve data organization, accuracy, and accessibility.

## Main System Modules

The system is designed around six main modules:

1. **Customer Management** – Manages customer records, including customer information, updating records, searching, and maintaining customer data.

2. **Product Management** – Manages the product catalogue, product information, and product price history using effective dates.

3. **Human Resources Management** – Organizes employee records, job positions, departments, and employee job history.

4. **Sales Management** – Handles sales transactions, customer and employee associations, sales details, and transaction totals.

5. **Reports** – Provides summarized business information, including top customers, product lists, top products, employee records, job history, and top sales.

6. **User Management** – Manages user accounts, account status, roles, and permissions to control access to system modules and operations.

## User Roles and Permissions

The system uses three main user roles:

| User Role | Description |
|---|---|
| Superadmin | Has full system access, including system settings, user administration, and role assignment. |
| Admin | Manages business modules and user permissions but cannot view or modify Superadmin accounts. |
| User | Can access only the modules and operations permitted by the rights assigned by an administrator. |

Access to system functions depends on the user's assigned role and permissions.

## System Architecture

The Hope, Inc. ERP System uses three main components:

- **Frontend:** Provides the user interface where users interact with the system.
- **Backend:** Handles application requests, authentication, permission checking, and business operations.
- **Database:** Stores and manages the information used by the system.

The application uses React.js for the frontend, Node.js and Express.js for the backend, and Supabase (PostgreSQL) for database management.

The components work together to process user requests and manage business information through a centralized database.

## Team

| Member | Name | Role |
| :---: | :--- | :--- |
| **M1** | **Eraño A. Lomibao** | Scrum Master |
| **M2** | **Jian Dominic M. Delos Reyes** | UI Design |
| **M3** | **Brean Shein I. Ibañez** | Developer |
| **M4** | **Mark Angel D. Tugade** | DB Admin |
| **M5** | **Jhadenn Cypher Alejo** | Tester |

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js (Express)
- **Database:** Supabase (PostgreSQL)

---

## Local Development Setup

Follow these steps to get the project running on your local machine.

### 1. Prerequisites
- Node.js (v18 or higher)
- Git
- Access to shared Supabase project

### 2. Clone & Install

1. Clone repo:
   git clone https://github.com/Seryo-07/hope-erp.git
   cd hope-erp
