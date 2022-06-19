class CharacterShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :background, :race, :klass, :alignment, :experience, :image_url, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :age, :height, :weight, :eyes, :skin, :hair, :gender, :appearance, :backstory, :visible

  belongs_to :campaign
  belongs_to :user
end
