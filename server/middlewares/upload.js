import multer from "multer"

// const storage=multer.diskStorage({
//     destination:'./public/images',
//     filename:(req,file,cb)=>{
//        return cb(null,file.fieldname + '-' + Date.now() + Math.random() * 900 + file.originalname)
//     }
// })
// const upload=multer({
//     storage:storage
// })


const storage = multer.memoryStorage(); // Store file in memory

const upload = multer({ storage })
export default upload
