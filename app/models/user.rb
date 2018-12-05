class User < ApplicationRecord
  # validates :name, presence: true, length: { maximum: 50 }
  # VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  # validates :email, presence: true, length: { maximum: 255 },
  #   format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  # has_secure_password
  # validates :password, presence: true, length: { minimum: 6 }, allow_nil: true

  def self.find_or_create_from_auth_hash(auth_hash)
   #providerはどのサービスで認証したのかを見分けるもの
   provider = auth_hash[:provider]
   uid = auth_hash[:uid]
   name = auth_hash[:info][:name]
   image_url = auth_hash[:info][:image]
   token = auth_hash[:credentials][:token]
   token_secret = auth_hash[:credentials][:secret]

   #find_or_create_by()は()の中の条件のものが見つければ取得し、なければ新しく作成するというメソッド
   user = self.find_or_create_by(provider: provider,uid: uid) do |user|
     user.username = name
     user.image_url = image_url
     user.token = token
     user.token_secret = token_secret
   end
   user.update_attributes({
     username: name,
     image_url: image_url,
     token: token,
     token_secret: token_secret,
   })
   return user
  end
end
