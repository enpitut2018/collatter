class CreateTemplates < ActiveRecord::Migration[5.1]
  def change
    create_table :templates do |t|
      t.string :image
      t.string :tag_txt

      t.timestamps
    end
  end
end
