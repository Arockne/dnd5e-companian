class CharacterShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :background, :race, :profession, :alignment, :experience, :image_url, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma

  belongs_to :campaign
  has_one :character_profile
end
