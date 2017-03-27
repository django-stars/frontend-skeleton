import InputElement from 'react-input-mask';

export const maskChar = 'X';

export const InputCustom = ({ input, label, type, placeholder, className, meta: { touched, visited, error } }) => {
  const phoneInput = (
    <InputElement {...input} mask="+380 (99) 999 9999" placeholder="+380 (XX) XXX XXXX" maskChar={maskChar} />
  );
  const defaultInput = (
    <input
      {...input}
      className={`input-custom ${touched && error ? "error" : ""}`}
      placeholder={placeholder}
      type={type} />
  );
  const inputType = type === 'tel' ? phoneInput : defaultInput;
  return (
    <div className={`field ${className || ''}`}>
      <label className="label-custom">
        {inputType}
        <div className={`label-text ${visited ? "touched" : ""}`}>{label}</div>
        {touched && ((error && <div className="message-error">{error}</div>))}
      </label>
    </div>
  )
}