class CampaignJoinRequestSerializer < ActiveModel::Serializer
  attributes :id, :campaign_id, :user_id
  belongs_to :user
end
