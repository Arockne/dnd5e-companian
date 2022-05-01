class User < ApplicationRecord
  has_many :owned_campaigns, class_name: 'Campaign', dependent: :destroy
  has_many :campaign_users, dependent: :destroy
  has_many :campaigns, through: :campaign_users
  has_many :characters, dependent: :destroy

  #need to create a custom query for getting all current characters that the current_user has a membership for campaigns. This query method wont grab the characters previously created in campaigns. IF we want the characters that we left we would need to rejoin whatever campaign we were part of. If the campaign owner did not delete the characters of course.

  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { minimum: 3 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  has_secure_password
end
