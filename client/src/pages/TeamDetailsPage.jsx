import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import PlayerCard from "../components/PlayerCard";

export default function TeamDetailPage() {
  const { currentUser } = useOutletContext();
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [defenseurs, setDefenseurs] = useState([]);
  const [milieux, setMilieux] = useState([]);
  const [attaquants, setAttaquants] = useState([]);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/teams/${teamId}`)
      .then((response) => {
        setTeamName(response.data.team);
      })
      .catch((error) => {
        console.error("There was an error fetching the team details!", error);
      });

    axios
      .get("http://localhost:3310/api/players")
      .then((response) => {
        const players = response.data;

        const defenseursFiltered = players.filter(
          (player) =>
            player.posts_post === "Défenseurs" &&
            player.teams_team === "Equipe A"
        );
        const milieuxFiltered = players.filter(
          (player) =>
            player.posts_post === "Milieux" && player.teams_team === "Equipe A"
        );
        const attaquantsFiltered = players.filter(
          (player) =>
            player.posts_post === "Attaquants" &&
            player.teams_team === "Equipe A"
        );

        setDefenseurs(defenseursFiltered);
        setMilieux(milieuxFiltered);
        setAttaquants(attaquantsFiltered);
      })
      .catch((error) => {
        console.error("There was an error fetching the players!", error);
      });
  }, [teamId]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <h1 className="text-center text-4xl mt-10">{teamName}</h1>

      <div className="mt-8">
        <h2 className="text-2xl text-center">Défenseurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {defenseurs.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl text-center">Milieux</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {milieux.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl text-center">Attaquants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attaquants.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
}
