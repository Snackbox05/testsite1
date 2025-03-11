import wixData from "wix-data"

$w.onReady(function () {

	getData()

});

function getData() {
	
	wixData.query("People").find()
	.then((results) =>{
		let items = results.items
		console.log(items)
		return items
	})
	
}