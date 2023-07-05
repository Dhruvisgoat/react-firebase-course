import React, { useState } from 'react';

const StudentRecord = ({ student, updateStudent, deleteStudent }) => {
  const [updateField, setUpdateField] = useState('name');
  const [updateValue, setUpdateValue] = useState('');

  const handleUpdate = () => {
    updateStudent(student.id, updateField, updateValue);
    setUpdateField('name');
    setUpdateValue('');
  };

  return (
    <div className='studentCard'>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Sex: {student.sex}</p>
      <p>Class: {student.class}</p>
      <p>Height: {student.height}</p>
      <p>Weight: {student.weight}</p>

      {/* Other student details */}
      <select className="form-select mb-3" value={updateField} onChange={(e) => setUpdateField(e.target.value)}>
        <option value="name">Name</option>
        <option value="age">Age</option>
        <option value="sex">Sex</option>
        <option value="class">Class</option>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
      </select>
      <input
        type="text"
        className="form-control mb-3"
        placeholder={`Enter ${updateField} value`}
        value={updateValue}
        onChange={(e) => setUpdateValue(e.target.value)}
      />
      <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
      <button className="btn btn-danger me-2" onClick={() => deleteStudent(student.id)}>Delete</button>
    </div>
  );
};

export default StudentRecord;
