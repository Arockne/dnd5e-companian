class User < ApplicationRecord
  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { minimum: 3 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, confirmation: true
  validates :email_confirmation, presence: true
  validates :password_confirmation, presence: true
  has_secure_password
end
