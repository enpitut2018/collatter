class UsersController < ApplicationController
  def show
  end

  def index
  end

  def new
  end

  def create
    #request.env['omniauth.auth']はTwitter認証で得た情報を格納するもの
    user = User.find_or_create_from_auth_hash(request.env['omniauth.auth'])
    if user
      session[:user_id] = user.id
      redirect_to root_path, notice: "ログインしました。"
    else
      redirect_to root_path, notice: "失敗しました。"
    end
  end

  def edit
  end

  # Twitterアカウントで投稿

  private
  def twitter_client
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV["TWITTER_CONSUMER_KEY"]
      config.consumer_secret = ENV["TWITTER_CONSUMER_SECRET"]
      config.access_token = "自分のAccess tokenを選択"
      config.access_token_secret ="自分のAccess token secretを選択"
    end
  end
end
