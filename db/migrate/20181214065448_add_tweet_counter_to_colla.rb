class AddTweetCounterToColla < ActiveRecord::Migration[5.1]
  def change
    add_column :collas, :tweet_count, :int, default: 0
  end
end
