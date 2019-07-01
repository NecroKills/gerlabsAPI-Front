`sudo apt update`

# Install Mysql:
 `sudo apt install mysql-server-5.6`
 `sudo apt install mysql-client-5.6`

# Criar os bancos de dados:
Criar os bancos 'gerlab_api_development' e 'gerlab_api_test'.

# Install the build-essential package:
`sudo apt-get install build-essential`

# Install the curl package:
`sudo apt-get install curl`

# Then, we need install rvm but first install GPG Keys:
`gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB`

# Install RVM. development version:
`\curl -sSL https://get.rvm.io | bash -s stable`

# Switch to specified ruby interpreter:
`rvm use 2.5.1 --default`

# Instala o rails:
`gem install rails`

# Instalar gems do projeto:
`bundle install`

# Caso dê erro na instalação do mysql2-0.4.5:
`sudo apt-get install libmysqlclient-dev`
`sudo gem install mysql2 -v '0.4.5' --source 'https://rubygems.org/'`
`sudo gem install puma -v '3.10.0' --source 'https://rubygems.org/'`

# Rodar as migrations para criar as tabelas no banco:
`rake db:migrate`

# Inicia o server:
`rails server`

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
