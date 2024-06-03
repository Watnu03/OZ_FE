import styled from "styled-components";

function Gallery(){

  return(
    <>
      <GalleryWrap>
        <form>
          <input type="text" placeholder='Search for images...' />
          <button>검색</button>
        </form>
        <ul>
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
`  
const Photo = styled.div`
img {
    width: 100%;
    height: auto;
    border-radius: 8px;
}
`

export default Gallery