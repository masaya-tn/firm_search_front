import React, {useState} from 'react';

export function SearchContainer({onSubmit}) {
  const [formData, setFormData] = useState({
    firmName: '',
    status: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // 親コンポーネントのhandleSubmit関数を呼び出し、フォームデータを渡す
  };


  return(
    <>
      <h1>検索欄</h1>
      <form onSubmit={handleSubmit}>
        <label>企業名:</label>
        <input
          type="text"
          name="firmName"
          value={formData.firmName}
          onChange={handleChange}
        />
        <br />
        <label>上場状況:</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
        <br />
        <label>所在地（県名）:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <br />
        <button type="submit">検索</button>
      </form>
      

    </>
  )
}