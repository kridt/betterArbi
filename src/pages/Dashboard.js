import Localbase from "localbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  color: #f0f0f0;
  background-color: #333;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 300px;
  height: 300px;
  padding: 20px;
  border: 1px solid #555;
  border-radius: 8px;
  background-color: #444;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const TeamList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const TeamItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #555;
  text-align: center;

  &:last-child {
    border-bottom: none;
  }
`;

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const database = new Localbase("arbitrage-db");

  useEffect(() => {
    database
      .collection("teams")
      .get()
      .then((teams) => {
        setTeams(teams);
      });

    /* const savedTeams = JSON.parse(localStorage.getItem("team")) || [];
    setTeams(savedTeams); */
  }, []);

  const handleClick = (teamName) => {
    let selectedTeams = JSON.parse(localStorage.getItem("selectedTeams")) || [];
    selectedTeams.push(teamName);
    localStorage.setItem("selectedTeams", JSON.stringify(selectedTeams));
    navigate("/view-results");
  };

  return (
    <Container>
      <Box>
        <h2>Active Teams</h2>
        {/* <TeamList>
          {teams.length === 0 ? (
            <p>No active teams found</p>
          ) : (
            teams.map((team, index) => (
              <TeamItem key={index} onClick={() => handleClick(team.name)}>
                <p>
                  {team.name} - {team.progress || "Bet 1"}
                </p>
              </TeamItem>
            ))
          )}
        </TeamList> */}
      </Box>
    </Container>
  );
};

export default Dashboard;
