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

helpers do
  def numbers
    1.upto(24).to_a.shuffle
  end

  def jquery
    return 'jquery.js' if @@offline
    'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js'
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
    %script{:src=>jquery}
    %script{:src=>'behaviour.js'}
    %script{:src=>'jquery.lightbox-0.5.js'}
  %body
    = yield

@@page
- numbers.each do |n|
  %a.box{:class=>"closed b#{n}", :href=>"#"}
    = n
