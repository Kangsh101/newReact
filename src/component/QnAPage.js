import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Page2.css';

const QnAPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [searchType, setSearchType] = useState("title"); 
  const [searchKeyword, setSearchKeyword] = useState(""); 
  const [post, setPost] = useState(null); 

  useEffect(() => {
    fetch('/api/checklogin')
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.isLoggedIn);
      })
      .catch(err => console.error('로그인 상태 확인 실패:', err));

    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch('/api/qnaposts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.map(post => ({
          ...post,
          create_at: post.create_at.split('T')[0] 
        })));
      })
      .catch(err => console.error('QNA 게시글 불러오기 실패:', err));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleLoginButtonClick = () => {
    if (!isLoggedIn) {
      alert('로그인을 해주세요.');
    } else {
      window.location.href = '/qnaup';
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSearchKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handleSearch = () => {
    fetch(`/api/search-posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchType, searchKeyword }),
    })
      .then(res => res.json())
      .then(data => {
        setPosts(data); 
      })
      .catch(err => console.error('검색 중 오류 발생:', err));
  };

  const handlePostClick = (postId) => {
    if (!postId) {
      console.error('게시글 ID가 유효하지 않습니다.');
      return;
    }
    fetch(`/api/qnaposts/${postId}`)
      .then(res => res.json())
      .then(data => {
        setPost(data); 
      })
      .catch(err => console.error('게시글 가져오기 실패:', err));
  };

  return (
    <div>
      <div className="qna-page">
        <nav className="qna-navigation">
          <span className="qna-nav-ALL">전체</span>
          <Link to="/qnapage" className="qna-nav-item-Q">QnA게시판</Link>
          <Link to="/notice" className="qna-nav-item">공지사항</Link>
          <Link to="/faqpage" className="qna-nav-item">자주묻는질문</Link>
        </nav>
      </div>

      <div className="qna-header">
        <div className="qna-options">
          <h2 className='aaaaaa'>QnA 게시판</h2>
          <select className="qna-select" value={searchType} onChange={handleSearchTypeChange}>
            <option value="title">제목</option>
            <option value="author">작성자</option>
          </select>
          <input type="text" placeholder="검색어를 입력하세요" className="qna-search" value={searchKeyword} onChange={handleSearchKeywordChange} />
          <button className="qna-button" onClick={handleSearch}>검색</button>
        </div>
        <button className="qna-write-button" onClick={handleLoginButtonClick}>
          {isLoggedIn ? '글쓰기' : '로그인'}
        </button>
      </div>

      <div className="qna-content">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.board_id} onClick={() => handlePostClick(post.board_id)}>
              <td>{index + 1 + (currentPage - 1) * postsPerPage}</td>
              <td><Link to={`/qnacontent/${post.board_id}`}>{post.title}</Link></td>
              <td>{post.name}</td>
              <td>{post.create_at}</td>
            </tr>
          ))}

          </tbody>
        </table>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}

        />
      </div>
    </div>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="pagebtt">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QnAPage;
