class Colla < ApplicationRecord
  belongs_to:template
  validates:content, length:{minimum:0, maximun:10}
end
