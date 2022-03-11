class AddPasswordDigestToCampaigns < ActiveRecord::Migration[6.1]
  def change
    add_column :campaigns, :password_digest, :string
  end
end
