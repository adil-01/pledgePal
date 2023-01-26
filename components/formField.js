import React from 'react';
import styles from "../styles/Formfield.module.css";

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange }) => {
  return (
    <label className={styles.input_label}>
      {labelName && (
        <span className={styles.label_name}>{labelName}</span>
      )}
      {isTextArea ? (
        <textarea 
          required
          value={value}
          onChange={handleChange}
          rows={7}
          placeholder={placeholder}
          className={styles.form_input}
        />
      ) : (
        <input 
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className={styles.form_input}
        />
      )}
    </label>
  )
}

export default FormField;