class CreatePomodoros < ActiveRecord::Migration[7.0]
  def change
    create_table :pomodoros do |t|
      t.date :date

      t.timestamps
    end
  end
end
