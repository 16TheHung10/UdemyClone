import styled from "styled-components";
export const AnalyticsWrapper = styled.div`
  padding: 2rem;

  .top-chart-row {
    padding: 0 3rem;
  }
  .wrapper-chart {
    padding: 1rem 3rem;
  }
  .top-chart {
    padding: 2rem;

    h1 {
      margin-bottom: 0;
    }
    .chart-content {
      background-color: white;
      border-radius: 3px;
      padding: 2rem;
    }
    &-title {
      color: #77787a;
    }
  }
  .chart-bar {
  }
  .sale-chart {
    padding: 3rem;
    &-content {
      background: white;
      width: 100%;
      padding: 2rem;
    }
    .wrapper-middle-chart {
      height: 50rem;
    }
  }

  /* Bottom */
  .bottom-chart-item {
    padding: 3rem;
  }
  .content {
    background: white;
    width: 100%;
    padding: 2rem;
    &-header {
      height: 20rem;
      .header-feature {
        height: 15rem;
        border: 1px solid #c7c7c7;
        &-title {
          font-weight: 700;
        }
        .segment {
          display: flex;
          align-items: center;
          height: 100%;
          &-item {
            width: 25%;
            border: 1px solid #d7d7d7;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
            cursor: pointer;
            transition: all 0.3s;
            flex-direction: column;
            .percent-filter {
              color: red;
            }
            &-value {
              font-weight: 700;
              margin-right: 2rem;
            }
            &:hover {
              background: #f6f6f6;
            }
          }
          .active-segment {
            background: red;
            color: white;
            font-weight: bold;
            .percent-filter {
              color: white;
            }
          }
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
    }
    &-footer {
      border-top: 1px solid #c7c7c7;
      padding-top: 1rem;
      margin-top: 0.5rem;
    }
    &-chart {
      height: 50rem;
    }
  }
  .chart-wrapper {
    padding: 2rem;
    background: white;
    height: 100%;
  }
  .chart-bottom-item {
    border: 1px solid #c7c7c7;
  }
`;
