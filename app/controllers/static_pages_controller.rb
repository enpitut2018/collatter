class StaticPagesController < ApplicationController
  def home
    @collas = Colla.all_by_popularity
    @colla = Colla.first
  end

  def about
  end

  def collas
  end


end
