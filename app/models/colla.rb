class Colla < ApplicationRecord
  belongs_to :template, optional: true
  mount_uploader :image, ImagesUploader
end
