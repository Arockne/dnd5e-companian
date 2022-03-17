class CampaignSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url

  belongs_to :owner
end
