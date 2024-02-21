import React, { useEffect, useState } from 'react'
import Input_field from '../components/Input_filed'
import { Custom_button } from '../components/Custom_button'
import { child, onValue, push, ref, remove, set } from 'firebase/database'
import { database } from '../config/firebase'

const Messages = () => {
    const [user_value, setUser_value] = useState('')
    const [message_data, setmessage_data] = useState([])
    const [selectedMessage,setSelectedMessage] = useState('')
    const [selectedMessageKey,setselectedMessageKey] = useState(null)
    const change_handle = (e) => {
        setUser_value(e.target.value)
    }


    const submit_handle = () => {
        const new_message_key = push(child(ref(database), "messages")).key;
        set(ref(database, `messages/${new_message_key}`), {
            text: user_value,
            key: new_message_key,
        }).then((res) => {
            // alert("Message sent");
            setUser_value(''); // Clear the input field
        });
    };
    useEffect(() => {
        const database_ref = ref(database, "messages/");
        onValue(database_ref, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const convert_array = Object.values(data);
                setmessage_data(convert_array);
                console.log(data);
            }
        });
    }, []);

   const Update_handle = (msg,key)=>{
       setSelectedMessage(msg)
       setselectedMessageKey(key)
       }

       const saveUpdatedMessage = () => {
        if (selectedMessageKey && selectedMessage !== '') {
            set(ref(database, `messages/${selectedMessageKey}`), {
                text: selectedMessage,
                key: selectedMessageKey,
            })
            .then(() => {
                setSelectedMessage('');
                setselectedMessageKey(null);
            });
        }
    };

    const delete_handle = (key) => {
        const messageRef = ref(database, `messages/${key}`);
        remove(messageRef)
            .then(() => {
                console.log("Message deleted successfully");
                setmessage_data((prevData) => prevData.filter((msg) => msg.key !== key));
                setselectedMessageKey(null);
                
            })
            .catch((error) => {
                console.error("Error deleting message:", error);
            });
    };


    return (

        <div>
            <div className=" flex items-center space-x-2">

                <Input_field
                    onChange={change_handle}
                    value={user_value}
                    placeholder="Enter your Message"
                />
                <Custom_button onClick={submit_handle}>Send message</Custom_button>
                </div>
                {
                   <div>
                    <ul>
                        {message_data.map((msg,i)=>{
                          return (

                                <div key={i} className='py-5 px-3'>
                            <li >{msg.text}</li>
                            <div className='flex mt-3'>
                            <Custom_button onClick={()=>Update_handle(msg.text,msg.key)}>
                                Update

                            </Custom_button>
                            <Custom_button onClick={() => delete_handle(msg.key)}>Delete</Custom_button>

                            </div>
                            </div>

                          )
                        })}
                    </ul>
                   </div>
                }
                {selectedMessageKey && (
                <div>
                    <Input_field
                        value={selectedMessage}
                        onChange={(e) => setSelectedMessage(e.target.value)}
                    />
                    <Custom_button onClick={saveUpdatedMessage}>Save</Custom_button>
                </div>
            )}

        </div>

    )
}

export default Messages

