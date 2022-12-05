#!/usr/bin/env bash

echo "
----------------------
  NODE & NPM
----------------------
"

# add nodejs 10 ppa (personal package archive) from nodesource
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
## Node JS Install and npm
sudo apt-get install -y nodejs

echo "
----------------------
  PSQL
----------------------
"
## Postgres SQL install
sudo apt install postgresql postgresql-contrib

echo "
----------------------
  PM2
----------------------
"
# pm2 Install and start up on server start
sudo npm install -g pm2
sudo pm2 startup systemd

echo "
----------------------
  NGINX
----------------------
"
# nginx Install
sudo apt-get install -y nginx

echo "
----------------------
  UFW (FIREWALL)
----------------------
"
# firewall settings
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
