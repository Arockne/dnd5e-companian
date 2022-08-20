class Api::CampaignJoinRequestsController < ApplicationController
  
  def create
    request = CampaignJoinRequest.create(request_params)
    render json: request, status: :ok  
  end


  def request_params
    params.permit(:user_id, :campaign_id)
  end
end
