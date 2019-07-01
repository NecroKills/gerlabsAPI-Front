class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :color
      t.datetime :start
      t.datetime :end_2

      t.timestamps
    end
  end
end
