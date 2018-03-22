class AuthenticateUser
  include Interactor

  def call
    if user
      context.token = JsonWebToken.encode(user_id: user.id)
      context.message = I18n.t('users.alerts.sign_in', name: user.name.capitalize)
    else
      context.fail!(message: I18n.t('users.errors.authentication'))
    end
  end

  def user
    aux = User.find_by_email(context.email)
    (aux && aux.authenticate(context.password))
  end
end
