class StaticPagesController < ApplicationController
  def home
    @collas = Colla.order("tweet_count DESC").all
    @colla = Colla.first
  end

  def about
  end

  def collas
  end


end
