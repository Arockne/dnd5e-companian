class AddAppearanceToCharacter < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :appearance, :string, default: ''
  end
end
