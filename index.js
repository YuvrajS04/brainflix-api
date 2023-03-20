const express = require("express");
const videoRoutes = require("./routes/videoRoutes")
const port = 8082;
const app = express();
const cors = require("cors");
app.use(express.static('public'))


app.use(cors());
app.use(express.json());

app.use("/videos", videoRoutes);




app.listen(port, 
    console.log(`Express demo is listening to ${port}`)
)

