import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../css/FaqUp.css';

const NoticeUp = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const naviga = useNavigate();

  const handleSubmit = () => {
    fetch('/api/addFaQ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('게시글이 성공적으로 등록되었습니다.'); 
      naviga('/cmsfaq'); 
    })
    .catch(error => {
      console.error('글 등록 중 오류 발생:', error);
    });
  };


  const handleBack =()=>{
    naviga('/cmsfaq')
  }

  return (
    <div className="FaqUp-container">
      <h2 className='aaaaaa'>FAQ 등록</h2>
      <div className="FaqUp-label">
        <label>Q:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="FaqUp-label1">
        <label>A:</label>
        <textarea type="text" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className="button-group">
        <button className="cancel-button" onClick={handleBack}>취소</button>
        <button className="save-button" onClick={handleSubmit}>등록</button>
      </div>
    </div>
  );
};

export default NoticeUp;
