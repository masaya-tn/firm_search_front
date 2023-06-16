"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

export default function firmDefault({ params }) {
  const url = `http://localhost:3000/firms/${params.id}`
  const [firmData, setFirmData] = useState();

  const fetchFirm = async () => {
    try {
            
        const response = await fetch(url, {
            method: 'GET',
            headers: {
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

  useEffect(() => {
    fetchFirm()
  }, []);

  return(
    <>
     {/* {console.log(firmData['performance'])} */}
      {firmData &&
        <>
          <p>{firmData.firm.code}</p>
          <p>{firmData.firm.firm_name}</p>
          <p>{firmData.firm.firm_name_kana}</p>
          <p>{firmData.firm.post_code}</p>
          <p>{firmData.firm.address}</p>
          <p>{firmData.firm.phone_number}</p>
          {renderFirmStatus(firmData.firm.status)}
          <p>{firmData.firm.representive}</p>
          <p>{firmData.firm.representive_kana}</p>
          {firmData.performance.map((p) => (
            <>
              <p>{p.year}年</p>
              <p>{p.sales}円</p>
              <p>{p.profits}円</p>
            </>
          ))}
          <button>削除</button>
          <Link href={`firms/${params.id}/edit`}>編集</Link>
        </>
      }
    </>
  )
}