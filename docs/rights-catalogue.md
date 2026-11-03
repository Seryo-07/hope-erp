# Rights Catalogue: HOPE, Inc. ERP

- **Task:** S1-SM-02 (supports the Sprint 1 board, `docs/board-sprint1.md`)
- **Source:** Hope, Inc. ERP Student Guide, section 3.8 (User management: accounts, blocking and rights), pages 15-17, Figures 37-40
- **Used by:** S1-DBA-05 (seed data), S1-DEV-07 (Rights dialog), S1-DEV-08 (server-side permission check), S1-TST-04 (permission matrix tests)

The Rights dialog is a set of checkboxes grouped by module. Ticking a module's box switches that module on; the boxes under it decide what the person may do there. **All** and **None** select or clear a module's rights.

## Summary

| Module           | Rights | Count |
|------------------|--------|-------|
| Customer         | Add, Edit, Delete Customer | 3 |
| Product          | Add, Edit, Delete Product; Add, Edit, Delete Price | 6 |
| Human Resources  | Add, Edit, Delete for Job, Department, Employee; View, Add, Edit, Delete Job History | 13 |
| Sales            | Add, Edit, Delete Sale; View, Add, Edit, Delete Sale Detail | 7 |
| Reports          | Top Customers, Product Master List, Top Products, Active Employees, All Employees, Employee Job History, Top Sales | 7 |
| **Total**        | | **36** |

Check: 3 + 6 + 13 + 7 + 7 = 36.

## Full list

The guide does not define right codes. The `rightCode` values below are **proposed** so the team uses one naming scheme. Mark and Brean should confirm them before the seed script is merged.

### Customer (3)

| # | Proposed rightCode | Description |
|---|--------------------|-------------|
| 1 | CUST_ADD | Add Customer |
| 2 | CUST_EDIT | Edit Customer |
| 3 | CUST_DELETE | Delete Customer |

### Product (6)

| # | Proposed rightCode | Description |
|---|--------------------|-------------|
| 4 | PROD_ADD | Add Product |
| 5 | PROD_EDIT | Edit Product |
| 6 | PROD_DELETE | Delete Product |
| 7 | PRICE_ADD | Add Price |
| 8 | PRICE_EDIT | Edit Price |
| 9 | PRICE_DELETE | Delete Price |

### Human Resources (13)

| # | Proposed rightCode | Description |
|---|--------------------|-------------|
| 10 | JOB_ADD | Add Job |
| 11 | JOB_EDIT | Edit Job |
| 12 | JOB_DELETE | Delete Job |
| 13 | DEPT_ADD | Add Department |
| 14 | DEPT_EDIT | Edit Department |
| 15 | DEPT_DELETE | Delete Department |
| 16 | EMP_ADD | Add Employee |
| 17 | EMP_EDIT | Edit Employee |
| 18 | EMP_DELETE | Delete Employee |
| 19 | JOBHIST_VIEW | View Job History |
| 20 | JOBHIST_ADD | Add Job History |
| 21 | JOBHIST_EDIT | Edit Job History |
| 22 | JOBHIST_DELETE | Delete Job History |

### Sales (7)

| # | Proposed rightCode | Description |
|---|--------------------|-------------|
| 23 | SALE_ADD | Add Sale |
| 24 | SALE_EDIT | Edit Sale |
| 25 | SALE_DELETE | Delete Sale |
| 26 | SALEDET_VIEW | View Sale Details |
| 27 | SALEDET_ADD | Add Sale Detail |
| 28 | SALEDET_EDIT | Edit Sale Detail |
| 29 | SALEDET_DELETE | Delete Sale Detail |

### Reports (7)

| # | Proposed rightCode | Description |
|---|--------------------|-------------|
| 30 | RPT_TOP_CUSTOMERS | Top Customers |
| 31 | RPT_PRODUCT_MASTER | Product Master List |
| 32 | RPT_TOP_PRODUCTS | Top Products |
| 33 | RPT_ACTIVE_EMPLOYEES | Active Employees |
| 34 | RPT_ALL_EMPLOYEES | All Employees |
| 35 | RPT_EMPLOYEE_JOBHIST | Employee Job History |
| 36 | RPT_TOP_SALES | Top Sales |

## Notes

- **User Management is not one of the 36 rights.** It is an administration function for Admin and Superadmin, not a checkbox in the Rights dialog.
- The guide's suggested tables are `RIGHTS` (`rightCode`, `module`, `description`, one row per checkbox) and `USERRIGHTS` (`userId` + `rightCode`). Our board uses `user_permission` for the per-user rights table; Mark confirms final table and column names.
- Hiding a button is not enough. Every right must also be enforced on the server (see S1-DEV-08).
- Birth dates and salaries are personal data (Data Privacy Act of 2012, RA 10173), so the job history rights decide who may **view**, not only who may edit.
