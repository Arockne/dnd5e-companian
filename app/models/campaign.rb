class Campaign < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'user_id'
  has_many :campaign_users, dependent: :destroy
  has_many :users, through: :campaign_users
  has_many :characters, dependent: :destroy
  has_many :campaign_join_requests

  validates :image_url, presence: true, format: { with: /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i, message: 'is not valid'}
  validates :name, presence: true, length: { maximum: 30 }, uniqueness: { case_sensitive: false }

end
