class RemovePasswordDigestFromCampaigns < ActiveRecord::Migration[6.1]
  def change
    remove_column :campaigns, :password_digest, :string
  end
end
