FROM ruby:2.3.3

RUN apt-get update -qq
RUN apt-get install -y build-essential
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs imagemagick ibmagick++-dev
RUN apt-get install -y libpq-dev
RUN apt-get install -y nodejs

RUN mkdir /myapp
WORKDIR /myapp

ADD Gemfile /myapp/Gemfile
ADD Gemfile.lock /myapp/Gemfile.lock

RUN bundle install
ADD . /myapp
