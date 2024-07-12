import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  color: #f0f0f0;
  background-color: #333;
  min-height: 100vh;
`;

const ResultContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #555;
  border-radius: 8px;
  background-color: #444;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const CustomerName = styled.h2`
  margin-bottom: 10px;
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ResultItem = styled.li`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  align-items: center;
  color: #f0f0f0;
  padding: 5px 0;
  border-bottom: 1px solid #555;
`;

const SiteName = styled.div`
  font-weight: bold;
`;

const Outcome = styled.div`
  text-align: center;
`;

const ViewResults = () => {
  const [results, setResults] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("earnings")) || [];
    const savedTeam = JSON.parse(localStorage.getItem("team")) || [];
    setResults(savedResults);
    setTeam(savedTeam);
  }, []);

  return (
    <Container>
      <Title>Bet Results</Title>
      {results.map((result, index) => (
        <ResultContainer key={index}>
          <CustomerName>
            {team[index] && team[index].name
              ? team[index].name
              : `Customer ${index + 1}`}
          </CustomerName>
          <ResultList>
            {result.best_combination.combination.map((site, siteIndex) => (
              <ResultItem key={siteIndex}>
                <SiteName>{site}</SiteName>
                <Outcome>{result.best_combination.outcome[siteIndex]}</Outcome>
              </ResultItem>
            ))}
          </ResultList>
          <p>Minimum Return: {result.min_return}</p>
        </ResultContainer>
      ))}
    </Container>
  );
};

export default ViewResults;
