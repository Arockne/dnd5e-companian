class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :profession, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma

  belongs_to :campaign
end
