class AddHeightToCharacter < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :height, :string, default: ''
  end
end
