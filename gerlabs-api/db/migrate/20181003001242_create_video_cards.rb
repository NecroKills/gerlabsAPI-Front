class CreateVideoCards < ActiveRecord::Migration[5.0]
  def change
    create_table :video_cards do |t|
      t.string :name
      t.string :memory_gpu

      t.timestamps
    end
  end
end
