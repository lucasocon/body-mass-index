Rails.application.routes.draw do
  get '/access', to: 'users#access'
  get '/log_out', to: 'users#log_out'

  namespace :api do
    post '/sign_in', to: 'users#sign_in'
    post '/sign_up', to: 'users#sign_up'
  end

  root to: 'bmi#index'
end
