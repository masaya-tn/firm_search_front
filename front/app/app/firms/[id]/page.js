"use client"

import { useEffect, useState } from "react";

export default function firmDefault({ params }) {
  const url = `http://localhost:3000/firms/${params.id}`
  const [firm, setFirm] = useState();

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
            setFirm(data.firm)
        } else {
            const errorResponse = await response.json();
            console.error('Error:', errorResponse);
        }
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    fetchFirm()
  }, []);

  return(
    <>
      {firm &&
        firm.firm_name
      }
    </>
  )
}