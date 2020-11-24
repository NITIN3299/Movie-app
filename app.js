var express=require("express");
var app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
var request=require('request');

app.get("/",function(req,res){
    res.render("home");
})

app.get("/results",function(req,res){
    var query=req.query.search;
    var url="http://omdbapi.com/?s=" + query + "&apikey=46b09abd&plot=full"
   request(url,function(error,response,body){
       if(!error && response.statusCode==200){
           var parseddata=JSON.parse(body);
           res.render("search",{data:parseddata});
       }
   })
})
app.get("/detail/:movieID",function(req, res){
	var movieID = req.params.movieID;
	movieID = movieID.substring(1);
	var url = 'http://www.omdbapi.com/?i=' + movieID + '&apikey=46b09abd&plot=full';
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("details", { data: data });
		}
	})
})
app.listen(process.env.PORT,function(){
    console.log("movie app is started!!");
});