json.extract! user, :id, :image, :created_at, :updated_at
json.url user_url(user, format: :json)
