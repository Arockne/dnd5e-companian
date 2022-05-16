class Api::CampaignsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  
  before_action :authorize_show_action, only: [:show]

  def index
    campaigns = Campaign.all
    render json: campaigns, status: :ok
  end

  def show
    render json: campaign, status: :ok
  end

  def create
    campaign = current_user.owned_campaigns.create!(campaign_params)
    render json: campaign, status: :created
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
    params.require(:campaign).permit(:name, :setting, :image_url, :password)
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def membership
    @membership ||= current_user.campaign_users.find_by(campaign_id: params[:id])
  end

  def campaign
    @campaign ||= Campaign.find_by_id(params[:id])
  end

  def campaign_owner?
    current_user == campaign.owner
  end

  def authorize_show_action
    render json: { errors: ['Not Authorized'] }, status: :unauthorized unless membership || campaign_owner?
  end

end
