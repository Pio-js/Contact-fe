import {useState} from 'react';

const Card = ({contact, deleteContact}) => {
    const {fullName, email, phone, address, avatar} = contact;
    const editedContact = {...contact};

    const [isEditable, setIsEditable] = useState(false);
    const [bgColor, setBgColor] = useState('');

    const editToggle = () => {
        setIsEditable(!isEditable);
    }

    const editCardHandler = (e) => {
        const id = e.target.getAttribute('data-id');
        let info;
        if(id === 'file'){
            info = e.target.files[0];
        }else{
            info = e.target.innerText;
        }
        
        editedContact[id] = info;
    }

    const editCheckHandler = (e) => {
        console.log(e);
        if(e.charCode === 13){
            e.preventDefault();
        }
    }

    const updateContactHandler = () => {

        let finalForm = new FormData();

        Object.keys(editedContact).forEach(key => {
            finalForm.append(key, editedContact[key]) 
        });

        console.log(editedContact);
        const url = 'https://contact-be.herokuapp.com/contacts/update';
        const options = {
        method: 'POST',
        headers: {
        'x-auth-token': localStorage.getItem('token')
        },
        body: finalForm
        }

        fetch(url, options).then( data => data.json().then(output => {
            if (output.status === 'success') {
                setIsEditable(false);
                setBgColor('lightgreen');
                setTimeout(() => {
                    setBgColor('');
                }, 1000);
            } else {
                setBgColor('coral');
            }
        }));
        setIsEditable(!isEditable);
    }

    const editB = <button onClick={editToggle}>✏️</button>;
    const updateB = <button onClick={updateContactHandler}>✔️</button>;

    return(
    <div className={isEditable? 'card editable': 'card'} style={{backgroundColor: bgColor}}>
        {isEditable ? <input data-id='file' type="file" onChange={editCardHandler}/> : <img src={'https://contact-be.herokuapp.com/avatars/'+avatar} alt='avatar'/>}
        <div data-id='fullName' onKeyPress={editCheckHandler} onBlur = {editCardHandler} contentEditable = {isEditable}>{fullName}</div>
        <div data-id='email' onKeyPress={editCheckHandler} onBlur = {editCardHandler} contentEditable = {isEditable}>{email}</div>
        <div data-id='phone' onKeyPress={editCheckHandler} onBlur = {editCardHandler} contentEditable = {isEditable}>{phone}</div>
        <div data-id='address' onKeyPress={editCheckHandler} onBlur = {editCardHandler} contentEditable = {isEditable}>{address}</div>
        <div id="buttons">
            {isEditable? updateB : editB}
            <button onClick={deleteContact}>🗑️</button>
        </div>
    </div>);
}

export default Card;