class Api::CampaignUsersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
rescue_from ActiveRecord::RecordInvalid, with: :render_foribidden

  def create
    campaign = Campaign.find(campaign_user_params[:campaign_id])
    if campaign&.authenticate(campaign_user_params[:password])
      campaign_user = current_user.campaign_users.create!(campaign_id: campaign_user_params[:campaign_id])
      render json: campaign_user, status: :created
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

  def render_foribidden(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :forbidden
  end
end
