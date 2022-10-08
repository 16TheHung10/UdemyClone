import styled from "styled-components";
export const PlaybackRateMenuWraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .playback-item {
    padding: 0.5rem 2rem;
    border: 1px solid #e1e1e1;
    width: 100%;
    text-align: center;
    border-bottom-color: white;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background: #f7f7f7;
    }
  }
`;
