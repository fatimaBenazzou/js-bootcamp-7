import UserName from "./UserName";
import "./ProfilCard.css";

export default function ProfilCard({ user }) {
  const color = "#126879";

  return (
    <div className="card">
      <UserName firstName={user.firstName} lastName={user.firstName} />
      <p style={{ backgroundColor: color }}>
        <strong>age:</strong> {user.age}
      </p>
      <p>
        <strong>Job:</strong> {user.job}
      </p>
      <img src={user.avatar} alt="" />
    </div>
  );
}
