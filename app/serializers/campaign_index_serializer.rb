class CampaignIndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :setting

  def setting
    "#{object.setting[0..75].strip}..."
  end
end
