import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)
//     }
//   })

  // This line tells Multer to store the file in memory
const storage = multer.memoryStorage(); 
// const upload = multer({ storage: storage });
  
export const upload = multer({ 
    storage, 
})