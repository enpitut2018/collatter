class CreateCollas < ActiveRecord::Migration[5.1]
  def change
    create_table :collas do |t|
      t.string :image
      t.string :tag_txt
      t.references :template, foreign_key: true

      t.timestamps
    end
  end
end
