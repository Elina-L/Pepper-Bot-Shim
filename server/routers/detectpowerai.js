var express = require('express');
var mmm = require('mmmagic'),
	Magic = mmm.Magic;
const multer = require('multer');
const UPLOAD_PATH = __dirname + '/uploads/';
const upload = multer({ dest: UPLOAD_PATH }); // multer configuration
const secureGateway = 'https://cap-sg-prd-2.integration.ibmcloud.com:18027'
const powerAIurl = '/powerai-vision/api/dlapis';
const modelEndPoint = '/585ef359-b8fa-4a0c-a24b-3248bf696c9a'

module.exports = function(app) {
	var router = express.Router();
	var magic = new Magic(mmm.MAGIC_MIME_TYPE);

	/* TODO: figure out valid content types for Power AI */
	var validTypes = ["image/gif", "image/jpeg", "image/png", "video..."];

	router.route('/')
	.post(upload.single("files"), function (req, res, next) {
		if (req.file) {
			console.log('Uploading file...');
			var filename = req.file.filename;
			var url = UPLOAD_PATH + filename;
			magic.detectFile(url, function(err, result) {
				if (err) {
					console.log(err)
					throw err;
				} else if (validTypes.includes(result)) {
					console.log('Classifying...');
					res.redirect(307, secureGateway + powerAIurl + modelEndPoint);
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

	app.use("/detectpowerai", router);
}
