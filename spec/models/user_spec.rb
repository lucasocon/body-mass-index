require 'rails_helper'

RSpec.describe User do
  describe "#name" do
    it "cannot be blank" do
      user = FactoryBot.build(:user, :without_name)
      expect(user).to_not be_valid
      expect(user.errors.count).to eq(1)
    end
  end

  describe "#password" do
    it "cannot be blank" do
      user = FactoryBot.build(:user, :without_password)
      expect(user).to_not be_valid
      expect(user.errors.count).to eq(1)
    end
  end

  describe "#email" do
    it "cannot be blank" do
      user = FactoryBot.build(:user, :without_email)
      expect(user).to_not be_valid
      expect(user.errors.count).to eq(2)
    end

    it "should have correct format" do
      user = FactoryBot.build(:user, :without_email_format)
      expect(user).to_not be_valid
      expect(user.errors.count).to eq(1)
    end
  end
end