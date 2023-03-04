export default function Users({ currentUser, users, onUserChange }) {
  return (
    <div className="users">
      <select value={currentUser} onChange={(e) => onUserChange(e)}>
        {users.map((user) => (
          <option key={user.id} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}
