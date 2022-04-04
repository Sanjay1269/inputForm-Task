import React, { useState } from 'react'

const EmployeeInputForm = () => {
    const [user, setUser] = useState([{
        name: "",
        designation: "",
        type:"",
        contact:"",
        skill:"",
        dob: ""

    }])

    const [record, setRecord] = useState([])
    const [viewData, setViewData] = useState(false)
    const [contact, setContact] = useState([{
        type: "",
        number: ""
    }])
    const [skills, setSkills] = useState([{
        skill: ""
    }])

    const handleContactAdd = () => {
        setContact([...contact, { type: "", number: "" }])
    }

    const handleContactRemove = (index) => {
        const contactList = [...contact]
        contactList.splice(index, 1)
        setContact(contactList)
    }

    const handleSkillsAdd = () => {
        setSkills([...skills, { skill: "" }])
    }

    const handleSkillsRemove = (index) => {
        const skillsList = [...skills]
        skillsList.splice(index, 1)
        setSkills(skillsList)
    }
    // let AddPhone = () => {
    //     setPhone((prevVal) => {
    //         console.log(prevVal)
    //         return [...prevVal, <input type="tel" />]
    //     })
    // }

    // let AddSkill = () => {
    //     setSkills((prevVal) => {
    //         console.log(prevVal)
    //         return [...prevVal, <input type="text" />]
    //     })
    // }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);

        setUser({ ...user, [name]: value })

    }


    const handleAdd = (e) => {
        e.preventDefault();
        const newRecord = { ...user}
        console.log(newRecord);
        setRecord([...record, newRecord]);
        console.log(record);
        setUser({ name: "", designation: "",type:"",contact:"",skills:"", dob: "" });

    }




    //this code was reffered from internet for downloading file
    const downloadFile = ({ data, fileName, fileType }) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], { type: fileType })
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const exportToJson = e => {
        e.preventDefault()
        downloadFile({
            data: JSON.stringify(record),
            fileName: 'EmployeeData.json',
            fileType: 'text/json',
        })
    }
    
    return (
        <div className='container'>
            <form onSubmit={handleAdd}>
                <h1>Employee Data</h1>
                <div className='form'>
                    <label className='col-2' htmlFor='name' >Name :</label>
                    <input type='text'
                        value={user.name}
                        onChange={handleInput}
                        name="name"
                        required />
                    <br /><br />
                    <label className='col-2' htmlFor='designation'>Designation :</label>
                    <input type='text'
                        value={user.designation}
                        onChange={handleInput}
                        name='designation'
                        required />
                    <br /><br />
                    <label className='col-2' htmlFor='contact'>Contact :</label>
                    {contact.map((singlePhone, index) => (
                        < div key={index}>
                            < select select onChange={handleInput} value={user.type} name='type' >
                                <option selected disabled>Type</option>
                                <option>Emergency</option>
                                <option>primary</option>
                                <option>secondary</option>
                            </select>
                            <input className='col-2' type='tel'
                                onChange={handleInput}
                                value={user.contact}
                                name='contact'
                                placeholder='phone number...' />
                            &nbsp;
                            {contact.length - 1 === index && contact.length < 4 &&
                                <button type='button' onClick={handleContactAdd} >+</button>
                            }

                            {contact.length > 1 && <button onClick={() => handleContactRemove(index)}>-</button>}

                        </div>
                    ))
                    }


                    {/* {phone.map((element) => {
                        return element
                    })} */}
                    <br /><br />
                    <label className='col-2' htmlFor='skill'>Skill :</label>
                    {
                        skills.map((singleSkill, index) => (
                            <div key={index}>
                                <input type='text'
                                    name='skill'
                                    value={user.skills}
                                    onChange={handleInput}
                                />&nbsp;
                                {skills.length - 1 === index && skills.length < 4 && <button type='button' onClick={handleSkillsAdd} >+</button>}
                                {skills.length > 1 && <button onClick={() => handleSkillsRemove(index)}>-</button>}
                            </div>

                        ))
                    }

                    {/* {skills.map((element) => {
                        return element
                    })} */}
                    <br /><br />
                    <label className='col-2' htmlFor='dob'>D.O.B :</label>
                    <input type='date'
                        value={user.dob}
                        onChange={handleInput}
                        name='dob'
                    />
                </div >
                <br />
                <div style={{ textAlign: 'center' }}>
                    <button type='submit' className='btn btn-dark' onClick={() => setViewData(false)}>Add Employee</button>
                    <br /><br />
                    <button className='btn btn-success' onClick={() => { setViewData(!viewData) }}>view Data</button>
                </div>
            </form >
            <div>
                {viewData ? record.map((curElem, ind) => {
                    const { id, name, designation, type, contact, skill, dob } = curElem;
                    return (
                        <div className="showDataStyle" key={id} >
                            <p>Employee#{ind + 1}</p>
                            <p>Name         :{name}</p>
                            <p>Designation  :{designation}</p>
                            <p>Contact      :{type}-{contact}</p>
                            <p>Skill        :{skill}</p>
                            <p>dob          :{dob}</p>
                        </div>
                    )
                }) : null}
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <button className='btn btn-primary' onClick={exportToJson}>Download JSON</button>
                </div>
            </div>

        </div >

    )
}

export default EmployeeInputForm