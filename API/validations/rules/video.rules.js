const { body } = require('express-validator');

const youtubeLinkUploadRules = () => {
  return [
    body('youtubeURL')
      .not()
      .isEmpty()
      .withMessage('Please provide a youtube url')
      .isURL()
      .withMessage('Please provide a valid url')
      .custom((value) => {
        if (!value.includes('youtube')) {
          return Promise.reject('URL link must be only from youtube');
        }

        return true;
      }),
  ];
};

module.exports = {
  youtubeLinkUploadRules,
};
