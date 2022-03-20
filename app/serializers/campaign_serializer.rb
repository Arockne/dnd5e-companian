class CampaignSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :setting

  belongs_to :owner
end
