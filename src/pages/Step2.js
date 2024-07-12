import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  color: #f0f0f0;
`;

const MemberContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #555;
  border-radius: 8px;
  background-color: #333;
`;

const MemberTitle = styled.h2`
  margin-bottom: 10px;
  color: #f0f0f0;
`;

const SiteList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SiteItem = styled.li`
  margin-bottom: 10px;
`;

const SiteLabel = styled.label`
  display: flex;
  align-items: center;
  color: #f0f0f0;
`;

const SiteCheckbox = styled.input`
  margin-right: 10px;
`;

const NextButton = styled.button`
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

const Step2 = () => {
  const [team, setTeam] = useState([]);
  const [sites, setSites] = useState([
    { name: "unibet", odds: {}, money: 2000 },
    { name: "bet365", odds: {}, money: 1000 },
    { name: "leovegas", odds: {}, money: 1000 },
    { name: "bwin", odds: {}, money: 1000 },
    { name: "comeon", odds: {}, money: 2000 },
    { name: "nordicbet", odds: {}, money: 500 },
    { name: "betsson", odds: {}, money: 500 },
    { name: "888sport", odds: {}, money: 500 },
    { name: "bet25", odds: {}, money: 500 },
    { name: "expekt", odds: {}, money: 600 },
    { name: "cashpoint", odds: {}, money: 500 },
    { name: "spreadex", odds: {}, money: 1000 },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedTeam = JSON.parse(localStorage.getItem("team")) || [];
    const formattedTeam = savedTeam.map((name) => ({
      name,
      notRegisteredSites: [],
    }));
    setTeam(formattedTeam);
  }, []);

  const handleCheckboxChange = (memberIndex, siteName) => {
    const newTeam = [...team];
    const member = newTeam[memberIndex];

    if (member.notRegisteredSites.includes(siteName)) {
      member.notRegisteredSites = member.notRegisteredSites.filter(
        (site) => site !== siteName
      );
    } else {
      member.notRegisteredSites.push(siteName);
    }

    setTeam(newTeam);
    localStorage.setItem("team", JSON.stringify(newTeam));
  };

  const handleNextStep = () => {
    navigate("/step3");
  };

  return (
    <Container>
      <h1>Step 2: Select Sites Not Registered On</h1>
      {team.map((member, memberIndex) => (
        <MemberContainer key={memberIndex}>
          <MemberTitle>{member.name}</MemberTitle>
          <SiteList>
            {sites.map((site, siteIndex) => (
              <SiteItem key={siteIndex}>
                <SiteLabel>
                  <SiteCheckbox
                    type="checkbox"
                    checked={member.notRegisteredSites.includes(site.name)}
                    onChange={() =>
                      handleCheckboxChange(memberIndex, site.name)
                    }
                  />
                  {site.name}
                </SiteLabel>
              </SiteItem>
            ))}
          </SiteList>
        </MemberContainer>
      ))}
      <NextButton onClick={handleNextStep}>Næste Step</NextButton>
    </Container>
  );
};

export default Step2;
