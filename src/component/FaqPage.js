import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Faq.css';
import '../css/Page5.css';

const FaqPage = () => {
  const [faqItems, setFaqItems] = useState([]);

  useEffect(() => {
    fetch('/api/faq') // FAQ API 엔드포인트로 교체하세요.
      .then(response => response.json())
      .then(data => setFaqItems(data))
      .catch(error => console.error('FAQ 데이터 가져오는 중 오류 발생:', error));
  }, []);

  const [answersVisible, setAnswersVisible] = useState([]);

  const toggleAnswer = index => {
    const newAnswersVisible = [...answersVisible];
    newAnswersVisible[index] = !newAnswersVisible[index];
    setAnswersVisible(newAnswersVisible);
  };

  return (
    <div>
      <div className="qna-page">
        <nav className="qna-navigation">
          <span className="qna-nav-ALL">전체</span>
          <Link to="/qnapage" className="qna-nav-item">QnA게시판</Link>
          <Link to="/notice" className="qna-nav-item">공지사항</Link>
          <Link to="/faqpage" className="qna-nav-item-Q">자주묻는질문</Link>
        </nav>
      </div>
      <div className='page5555'>
        <div className="qna-header">
          <div className="qna-options">
            <h2 className='aaaaaa'>FAQ</h2>
            <select className="qna-select">
              <option value="title">제목</option>
              <option value="author">작성자</option>
            </select>
            <input type="text" placeholder="검색어를 입력하세요" className="qna-search" />
            <button className="qna-button">검색</button>
          </div>
        </div>
      </div>

      <div className="faq-content">
        {faqItems.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              Q : {item.title}
            </div>
            <div className="faq-answer" onClick={() => toggleAnswer(index)}>
              A : {answersVisible[index] ? item.content : item.content.substring(0, 40)}
            </div>
          </div>
        ))}
      </div>
      <div className='bottom'></div>
    </div>
  );
};

export default FaqPage;
