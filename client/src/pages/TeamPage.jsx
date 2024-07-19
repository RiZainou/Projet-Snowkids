import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TeamPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/teams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the teams!", error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-center text-4xl mt-10">Nos Équipes</h1>
      <div>
        {teams.map((team) => (
          <div key={team.id} className="border-8 p-4 mb-4">
            <Link to={`/equipes/${team.id}`}>
              <h2 className="text-xl">{team.team}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
