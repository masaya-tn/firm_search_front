"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import client from "../../api/client"
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { getCurrentUser } from "@/app/api/auth";

export default function firmDefault({ params }) {
  const url = `http://localhost:3000/firms/${params.id}`
  const [firmData, setFirmData] = useState();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState();

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
            setFirmData(data)
            console.log(data)
        } else {
            const errorResponse = await response.json();
            console.error('Error:', errorResponse);
        }
    } catch (error) {
        console.error(error);
    }
  }

  const renderFirmStatus = (status) => {
    if (status == 1) {
      return '未上場'
    } else if(status == 2) {
      return '上場'
    }
  }

  const onClickDelete = async () => {
    try {
      const res = await client.delete(`/firms/${params.id}`, {
        headers: {
          "access-token": Cookies.get("_access_token"),
          client: Cookies.get("_client"),
          uid: Cookies.get("_uid"),
        },
      })
      if(res.status == 200) {
        router.push('/firms')
      }
    } catch(error) {
      console.log(error)
    }
  }

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setCurrentUser(res?.data.data);
      } else {
        router.push('/sign_in')
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetCurrentUser()
    fetchFirm()
  }, []);

  return(
    <>
      {firmData &&
        <>
          <Link href="firms">企業検索画面へ</Link>
          <p>企業コード：{firmData.firm.code}</p>
          <p>企業名：{firmData.firm.firm_name}</p>
          <p>企業名（カナ）：{firmData.firm.firm_name_kana}</p>
          <p>郵便番号：{firmData.firm.post_code}</p>
          <p>住所：{firmData.firm.address}</p>
          <p>電話番号：{firmData.firm.phone_number}</p>
          <p>上場状況：{renderFirmStatus(firmData.firm.status)}</p>
          <p>代表者名：{firmData.firm.representive}</p>
          <p>代表者名（カナ）：{firmData.firm.representive_kana}</p>
          {firmData.performance.map((p) => (
            <>
              <p>{p.year}年</p>
              <> 売上：{p.sales}円</>
              <> 利益：{p.profits}円</>
            </>
          ))}
          <br/>
          {currentUser.admin &&
            <>
              <button type="button" onClick={onClickDelete}>削除</button>
              <br/>
              <Link href={`firms/${params.id}/edit`}>編集</Link>
            </>
            
          }
          
        </>
      }
    </>
  )
}