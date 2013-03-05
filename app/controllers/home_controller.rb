class HomeController < ApplicationController
  
  include HTTParty
  
  def index
    @data=JSON.parse(getDB)
    puts '----------------- Data ---------------------'
    puts @data
  end
  
  def index_tv
    @data=JSON.parse(getDB)
    render :layout => 'application_tv'
  end
  
  def index_480
    @data=JSON.parse(getDB)
  end
  
  private 
  
  def getDB
    return HTTParty.get('http://tv2.cartodb.com/api/v2/sql', :query => {
      :q => 'SELECT time, geo FROM all_2 ORDER BY time',
      :api_key => 'f2d20e6d1fdbea8eaf9d8a601f78d3545a4ddc72',
      :headers => { 'ContentType' => 'application/jsonp' }
    }).response.body
  end
  
end


