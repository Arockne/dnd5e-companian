class Api::UsersController < ApplicationController

  skip_before_action :authorize, only: :create

  def show
    render json: current_user, status: :ok
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :email_confirmation, :password, :password_confirmation)
  end
end
