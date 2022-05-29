class AddImageUrlToCampaigns < ActiveRecord::Migration[6.1]
  def change
    add_column :campaigns, :image_url, :string, default: ""
  end
end
