class Api::SessionsController < ApplicationController

  def create
    user = User.where('lower(username) = ?', params[:username]).first
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: ["Invalid username or password"] }, status: :unauthorized
    end
  end
end
