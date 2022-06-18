class RemoveProfessionFromCharacters < ActiveRecord::Migration[6.1]
  def change
    remove_column :characters, :profession, :string
  end
end
