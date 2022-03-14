class Api::CampaignUsersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
rescue_from ActiveRecord::RecordInvalid, with: :render_foribidden

  before_action :authorize_join_request, only: [:create]

  def create
    campaign_user = current_user.campaign_users.create!(campaign_id: campaign_user_params[:campaign_id])
    render json: campaign_user, status: :created
  end

  private

  def campaign_user_params
    params.require(:campaign).permit(:campaign_id, :password)
  end

  def campaign
    @campaign ||= Campaign.find(campaign_user_params[:campaign_id])
  end

  def authenticate_join_request
    campaign&.authenticate(campaign_user_params[:password])
  end

  def authorize_join_request
    render json: { errors: ['Not Authorized'] }, status: :unauthorized unless authenticate_join_request
  end

  def render_not_found
    render json: { errors: ['Campaign does not exist'] }, status: :not_found
  end

  def render_foribidden(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :forbidden
  end
end
