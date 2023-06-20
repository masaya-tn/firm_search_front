"use client"

import { useEffect, useState } from "react";
import client from "../../api/client"
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function NewFirmData() {
  const [firmData, setFirmData] = useState({
    code: '',
    firm_name: '',
    firm_name_kana: '',
    status: 0,
    post_code: '',
    address: '',
    representive: '',
    representive_kana: '',
    phone_number: '',
  });
  const [salesData, setSalesData] = useState({
    "2022": 0,
    "2021": 0,
    "2020": 0
  });
  const [profitsData, setProfitsData] = useState({
    "2022": 0,
    "2021": 0,
    "2020": 0
  });
  const router = useRouter();

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
      const res = await client.post("/firms",
      {firm: firmData,
        sales: salesData,
        profits: profitsData
      } ,
      {
        headers: {
          "access-token": Cookies.get("_access_token"),
          client: Cookies.get("_client"),
          uid: Cookies.get("_uid"),
          'Content-Type': 'application/json',
        },
      });
      if(res.status == 200){
        router.push(`/firms`)
      }
    } catch (error) {
        console.error(error);
    }
  }

  return(
    <>
      <Link href="firms" className="link">企業検索画面へ</Link>
      <h1>企業データ追加</h1>
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
  )
}