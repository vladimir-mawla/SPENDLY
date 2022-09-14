#!/usr/bin/env bash

export REACT_APP_API_BASE_URL=http://54.163.115.142:5000/api

npm run build;

export AWS_PROFILE=NET

# aws s3 rm s3://ngo-expense-tracker-react--recursive

aws s3 sync build/ s3://ngo-expense-tracker-react