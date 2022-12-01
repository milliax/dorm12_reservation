const FormData = require("form-data")

export default async function handler(req, res) {
    if (req.method !== "GET") {
        console.log("returned")
        return res.status(403).json({ message: "wrong method" })
    }
    // console.log(req.body)

    try {
        let formData = new FormData()
        formData.append("bid", "6");
        formData.append("date", "2022/11/28")

        const response = await fetch("http://book.dorm.nycu.edu.tw/ischool/public/reservation/reservation_datetime_query_field.php", {
            body: formData,
            method: "POST",
            mode: "no-cors"
        })
        if (response.ok) {
            // console.log("good")
            // const json = await res.json()
            const json = await response.text()
            return res.status(200).json(json)
        } else {
            console.log("bad request")
            console.log(response)
            return res.status(200).json({ message: "Unexpected Error" })
        }
    } catch (err) {
        console.log(err)
        console.log("returned")
        return res.status(500).json({ message: err })
    }

}