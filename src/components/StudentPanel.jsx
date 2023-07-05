import { useState } from 'react';
import { doc, updateDoc, deleteDoc, addDoc, getDocs, collection } from 'firebase/firestore';
import { db, auth, storage } from '../config/firebase.js';
import { useEffect, useContext } from 'react'
import { ref, uploadBytes } from 'firebase/storage';
import './StudentPanel.css';
import { AuthContext } from '../context/authContext.js';
import StudentRecord from './StudentRecord'; // Import the StudentRecord component


function StudentPanel() {
  //READ DATA
  const [studentList, setStudentList] = useState([]);
  const movieCollectionRef = collection(db, "student");
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const getStudentList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) =>
      ({
        ...doc.data(),
        id: doc.id
      }));

      console.log(filteredData);
      setStudentList(filteredData);
    }
    catch (error) {
      console.error(err);
    }
  };
  useEffect(() => {
    getStudentList();
  }, []);


  //CREATE DATA
  const [studentName, setstudentName] = useState(null);
  const [studentAge, setstudentAge] = useState(null);
  const [studentClass, setstudentClass] = useState(null);
  const [studentSex, setstudentSex] = useState(null);
  const [studentHeight, setstudentHeight] = useState(null);
  const [studentWeight, setstudentWeight] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(0);
  const [fileUpload, setFileUpload] = useState(null);

  const clearForm = () => {
    setstudentName("");
    setstudentAge("");
    setstudentClass("");
    setstudentSex("");
    setstudentHeight("");
    setstudentWeight("");
    setFileUpload(null);
  };

  const submitStudent = async () => {
    try {
      await addDoc(movieCollectionRef,
        {
          name: studentName,
          age: studentAge,
          class: studentClass,
          sex: studentSex,
          height: studentHeight,
          weight: studentWeight,
          userId: auth?.currentUser?.uid
        })
      setSubmitStatus(1);
      getStudentList();
      clearForm();
    }
    catch (err) {
      console.error(err);
    }
  }


  //UPLOAD FILE  
  // const [fileUpload, setFileUpload] = useState(null);
  // already created in create file ^

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectfiles/${fileUpload.name}`)
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      // console.("uploaded");
    }
    catch (err) { console.error(err) }
  }

  //UPDATE DATA
  const [updateField, setUpdateField] = useState('name');
  const [updateValue, setUpdateValue] = useState('');

  const updateStudent = async (id, updateField, updateValue) => {
    try {
      const studentRef = doc(db, 'student', id);
      const updateData = {
        [updateField]: updateValue,
      };
      await updateDoc(studentRef, updateData);
      getStudentList();
      setUpdateField('name');
      console.log(updateField);
      setUpdateValue('');
    } catch (err) {
      console.error(err);
    }
  };

  //DELETE DATA
  const deleteStudent = async (id) => {
    try {
      const student_id = doc(db, "student", id);
      await deleteDoc(student_id);
      getStudentList();

    }
    catch (err) { console.err };
  }
  useEffect(() => {
    if (currentUser) {
      getStudentList();
    }
  }, [currentUser]);


  return (
    <div >
      <div className="studentPanel">
        <h4>Create New Record</h4>
        <div className="mb-3">
          <input className="form-control" placeholder="Enter Student Name" value={studentName} onChange={(e) => setstudentName(e.target.value)} />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Enter Student Age" value={studentAge} onChange={(e) => setstudentAge(e.target.value)} />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Enter Student Sex" value={studentSex} onChange={(e) => setstudentSex(e.target.value)} />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Enter Student Class" value={studentClass} onChange={(e) => setstudentClass(e.target.value)} />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Enter Student Height" value={studentHeight} onChange={(e) => setstudentHeight(e.target.value)} />
        </div>
        <div className="mb-3">
          <input className="form-control" placeholder="Enter Student Weight" value={studentWeight} onChange={(e) => setstudentWeight(e.target.value)} />
        </div>
        <div>
          <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}></input>
          <button onClick={uploadFile} className="btn btn-primary">Upload File</button>
        </div>
        <button className="btn btn-primary" onClick={submitStudent}>Submit</button>

        {submitStatus === 1 ? (
          <div>
            ✅ The form has been Submitted to the Database.
          </div>
        ) : (
          <div>
            Not submitted.
          </div>
        )}

      </div>

      {/* conditional rendering if current user is null then studentContainer Not displayed else shown */}
      {currentUser &&
        <div className="studentContainer">
          <h3> Read | Update | Delete Record </h3>
          <h5 >Total Entries: {studentList.length}</h5>
          <div className="studentGrid">
            {studentList.map((student) => (
              <StudentRecord
                key={student.id}
                student={student}
                updateStudent={updateStudent}
                deleteStudent={deleteStudent}
                updateField={updateField}
                updateValue={updateValue}
                setUpdateField={setUpdateField}
                setUpdateValue={setUpdateValue}
              />
            ))}
          </div>
        </div>
      }
    </div>
  );
}
export default StudentPanel;