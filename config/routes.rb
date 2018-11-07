Rails.application.routes.draw do
  resources :collas
  resources :templates
  root 'static_pages#home'

  get 'static_pages/home'

  get 'static_pages/about'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
