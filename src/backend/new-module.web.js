import { Permissions, webMethod } from "wix-web-module";
import wixData from "wix-data";
export const multiply = webMethod(
    Permissions.Anyone,
    (factor1, factor2) => {
        return factor1 * factor2
    }
);

export const queryCollection = webMethod(
    Permissions.Anyone,
    () => {
        wixData.query("People")
            .find()
            .then((results) => {
                let items = results.items;
                console.log(items)
                let managers = [];

                for (let i = 0; i < items.length; i++) {
                    if (items[i].isManager) {
                        managers.push(items[i].name)
                    }
                }
                console.log(managers)

            })
    }
)


export const getData = webMethod(
  Permissions.Anyone,
  () =>{
    wixData.query("People").find({suppressAuth: true})
	.then((results) =>{
		let items = results.items
		console.log(items)
		return items
	})
  }
)
