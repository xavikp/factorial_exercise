Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :contact_list
      resources :edits
    end
  end
  get '*path', to: 'pages#index', via: :all
end
