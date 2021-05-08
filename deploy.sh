#!/bin/bash

git pull;
sudo yum update;
npx browserslist@latest --update-db;

npm install -g serve;
npm run build;

sudo cp -r build/* /var/www/html/;
sudo systemctl restart httpd;
