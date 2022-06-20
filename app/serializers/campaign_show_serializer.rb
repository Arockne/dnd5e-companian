class CampaignShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :setting, :current_player
  
  belongs_to :owner

  def current_player
    object.campaign_users.select(:id, :campaign_id, :user_id).find_by(user: current_user)
  end
end
