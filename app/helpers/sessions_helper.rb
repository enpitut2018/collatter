module SessionsHelper
  # Login with the passed user
  def log_in(user)
    session[:user_id] = user.id
  end

  # return true if the passed user is currently logged in user
  def current_user?(user)
    user == current_user
  end

  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    end
  end

  def logged_in?
    !current_user.nil?
  end

  def log_out
    session.delete(:user_id)
    @current_user = nil
  end

  # redirect to what url that it remembers
  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end

  # remember what url you tried to access
  def store_location
    session[:forwarding_url] = request.original_url if request.get?
  end
end
