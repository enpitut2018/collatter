class AddDataToTemplate < ActiveRecord::Migration[5.1]
  def change
    add_column :templates, :data, :text
  end
end
