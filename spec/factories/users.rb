FactoryBot.define do
  factory :user do
    name 'FactoryBot'
    email 'example@gmail.com'
    password 'password'
    password_confirmation 'password'

    trait :without_name do 
      name ''
    end

    trait :without_password do 
      password ''
    end

    trait :without_email do 
      email ''
    end

    trait :without_email_format do 
      email '124444.com'
    end
  end
end
      