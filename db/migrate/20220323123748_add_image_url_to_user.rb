class AddImageUrlToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :image_url, :string, default: ""
  end
end
