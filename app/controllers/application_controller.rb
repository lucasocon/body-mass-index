class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  protected

  def require_signed_in
    redirect_to access_path if current_user.nil?
  end

  def current_user
    return User.find(decoded_token.fetch('user_id')) if valid_token?
    nil
  end

  def validate_session
    redirect_to root_path unless current_user.nil?
  end

  def forget_session
    session[:auth_token] = nil
  end

  private

  def valid_token?
    token = decoded_token
    return (token.fetch('exp') > now) if token
    false
  end

  def decoded_token
    return JsonWebToken.decode(session[:auth_token]) if session[:auth_token].present?
    false
  end

  def now
    Time.now.to_i
  end
end
