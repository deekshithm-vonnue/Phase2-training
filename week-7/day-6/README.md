# PostgreSQL

## SETUP

1. Connect to sudo user `sudo -u postgres psql`
2. Create User `CREATE ROLE "[username]" superuser;`
3. Alter role with login `ALTER ROLE [username] WITH LOGIN`
4. In the terminal create a new database `createdb [DATABASE_NAME]`

## To run run SQL file

```bash
psql -d [database] -f [filename]
```
