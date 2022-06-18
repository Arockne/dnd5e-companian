class Character < ApplicationRecord
  belongs_to :user
  belongs_to :campaign

  validates :name, presence: true
  validates :background, presence: true
  validates :race, presence: true
  validates :klass, presence: true
  validates :alignment, inclusion: { in: [ 'Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil' ]}

  validates :image_url, presence: true, format: { with: /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i, message: 'is not valid'}
  validates :age, numericality: { greater_than: 0 }
  validates :experience, numericality: { greater_than_or_equal_to: 0 }
  validates :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, numericality: { greater_than_or_equal_to: 0 }, on: :update
  validates :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, numericality: { greater_than_or_equal_to: 3 }, on: :create
  validates :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, numericality: {
    less_than_or_equal_to: 30
  }

end
