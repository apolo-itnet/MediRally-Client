import { useState } from "react";

export default function CustomInput({
  icon: Icon,
  label,
  placeholder = "",
  type = "text",
  name,
  value,
  onChange,
  required,
  options = [],
  select = "Select an option",
  rows = 3,
  readonly,
  disabled, 
}) {
  const [isFocused, setIsFocused] = useState(false);

  const baseWrapper = `
    flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg 
    border-2 border-transparent transition duration-500
    hover:border-gray-400 has-focus-within:border-fuchsia-800/50
  `;

  const inputStyle = `
    bg-transparent outline-none w-full text-gray-700 placeholder:text-gray-400
  `;

  return (
    <div className="mb-4">
      {label && (
        <label className="mb-1 text-sm font-semibold flex items-center gap-2">
          {label}
        </label>
      )}

      {/* Textarea */}
      {type === "textarea" ? (
        <div className={baseWrapper}>
          {Icon && (
            <Icon
              className={`w-5 h-5 ${
                isFocused ? "text-fuchsia-800/70" : "text-gray-400"
              }`}
            />
          )}
          <textarea
            name={name}
            rows={rows}
            placeholder={placeholder}
            required={required}
            className={inputStyle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            onChange={onChange}
          />
        </div>
      ) : type === "select" ? (
        // Select Dropdown
        <div className={baseWrapper}>
          {Icon && (
            <Icon
              className={`w-5 h-5 ${
                isFocused ? "text-fuchsia-800/70" : "text-gray-400"
              }`}
            />
          )}
          <select
            name={name}
            required={required}
            className={inputStyle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            onChange={onChange}
          >
            <option disabled value="">
              {select}
            </option>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ) : type === "checkbox" ? (
        // Checkbox
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name={name}
            required={required}
            checked={value}
            onChange={onChange}
            className="checkbox checkbox-primary"
          />
          <span className="label-text">{placeholder || label}</span>
        </label>
      ) : type === "file" ? (
        // File Upload
        <div>
          <input
            type="file"
            name={name}
            required={required}
            onChange={onChange}
            disabled={disabled}
            className="file-input file-input-bordered w-full"
          />
        </div>
      )  : (
        // for - (text, email, date, password, etc)
        <div className={baseWrapper}>
          {Icon && (
            <Icon
              className={`w-5 h-5 ${
                isFocused ? "text-fuchsia-800/70" : "text-gray-400"
              }`}
            />
          )}
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            required={required}
            readOnly={readonly}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={inputStyle}
          />
        </div>
      )}
    </div>
  );
}