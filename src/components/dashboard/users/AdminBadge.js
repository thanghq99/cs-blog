const AdminBadge = ({ isAdmin }) => {
  return (
    <div
      className={`px-2 py-1 uppercase bg-green-700 text-white text-center ${
        isAdmin ? "bg-rose-500" : "bg-emerald-500"
      }`}
    >
      {isAdmin ? "Admin" : "Writer"}
    </div>
  );
};

export default AdminBadge;
