class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :klass, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma

  belongs_to :campaign
end
