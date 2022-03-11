class CreateCampaigns < ActiveRecord::Migration[6.1]
  def change
    create_table :campaigns do |t|
      t.string :name
      t.text :setting
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
