class CreateSoftwares < ActiveRecord::Migration[5.0]
  def change
    create_table :softwares do |t|
      t.string :name
      t.string :version
      t.integer :type

      t.timestamps
    end
  end
end
