class Api::CampaignJoinRequestsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  before_action :authorize_join_request, only: [:create]
  before_action :authorize_campaign_owner_actions, only: [:index, :destroy, :accept]

  def index
    requests = campaign.campaign_join_requests
    render json: requests, status: :ok
  end

  def create
    request = CampaignJoinRequest.create!(user: current_user, campaign_id: params[:campaign_id])
    render json: request, status: :ok  
  end

  def accept
    request = CampaignJoinRequest.find(params[:campaign_join_request_id])
    campaign.campaign_users.create!(user_id: request[:user_id])
    request.destroy
    render json: request, status: :ok
  end

  def destroy
    campaign_join_request.destroy
    render json: campaign_join_request, status: :ok
  end
  
  private

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def authorize_join_request
    render json: { errors: ['Cannot request to join as the owner'] }, status: :unprocessable_entity if campaign_owner?
    render json: { errors: ['Cannot request to join as a player'] }, status: :unprocessable_entity if player?
  end

  def authorize_campaign_owner_actions
    render json: { errors: ['Not authorized'] }, status: :unauthorized unless campaign_owner?
  end

  def campaign_user
    @campaign_user ||= campaign.campaign_users.find_by(user: current_user)
  end

  def player?
    !campaign_user.nil?
  end

  def campaign
    @campaign ||= Campaign.find(params[:campaign_id])
  end

  def campaign_owner?
    current_user == campaign.owner
  end

  def campaign_join_request
    @campaign_join_request ||= CampaignJoinRequest.find(params[:id])
  end

  def render_not_found
    render json: { errors: ['The campaign join request does not exist'] }, status: :not_found
  end
end
