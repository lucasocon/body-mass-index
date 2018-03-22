class Api::UsersController < ApiController
  def sign_up
    user = User.new(user_params)
    if user.save
      sign_in_process(user.email, user.password)
    else
      render json: { success: false,
                     message: user.errors.full_messages.join('. ') },
             status: 200
    end
  end

  def sign_in
    sign_in_process(params[:email], params[:password])
  end

  private

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation
    )
  end

  def sign_in_process(email, password)
    result = AuthenticateUser.call(email: email, password: password)
    if result.success?
      session[:auth_token] = result.token
      render json: { success: true,
                     location: root_path,
                     message: result.message },
             status: 200
    else
      render json: { success: false, message: result.message }, status: 200
    end
  end
end
