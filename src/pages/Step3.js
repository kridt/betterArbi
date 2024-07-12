import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  color: #f0f0f0;
`;

const MemberContainer = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 8px;
  background-color: #333;
`;

const MemberTitle = styled.h2`
  margin-bottom: 5px;
  color: #f0f0f0;
`;

const SiteList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SiteItem = styled.li`
  display: grid;
  grid-template-columns: 2fr repeat(3, 75px);
  gap: 10px;
  align-items: center;
  color: #f0f0f0;
  padding: 5px 0;
  border-bottom: 1px solid #555;
`;

const SiteName = styled.div`
  font-weight: bold;
`;

const OddsInput = styled.input`
  padding: 2px;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #555;
  color: #f0f0f0;
  width: 75px;
  text-align: center;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 75px);
  gap: 10px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CalculateButton = styled.button`
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

const Step3 = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  useEffect(() => {
    const savedTeam = JSON.parse(localStorage.getItem("team")) || [];
    setTeam(savedTeam);
  }, []);

  const handleOddsChange = (memberIndex, siteName, field, value) => {
    const newTeam = [...team];
    const member = newTeam[memberIndex];
    if (!member.odds) member.odds = {};
    if (!member.odds[siteName]) member.odds[siteName] = {};
    member.odds[siteName][field] = value.replace(",", ".");
    setTeam(newTeam);
    localStorage.setItem("team", JSON.stringify(newTeam));
  };

  const calculateEarnings = () => {
    setLoading(true);
    const results = team.map((member) => {
      const earnings = sites
        .filter((site) => !member.notRegisteredSites.includes(site.name))
        .map((site) => {
          const homeWin = site.money * (member.odds[site.name]?.["1"] || 0);
          const draw = site.money * (member.odds[site.name]?.["X"] || 0);
          const awayWin = site.money * (member.odds[site.name]?.["2"] || 0);
          return {
            site: site.name,
            homeWin,
            draw,
            awayWin,
            money: site.money,
          };
        });
      return earnings;
    });
    console.log(results);
    const data = results;

    fetch(
      `https://makebetserver.onrender.com/api/bet?data=${encodeURIComponent(
        JSON.stringify(data)
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("earnings", JSON.stringify(data));
        navigate("/done");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Step 3: Enter Odds for Registered Sites</h1>
          <Container>
            {team.map((member, memberIndex) => (
              <MemberContainer key={memberIndex}>
                <MemberTitle>{member.name}</MemberTitle>
                <Header>
                  <div>Betting Site</div>
                  <div>1</div>
                  <div>X</div>
                  <div>2</div>
                </Header>
                <SiteList>
                  {sites
                    .filter(
                      (site) => !member.notRegisteredSites.includes(site.name)
                    )
                    .map((site, siteIndex) => (
                      <SiteItem key={siteIndex}>
                        <SiteName>{site.name}</SiteName>
                        <OddsInput
                          type="number"
                          step="0.01"
                          value={
                            member.odds &&
                            member.odds[site.name] &&
                            member.odds[site.name]["1"]
                              ? member.odds[site.name]["1"]
                              : ""
                          }
                          onChange={(e) =>
                            handleOddsChange(
                              memberIndex,
                              site.name,
                              "1",
                              e.target.value
                            )
                          }
                        />
                        <OddsInput
                          type="number"
                          step="0.01"
                          value={
                            member.odds &&
                            member.odds[site.name] &&
                            member.odds[site.name]["X"]
                              ? member.odds[site.name]["X"]
                              : ""
                          }
                          onChange={(e) =>
                            handleOddsChange(
                              memberIndex,
                              site.name,
                              "X",
                              e.target.value
                            )
                          }
                        />
                        <OddsInput
                          type="number"
                          step="0.01"
                          value={
                            member.odds &&
                            member.odds[site.name] &&
                            member.odds[site.name]["2"]
                              ? member.odds[site.name]["2"]
                              : ""
                          }
                          onChange={(e) =>
                            handleOddsChange(
                              memberIndex,
                              site.name,
                              "2",
                              e.target.value
                            )
                          }
                        />
                      </SiteItem>
                    ))}
                </SiteList>
              </MemberContainer>
            ))}
            <CalculateButton onClick={calculateEarnings}>
              Send til algoritme
            </CalculateButton>
          </Container>
        </>
      )}
    </>
  );
};

export default Step3;
