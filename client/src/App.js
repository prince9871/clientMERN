import { useState } from "react";
import '../src/App.css'
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [studentData, setStudentData] = useState([]);

  const [indexTrack, setIndexTrack] = useState("");

  //fro tracking ki user new entry kar raha he ki exising ko update kar raha he
  const [firstTimeNameCreate, setFirstTimeNameCreate] = useState(false);

  // this function for getting data
  const fetchingData = async () => {
    setIndexTrack("");
    console.log("getting all data from backend");
    let result = await fetch(`https://5fz6p6-3001.csb.app/student`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (result.ok) {
      result = await result.json();
      console.log("getting data is ok");
      setStudentData(result.data);

      console.log(studentData);
    } else {
      console.log("not ok");
    }
  };

  // this function for creating data
  const creatingData = async () => {
    console.log("chal ra h");
    let result = await fetch(`https://5fz6p6-3001.csb.app/student`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: age,
      }),
    });
    if (result.ok) {
      result = await result.json();
      fetchingData();
      // setName(result.data.name);
      // setAge(result.data.age);
      console.log(result);
    } else {
      console.log("not ok");
    }
  };

  // this function for update data
  const updateData = async (id, name, age) => {
    console.log("update user in frontend");
    console.log(name);
    console.log(age);
    let result = await fetch(`https://5fz6p6-3001.csb.app/student`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        age: age,
      }),
    });
    if (result.ok) {
      result = await result.json();
      // setName(result.data.name);
      // setAge(result.data.age);
      console.log(result);
    } else {
      console.log("not ok");
    }
  };

  // this function for deleting data
  const deleteData = async (id) => {
    console.log("delete chal raha");
    let result = await fetch(`https://5fz6p6-3001.csb.app/student`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    if (result.ok) {
      result = await result.json();
      //calling get all data to instant show new data of student
      fetchingData();
      console.log(result);
    } else {
      console.log(result);
      console.log("not deleted");
    }
  };

 return (
    <>
      <img src="./Versatile-Logo_Nav-Area_01-remov.png" alt="" />
      <h1>Student Data Integration </h1>
      <h2>With Live Connectivity</h2>
      <button onClick={fetchingData}>Fetch Data</button>

      <input
        type="text"
        value={firstTimeNameCreate ? name : ''}
        placeholder="enter name here"
        onChange={(event) => {
          setName(event.target.value);
          setFirstTimeNameCreate(true);
          setIndexTrack(-1);
        }}
      />
      <input
        type="text"
        value={firstTimeNameCreate ? age : ''}
        placeholder="enter age here"
        onChange={(event) => {
          setAge(event.target.value);
          setFirstTimeNameCreate(true);
          setIndexTrack(-1);
        }}
      />

      <button onClick={creatingData}>Create Data</button>

      <p className="all-student-header"> All students </p>

      {studentData.map((item, index) => (
        <div key={item._id} className="student-container">
         Name: <input
            value={index === indexTrack ? name : item.name}
            onChange={(event) => {
              setName(event.target.value);
              setIndexTrack(index);
              setFirstTimeNameCreate(false);
            }}
          />

          Age: <input
            value={index === indexTrack ? age : item.age}
            onChange={(event) => {
              setAge(event.target.value);
              setIndexTrack(index);
              setFirstTimeNameCreate(false);
            }}
          />

          <button id="delete" onClick={() => deleteData(item._id)}>Delete</button>
          <button onClick={() => updateData(item._id, name, age)}>Update</button>
        </div>
        
      ))}
    </>
  );
          }

export default App;
