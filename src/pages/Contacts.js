import '../App.css';
import {useState, useEffect} from 'react';
import Card from '../components/Card';
import '../components/Cards.css';
import {useHistory} from 'react-router-dom';

function Contacts() {

    let history = useHistory();

    useEffect(() => {
        if(!localStorage.getItem('token')){
            history.push('/auth');
        }
    });

    const [form, setForm] = useState({fullName:"", email:"", phone:"", address:""});
    const [contacts, setContacts] = useState([{_id:'1', fullName:'test', email:'test@test.com', phone:'123456', address:'test'}]);

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }

    const fillForm = (e, field) => {
    //to update the new object in the state we clone the form '...form'
    //so the state will be able to catch every changes with e.target.value
    let newForm = {...form};
    newForm[field] = e.target.value;
    setForm(newForm);
    }


    /* const formSubmitHandler = (e) => {
        e.preventDefault(); //this in case you use form instead of section - for section button onClick=function
        const url = 'http://localhost:8080/contacts/new';
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(form)
        }

    fetch(url, options).then( data => data.json().then(output => setContacts([...contacts, output])));
    } */

    //changed to upload images
    const formSubmitHandler = (e) => {
        e.preventDefault(); //this in case you use form instead of section - for section button onClick=function

        let finalForm = new FormData();
        finalForm.append('fullName', form.fullName);
        finalForm.append('email', form.email);
        finalForm.append('phone', form.phone);
        finalForm.append('address', form.address);
        finalForm.append('file', e.target[4].files[0]);

        const url = 'https://contact-be.herokuapp.com/contacts/new'; //it was http://localhost:8080/
        const options = {
            method: 'POST',
            headers : {
                'x-auth-token': localStorage.getItem('token')
            },
            body: finalForm
        }

    fetch(url, options).then( data => data.json().then(output => setContacts([...contacts, output])));
    }

    useEffect(() => {
        const url = 'https://contact-be.herokuapp.com/contacts/all';
        const options = {
            headers
        }

        fetch(url, options).then(data => data.json().then(output => {
            if (output.status === 'success') {
                setContacts(output.data);
            } else {
                console.log(output.message);
            }
        }));
    }, []);

    const deleteContactHandler = (id) => {
    const url = 'https://contact-be.herokuapp.com/contacts/'+id;
    const options = {
        method: 'DELETE',
        headers
    }

    fetch(url, options).then(response => response.json().then(output => {
        
        if (output.status === 'success'){
        alert(output.message);
        let newList = contacts.filter(contact => {
            if(contact._id !== output.data){
                return contact;
            }
        })
        setContacts(newList);
        }else{
        alert(`There is an error. For details please check the console`);
        console.log(output.message);
        }
    }))
    .catch(err=>{
        alert(err)});
    }

    //bind(this, contact['_id]) --> to catch the id if I want to delete it
    let cards = [];

    if(typeof(contacts) === 'object' && contacts.length > 0){
        cards = contacts.map(contact => 
            <Card
            key={contact._id}
            contact= {contact}
            deleteContact = {deleteContactHandler.bind(this, contact['_id'])}
            /> 
        );
    }

  //onChange will be return the 'key' and the 'value' in the object 'form' in the state
  return (
    <>
      <div className="App">
        <form className="form" onSubmit={formSubmitHandler}>
          <input placeholder="Full name" required onChange = {(e) => fillForm(e, 'fullName')}/>
          <input type="email" required placeholder="Email" onChange = {(e) => fillForm(e, 'email')}/>
          <input type="tel" placeholder="Phone number" onChange = {(e) => fillForm(e, 'phone')}/>
          <input placeholder="Address" onChange = {(e) => fillForm(e, 'address')}/>
          <input type="file"/>
          <button>Create Contact</button>
        </form>

        <section>
        {cards}
        </section>
      </div>

      
    </>
  );
}

export default Contacts;