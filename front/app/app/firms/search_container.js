import React, {useState} from 'react';

export function SearchContainer({handleSubmit}) {
  const [formData, setFormData] = useState({
    firmName: '',
    status: '',
    address: '',
    salesMin: '',
    salesMax: '',
    profitsMin: '',
    profitsMax: '',
    searchPattern: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return(
    <>
      <h1>検索欄</h1>
      <form onSubmit={onSubmit}>
        <label>企業名:</label>
        <input
          type="text"
          name="firmName"
          value={formData.firmName}
          onChange={handleChange}
        />
        <br />
        <label>上場状況:</label>
        <select name="status" onChange={handleChange}>
          <option value="">未選択</option>
          <option value="1">未上場</option>
          <option value="2">上場</option>
        </select>
        <br />
        <label>都道府県:</label>
        <select name="address" onChange={handleChange}>
          <option value="">未選択</option>
          <option value="北海道">北海道</option>
          <option value="青森県">青森県</option>
          <option value="岩手県">岩手県</option>
          <option value="宮城県">宮城県</option>
          <option value="秋田県">秋田県</option>
          <option value="山形県">山形県</option>
          <option value="福島県">福島県</option>
          <option value="茨城県">茨城県</option>
          <option value="栃木県">栃木県</option>
          <option value="群馬県">群馬県</option>
          <option value="埼玉県">埼玉県</option>
          <option value="千葉県">千葉県</option>
          <option value="東京都">東京都</option>
          <option value="神奈川県">神奈川県</option>
          <option value="新潟県">新潟県</option>
          <option value="富山県">富山県</option>
          <option value="石川県">石川県</option>
          <option value="福井県">福井県</option>
          <option value="山梨県">山梨県</option>
          <option value="長野県">長野県</option>
          <option value="岐阜県">岐阜県</option>
          <option value="静岡県">静岡県</option>
          <option value="愛知県">愛知県</option>
          <option value="三重県">三重県</option>
          <option value="滋賀県">滋賀県</option>
          <option value="京都府">京都府</option>
          <option value="大阪府">大阪府</option>
          <option value="兵庫県">兵庫県</option>
          <option value="奈良県">奈良県</option>
          <option value="和歌山県">和歌山県</option>
          <option value="鳥取県">鳥取県</option>
          <option value="島根県">島根県</option>
          <option value="岡山県">岡山県</option>
          <option value="広島県">広島県</option>
          <option value="山口県">山口県</option>
          <option value="徳島県">徳島県</option>
          <option value="香川県">香川県</option>
          <option value="愛媛県">愛媛県</option>
          <option value="高知県">高知県</option>
          <option value="福岡県">福岡県</option>
          <option value="佐賀県">佐賀県</option>
          <option value="長崎県">長崎県</option>
          <option value="熊本県">熊本県</option>
          <option value="大分県">大分県</option>
          <option value="宮崎県">宮崎県</option>
          <option value="鹿児島県">鹿児島県</option>
          <option value="沖縄県">沖縄県</option>
        </select>
        <br />
        <label>売上:</label>
        <input
          type="number"
          name="salesMin"
          value={formData.salesMin}
          onChange={handleChange}
        />
        〜
        <input
          type="number"
          name="salesMax"
          value={formData.salesMax}
          onChange={handleChange}
        />
        <br />
        <label>利益:</label>
        <input
          type="number"
          name="profitsMin"
          value={formData.profitsMin}
          onChange={handleChange}
        />
        〜
        <input
          type="number"
          name="profitsMax"
          value={formData.profitsMax}
          onChange={handleChange}
        />
        <br />
        <label>検索条件:</label>
        <select name="searchPattern" onChange={handleChange}>
          <option value="">未選択</option>
          <option value="or">OR検索</option>
          <option value="and">AND検索</option>
        </select>
        <button type="submit">検索</button>
      </form>
      

    </>
  )
}