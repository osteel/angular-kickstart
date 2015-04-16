#!/usr/bin/env bash

# update stuff
sudo apt-get update

# vim
sudo apt-get -y install vim

# git
sudo apt-get install -y git-core

# node.js & npm
sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs

# grunt
sudo npm install -g grunt-cli

# bower
sudo npm install -g bower

# symlink /var/www => /vagrant
sudo ln -s /vagrant /var/www