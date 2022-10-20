const express = require('express');
const authController = require('./../../controllers/authController');
const videoController = require('./../../controllers/videoController');
const {
  youtubeLinkUploadRules,
} = require('./../../validations/rules/video.rules');
const { validateInputFields } = require('./../../validations/validate');

const router = express.Router();

router
  .route('/')
  .post(
    youtubeLinkUploadRules(),
    validateInputFields,
    authController.protect,
    videoController.setUploaderUser,
    videoController.create
  )
  .get(videoController.getList);

router
  .route('/:id')
  .get(videoController.increaseViewCount, videoController.getOne);

router.use(authController.protect);

router.get('/by-user', videoController.getListByUser);

router
  .route('/:id')
  .patch(videoController.updateOne)
  .delete(videoController.deleteOne);

router.patch('/:id/like', videoController.likeVideo);
router.patch('/:id/dislike', videoController.dislikeVideo);

module.exports = router;
