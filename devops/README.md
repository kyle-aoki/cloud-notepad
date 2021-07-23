# Scripts

Before attempting to execute any scripts, install the `aws cli` and run `aws configure`.

You will need a `ACCESS_KEY_ID` AND `SECRET_ACCESS_KEY` from AWS IAM.

**BE SURE TO ENTER `json` AS THE OUTPUT FORMAT** when running `aws configure`.

### `npm run 1`
This script will delete all ec2s based on `instance-ids` located in ec2-info.json.

### `npm run 2`
This script will create a single free-tier ec2.
