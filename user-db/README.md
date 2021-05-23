# User-DB

## DDL

This repository executes a list of ddl files located in the `ddl` directory. They must be named `ddl${ddlNumber}.sql`. The ddl will be executed by the ordering of their numbers.

Create a development database (an AWS RDS) and write the host, port, username, password into `env.dev.json` in the `env` directory.

Then, run:

```
npm run dev
```

You will then have an up-to-date development database to develop with.
