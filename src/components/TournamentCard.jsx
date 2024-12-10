import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaTrophy } from "react-icons/fa";

export default function TournamentCard({ tournament, onEdit }) {
  return (
    <div
      className="card shadow-sm"
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        width: "320px", // Adjust card width
        flexShrink: "0", // Prevent cards from shrinking
      }}
    >
      {/* Image Section */}
      <div
        style={{
          backgroundImage: `url(${tournament.tournament_image || "./rgukt_logo.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px", // Adjust image height
        }}
      ></div>

      {/* Text Section */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "15px",
        }}
      >
        <h5 className="card-title">{tournament.tournament_name}</h5>
        <p className="card-text">Sport: {tournament.sport_type}</p>
        <p className="card-text">
          <FaMapMarkerAlt className="text-danger" /> {tournament.location}
        </p>
        <p className="card-text">
          <FaCalendarAlt className="text-primary" /> {tournament.start_date} - {tournament.end_date}
        </p>
        <p className="card-text">
          <FaTrophy className="text-warning" /> Prizes:{" "}
          {[tournament.prize_first_place, tournament.prize_second_place, tournament.prize_third_place]
            .filter(Boolean)
            .join(", ")}
        </p>
        {onEdit && (
          <button
            className="btn btn-primary text-white"
            onClick={() => onEdit(tournament)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
