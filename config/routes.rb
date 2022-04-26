Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    resources :campaigns, only: [:index, :show, :create, :update, :destroy] do
      resources :campaign_users, only: [:create, :destroy]
      resources :characters, only: [:show, :create, :update, :destroy] do
        resources :character_profiles, only: [:update]
      end
    end
    resources :characters, only: [:index]
  end

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
