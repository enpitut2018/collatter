class Colla < ApplicationRecord
  belongs_to :template, optional: true
  mount_uploader :image, ImagesUploader

  def popularity
    self.tweet_counter
  end

  def tweet_count_plus1
    self.tweet_count += 1
    self.save
  end
end
