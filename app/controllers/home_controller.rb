class HomeController < ApplicationController
  
  include HTTParty
  
  def index
    print '-----------getting db-----------'
    data=getDB
    puts '--------- data is ---------------'
    puts data
  end
  
  private 
  
  def getDB
    return HTTParty.get('http://tv2.cartodb.com/api/v2/sql', :query => {
      :q => 'SELECT time, geo FROM infektionskort_2 ORDER BY time',
      :api_key => '6df5723b5b2cedbc8e6a3b43886cce62742fd734'
    })      
      
    # return get('http://tv2.cartodb.com/api/v2/sql?q=SELECT time, geo FROM infektionskort_2 ORDER BY time&api_key=6df5723b5b2cedbc8e6a3b43886cce62742fd734', :query => {
    #   :method => 'flickr.people.getPublicPhotos',
    #   :api_key => 'api key goes here',
    #   :user_id => uid})
  end
  
end
