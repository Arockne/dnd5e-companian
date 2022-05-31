class Api::CampaignsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  
  before_action :authorize_show_action, only: [:show]
  before_action :authorize_password_update, only: [:password_update]

  def index
    campaigns = Campaign.where.not(owner: current_user)
    render json: campaigns, status: :ok, each_serializer: CampaignIndexSerializer
  end

  def current_campaigns
    owned_campaigns = current_user.owned_campaigns.select(:id, :name, :setting, :image_url)
    campaigns = current_user.campaigns.select(:id, :name, :setting, :image_url)
    current = { owned_campaigns: owned_campaigns, campaigns: campaigns}
    render json: current, status: :ok
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

  def password_update
    campaign.update!(password: campaign_password_params[:new_password])
    head :ok
  end

  def destroy
    campaign = current_user.owned_campaigns.find_by_id(params[:id])
    return render json: { errors: ['Not Authorized'] }, status: :unauthorized if campaign.nil?
    campaign.destroy
    head :ok
  end

  private

  def campaign_params
    params.require(:campaign).permit(:name, :setting, :image_url, :password)
  end

  def campaign_password_params
    params.require(:campaign).permit(:old_password, :new_password)
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def membership
    @membership ||= current_user.campaign_users.find_by(campaign_id: params[:id])
  end

  def campaign
    @campaign ||= Campaign.find_by_id(params[:id] || params[:campaign_id])
  end

  def campaign_owner?
    current_user == campaign.owner
  end

  def authenticate_password_update
    campaign&.authenticate(campaign_password_params[:old_password])
  end

  def authorize_show_action
    render json: { errors: ['Not Authorized'] }, status: :unauthorized unless membership || campaign_owner?
  end

  def authorize_password_update
    render json: { 
      errors: ['Not Authorized'] 
    }, status: :unauthorized unless campaign_owner?
    render json: { 
      errors: ['Old password does not match current password']
    }, status: :unprocessable_entity unless authenticate_password_update
  end

end
