class BmiController < ApplicationController
  before_action :require_signed_in

  def index
    @user = current_user
  end
end
