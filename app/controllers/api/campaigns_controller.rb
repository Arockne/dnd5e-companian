class Api::CampaignsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  
  before_action :authorize_show_action, only: [:show]

  def index
    campaigns = Campaign.where.not(owner: current_user)
    render json: campaigns, status: :ok, each_serializer: CampaignIndexSerializer
  end

  def current_campaigns
    owned_campaigns = current_user.owned_campaigns
    campaigns = current_user.campaigns.select(:id, :name, :setting, :image_url)
    current = { owned_campaigns: owned_campaigns, campaigns: campaigns}
    render json: current, status: :ok
  end

  def currently_owned
    campaigns = current_user.owned_campaigns
    render json: campaigns, status: :ok
  end

  def currently_playing
    campaigns = current_user.campaigns
    render json: campaigns, status: :ok
  end

  def show
    render json: campaign, status: :ok, serializer: CampaignShowSerializer
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
    head :ok
  end

  def players
    players = campaign.users
    render json: players, status: :ok
  end

  private

  def campaign_params
    params.require(:campaign).permit(:name, :setting, :image_url)
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
  
  def render_not_found
    render json: { errors: ['The campaign you are looking for does not exist in this realm.'] }, status: :not_found
  end

  def membership
    @membership ||= current_user.campaign_users.find_by(campaign_id: params[:id])
  end

  def campaign
    @campaign ||= Campaign.find(params[:id] || params[:campaign_id])
  end

  def campaign_owner?
    current_user == campaign.owner
  end

  def authorize_show_action
    render json: { errors: ['Not Authorized'] }, status: :unauthorized unless membership || campaign_owner?
  end

end
