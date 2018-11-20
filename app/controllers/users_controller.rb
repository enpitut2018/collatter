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
end
