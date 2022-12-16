

const FormInput = (props) => {
  const { type, name, placeholder, onChange, label } = props;
  return (
    <div className="col-md mb-3">
      <div className="form-floating">
        <input
          type={type}
          className="form-control"
          id={name}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    </div>
  );
};

export default FormInput;
