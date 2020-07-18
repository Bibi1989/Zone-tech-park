import styled from "styled-components";

const image = "../../../assets/back.jpg";

export const SeasonStyle = styled.div``;
export const SearchDiv = styled.div`
  width: 100%;
  padding: 1% 10%;
  background: url(${image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  object-fit: contain;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const Input = styled.input`
  border: 1px solid orangered;
  outline: none;
  border-radius: 4px;
  padding: 1em;
`;
export const Button = styled.button`
  background: orangered;
  color: white;
  font-size: 1.1em;
  width: 30%;
  padding: 1em;
  margin: auto;
  margin-top: 1em;
  border: none;
  outline: none;
  border-radius: 4px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.5s ease-in-out;

  &:hover {
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.1);
    opacity: 0.8;
  }
`;

export const DisplayMovie = styled.div`
  margin-top: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2em;
  padding: 1% 10%;

  ul {
  }
`;
export const H1 = styled.h1`
  padding: ${({ padding }) => (padding ? padding : "50px 0 25px 0")};
  text-align: ${({ align }) => (align ? align : "center")};
`;
export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
export const Image = styled.div`
  max-height: ${({ height }) => (height ? height : "500px")};
  overflow: hidden;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const GenreStyle = styled.div`
  display: flex;
  list-style: none;

  span {
    padding-right: 10px;
  }

  li {
    padding: 0 6px;
    border-right: 1px solid #aaaaaa;
  }
`;
export const Country = styled.div``;

export const DisplaySeason = styled.div`
  padding: 1% 10%;
  ul {
    list-style: none;
    padding: 0;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2em;

    h1 {
      padding: 20px 0;
    }

    li {
      display: block;
      width: 100%;
    }
  }
`;

export const EpisodeStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SelectDiv = styled.div``;
export const Select = styled.select`
  border: none;
  outline: none;
  border-radius: 4px;
  padding: 10px 14px;
  cursor: pointer;
  margin-bottom: 16px;
  margin-right: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

export const Description = styled.div`
  display: flex;
  padding: 8px 0;
  p:last-child {
    border: 0;
  }
  p:first-child {
    padding-left: 0;
  }
  p {
    padding: 0 10px;
    border-right: 1px solid #aaaaaa;
  }
`;

export const InnerDiv = styled.div`
  width: 100%;
  /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2em; */
  margin-bottom: 20px;
`;
export const InnerDivChild = styled.div`
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  padding: 10px;
  h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1em;
  }
  p {
    padding-top: 16px;
  }
`;
