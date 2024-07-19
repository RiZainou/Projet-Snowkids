/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlayerCard({ player }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    // Effect to fetch random user data for profile picture
    axios
      .get("https://randomuser.me/api/")
      .then((response) => {
        const imageUrl = response.data.results[0].picture.large;
        setPhotoUrl(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching random user data:", error);
      });
  }, []);

  return (
    <div className="card bg-base-100 w-96 shadow-xl gap-10">
      <div className="card-body flex items-center">
        {photoUrl && (
          <img
            src={photoUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-4"
          />
        )}
        <div>
          <h2 className="card-title">
            {player.firstname} {player.lastname}
          </h2>
        </div>
      </div>
    </div>
  );
}
