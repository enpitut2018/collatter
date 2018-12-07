class SessionsController < ApplicationController
  before_action :twitter_client, only: [:twitter_post]

  def new
  end

  def create
    #request.env['omniauth.auth']はTwitter認証で得た情報を格納するもの
    user = User.find_or_create_from_auth_hash(request.env['omniauth.auth'])
    if user
      log_in user
      # remember(user) ?
      redirect_to root_path, notice: "ログインしました。"
    else
      redirect_to root_path, notice: "失敗しました。"
    end
  end

  # def create
  #   user = User.find_by(email: params[:session][:email].downcase)
  #   if user && user.authenticate(params[:session][:password])
  #     if user.activated?
  #       log_in user
  #       params[:session][:remember_me] == '1' ? remember(user) : forget(user)
  #       redirect_back_or user  # = redirect_to user_url(@user)
  #     else
  #       message = "Account not activated."
  #       message += "Check your email for the activation link."
  #       flash[:warning] = message
  #       redirect_to root_url
  #     end
  #   else
  #     flash.now[:danger] = 'Invalid email/password combination'
  #     render 'new'
  #   end
  # end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end

  # Twitterアカウントで投稿
  def twitter_post
    @client.update(params['content'])
    redirect_to root_path, notice: "ツイートしました．"
  end

  private
  def twitter_client
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key = ENV["TWITTER_CONSUMER_KEY"]
      config.consumer_secret = ENV["TWITTER_CONSUMER_SECRET"]
      config.access_token = current_user.token
      config.access_token_secret = current_user.token_secret
    end
  end
end
