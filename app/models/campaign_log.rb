class CampaignLog < ApplicationRecord
  belongs_to :campaign

  validates :message, presence: true
  validates :color, presence: true
end
