// const AWS = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');

// // configure the SDK with your AWS access key and secret key
// AWS.config.update({
//   accessKeyId: YOUR_ACCESS_KEY,
//   secretAccessKey: YOUR_SECRET_KEY
// });

// // create an S3 client object
// const s3 = new AWS.S3();

// // configure the multer middleware to use S3 for file storage
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'my-bucket',
//     acl: 'public-read',
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + file.originalname);
//     }
//   })
// });

// // define a route that handles the file upload
// app.post('/upload', upload.single('image'), function(req, res, next) {
//   // the image is now saved in the S3 bucket
//   res.send('Image successfully uploaded');
// });

// // second one

const AWS = require("aws-sdk");
const multer = require("multer");
// const multerS3 = require('multer-s3');

// configure the SDK with your AWS access key and secret key
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECERTKEY,
});
const region = process.env.AWS_S3_REGION;
// create an S3 client object
const s3 = new AWS.S3();

// create a multer storage engine that uses S3
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
});

const upload = multer({ storage: storage });

const awsUpload = async ({ key, body }) => {
  console.log(key, body);
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: body,
  };
  s3.upload(params, function (err, data) {
    if (err) {
      console.error(err);
      //   res.status(500).send(err);
      throw err;
    } else {
      console.log(data.Location);
      //   console.log(`Image successfully saved to ${BUCKET_NAME}`);
      //   console.log(`https://${params.Bucket}.s3.${region}.amazonaws.com/${params.Key}`);
      //   res.send("Image successfully uploaded");
      return data.Location;
    }
  });
};

module.exports = { upload, awsUpload };

// define a route that handles the file upload
// app.post('/upload', upload.single('image'), function(req, res, next) {
//   // the image is now stored in the req.file.buffer property
//   // create a params object that contains the bucket name, file name, and file contents
//   const params = {
//     Bucket: 'my-bucket',
//     Key: 'image.jpg',
//     Body: req.file.buffer
//   };

//   // save the image to the S3 bucket
//   s3.upload(params, function(err, data) {
//     if (err) {
//       console.error(err);
//       res.status(500).send(err);
//     } else {
//       console.log(`Image successfully saved to ${BUCKET_NAME}`);
//       res.send('Image successfully uploaded');
//     }
//   });
// });
