class Character < ApplicationRecord
  belongs_to :campaign_user
  belongs_to :campaign

  validates :name, presence: true
  validates :background, presence: true
  validates :race, presence: true
  validates :profession, presence: true
  validates :alignment, inclusion: { in: [ 'Lawful good', 'Neutral good', 'Chaotic good', 'Lawful neutral', 'Neutral', 'Chaotice neutral', 'Lawful evil', 'Neutral evil', 'Chaotic evil' ]}

  validates :experience, numericality: { greater_than: 0 }
  validates :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, numericality: { greater_than: 0 }
end
