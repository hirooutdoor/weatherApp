const { response } = require("express");
const express = require("express");
const https = require("https");


const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    
    const query = req.body.cityName ;
    const apiKey = "89b5edcbef5ab119a7cf4dcef8c1be2f" ;
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit ;
    
    https.get(url, (response) => {
        console.log(response.statusCode);
        
        response.on("data", (data) => {
            
            const weatherData = JSON.parse(data)
            console.log(weatherData);
            
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            console.log(temp);
            console.log(description);
            res.write("<h1>The temperature in " + req.body.cityName + " is " + temp + " degrees Celsius.</h1>");
            res.write("<h2>The weather is currently " + description + ".</h2>");
            res.write("<img src=" + imageURL + ">");
            res.send()
                
        })
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}. `);
})