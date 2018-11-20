Rails.application.routes.draw do
  get 'user/show'

  get 'user/index'

  get 'user/new'

  get 'user/edit'

  #このpathを通して認証が行われる。
  get 'auth/:provider/callback' => 'users#create'

  resources :collas
  resources :templates
  root 'static_pages#home'

  get 'static_pages/home'

  get 'static_pages/about'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
