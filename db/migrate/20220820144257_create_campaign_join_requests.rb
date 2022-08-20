class CreateCampaignJoinRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :campaign_join_requests do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :campaign, null: false, foreign_key: true

      t.timestamps
    end
  end
end
