import { ApiError } from "../utils/ApiError.js"
import { ApiResponce } from "../utils/ApiResponce.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import pdf from "pdf-parse"
function getFileExtension(mimeType) {
    if (typeof mimeType !== 'string' || !mimeType.includes('/')) {
      return null;
    }
    return mimeType.split('/')[1];
  }
const test = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json(new ApiResponce(400, null, "No file uploaded."));
        }

        const extention = getFileExtension(req.file.mimetype);

        if (extention !== "pdf") {
            return res.status(400)
                .json(new ApiResponce(400, {}, "not a PDF file"));
        }
        
        const dataBuffer = req.file.buffer;
        console.log("buffer ->",dataBuffer)
        console.log(req.file)
        let fullText = null;
        await pdf(dataBuffer)
        .then((data)=>{
            fullText = data.text
        })

        // CORRECTED LINE: The text is on pdata.text, not pdata.data.text
        
        // Structure the response data as per your example
        const Data = {
            "text": fullText.trim(),
            "extention": extention
        };

        return res.status(200)
            .json(new ApiResponce(200, Data, "upload successfully"));
        
    } catch (error) {
        console.error('something went wrong while exracting text', error);
        return res.status(500).json(new ApiError(500, "failed extract text", error));
    }
    
})

export {
    test
}
