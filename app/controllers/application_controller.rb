class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorize

  def current_user
    @current_user ||= session[:user_id] && User.find(session[:user_id])
  end
  
  def authorize
    render json: { errors: ['Not authorized'] }, status: :unauthorized unless current_user
  end
end
