class AddSkinToCharacter < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :skin, :string, default: ''
  end
end
