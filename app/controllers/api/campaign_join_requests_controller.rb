class Api::CampaignJoinRequestsController < ApplicationController
  
  def create
    request = CampaignJoinRequest.create(user: current_user, campaign_id: params[:campaign_id])
    render json: request, status: :ok  
  end
end
