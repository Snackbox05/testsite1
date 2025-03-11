import wixData from "wix-data"
import { getData } from "backend/new-module.web.js"

$w.onReady(function () {

    $w("#repeater1").onItemReady(($item, itemData, index) => {
        $item("#text4").text = itemData.name
        $item("#text5").text = itemData.employeeId.toString()
        if (itemData.isManager) {
            $item("#vectorImage3").expand()
        }

        $item("#button2").onClick(() => {
            wixData.remove("People", itemData._id)
                .then(() => {
                    console.log("Deleted")
                })
                .catch((err) => {
                    console.log(err)
                })
        })

    })

    wixData.query("People")
        .find()
        .then((results) => {
            let items = results.items
            $w("#repeater1").data = items
        })

    $w("#button1").onClick(() => {
        let name = $w("#input1").value
        let empId = $w("#input2").value

        let toInsert = {
            "name": name,
            "employeeId": empId
        }

        wixData.insert("People", toInsert)
            .then((results) => {
                console.log("Inserted")
            })
            .catch((err) => {
                console.log(err)
            })

    })

    $w("#button3").onClick(() => {
        wixData.query("People")
            .eq("name", "Bob")
            .find()
            .then((results) => {
                let item = results.items[0]
                item.employeeId = $w("#input3").value;
                wixData.update("People", item)
                    .then(() => {
                        wixData.query("People")
                            .find()
                            .then((results) => {
                                let items = results.items
                                $w("#repeater1").data = items
                            })

                    })
            })
    })

});