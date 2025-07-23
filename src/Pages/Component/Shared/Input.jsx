const Input = ({ label, name, register, validation, errors, ...props }) => {

  const inputProps = register && name ? register(name, validation) : {};
  
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-sm">{label}</span>
      </label>
      <input
        {...inputProps}
        {...props}
        className="input input-bordered w-full rounded-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300 ease-in-out text-sm"
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default Input;
