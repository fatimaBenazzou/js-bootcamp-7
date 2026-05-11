import ProfilCard from "./components/ProfilCard";

const users = [
  {
    firstName: "Fatima",
    lastName: "B",
    age: 25,
    job: "Instructor",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    firstName: "Kenza",
    lastName: "B",
    age: 25,
    job: "Instructor",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    firstName: "Fatima",
    lastName: "B",
    age: 25,
    job: "Instructor",
    avatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    firstName: "Kenza",
    lastName: "B",
    age: 25,
    job: "Instructor",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
  {
    firstName: "Kenza",
    lastName: "B",
    age: 25,
    job: "Instructor",
    avatar: "https://i.pravatar.cc/150?img=65",
  },
];
function App() {
  return (
    <>
      <h1>User Profil</h1>
      {users.map((user) => (
        <ProfilCard user={user} />
      ))}
    </>
  );
}
export default App;
