class Template < ApplicationRecord
  has_many :collas, dependent: :destroy
end
