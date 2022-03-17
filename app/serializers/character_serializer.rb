class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :profession

  belongs_to :campaign
end
