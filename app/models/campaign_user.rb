class CampaignUser < ApplicationRecord
  belongs_to :user
  belongs_to :campaign

  validates :user_id, uniqueness: { 
    scope: :campaign_id, 
    message: -> (object, data) do
      "is already a player of #{object.campaign.name}"
    end 
  }
end
