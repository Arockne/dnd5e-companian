class Character < ApplicationRecord
  belongs_to :campaign_user
  belongs_to :campaign
end
