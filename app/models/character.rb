class Character < ApplicationRecord
  belongs_to :user
  belongs_to :campaign
  has_one :character_profile

  validates :name, presence: true
  validates :background, presence: true
  validates :race, presence: true
  validates :profession, presence: true
  validates :alignment, inclusion: { in: [ 'Lawful good', 'Neutral good', 'Chaotic good', 'Lawful neutral', 'Neutral', 'Chaotice neutral', 'Lawful evil', 'Neutral evil', 'Chaotic evil' ]}

  validates :experience, numericality: { greater_than_or_equal_to: 0 }
  validates :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, numericality: { greater_than_or_equal_to: 0 }, on: :update
  validates :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, numericality: { greater_than_or_equal_to: 3 }, on: :create
end
