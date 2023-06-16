"use client";

import { useEffect, useState, useContext } from "react";
import { SearchContainer } from "./search_container.js";
import { AuthContext } from "../context/auth_context.js";
import { useRouter } from 'next/navigation';
import { getCurrentUser } from "../api/auth.js";
import { FirmList } from "./firm_list.js";
import Link from "next/link";

export default function Home() {
  const [firms, setFirms] = useState()
  const { isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
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
    const firmName = `firm_name=${formData.firmName}&`
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

  const handleSubmit = (formData) => {
    const query = setQuery(formData)
    fetchFirms(query)
  }

  return (
      <main>
        {isLoggedIn &&
          <>
            <SearchContainer
              handleSubmit={handleSubmit}
            />
            {firms &&
              <FirmList
                firms={firms}
              />
            }
            <Link href="/firms/new">企業データ追加</Link>
          </>
        }
          
      </main>
  )
}