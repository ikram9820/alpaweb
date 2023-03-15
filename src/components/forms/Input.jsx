function Input({id, name, value,className, handleInputChange, type }) {
  return (
    <div className="form-outline  mb-3">
      <label className="form-label text-capitalize mb-0 me-3" htmlFor={name}>
        {name.replaceAll("_"," ")}:
      </label>
      <input
        type={type}
        className={className?className:"form-control"}
        name={name&& name}
        value={value}
        onChange={(e) => handleInputChange(e)}
        id={name || id}
        placeholder={name&& `enter ${name.replaceAll("_"," ")}...`}
        required
      />
    </div>
  );
}

export default Input;
