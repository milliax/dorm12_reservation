

import React, { useState, useEffect } from "react"

// bid 
// MOJITO: 6
// 
// 預約規則
// 一個人最多一天4小時
// 同一間只能填2小時

const scheduleArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
export default function Home() {
    const [temp, setTemp] = useState([])
    const [selectedRoom,setSelectedRoom] = useState("")
    const fetch_data = async () => {
        try {
            const res = await fetch("/api/dorm/request")
            const json = await res.json()
            if (!res.ok) {
                throw new Error(json.message)
            }
            //console.log(json)
            setTemp(JSON.parse(json))
            console.log(JSON.parse(json))
        } catch (err) {
            console.log(err)
        }
    }

    const reserve = async (date,period) =>{
        const res = await fetch("/api/reserve",{
            method: "POST",
            body: JSON.stringify({
                date,period
            })
        })
    }

    const toggleRoomChanged = event=>{
        console.log(event)
    }

    useEffect(() => {
        // fetch people in use
        fetch_data()
    }, [])

    return (
        <div className="flex flex-col">
            <div className="text-xl font-bold bg-gray-200 text-center h-12 justify-center flex flex-col">
                12舍 公設預約
            </div>
            <div className="self-center md:w-4/5 w-full px-3 md:px-0 pt-5">
                <div>
                已登入帳號
                    <div className="flex flex-row space-x-3">
                        <div>目前房間</div>
                        <select onChange={event=>{
                            toggleRoomChanged(event)
                        }}>
                            <option>MOJITO</option>
                            <option>NEGRONI</option>
                            <option>GIMLET</option>
                            <option>NARRATOR</option>
                            <option>TYLER</option>
                            <option>地板教室</option>
                            <option>共享食堂</option>
                        </select>
                    </div>
                </div>
                
                {/* use this template */}
                {/* https://tailwindui.com/components/application-ui/data-display/calendars */}

                <div className="grid grid-cols-8 gap-2 pt-5">
                    <div />
                    <div className="text-center">星期一</div>
                    <div className="text-center">星期二</div>
                    <div className="text-center">星期三</div>
                    <div className="text-center">星期四</div>
                    <div className="text-center">星期五</div>
                    <div className="text-center">星期六</div>
                    <div className="text-center">星期日</div>
                    {scheduleArray.map(id => (
                        <React.Fragment key={id}>
                            <div className="h-16 text-center">
                                <div>{`第${id}節`}</div>
                                <div>{`${id}:00~${id+1}:00`}</div>
                            </div>
                            {["一","二","三","四","五","六","日"].map(day=>(
                                <div className="bg-white h-16 hover:bg-blue-100 hover:cursor-pointer px-1 rounded-xl" key={day}
                                onClick={()=>{
                                    reserve(day,id)
                                }}>
                                    hello
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function Degugger() {
    const [temp, setTemp] = useState([])
    const fetch_data = async () => {
        try {
            const res = await fetch("/api/dorm/request")
            const json = await res.json()
            if (!res.ok) {
                throw new Error(json.message)
            }
            //console.log(json)
            setTemp(JSON.parse(json))
            console.log(JSON.parse(json))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // fetch people in use
        fetch_data()
    }, [])

    return (
        <div className="flex flex-col">
            <div className="text-xl font-bold bg-red-100 text-center h-12 justify-center flex flex-col">
                12舍 公設預約
            </div>
            <div className="self-center w-4/5 pt-5">
                Hello
                <div className="grid grid-cols-5">
                    <div>person_name</div>
                    <div>location_id</div>
                    <div>activity_name</div>
                    <div>p_location_id</div>
                    <div>time_id</div>
                    {temp.map(item => (
                        <React.Fragment key={item.id}>
                            <div>{item.person_name}</div>
                            <div>{item.location_id}</div>
                            <div>{item.activity_name}</div>
                            <div>{item.parent_location_id}</div>
                            <div>{item.time_id}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}