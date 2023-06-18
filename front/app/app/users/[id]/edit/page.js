"use client"

import { useState, useEffect } from "react";
import client from "../../../api/client"
import Cookies from "js-cookie";
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';

export default function editUser({ params }) {
  const url = `http://localhost:3000/users/${params.id}`
  const [user, setUser] = useState();
  const router = useRouter();

  const fetchUser = async () => {
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
            setUser(data.user)
        } else {
            const errorResponse = await response.json();
            console.error('Error:', errorResponse);
        }
    } catch (error) {
        console.error(error);
    }
  }

  const onChangeUser = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try { 
      const res = await client.put(`/users/${params.id}`, {user: user}, {
        headers: {
          "access-token": Cookies.get("_access_token"),
          client: Cookies.get("_client"),
          uid: Cookies.get("_uid"),
          'Content-Type': 'application/json',
        },
      });
      if(res.status == 200){
        router.push("/users")
      }
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    fetchUser()
  }, []);

  return(
    <>
    {user &&
      <>
        <Link href="/users">メンバー一覧画面へ</Link>
        <form onSubmit={onSubmit}>
          <label>名前：</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={onChangeUser}
          />
          <br/>
          <label>email：</label>
          <input
            type="text"
            id="email"
            name="email"
            value={user.email}
            onChange={onChangeUser}
          />
          <br/>
          <lable>権限：</lable>
          <select name="admin" onChange={onChangeUser}>
            <option value="">未選択</option>
            <option value={false}>非管理者</option>
            <option value={true}>管理者</option>
          </select>
          <button type="submit">更新</button>
        </form>
      </>
    }
    </>
    
    
  )
}