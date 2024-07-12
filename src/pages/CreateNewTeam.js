import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
  background-color: #1e1e1e;
  color: #f0f0f0;
  min-height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  color: #f0f0f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const Label = styled.label`
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #f0f0f0;
`;

const Select = styled.select`
  padding: 5px;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #555;
  color: #f0f0f0;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #555;
  color: #f0f0f0;
  width: calc(100% - 20px);
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
  }
`;

const TeamCreator = () => {
  const [numParticipants, setNumParticipants] = useState(1);
  const [participants, setParticipants] = useState({ 1: "", 2: "", 3: "" });
  const navigate = useNavigate();
  const handleNumParticipantsChange = (e) => {
    setNumParticipants(parseInt(e.target.value));
  };

  const handleParticipantNameChange = (e, index) => {
    setParticipants({
      ...participants,
      [index]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const team = [];
    for (let i = 1; i <= numParticipants; i++) {
      team.push(participants[i]);
    }

    localStorage.setItem("team", JSON.stringify(team));

    navigate("/step2");
    console.log("Team:", team);
  };

  return (
    <Container>
      <Title>Lav nyt hold</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          Hvor mange er på holdet?:
          <Select
            value={numParticipants}
            onChange={handleNumParticipantsChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </Select>
        </Label>
        {[...Array(numParticipants)].map((_, i) => (
          <Label key={i}>
            Person {i + 1} Navn:
            <Input
              type="text"
              value={participants[i + 1]}
              onChange={(e) => handleParticipantNameChange(e, i + 1)}
              required
            />
          </Label>
        ))}
        <Button type="submit">Lav hold</Button>
      </Form>
    </Container>
  );
};

export default TeamCreator;
