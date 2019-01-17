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

  def self.search(search) #ここでのself.はCollas.を意味する
    if search
      where(['tag_txt LIKE ?', "%#{search}%"]) #検索とtagの部分一致を表示。User.は省略
    else
      all #全て表示。User.は省略
    end
  end
end
