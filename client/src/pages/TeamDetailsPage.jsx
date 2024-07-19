import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import PlayerCard from "../components/PlayerCard";

export default function TeamDetailPage() {
  const { currentUser } = useOutletContext();
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/teams/${teamId}`)
      .then((response) => {
        setTeamName(response.data.team);
      })
      .catch((error) => {
        console.error("Erreur lors de la récuperation des joueurs", error);
      });
  }, [teamId]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/players")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récuperation des joueurs ", error);
      });
  }, []);

  const filteredPlayers = players.filter(
    (player) => player.teams_team === teamName
  );

  const defenseurs = filteredPlayers.filter(
    (player) => player.posts_post === "Défenseurs"
  );
  const milieux = filteredPlayers.filter(
    (player) => player.posts_post === "Milieux"
  );
  const attaquants = filteredPlayers.filter(
    (player) => player.posts_post === "Attaquants"
  );

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
