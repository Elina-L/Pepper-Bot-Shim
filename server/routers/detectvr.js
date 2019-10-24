var express = require('express');
var mmm = require('mmmagic'),
	Magic = mmm.Magic;
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');
const multer = require('multer');
const UPLOAD_PATH = __dirname + '/uploads/';
const upload = multer({ dest: UPLOAD_PATH }); // multer configuration
const apiKey = '09NbY89dcD4hVIirULntpm8CbQVVFUgOkTEeczN_bLOr';	// Should this be concealed? in some kind of auth.py?
var version = '2018-03-19';	// From watson tutorial

module.exports = function(app) {
	var router = express.Router();
	var magic = new Magic(mmm.MAGIC_MIME_TYPE);

	/* TODO: figure out valid content types for Power AI */
	var validTypes = ["image/gif", "image/jpeg", "image/png", "video..."];

	router.route('/')
	.post(upload.single("files"), function (req, res, next) {
		if (req.file) {
			console.log('Uploading Vision Recognition file...');
			var filename = req.file.filename;
			var url = UPLOAD_PATH + filename;
			magic.detectFile(url, function (err, result) {
				if (err) { 
					console.log(err);
					throw err; 
				}
				else if (validTypes.includes(result)) {
					console.log("Classifying...");
					var images_file = fs.createReadStream(url);
					var classifier_ids = ["default"];
					var params = {
						images_file: images_file,
						classifier_ids: classifier_ids
					};
					var visualRecognition = new VisualRecognitionV3({
						version: version,
						iam_apikey: apiKey,
					});
					var results;
					visualRecognition.classify(params, function (err, response) {
						if (err) {
							console.log(err);
							throw err;
						} else {
							res.status(200).send(JSON.stringify(response, null, 2));
						}
					});
				} else {
					res.status(400).json({
						status: 'UP',
						filename: `${filename}`,
						message: 'Not a valid object',
						mimetype: `${result}`
					});
				}
			});
		} else {
				res.status(400).json({
					status: 'UP',
					message: 'File not uploaded'
				})
		}
	});

	app.use("/detectvr", router);
}