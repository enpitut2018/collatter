class Template < ApplicationRecord
  has_many :collas, dependent: :destroy
  mount_uploader :image, ImagesUploader
end
