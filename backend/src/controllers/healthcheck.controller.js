import {ApiError} from "../utils/ApiError.js"
import { ApiResponce } from "../utils/ApiResponce.js"
import {asyncHandler} from "../utils/AsyncHandler.js"

const healthcheck = asyncHandler(async (req, res,) => {
    return res.status(200)
    .json(new ApiResponce(200, {}, "healthcheck PASS"))
})

export {
    healthcheck
    }
    