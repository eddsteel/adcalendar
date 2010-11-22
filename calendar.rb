#!/usr/bin/env ruby -w
# GPL

require 'rubygems'
require 'sinatra'

configure :offline do
  @@offline = true
end

set :haml, {:format => :html5}

get '/' do
  haml :page
end

helpers do
  def numbers
    nums = 1.upto(24).map {|i| i}
    nums.shuffle
  end

  def get_class(num)
    num < 12 ? 'open' : 'closed'
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
    %script{:src=>jquery}
    %script{:src=>'behaviour.js'}
  %body
    = yield

@@page
- numbers.each do |n|
  .box{:class=>get_class(n)}
    = n
