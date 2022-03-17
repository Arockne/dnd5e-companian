class AddImageUrlToCampaigns < ActiveRecord::Migration[6.1]
  def change
    add_column :campaigns, :image_url, :string
  end
end
