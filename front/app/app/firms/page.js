"use client";

import { useEffect, useState, useContext } from "react";
import { SearchContainer } from "./search_container.js";
import { AuthContext } from "../context/auth_context.js";
import { useRouter } from 'next/navigation';
import { getCurrentUser } from "../api/auth.js";

export default function Home() {
  const [ message, setMessage ] = useState("");
  const { isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const router = useRouter();

  const url = "http://localhost:3000/firms/search?sales_lower_limit=99000000&sales_upper_limit=2000000"

  const code = 'code=123&'
  const status = "status=2&"
  const firm_name = "firm_name=株式会社&"
  const firm_name_kana = "firm_name_kana=カブシキガイシャ&"
  const post_code = "post_code=1234443&"
  const address = "address=大阪府堺市&"
  const representive = "representive=社長さん&"
  const representive_kana = "representive_kana=シャチョウサン&"
  const phone_number = "09087654321"

  const query = code+status+firm_name+firm_name_kana+post_code+address+representive+representive_kana+phone_number

  const [submitedData, setSubmitedData] = useState({
    firmName: '',
    status: '',
    address: '',
  })

  const getMessage = async () => {
      try {
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (response.ok) {
              const data = await response.json();
              setMessage(data.data.message);
              console.log(data.data.message);
          } else {
              const errorResponse = await response.json();
              console.error('Error:', errorResponse);
          }
      } catch (error) {
          console.error(error);
      }
  };

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsLoggedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        router.push('/sign_in')
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  const onSubmit = (formData) => {
    console.log(formData)
    setSubmitedData(formData)
  }

  console.log(isLoggedIn)
 
  return (
      <main>
        {isLoggedIn &&
          <>
            <div className={"text-9xl"}>
                {message}
            </div>
            <div>
              ホンジャマカ:{submitedData.firmName}
            </div>
            <SearchContainer
              onSubmit={onSubmit}
            />
          </>
        }
          
      </main>
  )
}