class Campaign < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'user_id'
  has_many :campaign_users, dependent: :destroy
  has_many :users, through: :campaign_users
  has_many :characters, dependent: :destroy

  validates :image_url, presence: true
  validate :image

  validates :name, presence: true, length: { maximum: 30 }, uniqueness: { case_sensitive: false }
  has_secure_password

  def image
    if image_url.present?
      unless /(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|gif|png)/i.match(image_url)
        errors.add(:image_url, "is not valid")
      end
    end
  end
end
