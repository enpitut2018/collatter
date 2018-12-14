Rails.application.routes.draw do
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  post '/twitter_post', to: 'sessions#twitter_post'
  post '/twitter_post_media', to: 'sessions#twitter_post_media'

  get 'user/show'

  get 'user/index'

  get 'user/new'

  get 'user/edit'

  #このpathを通して認証が行われる。
  get 'auth/:provider/callback' => 'sessions#create'

  resources :collas
  resources :templates
  root 'static_pages#home'

  get 'static_pages/home'

  get 'static_pages/about'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
