class CharacterProfile < ApplicationRecord
  belongs_to :character

  validates :age, numericality: { greater_than: 0 }
end
