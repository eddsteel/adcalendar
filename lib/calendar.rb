#!/usr/bin/env ruby -w
# GPL

require 'rubygems'
require 'sinatra'

@@offline = false
configure :offline do
  @@offline = true
end

set :haml, {:format => :html5}

get '/' do
  haml :page
end

get '/iso' do
  haml :isotope
end

helpers do
  def random_big
    (rand * 15).to_i == 2 ? 'big' : ''
  end

  def numbers
    1.upto(24).to_a.shuffle
  end

  def jquery
    return 'jquery.js' if @@offline
    'http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js'
  end

  def body_class
    request.query_string =~ /cheat/ ? 'cheat' : ''
  end
end

__END__

@@layout
%html
  %head
    %meta{:charset => 'utf-8'}
    %title Calendar
    %link{:rel=>'stylesheet', :href=>'style.css'}
    %link{:rel=>'stylesheet', :href=>'boxes.css'}
    %link{:rel=>'stylesheet', :href=>'jquery.lightbox-0.5.css'}
    %link{:rel=>'stylesheet', :href=>'iso-style.css'}
    %script{:src=>jquery}
    %script{:src=>'jquery.isotope.min.js'}
  %body{:class=>body_class}
    = yield

@@page
- numbers.each do |n|
  %a.box{:class=>"closed b#{n}", :href=>"#"}
    = n
%script{:src=>'behaviour.js'}
%script{:src=>'jquery.lightbox-0.5.js'}

@@isotope
#container
  - numbers.each do |n|
    .item{:class=>"#{random_big}"}
      .item-content{:class=>"b#{n} box"}
%script{:src=>'iso-behaviour.js'}
