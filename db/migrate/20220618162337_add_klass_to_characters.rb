class AddKlassToCharacters < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :klass, :string, default: ''
  end
end
