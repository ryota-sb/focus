class CreatePomodoroAggregations < ActiveRecord::Migration[7.0]
  def change
    create_table :pomodoro_aggregations do |t|
      t.date :aggregation_date
      t.integer :pomodoro_count

      t.timestamps
    end
    
    add_reference :pomodoro_aggregations, :pomodoro, foreign_key: true
  end
end
