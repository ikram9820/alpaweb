function Input({ name, input, handleInputChange, type }) {

  return (
    <div>
      <label className="form-label text-capitalize" htmlFor={name}>
        {name.replaceAll("_"," ")}
      </label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={input}
        onChange={(e) => handleInputChange(e)}
        id={name}
        placeholder={`enter ${name.replaceAll("_"," ")}...`}
        required
      />
    </div>
  );
}

export default Input;
