class Api::CampaignUsersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
rescue_from ActiveRecord::RecordInvalid, with: :render_forbidden

  before_action :authorize_join_request, only: [:create]

  def create
    campaign_user = current_user.campaign_users.create!(campaign: campaign)
    render json: campaign_user, status: :created
  end

  def destroy
    if authenticate_delete_request
      campaign_user.destroy
      render json: campaign_user, status: :ok
    else
      render json: { errors: ['Not Authorized'] }, status: :unauthorized
    end
  end

  private

  def campaign_user_params
    params.require(:campaign).permit(:password)
  end

  def campaign
    @campaign ||= Campaign.find(params[:campaign_id])
  end
  
  def campaign_user
    @campaign_user ||= CampaignUser.find(params[:id])
  end

  def authenticate_join_request
    campaign&.authenticate(campaign_user_params[:password])
  end

  def authorize_join_request
    render json: { errors: ['Not Authorized'] }, status: :unauthorized unless authenticate_join_request
  end

  def authenticate_delete_request
    current_user.id == campaign_user.user_id || current_user.id == campaign.owner.id
  end

  def render_not_found
    render json: { errors: ['Campaign does not exist'] }, status: :not_found
  end

  def render_forbidden(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :forbidden
  end
end
