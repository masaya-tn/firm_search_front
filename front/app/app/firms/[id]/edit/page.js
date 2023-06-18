"use client"

import { useEffect, useState } from "react";
import client from "../../../api/client"
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

export default function editFirmData({ params }) {
  const url = `http://localhost:3000/firms/${params.id}`
  const [firmData, setFirmData] = useState();
  const [salesData, setSalesData] = useState();
  const [profitsData, setProfitsData] = useState();
  const [isDataSet, setIsDataSet] = useState(false);
  const router = useRouter()
  
  const fetchFirm = async () => {
    try {
            
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              "access-token": Cookies.get("_access_token"),
              client: Cookies.get("_client"),
              uid: Cookies.get("_uid"),
              'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            setFirmData(data.firm)
            setSalesData(arrangeSalesData(data.performance))
            setProfitsData(arrangeProfitsData(data.performance))
            setIsDataSet(true)
        } else {
            const errorResponse = await response.json();
            console.error('Error:', errorResponse);
        }
    } catch (error) {
        console.error(error);
    }
  }

  const arrangeSalesData = (performanceData) => {

    let newData = {}
    Object.keys(performanceData).map(function(key){
      newData[`${performanceData[key].year}`] = performanceData[key].sales
    })
    return(newData)
  }

  const arrangeProfitsData = (performanceData) => {
    let newData = {}
    Object.keys(performanceData).map(function(key){
      newData[`${performanceData[key].year}`] = performanceData[key].profits
    })
    return(newData)
  }

  const onChangeFirm = (e) => {
    setFirmData({...firmData, [e.target.name]: e.target.value})
  }

  const onChangeSales = (e) => {
    setSalesData({...salesData, [e.target.name]: e.target.value})
  }

  const onChangeProfits = (e) => {
    setProfitsData({...profitsData, [e.target.name]: e.target.value})
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try { 
      const res = await client.put(`/firms/${params.id}`, 
      {firm: firmData,
        sales: salesData,
        profits: profitsData
      }, 
      {
        headers: {
          "access-token": Cookies.get("_access_token"),
          client: Cookies.get("_client"),
          uid: Cookies.get("_uid"),
          'Content-Type': 'application/json',
        },
      });
      if(res.status == 200){
        router.push(`/firms/${params.id}`)
      }
      console.log(res);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    fetchFirm()
  }, []);

  return(
    <>
      {isDataSet &&
        <>
        <Link href="firms">企業検索画面へ</Link>
        <form onSubmit={onSubmit}>
          <label>企業コード：</label>
          <input
            type="text"
            id="code"
            name="code"
            value={firmData.code}
            onChange={onChangeFirm}
          />
          <br/>
          <label>企業名：</label>
          <input
            type="text"
            id="firm_name"
            name="firm_name"
            value={firmData.firm_name}
            onChange={onChangeFirm}
          />
          <br/>
          <label>企業名（カナ）：</label>
          <input
            type="text"
            id="firm_name_kana"
            name="firm_name_kana"
            value={firmData.firm_name_kana}
            onChange={onChangeFirm}
          />
          <br/>
          <label>上場状況：</label>
          <select name="status" onChange={onChangeFirm}>
            <option value="">未選択</option>
            <option value="1">未上場</option>
            <option value="2">上場</option>
          </select>
          <br />
          <label>郵便番号：</label>
          <input
            type="text"
            id="post_code"
            name="post_code"
            value={firmData.post_code}
            onChange={onChangeFirm}
          />
          <br/>
          <label>住所：</label>
          <input
            type="text"
            id="address"
            name="address"
            value={firmData.address}
            onChange={onChangeFirm}
          />
          <br/>
          <label>代表者：</label>
          <input
            type="text"
            id="representive"
            name="representive"
            value={firmData.representive}
            onChange={onChangeFirm}
          />
          <br/>
          <label>代表者（カナ）：</label>
          <input
            type="text"
            id="representive_kana"
            name="representive_kana"
            value={firmData.representive_kana}
            onChange={onChangeFirm}
          />
          <br/>
          <label>電話番号：</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={firmData.phone_number}
            onChange={onChangeFirm}
          />
          <br/>
          {Object.keys(salesData).map((key) => (
            <>
              <label>{key}年売上：</label>
              <input
                type="text"
                id={`${key}`}
                name={`${key}`}
                value={salesData[key]}
                onChange={onChangeSales}
              />
            </>
          ))}
          <br/>
          {Object.keys(profitsData).map((key) => (
            <>
              <label>{key}年利益：</label>
              <input
                type="text"
                id={`${key}`}
                name={`${key}`}
                value={profitsData[key]}
                onChange={onChangeProfits}
              />
            </>
          ))}
          <br/>
          <button type="submit">更新</button>
        </form>
        </>
        
      }
     
    </>
  )
}