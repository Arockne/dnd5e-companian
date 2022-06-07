class CharacterShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :background, :race, :profession, :alignment, :experience, :image_url, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :age, :height, :weight, :eyes, :skin, :hair, :gender, :appearance, :backstory

  belongs_to :campaign
end
