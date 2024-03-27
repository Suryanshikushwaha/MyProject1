import express from "express";
import bodyParser from "body-parser";
import QRCode from "qrcode";


var x = new Date().getFullYear();
const app = express();
const port = 3000;
var link="";
var name="";
function middle(req,res,next)
{
    link = req.body["link"];
    next();
}

function makeQr()
{
    name = link.split(".")[0];
    QRCode.toFile(`./public/images/${name}.png`, link, {
    errorCorrectionLevel: 'H'
    }, function(err) {
    if (err) throw err;
    console.log('QR code saved!');
    });
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(middle);

app.get("/", (req, res) => {
    res.render("index.ejs",{year : x});
  });

app.post("/submit", (req,res)=>{
    makeQr();
    res.render("index.ejs",{link:link, year:x, name:name});
  });  

app.listen(port,()=>{
    console.log(`Live on port ${port}`);
})

