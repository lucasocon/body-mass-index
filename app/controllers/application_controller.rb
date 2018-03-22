class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  protected 
  def require_signed_in
    if current_user.nil?
      redirect_to access_path
    end
  end

  def current_user
    if valid_token?
      return User.find(decoded_token.fetch('user_id'))
    end

    nil
  end

  def validate_session
    unless current_user.nil?
      redirect_to root_path
    end
  end

  def forget_session
    session[:auth_token] = nil
  end

  private
  def valid_token?
    token = decoded_token
    if token 
      return (token.fetch('exp') > now)
    end 

    false
  end

  def decoded_token
    if !session[:auth_token].nil?
      return JsonWebToken.decode(session[:auth_token])
    end

    false
  end
  
  def now
    Time.now.to_i
  end
end
