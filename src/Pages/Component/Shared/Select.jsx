const Select = ({ label, name, register, validation, errors, options = [], ...props }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <select
      {...(register && name ? register(name, validation) : {})}
      {...props}
      className="select select-bordered w-full border border-zinc-300 rounded-full focus:outline-none focus:border-rose-500 focus:ring-rose-500 transition-all duration-300"
    >
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {errors?.[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
    )}
  </div>
);

export default Select;
