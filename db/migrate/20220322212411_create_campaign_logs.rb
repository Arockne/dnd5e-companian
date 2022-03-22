class CreateCampaignLogs < ActiveRecord::Migration[6.1]
  def change
    create_table :campaign_logs do |t|
      t.string :message
      t.string :color
      t.belongs_to :campaign, null: false, foreign_key: true

      t.timestamps
    end
  end
end
