# dans-multi-pro-backend-test

step:
1. Run command `npm i`
2. Setting first the .env.example
3. Change name filte .env.example to .env
4. Build with command `npm run build`
5. for development => setting env DEVELOPMENT to true (it will sychromize the database)
6. for production => delete env key DEVELOPMENT



# problem solve for sql test
1.
```
SELECT c.*, COUNT(a.ACC_OWNER) as TOTAL_ACCOUNT FROM ACCOUNT a
JOIN CUSTOMER c on a.ACC_OWNER = c.CUST_ID
GROUP BY c.CUST_ID;
```

2.
```
SELECT t.*, a.* from ACCOUNT a
JOIN TRANSACTION t on a.ACC_NUMBER = t.TRS_FROM_ACCOUNT
JOIN CUSTOMER c on a.ACC_OWNER = c.CUST_ID
WHERE c.CUST_FIRSTNAME = 'John' AND c.CUST_LASTNAME = 'Michael'
ORDER BY a.ACC.NUMBER DESC, t.TRS_DATE;
```
