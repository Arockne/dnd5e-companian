class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :username, :characters

  def characters
    campaign_id = instance_options[:option_name][:campaign_id].to_i
    object.characters.select(:id, :name, :visible).where(campaign_id: campaign_id)
  end
end
