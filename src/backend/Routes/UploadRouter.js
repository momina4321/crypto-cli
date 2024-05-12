const multer = require('multer');



const router = require('express').Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'draw-chart'); // Save uploads to the 'draw-chart' directory
  },
  filename: function (req, file, cb) {
   // const modifiedName = originalName.replace(/\s/g, "_");
   cb(null,file.originalname)
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  // File uploaded successfully
  const file = req.file;
    console.log(file.filename);
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  else{
     // File uploaded successfully
  return res.status(200).json({ message: 'File uploaded successfully.' });
  }

 
});

module.exports=router