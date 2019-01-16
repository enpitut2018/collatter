# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190116044031) do

  create_table "collas", force: :cascade do |t|
    t.string "image"
    t.string "tag_txt"
    t.integer "template_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "tweet_count", default: 0
    t.index ["template_id"], name: "index_collas_on_template_id"
  end

  create_table "templates", force: :cascade do |t|
    t.string "image"
    t.string "tag_txt"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "data"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.string "username"
    t.string "image_url"
    t.string "token"
    t.string "token_secret"
  end

end
