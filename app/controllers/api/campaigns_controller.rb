class Api::CampaignsController < ApplicationController

  def index
    campaigns = Campaign.all
    render json: campaigns, status: :ok
  end

  def create
    campaign = current_user.owned_campaigns.new(campaign_params)
    if campaign.save
      render json: campaign, status: :created
    else
      render json: { errors: campaign.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    campaign = current_user.owned_campaigns.find_by(id: params[:id])
    if campaign.nil?
      render json: { errors: ['Not Authorized'] }, status: :unauthorized
    else
      campaign.destroy
      head :no_content
    end
  end

  private

  def campaign_params
    params.require(:campaign).permit(:name, :setting, :password, :password_confirmation)
  end
end
