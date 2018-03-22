require 'rails_helper'
require_relative '../../app/interactors/authenticate_user.rb'

RSpec.describe AuthenticateUser do
  let(:user) { FactoryBot.create(:user) }
  
  context 'when the user has the correct credentials' do 
    let(:context) {{ email: user.email, password: 'password' }}
    it 'success, return jwt token and welcome message' do 
      result = described_class.call(context)
      message = I18n.t('users.alerts.sign_in', name: user.name.capitalize)

      expect(result.success?).to be(true)
      expect(result.token).to_not eq(nil)
      expect(result.message).to eq(message)
    end
  end

  context 'when the user does not have the correct credentials' do 
    let(:context) {{ email: user.email, password: 'IncorrectPassword' }}
    it 'fail and return an explanation message' do 
      result = described_class.call(context)
      
      expect(result.success?).to be(false)
      expect(result.message).to eq(I18n.t('users.errors.authentication'))
    end
  end

end