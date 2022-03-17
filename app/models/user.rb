class User < ApplicationRecord
  has_many :owned_campaigns, class_name: 'Campaign'
  has_many :campaign_users
  has_many :campaigns, through: :campaign_users
  has_many :characters

  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { minimum: 3 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, confirmation: true
  validates :email_confirmation, presence: true
  validates :password_confirmation, presence: true
  has_secure_password
end
