class Campaign < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'user_id'

  validates :name, presence: true, length: { maximum: 30 }
  validates :password_confirmation, presence: true
  has_secure_password
end
