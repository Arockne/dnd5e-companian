class Api::CampaignJoinRequestsController < ApplicationController
  
  def create
    byebug
    request = CampaignJoinRequest.create(request_params)
    render json: request, status: :ok  
  end
end
