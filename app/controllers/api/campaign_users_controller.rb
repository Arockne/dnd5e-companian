class Api::CampaignUsersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def create
    campaign = Campaign.find(campaign_user_params[:campaign_id])
    if campaign&.authenticate(campaign_user_params[:password])
      campaign_user = current_user.campaign_users.new(campaign_id: campaign_user_params[:campaign_id])
      if campaign_user.save
        render json: campaign_user, status: :created
      else
        render json: { errors: campaign_user.errors.full_messages }, status: :forbidden
      end
    elsif campaign.nil?
      render json: { errors: ['Campaign does not exist'] }, status: :not_found
    else
      render json: { errors: ['Not Authorized'] }, status: :unauthorized
    end
  end

  private

  def campaign_user_params
    params.require(:campaign).permit(:campaign_id, :password)
  end

  def render_not_found
    render json: { errors: ['Campaign does not exist'] }, status: :not_found
  end
end
