class UsersController < ApplicationController
  before_action :validate_session, only: [:access]

  def access; end

  def log_out
    forget_session
    redirect_to access_path
  end
end
