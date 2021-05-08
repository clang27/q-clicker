#!/bin/bash

git pull;
sudo yum update;
npx browserslist@latest --update-db;

npm run build;
npm install -g serve;

sudo cp -r build/* /var/www/html/;
sudo systemctl restart httpd;
