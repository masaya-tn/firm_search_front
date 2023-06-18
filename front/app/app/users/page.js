"use client"

import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/auth";
import Cookies from "js-cookie";
import Link from 'next/link'; 
import client from "../api/client";
import { useRouter } from 'next/navigation';

export default function Users() {
  const url = "http://localhost:3000/users";
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState();
  const router = useRouter();

  const fetchUsers = async () => {
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
            setUsers(data.users)
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

  const onClickDelete = async (userId) => {
    try {
      const res = await client.delete(`/users/${userId}`, 
      {
        headers: {
          "access-token": Cookies.get("_access_token"),
          client: Cookies.get("_client"),
          uid: Cookies.get("_uid"),
          'Content-Type': 'application/json',
        },
      })
      if(res.status == 200) {
        location.reload();
      }
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetCurrentUser()
    fetchUsers()
  }, []);

  return (
    <>
    
      {(currentUser) &&
        <>
          {users &&
            <>
            <Link href="/firms">企業検索画面へ</Link>
            <ul>
              {users.map((user) => (
                <>
                  <li key={user.id}>
                    <>名前：{user.name}</>
                    <>メール：{user.email}</>
                    {user.admin && 
                      <>権限：管理者</>
                    }
                    {currentUser.admin &&
                      <>
                        <Link href={`/users/${user.id}/edit`}>編集</Link>
                        <button type="button" onClick={() => onClickDelete(user.id)}>削除</button>
                      </>
                    }
                  </li>
                </>
              ))}
            </ul>
              
            </>
          }
        </>
      }
    </>
  )
}