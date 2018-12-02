class Colla < ApplicationRecord
  belongs_to :template
  mount_uploader :image, ImagesUploader
end
