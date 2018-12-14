class Colla < ApplicationRecord
  belongs_to :template, optional: true
  mount_uploader :image, ImagesUploader

  def Colla.all_by_popularity
    Colla.all.sort_by {|c|c.popularity}.reverse
  end

  def popularity
    self.tweet_count
  end

  def tweet_count_plus1
    self.tweet_count += 1
    self.save
  end
end
