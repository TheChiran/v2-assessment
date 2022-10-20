const Video = require('./../models/video.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const crudFactory = require('./../controllers/handleCRUDFactory');
const httpStatus = require('http-status');

exports.setUploaderUser = catchAsync(async (req, res, next) => {
  req.body.uploadedBy = req.user;

  next();
});

// middleware to check if video is uploaded by user (update/delete)
exports.checkIsVideoUploadedByUser = catchAsync(async (req, res, next) => {
  const video = await Video.findById(req.params.id);

  if (!video)
    return new AppError(
      'Video with provided id not found',
      httpStatus.NOT_FOUND
    );

  if (video.uploadedBy !== req.user._id)
    return new AppError(
      'You are not allowed to edit/delete this particular video',
      httpStatus.UNAUTHORIZED
    );

  next();
});

exports.increaseViewCount = catchAsync(async (req, res, next) => {
  const video = await Video.findById(req.params.id);

  video.total_view += 1;

  await video.save();
  next();
});

exports.create = crudFactory.createOne(Video);
exports.getList = crudFactory.getAll(Video);
exports.updateOne = crudFactory.updateOne(Video);
exports.deleteOne = crudFactory.deleteOne(Video);
exports.getListByUser = crudFactory.getAll(Video, { uploadedBy: undefined });
exports.getOne = catchAsync(async (req, res, next) => {
  const video = await Video.findById(req.params.id)
    .populate('uploadedBy')
    .populate({
      path: 'liked',
      populate: {
        path: 'users',
        model: 'User',
      },
    })
    .populate({
      path: 'disliked',
      populate: {
        path: 'users',
        model: 'User',
      },
    });

  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      data: video,
    },
  });
});

exports.likeVideo = catchAsync(async (req, res, next) => {
  // 1) Check if user has already disliked the video
  const video = await Video.findById(req.params.id);

  if (video.disliked.users.includes(req.user._id)) {
    video.disliked.users = video.disliked.users.filter((user) => {
      return user.toString() !== req.user._id.toString();
    });
    video.disliked.total -= 1;
  }
  // 2) Check if user has already liked the video -> do nothing and return response
  if (video.liked.users.includes(req.user._id)) {
    return res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        data: video,
      },
    });
  }
  // 3) update liked count and push user info into users
  video.liked.total += 1;
  video.liked.users.push(req.user._id);
  const updatedVideo = await video.save();

  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      data: updatedVideo,
    },
  });
});

exports.dislikeVideo = catchAsync(async (req, res, next) => {
  // 1) Check if user has already liked the video
  const video = await Video.findById(req.params.id);
  if (video.liked.users.includes(req.user._id)) {
    video.liked.users = video.liked.users.filter((user) => {
      return user.toString() !== req.user._id.toString();
    });
    video.liked.total -= 1;
  }
  // 2) Check if user has already disliked the video -> do nothing and return response
  if (video.disliked.users.includes(req.user._id)) {
    return res.status(httpStatus.OK).json({
      status: 'success',
      data: { data: video },
    });
  }
  // 3) update disliked count and push user info into users
  video.disliked.total += 1;
  video.disliked.users.push(req.user._id);
  const updatedVideo = await video.save();

  return res.status(httpStatus.OK).json({
    status: 'success',
    data: {
      data: updatedVideo,
    },
  });
});
