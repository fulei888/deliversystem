import React from 'react';

const EditForm = ({modalVisable, submitHanlder,saveLoading,saveError}) => {

    <div className="editForm">
        {modalVisable && 
        <form onSubmit ={submitHanlder}>
            <div >
                <ul>
                    <li>
                        <h2>Edit Info</h2>
                    </li>
                    <li>
                        {saveLoading && <div>Loading</div>}
                        {saveError && <div>{saveError}</div>}
                    
                    </li>
                    <li>
                        <label htmlFor="name">Name</label>
                        <input
                        type="text"
                        name="name"
                        value={name}
                        onChange = {e=>setName(e.target.value)}
                        />
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input
                        type="email"
                        name="email"
                        value={email}
                        onChange = {e=>setEmail(e.target.value)}
                        />
                    </li>
                    <li>
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input
                        type="number"
                        name="phonenumber"
                        value={phonenumber}
                        onChange = {e=>setPhoneNumber(e.target.value)}
                        />
                    </li>
                    <li>
                        <label htmlFor="name">Points</label>
                        <input
                        type="number"
                        name="number"
                        value={points}
                        onChange = {e=>setPoints(e.target.value)}
                        />
                    </li>
                    <li>
                        <button type="submit" className="button myButton primary"
                        >Submit</button>
                        <button type="button" className="back button myButton primary" onClick={()=> {setModalVisable(false)}}
                        >Back</button>
                    </li>
                </ul>
            </div>
        </form> 
        }
    </div>
}
export default EditForm;