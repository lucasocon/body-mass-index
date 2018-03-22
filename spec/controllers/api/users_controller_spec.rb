require "rails_helper"

RSpec.describe Api::UsersController do
  describe ".sign_in" do
    let(:user) { FactoryBot.create(:user) }

    it "sign in successfully" do
      post :sign_in, params: { email: user.email, password: 'password' }
      result = JSON.parse(response.body)
      expect(result.fetch('success')).to eq(true)
    end
  end

  describe ".sign_up" do
    it "sign up successfully" do
      user = {
        name: 'Mike',
        email: 'mike@example.com',
        password: '12345678',
        password_confirmation: '12345678'
      }

      post :sign_up, params:{ user: user } 
      result = JSON.parse(response.body)
      expect(result.fetch('success')).to eq(true)
    end
  end
end
