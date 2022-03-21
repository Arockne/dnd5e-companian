class Api::CampaignsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  
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

  def update
    campaign = current_user.owned_campaigns.find_by_id(params[:id])
    return render json: { errors: ['Not Authorized'] }, status: :unauthorized if campaign.nil?
    campaign.update!(campaign_params)
    render json: campaign, status: :ok
  end

  def destroy
    campaign = current_user.owned_campaigns.find_by_id(params[:id])
    return render json: { errors: ['Not Authorized'] }, status: :unauthorized if campaign.nil?
    campaign.destroy
    head :no_content
  end

  private

  def campaign_params
    params.require(:campaign).permit(:name, :setting, :password, :password_confirmation)
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
