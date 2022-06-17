class Character < ApplicationRecord
  belongs_to :user
  belongs_to :campaign

  validates :name, presence: true
  validates :background, presence: true
  validates :race, presence: true
  validates :profession, presence: true
  validates :alignment, inclusion: { in: [ 'Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil' ]}

  validates :image_url, presence: true
  validate :image

  validates :age, numericality: { greater_than: 0 }
  validates :experience, numericality: { greater_than_or_equal_to: 0 }
  validates :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, numericality: { greater_than_or_equal_to: 0 }, on: :update
  validates :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, numericality: { greater_than_or_equal_to: 3 }, on: :create
  validates :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, numericality: {
    less_than_or_equal_to: 30
  }

  def image
    if image_url.present?
      unless /(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|gif|png)/i.match(image_url)
        errors.add(:image_url, "is not valid")
      end
    end
  end

end
