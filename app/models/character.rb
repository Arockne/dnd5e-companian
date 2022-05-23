class Character < ApplicationRecord
  belongs_to :user
  belongs_to :campaign
  has_one :character_profile, dependent: :destroy

  validates :name, presence: true
  validates :background, presence: true
  validates :race, presence: true
  validates :profession, presence: true
  validates :alignment, inclusion: { in: [ 'Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil' ]}

  validates :experience, numericality: { greater_than_or_equal_to: 0 }
  validates :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, numericality: { greater_than_or_equal_to: 0 }, on: :update
  validates :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, numericality: { greater_than_or_equal_to: 3 }, on: :create
end
