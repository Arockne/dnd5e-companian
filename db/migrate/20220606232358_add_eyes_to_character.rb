class AddEyesToCharacter < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :eyes, :string, default: ''
  end
end
