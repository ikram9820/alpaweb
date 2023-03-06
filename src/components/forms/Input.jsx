function Input({ name, value, handleInputChange, type }) {
  return (
    <div className="form-outline mb-3">
      <label className="form-label text-capitalize" htmlFor={name}>
        {name.replaceAll("_"," ")}
      </label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={(e) => handleInputChange(e)}
        id={name}
        placeholder={`enter ${name.replaceAll("_"," ")}...`}
        required
      />
    </div>
  );
}

export default Input;
