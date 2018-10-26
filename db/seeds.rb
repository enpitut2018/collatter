# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Template: ["id", "image", "tag_txt", "created_at", "updated_at"]
template = Template.create( image: '', tag_txt: 'free' )
# Colla: ["id", "image", "tag_txt", "template_id", "created_at", "updated_at"]
template.collas.create([
  { image: '', tag_txt: 'free colla' }
])
