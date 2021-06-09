import React from 'react';
import './GetContact.css';

export default function GetContact(){
    const submitHandler = (e) => {
        e.preventDefault();

        /* let data = {};

        data.fullName = e.target[0].value;
        data.email = e.target[1].value;
        data.phone = e.target[2].value;
        data.message = e.target[3].value; */

        let data = new FormData();
        data.append('fullName', e.target[0].value);
        data.append('email', e.target[1].value);
        data.append('phone', e.target[2].value);
        data.append('message', e.target[3].value);

        //creating an array for the files and iterating it
        Array.from(e.target[4].files).forEach(file =>{
        data.append('attachments', file);
        });

        console.log(1, data);

        let url = 'https://contact-be.herokuapp.com/getcontact';
        let options = {
            method:'POST',
            body: data
        }

        fetch(url, options).then(result=>result.json().then(output=>
            {
                if (output.status === 'success') {
                    alert(output.message);
                } else {
                    alert(output.message);
                }
                console.log(output);
            }));
    }
    return (
        <div id="get-contact">
            <h1>Get contact</h1>
            <form className="contact-form" onSubmit={submitHandler}>
                <input type="text" placeholder="fullName"/>
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Phone number"/>
                <textarea placeholder="Message"/>
                <input type="file" multiple/>
                <button>Get contact</button>
            </form>
        </div>
    )
}
