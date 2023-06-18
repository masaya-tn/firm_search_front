"use client";

import { useEffect, useState, useContext } from "react";
import { SearchContainer } from "./search_container.js";
import { AuthContext } from "../context/auth_context.js";
import { useRouter } from 'next/navigation';
import { getCurrentUser } from "../api/auth.js";
import { FirmList } from "./firm_list.js";
import Link from "next/link";
import { isCurrentUserAdmin } from "../api/auth.js";
import { signOut } from "../api/auth.js";
import Cookies from "js-cookie";

export default function Home() {
  const [firms, setFirms] = useState()
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const router = useRouter();
  const [submitedData, setSubmitedData] = useState({
      firmName: '',
      status: '',
      address: '',
      salesMin: '',
      salesMax: '',
      profitsMin: '',
      profitsMax: '',
      searchPattern: "and"
    })
  const url = "http://localhost:3000/firms/search?"

  const setQuery = (formData) => {
    const firmName = `firmName=${formData.firmName}&`
    const status = `status=${formData.status}&`
    const address = `address=${formData.address}&`
    const salesMin = `salesMin=${formData.salesMin}&`
    const salesMax = `salesMax=${formData.salesMax}&`
    const profitsMin = `profitsMin=${formData.profitsMin}&`
    const profitsMax = `profitsMax=${formData.profitsMax}&`
    const searchPattern = `searchPattern=${formData.searchPattern}`
    const query = firmName+status+address+salesMin+salesMax+profitsMin+profitsMax+searchPattern
    return(query)
  }

  const fetchFirms = async (query) => {
      try {
          const response = await fetch(url+query, {
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
              setFirms(data.firms)
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
        setCurrentUser(res?.data.data);
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

  const handleSubmit = (formData) => {
    const query = setQuery(formData)
    fetchFirms(query)
  }

  const onClickSignOut = () => {
    signOut()
    router.push('/sign_in')
  }

  return (
      <main>
        {currentUser &&
          <>
            <Link href="/users">メンバー管理画面へ</Link>
            <button button="button" onClick={onClickSignOut}>サインアウト</button>
            <SearchContainer
              handleSubmit={handleSubmit}
            />
            {firms &&
              <FirmList
                firms={firms}
              />
            }
            {currentUser.admin &&
              <Link href="/firms/new">企業データ追加</Link>
            }
          </>
        }
          
      </main>
  )
}