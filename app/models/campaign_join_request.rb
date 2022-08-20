class CampaignJoinRequest < ApplicationRecord
  belongs_to :user
  belongs_to :campaign

  validates :campaign, uniqueness: { scope: :user, message: 'join request has been sent' }
end
