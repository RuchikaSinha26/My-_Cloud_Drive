const express = require("express")
const multer = require("multer")

const router = express.Router()

const upload = multer({ dest: "uploads/" })

router.post("/upload", upload.single("file"), (req,res)=>{
  res.send("File uploaded")
})
router.get("/",(req,res)=>{
  res.send("All files")
})

router.delete("/:id",(req,res)=>{
  res.send("Deleted")
})
router.get("/share/:id", (req, res) => {
    res.send("Share link created for file: " + req.params.id);
});
router.get("/search",(req,res)=>{res.send("Searching...");});
module.exports = router