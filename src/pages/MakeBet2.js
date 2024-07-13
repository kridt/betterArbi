import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  color: #f0f0f0;
  background-color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const TeamList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 400px;
`;

const TeamItem = styled.li`
  padding: 10px;
  border: 1px solid #555;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #444;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const Bet2 = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem("team")) || [];
    const selectedTeams =
      JSON.parse(localStorage.getItem("selectedTeams")) || [];
    const filteredTeams = savedTeams.filter(
      (team) => !selectedTeams.includes(team.name)
    );
    setTeams(filteredTeams);
  }, []);

  const handleSelectTeam = (teamName) => {
    const selectedTeams =
      JSON.parse(localStorage.getItem("selectedTeams")) || [];
    selectedTeams.push(teamName);
    localStorage.setItem("selectedTeams", JSON.stringify(selectedTeams));
    navigate("/step3"); // Redirect to the Step3 page or any other page as needed
  };

  return (
    <Container>
      <Title>Select a Team for Bet 2</Title>
      <TeamList>
        {teams.length === 0 ? (
          <p>No available teams found</p>
        ) : (
          teams.map((team, index) => (
            <TeamItem key={index} onClick={() => handleSelectTeam(team.name)}>
              <p>{team.name}</p>
            </TeamItem>
          ))
        )}
      </TeamList>
    </Container>
  );
};

export default Bet2;
