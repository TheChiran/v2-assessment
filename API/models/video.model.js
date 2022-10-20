const mongoose = require('mongoose');
const validator = require('validator');

const videoSchema = new mongoose.Schema(
  {
    youtubeURL: {
      type: String,
      required: [true, 'Please provide youtube url link'],
      validate: [validator.isURL, 'Please provide a valid url'],
    },
    total_view: {
      type: Number,
      default: 0,
      required: false,
    },
    liked: {
      total: {
        type: Number,
        default: 0,
      },
      users: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'User',
        },
      ],
      required: false,
    },
    disliked: {
      total: {
        type: Number,
        default: 0,
      },
      users: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'User',
        },
      ],
      required: false,
    },
    uploadedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: [true, 'Shared video must have owner'],
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
