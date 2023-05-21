const planSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      enum: ['daily', 'weekly', 'monthly'],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    workouts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  });
  
  export default planSchema;
  module.exports = mongoose.model('Plan', planSchema);