class Template < ApplicationRecord
  has_many :collas, dependent: :destroy
  mount_uploader :image, ImagesUploader

  def self.search(search) #ここでのself.はTemplates.を意味する
    if search
      where(['tag_txt LIKE ?', "%#{search}%"]) #検索とtagの部分一致を表示。User.は省略
    else
      all #全て表示。User.は省略
    end
  end
end
