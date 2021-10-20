import React from 'react';

const renderField = (field) => (
    <div className="input-row">
        <input { ...field.input } type="text" />
        {field.meta.touched && field.meta.error &&
            <span className="error">{field.meta.error}</span>}
    </div>
)

export default renderField;
