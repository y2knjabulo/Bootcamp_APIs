import express from 'express';
import LongestWord from './bootcamp functions/LongestWord.js';
import ShortestWord from './bootcamp functions/ShortestWord.js';
import totalPhoneBill from './bootcamp functions/totalPhoneBill.js';
import enoughAirtime from './bootcamp functions/enoughAirtime.js';
// import ShortestWord from './bootcamp functions/ShortestWord.js'
import WordLength from './bootcamp functions/WordLength.js'
const app = express();
app.use(express.static('public'))
app.use(express.json());

app.get(`/api/word_game`, function(req, res){
    const sentence = req.query.sentence;
    if (!sentence) {
        res.json({
            error: 'Please send in a sentence to analyze'
        })
    }


    res.json({
        'LongestWord': LongestWord(sentence),
        'ShortestWord' : ShortestWord(sentence),
        'sum' : WordLength(sentence)
    });
});

let callPrice = 2.75;
let smsPrice = 0.65;

app.get("/api/phonebill/prices", (req, res) => {
    res.json({
      call: callPrice,
      sms: smsPrice,
    });
  });
  
  app.post("/api/phonebill/price", (req, res) => {
    const { type, price } = req.body;
    if (type === "call") {
      callPrice = price;
    } else if (type === "sms") {
      smsPrice = price;
    }
    res.json({
      status: "success",
      message: `The ${type} was set to ${price}`,
    });
  });
  
  app.post("/api/phonebill/total", (req, res) => {
    const data = req.body.bill;
    const total = totalPhoneBill(data);
    res.json({
      total,
    });
  });
  
  app.post("/api/enough", (req, res) => {
    const { usage, available } = req.body;
    const result = enoughAirtime(usage, available);
    res.json({
      result,
    });
  });

let PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
