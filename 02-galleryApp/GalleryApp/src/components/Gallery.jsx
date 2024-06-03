import { useState } from "react";
import styled from "styled-components";

function Gallery(){
  //변수 생성
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState([]);

  const handleKeyword = (e) =>{
    setKeyword(e.target.value);
  }

  //async: 함수앞에 붙여 일반함수를 async함수로 만들어 비동기 함수로 만든다
  //함수의 앞부분에 async 키워드를 추가
  const fetchPhotos = async (query) => {
    /*Key같은경우 중요하기때문에 
    1) .env.local파일을 생성해서 따로 key값 넣기 
    2) .env.local파일은 개인정보이기 때문에 gitignore파일에서 예외처리하기
    3) 회사에서는 똑같이 git에는 예외처리하고 팀원들에게는 따로 파일로 공유하기*/
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`;
  
    /*에러가 발생 할 것 같은 코드를 try 로 감싸고 
    에러가 발생했을 때 catch 를 이용하여 예외처리를 한다.*/
    try {
      //함수 내부에서 await 키워드를 사용
      //fetch: API를 가져올때쓰는 객체
      const response = await fetch(url);
      const data = await response.json();
      setList(data.results);
    } 
    catch (error) {
        console.error('Error fetching photos:', error);
        setList([]);
    }
  };

  const handleSubmit = (e) =>{
    //새로고침 방지
    e.preventDefault();

    if (keyword) fetchPhotos(keyword);
  }

  return(
    <>
      <GalleryWrap>
        <form onSubmit={handleSubmit}>
          <input type="text" 
                placeholder='Search for images...'
                value={keyword}
                onChange={handleKeyword}  />
          <button>검색</button>
        </form>
        <ul>
          {list.map(photo => (
            <Photo key={photo.id} >
              <img src={photo.urls.small} alt={photo.alt} />
            </Photo>
          ))}
        </ul>
      </GalleryWrap>
    </>
  )
}

//styled-components 사용
const GalleryWrap = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: scroll;

  form{
    width: 100%;
    height: 60px;
    text-align: center;
    position: fixed;

    background-color: #fff;
  }
  input[type=text]{
    width: 150px;
    height: 30px;
    margin-right: 5px;
    padding-left: 5px;

    color: #7f8c8d;
    outline: solid 0.1em #7f8c8d;
    border-radius: 5px;
  }
  button{
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 00;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;

    background-color: #1A1A1A;
    color: #f9f9f9;
  }
  button:hover{
    background-color: #5f5f5f;
  }
  ul{
  width: 1100px;
  height: 100%;
  margin-top: 50px;

  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  }
`  
const Photo = styled.div`
img {
  width: 330px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin: 20px;
}
`

export default Gallery