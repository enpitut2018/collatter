class StaticPagesController < ApplicationController
  def home
    @collas = Colla.all
    @colla = Colla.first
  end

  def about
  end

  def collas
  end


end
